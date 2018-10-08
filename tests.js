/**
 * Copyright (c) 2018. Fomo. https://fomo.com
 **/

/*jslint node: true */
'use strict';
var FomoClient = require('./lib/index');
var assert = require('assert');

var client = new FomoClient('<token>');

var basicEvent = client.FomoEventBasic();
basicEvent.event_type_tag = 'new_order';
basicEvent.title = 'Test event';
basicEvent.first_name = 'Dean';
basicEvent.city = 'San Francisco';
basicEvent.url = 'https://fomo.com';
// Add event custom attribute value
basicEvent.addCustomEventField('variable_name', 'value');

// get all events
client.getEvents(function (events) {
    console.log("Found events: " + events.length);
    assert.equal(events.length === 0, true);

    // create event
    client.createEvent(basicEvent, function (savedEvent) {
        assert.notEqual(savedEvent, null);
        console.log(savedEvent);
        assert.equal(savedEvent.custom_event_fields_attributes[0]['key'], 'variable_name');
        assert.equal(savedEvent.custom_event_fields_attributes[0]['value'], 'value');
        console.log(savedEvent);

        // try getting same event
        client.getEvent(savedEvent.id, function (receivedEvent) {
            assert.equal(receivedEvent.id, savedEvent.id);
            console.log(receivedEvent);

            // update event
            receivedEvent.first_name = 'John';
            client.updateEvent(receivedEvent, function (updatedEvent) {
                assert.equal(updatedEvent.id, receivedEvent.id);
                assert.notEqual(updatedEvent.first_name, savedEvent.first_name);
                assert.equal(updatedEvent.first_name, receivedEvent.first_name);
                console.log(updatedEvent);

                // create another event
                client.createEvent(basicEvent, function (secondEvent) {
                    assert.notEqual(secondEvent, null);
                    console.log(secondEvent);
                    assert.notEqual(secondEvent.id, savedEvent.id);

                    // wait database to update
                    setTimeout(function () {
                        // get all events
                        client.getEventsWithMeta(function (data) {
                            console.log(data);
                            assert.equal(data.meta.total_count === 2, true);
                            // get all events
                            client.getEvents(function (events) {
                                console.log("Found events: " + events.length);
                                assert.equal(events.length === 2, true);
                                // delete created events
                                client.deleteEvent(savedEvent.id, function (response) {
                                    assert.equal(response.message, "Event successfully deleted");
                                    client.deleteEvent(secondEvent.id, function (response) {
                                        assert.equal(response.message, "Event successfully deleted");
                                        client.getEvents(function (events) {
                                            assert.equal(events.length === 0, true);
                                        });
                                    });
                                });
                            });
                        });
                    }, 2000);
                });
            });
        });
    });
});
