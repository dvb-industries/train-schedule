(function(io){
    var socket = io.connect(window.location.origin);

    socket.on('message', function(data){
	console.log(data);
    });
})(io);
