# Stupid Event
A simple event system to be used in a browserify workflow.

Usage
-----
```js
var Event = require('stupid-event');
var event = Event();
event.on('key', function(param1, param2, ...){
	// Do someting
});
event.trigger('key', arg1, arg2, ...);
```