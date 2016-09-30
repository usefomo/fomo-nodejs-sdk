/**
 * Copyright (c) 2016. Fomo. https://www.usefomo.com
 **/

/*jslint node: true */
'use strict';
var https = require('https');
var FomoEventBasic = require('./fomo_event_basic');

/**
 * Create Fomo client
 * @param {string} authToken Auth Token
 * @constructor
 * @class
 */
function FomoClient(authToken) {
    this.authToken = authToken;
}

FomoClient.prototype = (function () {
    /**
     * Make authorized request to Fomo API
     * @param endpoint {string} API endpoint
     * @param path {string} API path
     * @param method {string} HTTP Method
     * @param authToken {string} Auth token
     * @param callback {callback} Response callback
     * @param data {object} Object to send, object is JSON serialized before it is sent
     * @param version {string} SDK version
     * @return {object} Data received from API response
     */
    function makeRequest(endpoint, path, method, authToken, callback, data, version) {
        var req, payload, options, headers = {};

        if (data !== undefined) {
            headers['Content-Type'] = 'application/json';
        }

        /*jshint validthis: true */
        headers.Authorization = 'Token ' + authToken;
        headers['User-Agent'] = 'Fomo/NodeJS/' + version;

        if (data !== undefined) {
            payload = JSON.stringify(data);
            headers['Content-Length'] = Buffer.byteLength(payload);
        }

        options = {
            host: endpoint,
            port: '443',
            path: path,
            method: method,
            headers: headers
        };

        req = https.request(options, function (res) {
            var response = '';
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                response += chunk;
            });
            res.on('end', function () {
                callback(JSON.parse(response), null);
            });
            res.on('error', function (err) {
                callback(JSON.parse(response), err);
            });
        });

        if (data !== undefined) {
            req.write(payload);
        }
        req.end();
    }

    return {
        version: '1.0.4',
        authToken: '',
        endpoint: 'www.usefomo.com',
        constructor: FomoClient,

        /**
         * Get event
         * @param {string} id Event ID
         * @param {FomoClient~EventCallback} callback Response callback
         */
        getEvent: function (id, callback) {
            makeRequest(this.endpoint, '/api/v1/applications/me/events/' + id, 'GET', this.authToken, callback, undefined, this.version);
        },

        /**
         * Called if Fetching URL is done.
         * @callback FomoClient~EventCallback
         * @param {FomoEvent} response Fomo event
         * @param {string} errorInfo Error info
         * @returns undefined
         */

        /**
         * Get events
         * @param {FomoClient~EventsCallback} callback Response callback
         * @param {number} size Page size, default = 30
         * @param {number} page Page number, default = 1
         */
        getEvents: function (callback, size, page) {
            size = typeof size !== 'undefined' ? size : 30;
            page = typeof page !== 'undefined' ? page : 1;

            makeRequest(this.endpoint, '/api/v1/applications/me/events?per=' + size + "&page=" + page, 'GET', this.authToken, callback, undefined, this.version);
        },

        /**
         * Called if Fetching URL is done.
         * @callback FomoClient~EventsCallback
         * @param {FomoEvent[]} response List of Fomo events
         * @param {string} errorInfo Error info
         * @returns undefined
         */

        /**
         * Get events with meta data
         * @param {FomoClient~EventsWithMetaDataCallback} callback Response callback
         * @param {number} size Page size, default = 30
         * @param {number} page Page number, default = 1
         */
        getEventsWithMeta: function (callback, size, page) {
            size = typeof size !== 'undefined' ? size : 30;
            page = typeof page !== 'undefined' ? page : 1;

            makeRequest(this.endpoint, '/api/v1/applications/me/events?per=' + size + "&page=" + page + "&show_meta=true", 'GET', this.authToken, callback, undefined, this.version);
        },

        /**
         * Called if Fetching URL is done.
         * @callback FomoClient~EventsWithMetaDataCallback
         * @param {FomoEventsWithMetaData} response List of Fomo events
         * @param {string} errorInfo Error info
         * @returns undefined
         */

        /**
         * Create event
         * @param {FomoEventBasic} event Fomo event
         * @param {FomoClient~EventCallback} callback Response callback
         */
        createEvent: function (event, callback) {
            makeRequest(this.endpoint, '/api/v1/applications/me/events', 'POST', this.authToken, callback, {'event': event}, this.version);
        },

        /**
         * Update event
         * @param {FomoEvent} event FomoEvent
         * @param {FomoClient~EventCallback} callback Response callback
         */
        updateEvent: function (event, callback) {
            makeRequest(this.endpoint, '/api/v1/applications/me/events/' + event.id, 'PATCH', this.authToken, callback, {'event': event}, this.version);
        },

        /**
         * Delete event
         * @param {string} id Event ID
         * @param {FomoClient~EventDeleteCallback} callback
         */
        deleteEvent: function (id, callback) {
            makeRequest(this.endpoint, '/api/v1/applications/me/events/' + id, 'DELETE', this.authToken, callback, undefined, this.version);
        },

        /**
         * Called if Fetching URL is done.
         * @callback FomoClient~EventDeleteCallback
         * @param {FomoDeleteMessageResponse} response List of Fomo events
         * @param {string} errorInfo Error info
         * @returns undefined
         */

        /**
         * Fomo Event Basic
         * @return {FomoEventBasic}
         * @constructor
         */
        FomoEventBasic: function () {
            return new FomoEventBasic();
        }
    };
})
();

module.exports = FomoClient;