var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.set('PORT', process.env.PORT | 1729);

app.use('/static', express.static(__dirname + '/public'));

server.listen(app.get('PORT'));
console.log('server listening on port %s', app.get('PORT'));

io.sockets.on('connection', function(socket){
    console.log('socket %s connected', socket.id);
});

var interval = setInterval(function(){
    io.sockets.emit('message', { 'content': 'Mary had a little lamb' });
},5000);
