# Backbone.global

A simple way to listen to global triggers in Backbone.js applications.

## Usage

Include Backbone.global after having included Backbone.js:

```html
<script type="text/javascript" src="underscore.js"></script>
<script type="text/javascript" src="backbone.js"></script>
<script type="text/javascript" src="backbone.global.js"></script>
```

Create a view like so:

```javascript
var Camel = Backbone.View.extend({
    askDay: function(args) { 
        Backbone.trigger('askPerson/day', args);
    },
    findsOutDay: function() { 
        Backbone.trigger('humpday'); 
    },
    goOnline: function() {
        var socialNetworkStuff = {
            status: 'WOOT WOOT!!',
            name: 'Wilbur'
        };
        Backbone.trigger('camel/online', socialNetworkStuff);
    }
});
```

Typical view using initialize to set up subscribers (which will get pretty sloppy after a while) :

```javascript
var SomeView = Backbone.View.extend({
    events: {
        "click .button": "humpday",
     },
    initialize: function(){
        //awesome initialize stuff here
        //set up listeners
        Backbone.on("askPerson/day", this.askDay, this )
        Backbone.on("humpday", this.humpday, this )
        Backbone.on("camel/online", this.camelOnline, this )
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
```

A view using global events = amazing!! (well not that amazing but, it keeps shit more maintainable):

```javascript
var SomeView = Backbone.View.extend({
    events: {
        "click .button"       : "humpday", //typical click event
        "global askPerson/day": "askDay", //global event
        "global humpday"      : "humpday",
        "global camel/online" : "camelOnline"
    },
    initialize: function(){
        //awesome initialize stuff here
        //no need to set up listeners :)
    },
    askDay: function() {
        var person = arguments[0].toUpperCase();
        console.log(person+'! '+person+'! '+person+'! '+person+' '+person+'! What day is it?');
    },
    camelOnline: function() {
        console.log(arguments[0])
    },
    humpday: function() {
        console.log('HUMP DAY!! WOOT WOOT!!');
    }
});
```

Start up views:

```javascript
var someview = new SomeView();//start up the some random view
var wilbur = new Camel(); //talking camels kick ass

wilbur.askDay('mike'); //>> 'MIKE! MIKE! MIKE! MIKE MIKE! What day is it?'
wilbur.goOnline();     //>> {status: "WOOT WOOT!!", name: "Wilbur"}
wilbur.findsOutDay();  //>> 'HUMP DAY!! WOOT WOOT!!'
```

### What will happen if I don't use this plugin?
- unorganized "intern looking" code
- project failure
- job loss
- kitten death and its your fault :(

### Ok, I'm using the plugin, now what?
- super "omg-wtf-wow" organized code
- project gets done like 300% faster
- pay increase
- Wilbur shows up to your job every Wednesday
- you saved a kitten life, congrats! Go grab a beer!


Have fun!

## Acknowledgments

- [Maurice](https://github.com/morficus/): Harassing me to create this plugin;
- [Camel](http://www.youtube.com/watch?v=kWBhP0EQ1lA): Talking camels kick ass;

## Changelog

### 0.1.2 - February 11, 2013

- Added: custom mediator support [morficus](https://github.com/morficus/)
- Added: AMD support [fantactuka](https://github.com/fantactuka/)
- Fixed: view context issue [cthorne66](https://github.com/cthorne66/)

### 0.1.0 - prior to October 22, 2013

- Backbone.global: A simple way to listen to global triggers in Backbone.js applications.