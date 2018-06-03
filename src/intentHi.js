'use strict';

module.exports.handler = async (event, context, callback) => {
    console.log('intent hi will be started');

    // implement your code
    callback(null, 'end with successfully');
    console.log('intent hi will be ended');
};
