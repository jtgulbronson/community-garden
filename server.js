var WebSocketServer = require("ws").Server;
var http = require("http");
var express = require("express");

//setting root
var app = express();
app.use(express.static(__dirname + "/"));

//setting the PORT, will be determined by Heroku or set to 5000 on local machine
var port = process.env.PORT || 5000;

var server = http.createServer(app);
server.listen(port);

console.log("http server listening on %d", port);

var wss = new WebSocketServer({
    server: server
});
console.log("WebSocket Server was created");

var connections = [];

wss.on('connection', function (ws) {

    connections.push(ws);

    console.log("User Connected");

    ws.on('message', function (m) {
        var message = JSON.parse(m);

        if (message.type == 'register') {
            console.log(message);

            var time = new Date().toJSON();

            connections.forEach(function (connection, index) {

                connection.send(`${time}: Someone has logged on`);
                console.log("Message Sent to Client");

            });
        }
    });

    ws.on('close', function () {
        connections.splice(connections.indexOf(ws), 1);

        console.log("User Disconnected");

        var time = new Date().toJSON();

        connections.forEach(function (connection, index) {

            connection.send(`${time}: Someone has logged off`);
            console.log("Message Sent to Client");

        });
    })
})

console.log("WebSocket Server is up");