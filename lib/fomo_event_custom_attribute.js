/**
 * Copyright (c) 2017. Fomo. https://www.usefomo.com
 **/

/*jslint node: true */
'use strict';
/**
 * Fomo event custom attribute
 * @param key {string} Custom attribute key
 * @param value {string} Custom attribute value
 * @constructor
 */
function FomoEventCustomAttribute(key, value) {

    /**
     * Attribute ID (needed only for the update)
     * @type {string}
     */
    this.id = '';

    /**
     * Custom attribute key
     * @type {string}
     */
    this.key = key;

    /**
     * Custom attribute value
     * @type {string}
     */
    this.value = value;
}

module.exports = FomoEventCustomAttribute;