'use strict';

const slackHelper = require('../../../lib/slackHelper');

describe('slackHelperのtest', () => {
    describe('正常系のテスト', () => {
        it('Slash Commandsのリクエストであればパースできること', () => {
            const actual = slackHelper.parseSlashCommnadsRequestEvent({ body: 'text=hi hoge bar' });
            expect(actual.intent).toBe('hi');
            expect(actual.arg).toEqual(['hoge', 'bar']);
        });
    });

    describe('異常系のテスト', () => {
        it('Slash Commandsのリクエストでない場合、例外が返されること', () => {
            expect(() => {
                slackHelper.parseSlashCommnadsRequestEvent({ body: 'sss' });
            }).toThrowError('parse error');
        });
    });
});
