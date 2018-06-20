'use strict';

const queryString = require('query-string');
const { IncomingWebhook } = require('@slack/client');

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
                responseUrl: param.response_url,
            };
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    static async postMessage(message, responseUrl) {
        const webhook = new IncomingWebhook(responseUrl);
        try {
            const result = await webhook.send(message);
            return result.text;
        } catch (error) {
            throw new Error('post message failed');
        }
    }
};
