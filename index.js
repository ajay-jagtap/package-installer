const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  const msg = 'Hello Node!\n'
  res.end(msg);
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});

// Script to delete and install packages
const fs = require('fs');
var npm = require('npm');
const packages = ['ngx-bs-modal'];
const Totalcount = 100;
var count = 0;

runScript();

function runScript() {
  count++;
  console.log('Count: ' + count);
  if (count < Totalcount) {
    deletePackagesFromNodeModules();
  } else {
    console.log('Script completed ' + Totalcount + ' Times')
  }
}

function deletePackagesFromNodeModules() {
  packages.forEach((package, index) => {
    console.log(`Deleting Existing Package: ${package}`);
    fs.rm(`./node_modules/${package}`, { recursive: true }, () => {
      console.log(`Deleted Existing Package: ${package}`)
      if (index == packages.length - 1) {
        installPackagesFromNPM();
      }
    });
  })
}

function installPackagesFromNPM() {
  npm.load(function (err) {
    console.log('Installing New Packages');
    // install Package
    npm.commands.install(packages, function (er, data) {
      // log errors or data
      console.log('Installed New Packages', er, data);
      runScript();
    });

    npm.on('log', function (message) {
      // log installation progress
      console.log('log', message);
    });
  });
}
