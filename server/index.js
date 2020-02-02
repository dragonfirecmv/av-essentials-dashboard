//server.js
const express = require('express');
// const favicon = require('express-favicon');
const path = require('path');

const port = process.env.PORT || 8080;
const app = express();

// app.use(favicon(__dirname + '/www/assets/images/manifest/favicon.ico'));

app.use(express.static(__dirname));

app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/ping', function (req, res) {
  res.status(200).send('OK')
});

app.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

app.listen(port);