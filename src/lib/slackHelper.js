'use strict';

const queryString = require('query-string');

module.exports = class SlackHelper {
    static parseSlashCommnadsRequestEvent(event) {
        try {
            const param = queryString.parse(event.body);
            if (param.token !== process.env.SLACK_TOKEN) {
                throw new Error('bad request');
            }
            const order = param.text.split(' ');
            return {
                intent: order.shift(),
                arg: order,
            };
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }
};
