'use strict';

const intentSchema = require('../../greetingIntentSchema');
const sinon = require('sinon');
// Setting the aws-sdk object explicitly
// @see https://www.npmjs.com/package/aws-sdk-mock
const AWS_SDK = require('aws-sdk');
const AWS = require('aws-sdk-mock');

AWS.setSDKInstance(AWS_SDK);

describe('greetingIntentSchemaのテスト', () => {
    afterEach(() => {
        AWS.restore();
        sinon.restore();
    });

    describe('正常系のテスト', () => {
        const testCases = [{ intent: 'hi', expect: 'hi' }, { intent: 'bye', expect: 'bye' }];

        testCases.forEach(testCase => {
            it(`${testCase.intent}を指定すると${testCase.expect}と解釈されること`, async () => {
                const callback = sinon.stub();
                AWS.mock('Lambda', 'invoke', function(param, callback) {
                    callback(null, 'lambda invoke success');
                });
                await intentSchema.handler({ intent: testCase.intent }, {}, callback);

                expect(callback.callCount).toBe(1);
                expect(callback.args[0][0]).toBeNull();
                expect(callback.args[0][1].statusCode).toBe(200);
                const body = JSON.parse(callback.args[0][1].body);
                expect(body.message).toBe('Go Serverless v1.0! Your function executed successfully!');
                expect(body.intent).toBe(testCase.expect);
            });
        });
    });

    describe('異常系', () => {
        it('異常終了のテスト', async () => {
            const callback = sinon.stub();
            AWS.mock('Lambda', 'invoke', function(param, callback) {
                callback(new Error('failure sample'));
            });
            await intentSchema.handler({}, {}, callback);

            expect(callback.callCount).toBe(1);
            expect(callback.args[0][0]).not.toBeNull();
            expect(callback.args[0][0]).toEqual(new Error('failure sample'));
        });
    });
});
