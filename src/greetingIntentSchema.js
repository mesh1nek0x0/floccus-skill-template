'use strict';

const AWS = require('aws-sdk');
const SlackHelper = require('./lib/slackHelper');

module.exports.handler = async (event, context, callback) => {
    console.log('lambda will started');

    let intentLambdaName = '';
    try {
        const request = SlackHelper.parseSlashCommnadsRequestEvent(event);
        switch (request.intent) {
            case 'hi':
                intentLambdaName = `skill-${process.env.STAGE}-intentHi`;
                console.log('hello!');
                break;
            case 'bye':
                intentLambdaName = `skill-${process.env.STAGE}-intentBye`;
                console.log('good bye!');
                break;
            default:
                throw new Error('unkown intent');
        }
    } catch (error) {
        return callback(null, {
            statusCode: 400,
            body: 'bad request',
        });
    }

    const lambda = new AWS.Lambda();
    const params = {
        FunctionName: intentLambdaName,
        ClientContext: 'greetingIntentSchema',
        InvocationType: 'Event',
        Payload: JSON.stringify({ hoge: 'hogera', bar: 'boo' }),
    };

    await lambda
        .invoke(params)
        .promise()
        .then(function() {
            const response = {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Go Serverless v1.0! Your function executed successfully!',
                    intent: intentLambdaName,
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
