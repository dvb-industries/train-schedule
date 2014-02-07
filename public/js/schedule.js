(function(io){
    var Nano = function(template){
	this.template = template;
    };
    Nano.prototype.format = function(data){
	return this.template.replace(/\{([\w\.]*)\}/g, function(str, key){
	    var keys = key.split('.');
	    var value = data[keys.shift()];
	    for (var index = 0, size = keys.length; index < size; index++) {
		value = value[keys[index]];
	    }
	    return (typeof value !== 'undefined' && value !== null)? value : '';
	});
    };

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
	this.formatter = new Nano(parent.innerHTML);
	this.parent = parent;
	this.model = model;
	this.model.addListener(this.update.bind(this));
	this.update();
    };
    ScheduleView.prototype.update = function(){
	var container = this.container();
	container.innerHTML = '';
	this.model.getData().forEach(this.append.bind(this));
    };
    ScheduleView.prototype.container = function(){
	return this.parent;
    };
    ScheduleView.prototype.append = function(departure){
	var container = this.container();
	var div = document.createElement('div');
	div.setAttribute('class', 'departure');
	div.innerHTML = this.formatter.format(departure);
	container.appendChild(div);

    }

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
