/**
 * Module dependencies.
 */

var PORT = 3030;
var express = require('express');
io = require('socket.io');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// socket.io
var socket = io.listen(app);
socket.on('connection', function(client) {
    client.on('message', function(data) {
      client.broadcast(data);
    });
});


// Routes
app.get('/', function(req, res){
  console.log(req);
  res.render('index', {
    title: 'SocketSketch'
  });
});

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(PORT);
  console.log("Express server listening on port %d", app.address().port);
}
