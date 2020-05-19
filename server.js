// dependecies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var port = 8080;
var players = {};

// instancing
var app = express();
var server = http.Server(app);
var io = socketIO(server);
app.set('port', port);

//
app.use('/public', express.static(__dirname + "/public"));

server.listen(port, function() {
    console.log("im listening");
});

app.get("/", function (requrest, response) {
    response.sendFile(path.join(__dirname, "landing.html"));
});

io.on('connection', function (socket) {
    console.log("Someone has connected");
    players[socket.id] = {
        player_id: socket.id,
        x: 500,
        y: 500
    };

    socket.emit('actualPlayers', players);

    socket.broadcast.emit('new_player', players[socket.id]);

    // when player moves sends data to others
    socket.on('player_moved', function(movement_data) {
        players[socket.id].x = movement_data.x;
        players[socket.id].y = movement_data.y;
        players[socket.id].angle = movement_data.angle;

        // send to all players data of movement
        socket.broadcast.emit('enemy_moved', players[socket.id]);
    });

    socket.on('new_bullet', function(bullet_data) {
        socket.emit('new_bullet', bullet_data);
        socket.broadcast.emit('new_bullet', bullet_data);
    });

    socket.on('disconnect', function () {
        console.log("a someone has disconnected");
        delete players[socket.id];
    
        socket.broadcast.emit('player_disconnect', socket.id);
    });
});

