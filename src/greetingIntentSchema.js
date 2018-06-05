'use strict';

const AWS = require('aws-sdk');

module.exports.handler = async (event, context, callback) => {
    console.log('lambda will started');
    const lambda = new AWS.Lambda();
    const params = {
        FunctionName: '',
        ClientContext: 'greetingIntentSchema',
        InvocationType: 'Event',
        Payload: JSON.stringify({ hoge: 'hogera', bar: 'boo' }),
    };
    let acceptIntent = 'unkown';
    if (event.intent === 'hi') {
        params.FunctionName = 'intentHi';
        acceptIntent = 'hi';
        console.log('hello!');
    }

    if (event.intent === 'bye') {
        acceptIntent = 'bye';
        params.FunctionName = 'intentBye';
        console.log('good bye!');
    }

    await lambda
        .invoke(params)
        .promise()
        .then(function() {
            const response = {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Go Serverless v1.0! Your function executed successfully!',
                    intent: acceptIntent,
                }),
            };
            console.log('lambda will be ended with success');
            return callback(null, response);
        })
        .catch(function(error) {
            console.log('lambda will be ended with failure');
            return callback(error);
        });
};
