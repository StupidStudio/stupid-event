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
		var events = event[key];

		/** If forcepush, add to callstack */
		if(opts.forceEvents){
			events.push(call);
			return;
		}

		/**
		 * @define {boolean} if the function is the same,
		 * boolean will be set to true
		 */
		var same = false;

		/**
		 * Loop through the events on key
		 * This is for comparing two anonymous
		 */
		for (var i = 0; i < events.length; i++) {
			/** If anonymous function is the same set boolean to true */
			if(call.toString() === events[i].toString()){
				same = true;
				/** override the current callback */
				events[i] = call;
				break;
			}
		};
		
		/** Push to call stack */
		if(!same) events.push(call);
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