/**
 * Copyright (c) 2016. Fomo. https://www.usefomo.com
 **/

/*jslint node: true */
'use strict';
var FomoClient = require('./lib/fomo_client.js');
var FomoEventBasic = require('./lib/fomo_event_basic.js');
var assert = require('assert');

var client = new FomoClient('<token>');

var basicEvent = new FomoEventBasic();
basicEvent.event_type_id = '4';
basicEvent.title = 'Test event';
basicEvent.first_name = 'Dean';
basicEvent.city = 'San Francisco';
basicEvent.url = 'https://www.usefomo.com';

// get all events
client.getEvents(function (events) {
    console.log("Found events: " + events.length);
    assert.equal(events.length === 0, true);

    // create event
    client.createEvent(basicEvent, function (savedEvent) {
        assert.notEqual(savedEvent, null);
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
                    }, 2000);
                });
            });
        });
    });
});