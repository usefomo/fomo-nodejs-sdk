/**
 * Copyright (c) 2016. Fomo. https://www.usefomo.com
 **/

/*jslint node: true */
'use strict';
var FomoEventCustomAttribute = require('./fomo_event_custom_attribute');
/**
 * Fomo event
 * @constructor
 */
function FomoEvent() {

    /**
     * Id of the event type (needed only for the update)
     * @type {string}
     */
    this.id = '';

    /**
     * Created timestamp (received info)
     * @type {string}
     */
    this.created_at = '';

    /**
     * Updated timestamp (received info)
     * @type {string}
     */
    this.updated_at = '';

    /**
     * Message template (received info)
     * @type {string}
     */
    this.message = '';

    /**
     * Full link (received info)
     * @type {string}
     */
    this.link = '';

    /**
     * Event type unique ID (required)
     * @type {string}
     */
    this.event_type_id = '';

    /**
     * Url to redirect on the event click. Size range: 0..255 (required)
     * @type {string}
     */
    this.url = '';

    /**
     * First name of the person on the event. Size range: 0..255
     * @type {string}
     */
    this.first_name = '';

    /**
     * City where the event happened. Size range: 0..255
     * @type {string}
     */
    this.city = '';

    /**
     * Province where the event happened. Size range: 0..255
     * @type {string}
     */
    this.province = '';

    /**
     * Country where the event happened ISO-2 standard. Size range: 0..255
     * @type {string}
     */
    this.country = '';

    /**
     * Title of the event. Size range: 0..255
     * @type {string}
     */
    this.title = '';

    /**
     * Url of the image to be displayed. Size range: 0..255
     * @type {string}
     */
    this.image_url = '';

    /**
     * Array to create custom event fields
     * @type {FomoEventCustomAttribute[]}
     */
    this.custom_event_fields_attributes = [];
}

/**
 * Add custom attribute value
 * @param key {string} Custom attribute key
 * @param value {string} Custom attribute value
 */
FomoEvent.prototype.addCustomEventField = function (key, value) {
    this.custom_event_fields_attributes.push(new FomoEventCustomAttribute(key, value));
};

module.exports = FomoEvent;