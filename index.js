var fs = require('fs'),
  request = require('request'),
  url = 'https://registry.npmjs.org/-/all',
  filePath = './package.json';

var updatePackages = function(cb) {
  request(url, function(err, response, body) {
    if (err) throw err;
    if (response.statusCode === 200) {
      var data = JSON.parse(body),
        json = {};
      for (var package in data) {
        json[package] = 'latest';
      }
      cb(json);
    }
  });
};

var readFile = function(cb) {
  fs.readFile(filePath, 'utf8', function(err, data) {
    if (err) throw err;
    var content = JSON.parse(data);
    cb(content);
  });
};

var writeFile = function(data) {
  fs.writeFile(filePath, JSON.stringify(data), function(err) {
    if (err) throw err;
    console.log('Updated!');
  });
};

updatePackages(function(json) {
  readFile(function(content) {
    content.dependanices = json;
    writeFile(content);
  });
});
