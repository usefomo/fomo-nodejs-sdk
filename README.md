Fomo-NodeJS-SDK
================

*Fomo NodeJS SDK* is the official SDK wrapper for the [Fomo API service](https://fomo.com)

API docs: [https://docs.fomo.com](https://docs.fomo.com)

Requirements
------------

- NodeJS 0.10+

User Installation
-----------------

```bash
$ npm install fomo-nodejs-sdk
```

Initialize Fomo client:

```javascript
var FomoClient = require('fomo-nodejs-sdk');
var client = new FomoClient('<token>');
```

Create a new event with template name:

```javascript
var basicEvent = client.FomoEventBasic();
basicEvent.event_type_tag = 'new_order'; // Event type tag is found on Fomo dashboard (Templates -> Template name)
basicEvent.title = 'Test event';
basicEvent.first_name = 'Ryan';
basicEvent.email_address = 'ryan.kulp@usefomo.com'; // used to fetch Gravatar for notification images
basicEvent.ip_address = '128.177.108.102'; // used to extract location parameters (city, province, country)
basicEvent.city = 'Atlanta';
basicEvent.url = 'https://www.usefomo.com';

// Add event custom attribute value
basicEvent.addCustomEventField('variable_name', 'value');

client.createEvent(basicEvent, function (savedEvent) {
  console.log(savedEvent);
});
```

or with template ID:

```javascript
var basicEvent = client.FomoEventBasic();
basicEvent.event_type_id = '4'; // Event type ID is found on Fomo dashboard (Templates -> Template ID)
basicEvent.title = 'Test event';
basicEvent.first_name = 'Ryan';
basicEvent.email_address = 'ryan.kulp@usefomo.com';
basicEvent.url = 'https://www.usefomo.com';

// Add event custom attribute value
basicEvent.addCustomEventField('variable_name', 'value');

client.createEvent(basicEvent, function (savedEvent) {
  console.log(savedEvent);
});
```

Fetch an event:

```javascript
client.getEvent('<id>', function (event) {
  console.log(event);
});
```

Get all events:

```javascript
client.getEvents(function(events) {
  console.log(events);
});
```

Get all events with meta:

```javascript
client.getEventsWithMeta(function(data) {
  console.log(data.events);
  console.log(data.meta);
}, 30 /* page size */, 1 /* page number */);
```

Delete an event:

```javascript
client.deleteEvent("<id>", function(response) {
  console.log(response);
});
```

Update an event:

```javascript
client.getEvent('<id>', function (event) {
  console.log(event);
  event.first_name = 'John';
  client.updateEvent(event, function(updatedEvent) {
      console.log(updatedEvent);
  });
});
```

If you have questions, email us at [hello@fomo.com](mailto:hello@fomo.com).
