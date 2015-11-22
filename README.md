# Stupid Event
A simple event system to be used in a browserify workflow.

## Usage

```js
var Event = require('stupid-event');
var event = Event();
event.on('key', function(param1, param2, ...){
	// Do someting
});
event.trigger('key', arg1, arg2, ...);
```

## Passing values as an array

if you pass values as an array (for the second parameter) the event system will apply the values to the callback: ``` event.apply(null, arrayValues); ```

```js
var arrayValues = ['arg1', ...];
event.on('key', function(param1, param2, ...){
	// Do someting
});
event.trigger('key', arrayValues);
```

so if you need to pass an array wrap it in an object:

```js
var arrayValues = ['arg1', ...];
event.on('key', function(param){
	var values = param.values // arrayValues
});
event.trigger('key', {values: arrayValues});
```