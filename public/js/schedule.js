(function(io){
    var doNothing = function(){};

    var Observable = function(){
	this.observers = [];
    };
    Observable.prototype.notify = function(){
	this.observers.forEach(function(callback){
	    callback.call(this, this);
	});
    };
    Observable.prototype.addListener = function(callback){
	this.observers.push(callback || doNothing );
    }

    var Schedule = function(){
	Observable.call(this);
	this.data = [];
    };
    Schedule.prototype = Object.create(Observable.prototype);
    Schedule.prototype.constructor = Schedule;
    Schedule.prototype.setData = function(data){
	this.data = data;
	this.notify();
    };
    Schedule.prototype.getData = function(data){
	return this.data;
    }

    var ScheduleView = function(parent, model) {
	this.parent = parent;
	this.model = model;
	this.model.addListener(this.update.bind(this));
	this.update();
    };
    ScheduleView.prototype.update = function(){
	var container = this.container();
	var element = document.createElement('span');
	element.innerHTML = 'Hello World';
	container.appendChild(element);

    };
    ScheduleView.prototype.container = function(){
	return this.parent;
    };

    var schedule = new Schedule();
    new ScheduleView(document.getElementById('schedule'), schedule);

    var socket = io.connect(window.location.origin);

    socket.on('schedule', function(data){
	schedule.setData(data);
    });

    schedule.addListener(function(){
	console.log(this.getData());
    }.bind(schedule));
})(io);
