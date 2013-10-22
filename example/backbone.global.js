/**
 * Backbone Global Events
 * Version 0.1.0
 *
 * https://github.com/jeromegn/Backbone.localStorage
 */
(function(){
  var originalDelegateEvents = Backbone.View.prototype.delegateEvents; //cache the original prototype to chain after new logic
  Backbone.View.prototype.delegateEvents = function(events) {
      // incase events comes from this.events opposed to the arg
      // _(this).result('events') grabs the propery when when its a function, involke and return
      // in our case we are looking for this.events
      if(!( events || ( events = _(this).result('events') ) ) )
          return;

      var seperatedEvents = _.pairs(events) //turn obj into an array of key/values

      for (var i = 0; i < seperatedEvents.length; i++) {
        var isGlobal = seperatedEvents[i][0].split(' ')[0] === 'global' //check for global event
          , channel = seperatedEvents[i][0].split(' ')[1] //example: "someStuff/todo"
          , method = seperatedEvents[i][1]

        if(isGlobal){
          console.log("Avaiable channel: "+channel)
          //do awesomeness here with mediator
          Backbone.on( channel, this[method] );
        }
      };

      // chain the original method, it will ignore the global events natrually 
      originalDelegateEvents.call(this, events);
  };
})()


//mediator examples
/*
    BackboneMediator = _.extend({}, Backbone.Events); //create mediator

    BackboneMediator.on('some/channel', function () { //create sub
        console.log('channel ', arguments);
    });
    BackboneMediator.on('some/other', function () {
        console.log('other ', arguments);
    });
    BackboneMediator.trigger('some/other', 'Backbone rox when pubsubing!'); //create pub
    BackboneMediator.trigger('some/channel', 'I like CoffeeScript');
    BackboneMediator.trigger('some/other', '-__-');
    BackboneMediator.trigger('some/channel', {status:'WOOT WOOT!!', name:'Wilbur', dayOfWeek:'Wednesday'});
*/
