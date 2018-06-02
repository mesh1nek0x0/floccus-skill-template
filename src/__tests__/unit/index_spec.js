'use strict';

const index = require('../../index');
const sinon = require('sinon');

describe('indexのテスト', () => {
    describe('正常系', () => {
        it('正常終了のテスト', async () => {
            const callback = sinon.stub();
            await index.handler({}, {}, callback);

            expect(callback.callCount).toBe(1);
            expect(callback.args[0][0]).toBeNull();
            expect(callback.args[0][1].statusCode).toBe(200);
            expect(JSON.parse(callback.args[0][1].body).message).toBe(
                'Go Serverless v1.0! Your function executed successfully!'
            );
        });
    });

    describe('異常系', () => {
        it('異常終了のテスト', async () => {
            const callback = sinon.stub();
            await index.handler({ result: 'failure' }, {}, callback);

            expect(callback.callCount).toBe(1);
            expect(callback.args[0][0]).not.toBeNull();
            expect(callback.args[0][0]).toEqual(new Error('failure sample'));
        });
    });
});
