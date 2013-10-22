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

Create another view with global events:

```javascript
var SomeView = Backbone.View.extend({
    events: {
        "global askPerson/day": "askDay",
        "global humpday"      : "humpday",
        "global camel/online" : "camelOnline"
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

Have fun!

## Acknowledgments

- [Maurice](https://github.com/morficus/): Harassing me to create this plugin;
