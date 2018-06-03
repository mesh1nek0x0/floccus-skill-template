'use strict';

const sinon = require('sinon');
const intent = require('../../intentHi');

describe('intentHiのテスト', () => {
    describe('正常系のテスト', () => {
        it('正常終了すること', async () => {
            const callback = sinon.stub();
            await intent.handler({}, {}, callback);
            expect(callback.callCount).toBe(1);
            expect(callback.args[0][0]).toBeNull();
            expect(callback.args[0][1]).toBe('end with successfully');
        });
    });
});
