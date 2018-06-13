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
        const testCases = [
            { intent: 'hi', expect: `skill-${process.env.STAGE}-intentHi` },
            { intent: 'bye', expect: `skill-${process.env.STAGE}-intentBye` },
        ];

        testCases.forEach(testCase => {
            it(`${testCase.intent}を指定すると${testCase.expect}と解釈されること`, async () => {
                const callback = sinon.stub();
                AWS.mock('Lambda', 'invoke', function(param, callback) {
                    callback(null, 'lambda invoke success');
                });
                await intentSchema.handler({ body: `text=${testCase.intent}` }, {}, callback);

                expect(callback.callCount).toBe(1);
                expect(callback.args[0][0]).toBeNull();
                expect(callback.args[0][1].statusCode).toBe(200);
                const body = JSON.parse(callback.args[0][1].body);
                expect(body.message).toBe('Go Serverless v1.0! Your function executed successfully!');
                expect(body.intent).toBe(testCase.expect);
            });
        });

        it('受け取ったコマンドの引数をintentに引き継げること', async () => {
            AWS.mock('Lambda', 'invoke', (param, callback) => {
                // spyの仕込み方が不明
                expect(param).toEqual({
                    ClientContext: 'greetingIntentSchema',
                    FunctionName: `skill-${process.env.STAGE}-intentHi`,
                    InvocationType: 'Event',
                    Payload: JSON.stringify({ args: ['arg1', 'arg2'] }),
                });
                callback(null, 'lambda invoke success');
            });
            await intentSchema.handler({ body: 'text=hi arg1 arg2' }, {}, () => {});
        });

        it('受け取ったresponse_urlをintentに引き継げること', async () => {
            AWS.mock('Lambda', 'invoke', (param, callback) => {
                // spyの仕込み方が不明
                expect(param).toEqual({
                    ClientContext: 'greetingIntentSchema',
                    FunctionName: `skill-${process.env.STAGE}-intentHi`,
                    InvocationType: 'Event',
                    Payload: JSON.stringify({ args: [], responseUrl: 'https' }),
                });
                callback(null, 'lambda invoke success');
            });
            await intentSchema.handler({ body: 'text=hi&response_url=https' }, {}, () => {});
        });
    });

    describe('異常系', () => {
        it('lambda呼び出し失敗時に、エラーとして終了すること', async () => {
            const callback = sinon.stub();
            AWS.mock('Lambda', 'invoke', function(param, callback) {
                callback(new Error('failure sample'));
            });
            await intentSchema.handler({ body: 'text=hi' }, {}, callback);

            expect(callback.callCount).toBe(1);
            expect(callback.args[0][0]).not.toBeNull();
            expect(callback.args[0][0]).toEqual(new Error('failure sample'));
        });

        it('意図しないintent時にbad requestとなること', async () => {
            const callback = sinon.stub();
            AWS.mock('Lambda', 'invoke', function(param, callback) {
                callback(new Error('failure sample'));
            });
            await intentSchema.handler({ body: 'text=aaa' }, {}, callback);

            expect(callback.callCount).toBe(1);
            expect(callback.args[0][0]).toBeNull();
            expect(callback.args[0][1]).toEqual({
                body: 'bad request',
                statusCode: 400,
            });
        });

        it('token不一致時に、エラーとして終了すること', async () => {
            const callback = sinon.stub();
            await intentSchema.handler({ body: 'text=unkown&token=hoge' }, {}, callback);

            expect(callback.callCount).toBe(1);
            expect(callback.args[0][0]).toBeNull();
            expect(callback.args[0][1]).toEqual({
                statusCode: 400,
                body: 'bad request',
            });
        });
    });
});
