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

    var FomoClient = require('fomo-nodejs-sdk');
    var client = new FomoClient('<token>');

To create a new event with template name:

    var basicEvent = client.FomoEventBasic();
    basicEvent.event_type_tag = 'new_order'; // Event type tag is found on Fomo dashboard (Templates -> Template name)
    basicEvent.title = 'Test event';
    basicEvent.first_name = 'Ryan';
    basicEvent.email_address = 'ryan.kulp@usefomo.com'; // used to fetch Gravatar for notification images
    basicEvent.city = 'San Francisco';
    basicEvent.url = 'https://www.usefomo.com';

    // Add event custom attribute value
    basicEvent.addCustomEventField('variable_name', 'value');

    client.createEvent(basicEvent, function (savedEvent) {
        console.log(savedEvent);
    });

or with template ID:

    var basicEvent = client.FomoEventBasic();
    basicEvent.event_type_id = '4'; // Event type ID is found on Fomo dashboard (Templates -> Template ID)
    basicEvent.title = 'Test event';
    basicEvent.first_name = 'Ryan';
    basicEvent.email_address = 'ryan.kulp@usefomo.com';
    basicEvent.city = 'San Francisco';
    basicEvent.url = 'https://www.usefomo.com';

    // Add event custom attribute value
    basicEvent.addCustomEventField('variable_name', 'value');

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

To get all events:

    client.getEventsWithMeta(function(data) {
        console.log(data.events);
        console.log(data.meta);
    }, 30 /* page size */, 1 /* page number */);

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
