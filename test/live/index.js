var Event = require('../../event');
var event = Event();

var event = Event();
	var arg1 = 'arg one';
	var arg2 = {text: 'arg two'};
	var arg3 = ['arg one'];
	var args = [arg1, arg2, arg3]
	event.on('event-string', function(param1, param2, param3){
		console.log(param1, arg1);
		console.log(param2, arg2);
		console.log(param3, arg3);
	});
	event.trigger('event-string', args);
	event.trigger('event-string', arg1, arg2, arg3);
