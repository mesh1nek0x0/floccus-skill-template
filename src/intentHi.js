'use strict';
const SlackHelper = require('./lib/slackHelper');

module.exports.handler = async (event, context, callback) => {
    console.log('intent hi will be started');

    // implement your code
    try {
        await SlackHelper.postMessage('hi intent response', event.responseUrl);
    } catch (error) {
        console.log(error);
        // lambdaが再実行はしないように成功扱いで終了する
        return callback(null, 'end with failure');
    }
    console.log('intent hi will be ended');
    callback(null, 'end with successfully');
};
