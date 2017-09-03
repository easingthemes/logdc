'use strict';
const util = require('util');

const config = {
    colors: {
        reset:   0,
        red:     31,
        green:   32,
        yellow:  33,
        blue:    34,
        white:   37,
        grey:    90,
        black:   30,
        magenta: 35,
        cyan:    36
    },
    labels: {
        log:     'white',
        info:    'white',
        warn:    'yellow',
        error:   'red',
        start:   'blue',
        success: 'green',
        br:      'white'
    },
    standard:    ['log', 'info', 'warn', 'error'],
    separator:   ':::::::::::::::::::::::::::::::::::::::::::::::::::::::::'
};

const helpers = {
    /**
     * Get list of parameters to log
     * @param {boolean} noDate
     * @param {number} counter
     * @param {string} label
     * @param {number|boolean} labelLength
     * @param {string} color
     * @param {*} data - input data
     * @return {Array}
     */
    getParams(noDate, counter, label, labelLength, color, data) {
        const hasColor = counter && counter > 0,
            hasLabel = label && label.length > 0 && labelLength > 0,
            list = [];

        let formatLabel,
            labelLine = hasLabel ? this.formatLabel(label, labelLength) : '';

        if (label === 'br') {
            labelLine = config.separator;
        }
        // Add time
        if (!noDate) {
            list.push(this.dateNow());
        }
        // Add label
        if (labelLine !== '') {
            formatLabel = hasColor ? this.setColor(color, labelLine) : labelLine;
            list.push(formatLabel);
        }
        // Add data
        if (hasColor) {
            list.push(this.setColor(color, data.slice(0, counter - 1)));
            list.push(this.prettify(data.slice(counter - 1), true));
        } else {
            list.push(this.prettify(data, true));
        }

        return list;
    },
    /**
     * Format label
     * @param {string} label
     * @param {number|boolean} labelLength
     * @return {string}
     */
    formatLabel(label, labelLength) {
        if (!label || label.length === 0) {
            return '';
        }

        const formattedLabel = label.toUpperCase();

        if (!labelLength || labelLength === 1) {
            return `${formattedLabel} :`;
        }

        const spaces = ` `.repeat(labelLength - formattedLabel.length);
        return `${formattedLabel}${spaces} :`;
    },
    /**
     * Format date string
     * @return {string}
     */
    dateNow() {
        const now = new Date(),
            fullTime = (time) => {
                return (time < 10 ? '0' : '') + time;
            };

        const dateNow = [
            fullTime(now.getHours()),
            fullTime(now.getMinutes()),
            fullTime(now.getSeconds())
        ].join(':');

        return `[${this.setColor('grey', dateNow)}]`
    },
    /**
     * Set color to data
     * @param {string} color
     * @param {*} data
     * @return {string}
     */
    setColor(color, data) {
        const colors = this.getColors(config.colors),
            colorKey = color && color.length > 0 ? color : 'white';

        return `${colors[colorKey]}${this.prettify(data)}${colors.reset}`;
    },
    /**
     * Get color codes
     * @param {Object} colorsConfig
     * @return {Object}
     */
    getColors(colorsConfig) {
        const colors = {};

        Object.keys(colorsConfig).forEach(color => {
            colors[color] = `\u001b[${colorsConfig[color]}m`;
        });

        return colors;
    },
    /**
     * Show all data as string
     * @param {*} data
     * @return {string}
     */
    prettify(data) {
        if (
            !data ||
            (Array.isArray(data) && data.length === 0) ||
            (typeof data === 'string' && data.length === 0)
        ) {
            return '';
        }

        if (
            typeof data === 'string' ||
            typeof data === 'number'
        ) {
            return data;
        }

        return data.map(item => {
            return util.inspect(item, {
                depth: null
            });
        }).join(', ');
    }
};

/**
 *
 * @param {object|boolean} configLabels
 * @param {number} counter
 * @param {boolean} isEqualLength
 * @param {boolean} noDate
 * @return {Object}
 */
const createLogs = (configLabels, counter, isEqualLength, noDate) => {

    const log = {},
        logLabels =  Object.assign(config.labels, configLabels);
    let labelLength = 0;

    if (configLabels) {

        Object.keys(logLabels).forEach(label => {
            labelLength = label.length > labelLength ? label.length : labelLength;
        });

        if (!isEqualLength) {
            labelLength = 1;
        }
    }

    Object.keys(logLabels).forEach(label => {
        const type = config.standard.indexOf(label) > -1 ? label : 'log';

        log[label] = (...data) => console[type](...helpers.getParams(
            noDate,
            counter,
            label,
            labelLength,
            logLabels[label],
            data
        ));
    });

    return log;
};

const logdc = (config = {}, isEqualLength = true, noDate, counter = 1) => createLogs(config, counter, isEqualLength, noDate);

module.exports = logdc;
