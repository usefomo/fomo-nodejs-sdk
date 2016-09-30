/**
 * Copyright (c) 2016. Fomo. https://www.usefomo.com
 **/

/*jslint node: true */
'use strict';
/**
 * Fomo meta data
 * @constructor
 */
function FomoMetaData() {

    /**
     * Page size
     * @type {number}
     */
    this.per_page = 30;

    /**
     * Page number
     * @type {number}
     */
    this.page = 1;

    /**
     * Total count
     * @type {number}
     */
    this.total_count = 1;

    /**
     * Total pages
     * @type {number}
     */
    this.total_pages = 1;
}

module.exports = FomoMetaData;