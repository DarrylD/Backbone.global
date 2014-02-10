/**
 * Backbone Global Events
 * A simple way to listen to global triggers in Backbone.js applications.
 * Version 0.1.2
 *
 * https://github.com/DarrylD/Backbone.global
 */

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define(['backbone', 'underscore'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('backbone'), require('underscore'));
  } else {
    factory(window.Backbone, window._);
  }
})(function(Backbone, _) {

  var ViewProto = Backbone.View.prototype;

  ViewProto.globalEventBus = Backbone;

  ViewProto.delegateEvents = _.wrap(ViewProto.delegateEvents, function(original, events) {
    if (!(events || (events = _.result(this, 'events')))) {
      return this;
    }

    _.each(events, function(handler, event) {
      var match = event.match(/^global\s(.*)/);

      if (match) {
        var event = match[1],
          handler = this[handler];

        this.globalEventBus.on(event, handler, this);
        this.on('close', function() {
          this.globalEventBus.off(event, handler, this);
        }, this);
        
      }
    }, this);

    return original.call(this, events);
  });

});
