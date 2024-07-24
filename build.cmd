rem PRE-REQUSITES
@echo off
setlocal enabledelayedexpansion


rem Get current date and time
set "datetime=%date%_%time%"
echo %datetime%

rem Remove characters that are not valid in a file name
set "datetime=!datetime:/=_!"
set "datetime=!datetime::=!"
set "datetime=!datetime: =!"

rem Set the input and output paths
set "current_dir=%CD%"
for %%I in ("%current_dir%") do set "dir_name=%%~nxI"

set "output_file=%dir_name%.tar"
set "ssh_user=shoemaker"
set "ssh_host=172.70.10.25"
set "remote_work_dir=~/work/apps/%datetime%"
echo %remote_work_dir%

@REM set /p "password=password for %ssh_user% on %ssh_host%: "

rem Create a temporary file to store the filtered list of files
set "temp_file=temp.txt"
type nul > "%temp_file%"

rem Read the .gitignore file and append its contents to the temporary file
for /f "tokens=*" %%a in ('type "%current_dir%\.buildignore"') do (
    echo %%a>>"%temp_file%"
)
echo .git>>"%temp_file%"
echo %output_file%>>"%temp_file%"

rem Create the tar archive, excluding files listed in .gitignore
tar -cvf "%output_file%" --exclude-from="%temp_file%" -C "%current_dir%" .

rem Clean up the temporary file
del "%temp_file%"

ssh %ssh_user%@%ssh_host% "mkdir -p %remote_work_dir%/%dir_name%"

rem Step 2: Upload tar archive to SSH server
scp "%output_file%" %ssh_user%@%ssh_host%:%remote_work_dir%

del "%output_file%"

rem Step 3: Build on SSH server
ssh %ssh_user%@%ssh_host% "tar -xvf %remote_work_dir%/%output_file% -C %remote_work_dir%/%dir_name%; cd %remote_work_dir%/%dir_name%; chmod +x build.sh; ./build.sh"

rem Step 3: find build info or error
ssh %ssh_user%@%ssh_host% "cd %remote_work_dir%/%dir_name%; "

rem Step 4: copy build from SSH server to local working directory
scp %ssh_user%@%ssh_host%:%remote_work_dir%/%dir_name%/build.log "build/%datetime%_build.log"
scp %ssh_user%@%ssh_host%:%remote_work_dir%/%dir_name%/*.aab "build/"

echo "build created: %build_file%"

rem Step 5: cleanup SSH server
ssh %ssh_user%@%ssh_host% "rm -rf %remote_work_dir%"

endlocal
