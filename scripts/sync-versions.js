const fs = require('fs')

// Read the package.json file
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
const appJson = JSON.parse(fs.readFileSync('app.json', 'utf8'))

appJson.expo.version = packageJson.version

// Write the changes back to the package.json file
fs.writeFileSync('app.json', JSON.stringify(appJson, null, 2), 'utf8')

console.log('copied verion from package.json to app.json!')
