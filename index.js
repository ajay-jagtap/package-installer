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
const Totalcount = 5;
var count = 0;

deleteExistingPackage();

function deleteExistingPackage() {
  count++;
  if (count < Totalcount) {
    setTimeout(() => {
      console.log('Deleting existing Package');
      fs.rm('./node_modules/ngx-bs-modal', { recursive: true }, () => console.log('done'));
      setTimeout(() => {
        installPackage();
      }, 5000);
    }, 5000);
  }
}

function installPackage() {
  npm.load(function (err) {
    console.log('Installing new Package');
    // install module ngx-bs-modal
    npm.commands.install(['ngx-bs-modal'], function (er, data) {
      // log errors or data
      console.log('Installed Package', er, data);
      deleteExistingPackage();
    });

    npm.on('log', function (message) {
      // log installation progress
      console.log('log', message);
    });
  });
}
