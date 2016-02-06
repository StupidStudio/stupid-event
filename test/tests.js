var test = require('tape');
var Event = require('../event');

test('Returns the same object', function (t) {
    t.plan(1);
	var event = Event();
	var name = 'im a stupid string';
	event.on('event-string', function(param){
		t.equal(param, name);
	});
	event.trigger('event-string', name);
});

test('Passing 1 argument', function (t) {
    t.plan(1);
    var event = Event();
	var arg1 = 'arg one';
	event.on('event-string', function(param1){
		t.equal(param1, arg1);
	});
	event.trigger('event-string', arg1);
});

test('Passing 1 argument as array', function (t) {
    t.plan(1);
    var event = Event();
	var arg1 = 'arg one';
	var arg = [arg1];
	event.on('event-string', function(param1){
		t.equal(param1, arg1);
	});
	event.trigger('event-string', arg);
});

test('Passing arguments', function (t) {
    t.plan(3);
    var event = Event();
	var arg1 = 'arg one';
	var arg2 = {text: 'arg two'};
	var arg3 = ['arg one'];
	event.on('event-string', function(param1, param2, param3){
		t.equal(param1, arg1);
		t.equal(param2, arg2);
		t.equal(param3, arg3);
	});
	event.trigger('event-string', arg1, arg2, arg3);
});


test('Passing array as only param and should convert to arguments', function (t) {
    t.plan(3);
    var event = Event();
	var arg1 = 'arg one';
	var arg2 = {text: 'arg two'};
	var arg3 = ['arg one'];
	var args = [arg1, arg2, arg3]
	event.on('event-string', function(param1, param2, param3){
		t.equal(param1, arg1);
		t.equal(param2, arg2);
		t.equal(param3, arg3);
	});
	event.trigger('event-string', args);
});


test('Anonymous functions should be overriden if they are "the same"', function (t) {
    t.plan(1);
    var event = Event();
    var calls = 0;
	event.on('event-string', function(){
		calls += 1;
	});
	event.on('event-string', function(){
		calls += 1;
	});
	event.on('event-string', function(){
		calls += 1;
	});
	event.on('event-string', function(){
		var test = "";
		calls += 1;
	});
	event.trigger('event-string');
	t.equal(calls, 2);
});

test('Anonymous functions should  NOT  be overriden if they are "the same"', function (t) {
    t.plan(1);
    var event = Event({forcePush:true});
    var calls = 0;
	event.on('event-string', function(){
		calls += 1;
	});
	event.on('event-string', function(){
		calls += 1;
	});
	event.on('event-string', function(){
		calls += 1;
	});
	event.trigger('event-string');
	t.equal(calls, 3);
});

test('Pre-triggered call should be queued and called later on event.on', function (t) {
    t.plan(2);
    var event = Event();
    var arg1 = "arg1";
    var arg2 = "arg2";
	event.trigger('event-string', arg1, arg2);
	event.on('event-string', function(param1, param2){
		t.equal(arg1, param1);
		t.equal(arg2, param2);
	});
});

test('Remove anonyous function', function (t) {
    t.plan(2);
    var event = Event();

    /** ADD */
    event.on('test', function(){
    	// Remove me
    	t.pass();
    });
    event.on('test', function(){
    	// Remove me also me
    	t.pass();
    });
    event.on('test', function(){
    	// Remove me also me more
    	t.pass();
    });

    /** REMOVE */
    event.remove('test', function(){
    	// Remove me also me
    	t.pass();
    });

    event.trigger('test');
});

test('Remove functions', function (t) {
    t.plan(2);
    var event = Event();

    /** ADD */
    event.on('test', test1);
    event.on('test', test2);
    event.on('test', test3);

    function test1(){
    	t.pass();
    }
    function test2(){
    	t.pass();
    }
    function test3(){
    	t.pass();
    }

    /** REMOVE */
    event.remove('test', test3);

    event.trigger('test');
});