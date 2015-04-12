var fs = require('fs'),
  request = require('request'),
  url = 'https://registry.npmjs.org/-/all?startkey=""',
  filePath = './package.json';

var updatePackages = function(cb) {
  request(url, function(err, response, body) {
    if (err) throw err;
    if (!err && response.statusCode === 200) {
      var data = JSON.parse(body),
        json = {};
      for (var package in data) {
        json[package] = 'latest';
      }
      cb(json);
    }
  });
};

fs.readFile(filePath, 'utf8', function(err, data) {
  if (err) throw err;
  var content = JSON.parse(data);
  updatePackages(function(json) {
    content.dependanices = json;
    fs.writeFile(filePath, JSON.stringify(content), function(err) {
      if (err) throw err;
      console.log('Updated!');
    });
  });
});
