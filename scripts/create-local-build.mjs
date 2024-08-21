import fs from 'fs';
import path from 'path';
import { password as passwordPrompt } from '@inquirer/prompts';
import { create as createTar } from 'tar';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { NodeSSH } from 'node-ssh';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');

function sanitizeDateTime(dateTime) {
  return dateTime.replace(/[/: ]/g, '_');
}

function log(logFilePath, content, logToConsole = false) {
  fs.appendFileSync(logFilePath, content + '\n', 'utf8');
  if (logToConsole) {
    console.log(content);
  }
}

function getEnv() {
  const env = fs
    .readFileSync(path.join(ROOT_DIR, 'build.properties'), 'utf8')
    .split('\n')
    .filter(Boolean); // Filter out empty lines
  env.push(`EAS_NO_VCS=1`);
  return env;
}
async function executeCommand(ssh, command, env, logFilePath) {
  const commandPrefix = `source ~/.nvm/nvm.sh && export ${env.join(' ')}`;
  const cmd = `${commandPrefix} && ${command.command}`;
  log(logFilePath, `> Running ${command.command}`, true);
  const { stderr, stdout, code, signal } = await ssh.execCommand(cmd, {
    cwd: command.cwd,
  });
  log(logFilePath, stderr ? stderr : 'No Errors.');
  log(logFilePath, stdout ? stdout : 'No Std Output');
  log(logFilePath, '\n');
  return { stdout, stderr };
}

const main = async (passwd, buildDir) => {
  let connection;
  const ssh = new NodeSSH();
  const now = new Date();
  const datetime = sanitizeDateTime(now.toISOString());
  const logFilePath = path.join(ROOT_DIR, 'build', `build-${datetime}.log`);

  log(logFilePath, `Datetime: ${datetime}`, true);

  const dirName = path.basename(ROOT_DIR);
  const env = getEnv();

  const tarFile = `${dirName}.tgz`;
  const remoteWorkDir = `/home/shoemaker/work/apps/${datetime}`;
  log(logFilePath, `Remote Work Dir: ${remoteWorkDir}`, true);

  try {
    log(logFilePath, 'creating archive', true);

    const excludePatterns = fs
      .readFileSync(path.join(ROOT_DIR, '.buildignore'), 'utf8')
      .split('\n')
      .filter(Boolean); // Filter out empty lines
    excludePatterns.push('.git');
    excludePatterns.push(`${tarFile}`);

    await createTar(
      {
        gzip: true,
        file: tarFile,
        cwd: ROOT_DIR,
        filter: (filePath) => {
          // console.log(
          //   filePath,
          //   !excludePatterns.some((pattern) => filePath.includes(pattern)),
          // );
          return !excludePatterns.some((pattern) => filePath.includes(pattern));
        },
      },
      ['.'],
    );
    log(logFilePath, 'tarball created', true);

    connection = await ssh.connect({
      host: '172.70.10.25',
      username: 'shoemaker',
      port: 22,
      password: passwd,
    });
    log(logFilePath, 'connected to ssh', true);

    await executeCommand(
      ssh,
      { command: `mkdir -p ${remoteWorkDir}/${dirName}` },
      env,
      logFilePath,
    );
    log(logFilePath, 'Remote work dir created.');

    log(
      logFilePath,
      `Uploading ${path.join(ROOT_DIR, tarFile)} to ${remoteWorkDir}/${tarFile}...`,
      true,
    );
    await ssh.putFile(
      path.join(ROOT_DIR, tarFile),
      `${remoteWorkDir}/${tarFile}`,
    );
    fs.unlinkSync(path.join(ROOT_DIR, tarFile));
    log(logFilePath, 'File uploaded successfully.', true);

    const commands = [
      {
        command: `nvm use --lts`,
      },
      {
        command: `node --version`,
      },
      {
        command: `tar -xvf ${tarFile} -C ${dirName}`,
        cwd: remoteWorkDir,
      },
      {
        command: `yarn install`,
        cwd: `${remoteWorkDir}/${dirName}`,
      },
      {
        command: `eas build -p android --local`,
        cwd: `${remoteWorkDir}/${dirName}`,
        afterExecution: async (stdout, stderr) => {
          const regex = /build-\d+\.aab/g;
          const matches = stdout.match(regex);

          if (matches && matches.length > 0) {
            const extractedPath = matches[0];
            log(logFilePath, `Extracted Path: ${extractedPath}`, true);
            log(logFilePath, 'retriving build files...', true);
            await ssh.getFile(
              path.join(ROOT_DIR, 'build', `build-${datetime}.aab`),
              `${remoteWorkDir}/${extractedPath}`,
            );
          } else {
            log(logFilePath, 'Build not found/created.', true);
          }
        },
      },
    ];

    for (const command of commands) {
      const { stdout, stderr } = await executeCommand(
        ssh,
        command,
        env,
        logFilePath,
      );
      if (command.afterExecution) {
        await command.afterExecution(stdout, stderr);
      }
    }
  } catch (err) {
    log(logFilePath, `An error occurred: ${err}`, true);
  } finally {
    log(logFilePath, `Removing workdir: ${remoteWorkDir}`, true);
    const { stdout, stderr } = await executeCommand(
      ssh,
      { command: `rm -rf ${remoteWorkDir}` },
      env,
      logFilePath,
    );

    if (connection && connection.isConnected())
      log(
        logFilePath,
        'Connection is alive 🔥 ; Disposing the connection',
        true,
      );

    // destroy the ssh client connection
    ssh.connection?.destroy();

    // dispose the connection
    if (connection) {
      connection.dispose();
    }

    if (connection && !connection.isConnected())
      log(logFilePath, 'Connection is successfully disposed', true);
  }
};

passwordPrompt({ message: `Enter Password: `, required: true }).then(
  (answer) => {
    const buildDir = process.argv[2];
    main(answer, buildDir);
  },
);
