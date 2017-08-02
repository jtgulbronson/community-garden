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
var users = [];
var cylinderHeight;

wss.on('connection', function (ws) {

    connections.push(ws);

    console.log("User Connected");

    ws.on('message', function (m) {

        var msg = JSON.parse(m);
        console.log(msg);

        if (msg.type == 'loadAll') {
            //var cylinderHeight = $('.cyl').attr('height');
        } else if (msg.type == 'swipe') {
            //notifying all clients about swipe
            console.log("swipe sent");

        }

        if (msg.sendToAll) {
            //send to all connections
            users.forEach(function (user, index) {
                if (user.id == msg.id && user != msg.user) {
                    user[index] = msg.user;
                }
            });

            connections.forEach(function (connection, index) {
                connection.send(JSON.stringify(msg));
                console.log("Message Sent to Client");
            });
        } else {
            //send back to sender
            ws.send(JSON.stringify(msg));
        }

    });

    ws.on('close', function () {

        var msg = {
            type: 'logoff',
            user: users[connections.indexOf(ws)]
        }

        //Searching for the connections array for the current closing Socket
        //Use that index to find the user in the users array
        //This should be the same because they are both added in the same order

        users.splice(connections.indexOf(ws), 1);
        connections.splice(connections.indexOf(ws), 1);

        connections.forEach(function (connection, index) {

            connection.send(JSON.stringify(msg));
            console.log("Message Sent to Client");

        });
    })
})

console.log("WebSocket Server is up");