/**
 * Created by AshZhang on 15/8/24.
 */


'use strict';

var path = require('path'),
    bodyParser = require('body-parser'),
    express = require('express'),
    multer = require('multer')(),
    app = express(),
    PORT = 9090;


// Settings
// ---------------------------

app.disable('x-powered-by');
app.set('port', process.env.PORT || PORT);
app.use(express.static(__dirname + '/build'));


// Middleware
// ---------------------------

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


// REST API
// ---------------------------

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  next();
});

// GET
app.get('/:a?', function (req, res) {
  console.log(req.query);
  res.json({
    success: true
  });
});


// POST
app.post('/:a?', multer.array('photo'), function (req, res) {
  console.log(req.files);
  console.log(req.body);

  setTimeout(function () {
    res.json({
      success: true
    });
  }, 3000);
});


// PUT
app.put('/:a?', function (req, res) {
  console.log(req.body);
  res.json({
    success: true
  });
});


// DELETE
app.delete('/:a?', function (req, res) {
  console.log(req.body);
  res.json({
    success: true
  });
});


// Listening
// ---------------------------

app.listen(app.get('port'), function () {
  console.log('Listening at port: ' + app.get('port'));
});