'use strict';

const sinon = require('sinon');
const intent = require('../../intentHi');
const SlackHelper = require('../../lib/slackHelper');

describe('intentHiのテスト', () => {
    beforeEach(() => {
        sinon.restore();
    });

    describe('正常系のテスト', () => {
        it('正常終了すること', async () => {
            const callback = sinon.stub();
            sinon.stub(SlackHelper, 'postMessage').callsFake(() => {
                return Promise.resolve('success with stub');
            });
            await intent.handler({}, {}, callback);
            expect(callback.callCount).toBe(1);
            expect(callback.args[0][0]).toBeNull();
            expect(callback.args[0][1]).toBe('end with successfully');
        });
    });

    describe('異常系のテスト', () => {
        it('Slackへの通知が失敗してもLambdaは正常終了すること', async () => {
            const callback = sinon.stub();
            sinon.stub(SlackHelper, 'postMessage').callsFake(() => {
                return Promise.reject('failure with stub');
            });
            await intent.handler({}, {}, callback);
            expect(callback.callCount).toBe(1);
            expect(callback.args[0][0]).toBeNull();
            expect(callback.args[0][1]).toBe('end with failure');
        });
    });
});
