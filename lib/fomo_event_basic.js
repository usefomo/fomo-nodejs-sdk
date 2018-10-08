/**
 * Copyright (c) 2018. Fomo. https://fomo.com
 **/

/*jslint node: true */
'use strict';
var FomoEventCustomAttribute = require('./fomo_event_custom_attribute');

/**
 * Fomo event
 * @constructor
 */
function FomoEventBasic() {
    /**
     * Event type unique ID (optional|required if event_type_tag = '')
     * @type {string}
     */
    this.event_type_id = '';

    /**
     * Event type tag (optional|required if event_type_id = '')
     * @type {string}
     */
    this.event_type_tag = '';

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
     * Email address of the person on the event. Size range: 0..255
     * @type {string}
     */
    this.email_address = '';

    /**
     * IP address of the person on the event. Size range: 0..255
     * @type {string}
     */
    this.ip_address = '';

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
FomoEventBasic.prototype.addCustomEventField = function (key, value) {
    this.custom_event_fields_attributes.push(new FomoEventCustomAttribute(key, value));
};

module.exports = FomoEventBasic;
