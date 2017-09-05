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
        log:     {
            color: 'white',
            text: 'log'
        },
        info:    {
            color: 'white',
            text: 'info'
        },
        warn:    {
            color: 'yellow',
            text: 'warning'
        },
        error:   {
            color: 'red',
            text: 'error'
        },
        start:   {
            color: 'blue',
            text: 'start'
        },
        success: {
            color: 'green',
            text: 'success'
        },
        br:      {
            color: 'white',
            text: ':'
        }
    },
    standard:    ['log', 'info', 'warn', 'error']
};

const helpers = {
    /**
     * Get list of parameters to log
     * @param {boolean} showTime
     * @param {number} counter
     * @param {string} label
     * @param {number|boolean} labelLength
     * @param {string} color
     * @param {*} data - input data
     * @return {Array}
     */
    getParams(key, label, labelLength, color, showTime, counter, data) {
        const hasColor = counter && counter > 0,
            hasLabel = label && label.length > 0 && labelLength > 0,
            list = [];

        let formatLabel,
            labelLine = hasLabel ? this.formatLabel(label, labelLength) : '';

        if (key === 'br') {
            labelLine = label.repeat(80);
        }
        // Add time
        if (showTime) {
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
            list.push(this.prettify(data.slice(counter - 1)));
        } else {
            list.push(this.prettify(data));
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
 * @return {Object}
 */
const getConfig = () => {
    let configJson;
    try {
        const { logdcConfig } = require('../package.json');
        configJson = logdcConfig || {};
    } catch (err) {
        configJson = {};
    }

    const { labels = {}, time = true, equal = true, counter = 2} = configJson;

    let labelsLength = 0,
        logLabels = config.labels;

    if (labels) {
            logLabels =  Object.assign({}, config.labels, labels);

            const textLength = Object.keys(logLabels).map(key => {
                const { text = '' } = logLabels[key];
                return text.length;
            });

        labelsLength = equal ? Math.max(...textLength) : 1;
    }

    return {
        logLabels,
        labelsLength,
        time,
        counter
    };
};
/**
 *
 * @return {Object}
 */
const logdc = () => {
    const { logLabels, labelsLength, time, counter } = getConfig(),
        log = {};

    Object.keys(logLabels).forEach(key => {
        const type = config.standard.indexOf(key) > -1 ? key : 'log',
            defaultLabel = config.labels[key] || {},
            { text = defaultLabel.text || '' , color = defaultLabel.color || 'white' } = logLabels[key];

        log[key] = (...data) => console[type](...helpers.getParams(
            key,
            text,
            labelsLength,
            color,
            time,
            counter,
            data
        ));
    });

    return log;
};

module.exports = logdc();
