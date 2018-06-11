'use strict';

const AWS = require('aws-sdk');
const SlackHelper = require('./lib/slackHelper');

module.exports.handler = async (event, context, callback) => {
    console.log('lambda will started');

    let intent = 'unkonwn';
    try {
        const request = SlackHelper.parseSlashCommnadsRequestEvent(event);
        intent = request.intent;
    } catch (error) {
        return callback(null, {
            statusCode: 400,
            body: 'bad request',
        });
    }

    const lambda = new AWS.Lambda();
    const params = {
        FunctionName: '',
        ClientContext: 'greetingIntentSchema',
        InvocationType: 'Event',
        Payload: JSON.stringify({ hoge: 'hogera', bar: 'boo' }),
    };

    if (intent === 'hi') {
        params.FunctionName = `skill-${process.env.STAGE}-intentHi`;
        console.log('hello!');
    }

    if (intent === 'bye') {
        params.FunctionName = `skill-${process.env.STAGE}-intentBye`;
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
                    intent: intent,
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
