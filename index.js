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
        warning: 'yellow',
        error:   'red',
        start:   'blue',
        success: 'green',
        br:      'white'
    },
    standard:    ['log', 'info', 'warn', 'error'],
    labelLength: 10,
    separator:   ':::::::::::::::::::::::::::::::::::::::::::::::::::::::::'
};

const helpers = {
    getParams(noColor, counter, label, labelLength, color, data) {
        const colorize = data.slice(0, counter),
            plain = data.slice(counter);

        if (noColor) {
            return [
                this.dateNow(),
                this.formatLabel(label, labelLength),
                this.prettify(data, true)
            ];
        }

        return [
            this.dateNow(),
            this.setColor(color, this.formatLabel(label, labelLength)),
            this.setColor(color, colorize),
            this.prettify(plain, true)
        ];
    },

    formatLabel(label, labelLength) {
        if (label === 'br') {
            return config.separator;
        }

        const formattedLabel = `${label.toUpperCase()}: `;

        if (!labelLength) {
            return formattedLabel;
        }

        const spaces = ` `.repeat(labelLength - formattedLabel.length);

        return `${formattedLabel}${spaces}`;
    },

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

    getColors(colorsConfig) {
        const colors = {};

        Object.entries(colorsConfig).forEach(color => {
            colors[color[0]] = `\u001b[${color[1]}m`;
        });

        return colors;
    },

    setColor(color, data) {
        const colors = this.getColors(config.colors);

        return `${colors[color]}${this.prettify(data)}${colors.reset}`;
    },

    prettify(data, depth = null) {
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
                depth
            });
        }).join(', ');
    }
};

const createLogs = (configLabels, counter, isEqualLength, noColor) => {
    const log = {},
        logLabels =  Object.assign(config.labels, configLabels);
    let labelLength = config.labelLength;

    Object.keys(logLabels).forEach(label => {
        labelLength = label.length > labelLength ? label.length : labelLength;
    });

    if (!isEqualLength) {
        labelLength = false;
    }

    Object.entries(logLabels).forEach(label => {
        const type = config.standard.indexOf(label[0]) > -1 ? label[0] : 'log';

        log[label[0]] = (...data) => console[type](...helpers.getParams(noColor, counter, label[0], labelLength, label[1], data));
    });

    return log;
};

module.exports = (config = {}, counter = 1, isEqualLength = true, noColor) => createLogs(config, counter, isEqualLength, noColor);
