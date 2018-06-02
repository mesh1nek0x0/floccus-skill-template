'use strict';

module.exports.handler = async (event, context, callback) => {
    let acceptIntent = 'unkown';
    if (event.intent === 'hi') {
        acceptIntent = 'hi';
        console.log('hello!');
    }

    if (event.intent === 'bye') {
        acceptIntent = 'bye';
        console.log('good bye!');
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Go Serverless v1.0! Your function executed successfully!',
            intent: acceptIntent,
        }),
    };
    if (event.result === 'failure') {
        return callback(new Error('failure sample'));
    }
    callback(null, response);
    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
