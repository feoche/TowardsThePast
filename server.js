var express         = require('express');
var app             = express();								// Useful just for routing the files

// Change accordingly to your app folder.
var staticdir = process.env.NODE_ENV === 'production' ? './' : './';
var port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/' + staticdir));

var http = require('http');

// Entry point of the app
app.get("/*", function(req, res) {
    res.sendFile(__dirname + '/' + staticdir + "/index.html");
});

// Create an HTTP service.
app.listen(port, function() {
  console.log('Node app is running on port', port);
});
