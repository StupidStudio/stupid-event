var Event = require('../../event');
var event = Event();
var calls = 0;

event.on('test', function(){
	// Remove me
	calls += 1;
});
event.on('test', function(){
	// Remove me also me
	calls += 1;
});
event.on('test', function(){
	// Remove me also me more
	calls += 1;
});

event.remove('test', function(){
	// Remove me also me
	calls += 1;
});
event.trigger('test');
console.log(calls);
