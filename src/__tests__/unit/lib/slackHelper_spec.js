'use strict';

const slackHelper = require('../../../lib/slackHelper');

describe('slackHelperのtest', () => {
    describe('正常系のテスト', () => {
        it('Slash Commandsのリクエストであればパースできること', () => {
            // test時はSLACK_TOKENはundefinedなので送付しない
            const actual = slackHelper.parseSlashCommnadsRequestEvent({ body: 'text=hi hoge bar&response_url=http' });
            expect(actual).toEqual({
                intent: 'hi',
                arg: ['hoge', 'bar'],
                responseUrl: 'http',
            });
        });
    });

    describe('異常系のテスト', () => {
        it('Slash Commandsのリクエストでない場合、例外が返されること', () => {
            expect(() => {
                slackHelper.parseSlashCommnadsRequestEvent({ token: null, body: 'sss' });
            }).toThrowError("Cannot read property 'split' of undefined");
        });

        it('送付されたtokenが不正の場合、bad requestのエラーが返されること', () => {
            expect(() => {
                slackHelper.parseSlashCommnadsRequestEvent({ body: 'text=hi&token=invalid' });
            }).toThrowError('bad request');
        });
    });
});
