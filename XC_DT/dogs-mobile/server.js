// A very basic web server in node.js
// Stolen from: Node.js for Front-End Developers by Garann Means (p. 9-10) 

var port = 8000;
var serverUrl = "localhost";

var http = require("http");
var path = require("path"); 
var fs = require("fs"); 
var Ractive = require('ractive');

var aabb = new Ractive({
    hola: 'hello'
});  

console.log("Starting web server at " + serverUrl + ":" + port);

http.createServer( function(req, res)
{
    var now = new Date();

    var filename = req.url || "XavierCoscojuela-desktop.html";
    var ext = path.extname(filename);
    var localPath = __dirname;
    var validExtensions = {
        ".html" : "text/html",          
        ".js": "application/javascript", 
        ".css": "text/css",
        ".txt": "text/plain",
        ".jpg": "image/jpeg",
        ".gif": "image/gif",
        ".png": "image/png",
        ".ico": "image/png"
    };
    var isValidExt = validExtensions[ext];

    if (isValidExt) {
        localPath += filename;

        fs.exists(localPath, function(exists) {
            if(exists) {
                //console.log("Serving file: " + localPath);
				getFile(localPath, res, validExtensions[ext]);
            } else {
                //console.log("File not found: " + localPath);
                if(ext === 'text/html'){
                    getFile(__dirname + '/404.html', res, ext);
                }
            }
        });

    } else {
		getFile(__dirname + '/XavierCoscojuela-desktop.html', res, 'text/html');
    }

}).listen(port, serverUrl);

function getFile(localPath, res, mimeType) {
    fs.readFile(localPath, function(err, contents) {
        if(!err) {
            res.setHeader("Content-Length", contents.length);
            res.setHeader("Content-Type", mimeType);
            res.statusCode = 200;
			
			/*
			 console.log("Request handler random was called.");
			  res.writeHead(200, {"Content-Type": "application/json"});
			  var otherArray = ["item1", "item2"];
			  var otherObject = { item1: "item1val", item2: "item2val" };
			  var json = JSON.stringify({ 
				anObject: otherObject, 
				anArray: otherArray, 
				another: "item"
			  })  
				//res.end(json);
			*/
			
			
			
			

            res.end(contents);
        } else {
            res.writeHead(500);
            res.end();
        }
    });
}