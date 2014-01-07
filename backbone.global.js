/**
 * Backbone Global Events
 * A simple way to listen to global triggers in Backbone.js applications.
 * Version 0.1.0
 *
 * https://github.com/DarrylD/Backbone.global
 */
(function(){

  //By default, Use the built-in Backbone global event bus
  Backbone.View.prototype.globalEventBus = Backbone;

  var originalDelegateEvents = Backbone.View.prototype.delegateEvents; //cache the original prototype to chain after new logic
  Backbone.View.prototype.delegateEvents = function(events) {
      // incase events comes from this.events opposed to the arg
      // _(this).result('events') grabs the propery when when its a function, involke and return
      // in our case we are looking for this.events
      if(!( events || ( events = _(this).result('events') ) ) )
          return;

      var seperatedEvents = _.pairs(events), //turn obj into an array of key/values
          that = this;

      _.each(seperatedEvents, function( event ){
        var isGlobal = event[0].split(' ')[0] === 'global', //check for global event
            channel = event[0].split(' ')[1], //example: "someStuff/todo"
             method = event[1];

        if(isGlobal){
          //do awesomeness here with mediator
          that.globalEventBus.on( channel, that[method], that );
        }
      });

      // chain the original method, it will ignore the global events natrually
      originalDelegateEvents.call(this, events);
  };
})()
