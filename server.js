var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var moment = require('moment');

var credentials = require('./credentials');

var ns = require('ns-api');
ns.username = credentials.username;
ns.password = credentials.password;

app.set('PORT', process.env.PORT | 1729);

app.use('/static', express.static(__dirname + '/public'));

server.listen(app.get('PORT'));
console.log('server listening on port %s', app.get('PORT'));

io.sockets.on('connection', function(socket){
    console.log('socket %s connected', socket.id);
});

var interval = setInterval(function(){
    ns.reisadvies({
	fromStation: 'Nijmegen',
	toStation: 'Elst',
	dateTime: moment().format('YYYY-MM-DDTHH:mm')
    }, function(error, data){
	if (!error) {
	    io.sockets.emit('schedule', data);
	}
    });
}, 10000);
