(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @fileoverview Simple event system.
 * @author david@stupid-studio.com (David Adalberth Andersen)
 */

/**
 * Event
 * @constructor
 */
function Event(opts){
	/**
	 * @define {object} Collection of public methods.
	 */
	var self = {};

	/**
	 * @define {object} options for the constructor 
	 */
	var opts = opts || {};

	/**
	 * @define {object} collection the event names as
	 * an identifyer for later calls
	 */
	var event = {};

	/**
	 * @define {object} collection of precalled events
	 */
	var queue = {};

	/**
	 * On method for collection the event calls
	 * @example event.on('custom-event', function(){ //do something });
	 * @param {string} key A string identifyer
	 * @param {function} call A callback for the identifyer
	 * @config {object} event[key] Set object[key] to array if not set
	 */
	function on(key, call){
		if(!event[key]) event[key] = [];

		/** add event */
		addEvent(key, call);
		
		/** if the event has been triggered before created, then trigger it now */
		if(queue[key]) call.apply(null, queue[key]);
	}

	/**
	 * Remove event from collection
	 * @example event.remove('custom-event', function)
	 * @param {string} key A string identifyer
	 * @param {function} call A callback for the identifyer	
	 * @config {object} event[key] If event[key] doesn't exist return.
	 */
	function remove(key, call){
		var events = event[key];
		if(!events) return;

		/** Remove call from event */
		var index = events.indexOf(call);
        if (index != -1) events.splice(index, 1);

        /** Check for anonymous function */
        for (var i = 0; i < events.length; i++) {
			if(call.toString() === events[i].toString()){
				events.splice(i, 1);
				break;
			}
		};
	}

	/**
	 * Add event to events and override if it is the same
	 * @param {string} key A string identifyer
	 * @param {function} call A callback for the identifyer
	 */
	function addEvent(key, call){
		/**
		 * @define {boolean} if the function is the same,
		 * boolean will be set to true
		 */
		var same = false;
		/**
		 * Loop through the events on key
		 * This is for comparing two anonymous
		 */

		var events = event[key];
		for (var i = 0; i < events.length; i++) {
			/** If anonymous function is the same set boolean to true */
			if(call.toString() === events[i].toString()){
				same = true;
				/** override the current callback */
				events[i] = call;
				break;
			}
		};
		/** If the functions isnt the same, push to call stack */
		if(opts.forcePush || !same) events.push(call);
	}

	/**
	 * Trigger the event
	 * @example event.trigger(key, params)
	 * @param {string} key The key for event objet
	 */
	function trigger(key){
		var events = event[key];
		/**
		 * @define {array} takes the arguments and removes the first param
		 */
		var args = Array.prototype.slice.call(arguments).slice(1);

		/** If first argument is an array, pass it as argument */
		if(arguments.length === 2 && arguments[1].constructor == Array) args = arguments[1];
		
		if(events){
			/** Trigger the events by the current key */
			for (var i = 0; i < events.length; i++) {
				events[i].apply(null, args);
			};
		}else{
			/**
			 * If the trigger method is call before any key is added
			 * save the key and params for to be called later
			 */
			queue[key] = args;
		}
	}

	/**
	 * Public methods
	 * @public {function}
	 */
	self.on = on;
	self.remove = remove;
	self.trigger = trigger;

	/**
	 * @return {object} return public methods
	 */
	return self;
}

/** @export */
module.exports = Event;
},{}],2:[function(require,module,exports){
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

},{"../../event":1}]},{},[2]);
