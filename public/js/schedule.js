(function(io){
    var ScheduleView = function(parent) {
	this.parent = parent;
	this.update();
    };
    ScheduleView.prototype.update = function(){
	var container = this.container();
	container.innerHTML = 'Hello World';

    };
    ScheduleView.prototype.container = function(){
	return this.parent;
    };

    new ScheduleView(document.getElementById('schedule'));

    var socket = io.connect(window.location.origin);

    socket.on('schedule', function(data){
	console.log(data);
    });
})(io);
