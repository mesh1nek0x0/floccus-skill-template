'use strict';

const queryString = require('query-string');

module.exports = class SlackHelper {
    static parseSlashCommnadsRequestEvent(event) {
        try {
            const param = queryString.parse(event.body);
            const order = param.text.split(' ');
            return {
                intent: order.shift(),
                arg: order,
            };
        } catch (error) {
            console.log(error);
            throw new Error('parse error');
        }
    }
};
