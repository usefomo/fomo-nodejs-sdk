Fomo-NodeJS-SDK
================

*Fomo NodeJS SDK* is the official SDK wrapper for the [Fomo API service](https://www.usefomo.com)

API docs: [http://docs.usefomo.com/reference](http://docs.usefomo.com/reference)

Requirements
------------

- NodeJS 0.10+

User Installation
-----------------

    npm install fomo-nodejs-sdk
    
Initialize Fomo client via:

    var Fomo = require('fomo-nodejs-sdk');
    var client = Fomo.FomoClient('<token>');

To create a new event:

    var basicEvent = new Fomo.FomoEventBasic();
    basicEvent.event_type_id = '4';
    basicEvent.title = 'Test event';
    basicEvent.first_name = 'Ryan';
    basicEvent.city = 'San Francisco';
    basicEvent.url = 'https://www.usefomo.com';
    client.createEvent(basicEvent, function (savedEvent) {
        console.log(savedEvent);
    });
    
To get an event:

    client.getEvent('<id>', function (event) {
        console.log(event);
    });

To get all events:

    client.getEvents(function(events) {
        console.log(events);
    });
    
To delete an event:

    client.deleteEvent("<id>", function(response) {
        console.log(response);
    });
    
To update event:

    client.getEvent('<id>', function (event) {
        console.log(event);
        event.first_name = 'John';
        client.updateEvent(event, function(updatedEvent) {
            console.log(updatedEvent);
        });
    });

If you have questions, email us at [hello@usefomo.com](mailto:hello@usefomo.com).
