var Event = require('../../event');
var event = Event();

var one = "the one string";
event.on('test', function(param){
	console.log(param, one, param == one);
});

event.trigger('test', one, "dfsd", "tesgds");
