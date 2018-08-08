'use strict';

const slackHelper = require('../../../lib/slackHelper');
const { IncomingWebhook } = require('@slack/client');
const sinon = require('sinon');

describe('slackHelperのtest', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('正常系のテスト', () => {
        it('Slash Commandsのリクエストであればパースできること', () => {
            // test時はSLACK_TOKENはundefinedなので送付しない
            const actual = slackHelper.parseSlashCommandsRequestEvent({ body: 'text=hi hoge bar&response_url=http' });
            expect(actual).toEqual({
                intent: 'hi',
                arg: ['hoge', 'bar'],
                responseUrl: 'http',
            });
        });

        it('responseUrlを使ってメッセージをsendできること', async () => {
            // 実際には通信しないようにする
            sinon.stub(IncomingWebhook.prototype, 'send').callsFake(() => {
                return { text: 'ok with stub' };
            });
            const result = await slackHelper.postMessage('slack helper', 'https://hooks.slack.com/services/xxxx');
            expect(result).toBe('ok with stub');
        });
    });

    describe('異常系のテスト', () => {
        it('Slash Commandsのリクエストでない場合、例外が返されること', () => {
            expect(() => {
                slackHelper.parseSlashCommandsRequestEvent({ token: null, body: 'sss' });
            }).toThrowError("Cannot read property 'split' of undefined");
        });

        it('送付されたtokenが不正の場合、bad requestのエラーが返されること', () => {
            expect(() => {
                slackHelper.parseSlashCommandsRequestEvent({ body: 'text=hi&token=invalid' });
            }).toThrowError('bad request');
        });

        it('Slackへのメッセージ送信に失敗した場合、例外が返されること', async () => {
            // 実際には通信しないようにする
            sinon.stub(IncomingWebhook.prototype, 'send').callsFake(() => {
                throw new Error('slack api error with stub');
            });

            // see: jest await async sample
            // https://facebook.github.io/jest/docs/en/tutorial-async.html
            expect.assertions(1);
            try {
                await slackHelper.postMessage('slack helper', 'https://hooks.slack.com/services/xxxx');
            } catch (error) {
                expect(error.message).toBe('post message failed');
            }
        });
    });
});
