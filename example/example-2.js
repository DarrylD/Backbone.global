var OfficeMemo = _.extend({}, Backbone.Events);

var Camel = Backbone.View.extend({
    askDay: function(args) {
        OfficeMemo.trigger('askPerson/day', args);
    },
    findsOutDay: function() {
        OfficeMemo.trigger('humpday');
    },
    goOnline: function() {
        var socialNetworkStuff = {
            status: 'WOOT WOOT!!',
            name: 'Wilbur'
        };
        OfficeMemo.trigger('camel/online', socialNetworkStuff);
    }
});

var SomeView = Backbone.View.extend({
    globalEventBus: OfficeMemo, //speify the custom global event bus
    events: {
        "global askPerson/day": "askDay",
        "global humpday"      : "humpday",
        "global camel/online" : "camelOnline"
    },
    askDay: function(personName) {
        var person = personName.toUpperCase();
        console.log(person+'! '+person+'! '+person+'! '+person+' '+person+'! What day is it?');
    },
    camelOnline: function(eventData) {
        console.log(eventData)
    },
    humpday: function() {
        console.log('HUMP DAY!! WOOT WOOT!!');
    }
});

var someview = new SomeView();//start up the some random view
var wilbur = new Camel(); //talking camels kick ass

wilbur.askDay('mike'); //>> 'MIKE! MIKE! MIKE! MIKE MIKE! What day is it?'
wilbur.goOnline();     //>> {status: "WOOT WOOT!!", name: "Wilbur"}
wilbur.findsOutDay();  //>> 'HUMP DAY!! WOOT WOOT!!'