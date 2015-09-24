var express = require('express');
var pathHelper = require('path');
var server = express();

server.get('/401', function (req, res) {
  res.status(401);
  res.set('Content-Type', 'application/xml');
  res.send('<?xml version="1.0"?><configuration><title>myapp</title></configuration>');
});

server.use(express.static(pathHelper.resolve(__dirname, '..')));

server.listen(8000);

process.on('SIGTERM', function () {
  process.exit(0);
});
