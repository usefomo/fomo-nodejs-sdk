/**
 * Copyright (c) 2018. Fomo. https://fomo.com
 **/

/*jslint node: true */
'use strict';
var FomoMetaData = require('./fomo_meta_data');

/**
 * Fomo events with meta data
 * @constructor
 */
function FomoEventsWithMetaData() {

    /**
     * List of events
     * @type {FomoEvent[]}
     */
    this.events = [];

    /**
     * Meta data
     * @type {FomoMetaData}
     */
    this.meta = new FomoMetaData();
}

module.exports = FomoEventsWithMetaData;