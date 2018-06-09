'use strict';

const AWS = require('aws-sdk');
const querystring = require('query-string');

module.exports.handler = async (event, context, callback) => {
    console.log('lambda will started');
    const parameter = querystring.parse(event['body']);

    if (parameter.token !== process.env.SLACK_TOKEN) {
        return callback(null, {
            statusCode: 400,
            body: 'bad request',
        });
    }
    const order = parameter.text.split(' ');
    const intent = order.shift();
    const lambda = new AWS.Lambda();
    const params = {
        FunctionName: '',
        ClientContext: 'greetingIntentSchema',
        InvocationType: 'Event',
        Payload: JSON.stringify({ hoge: 'hogera', bar: 'boo' }),
    };
    let acceptIntent = 'unkown';
    if (intent === 'hi') {
        params.FunctionName = `skill-${process.env.STAGE}-intentHi`;
        acceptIntent = 'hi';
        console.log('hello!');
    }

    if (intent === 'bye') {
        acceptIntent = 'bye';
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
