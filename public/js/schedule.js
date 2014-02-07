(function(io){
    var socket = io.connect(window.location.origin);

    socket.on('schedule', function(data){
	console.log(data);
    });
})(io);
