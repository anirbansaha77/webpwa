var http = require('http');
var favicon = require('serve-favicon');
var path = require('path');
var express = require('express')

var app = express()
let reqPath = path.join(__dirname, '../');
var _favicon = favicon(path.join(reqPath, 'public', 'favicon.ico'))


app.get('/sw.js', function (req, res) {
    res.sendFile(path.join(reqPath,'sw.js'));
});

app.use(express.static(reqPath + '/client/www'));

//app.get('/', function (req, res) {
 // res.sendFile(path.join(reqPath,'index.html'));
//});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!, http://localhost:8000');
});