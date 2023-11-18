import { Update } from 'messaging-api-telegram/dist/TelegramTypes';
import Parser from '../../../source/lib/parser';
import Log from '../../../source/util/log';
import { MultipleBotCmdMessages } from '../../data/updates';

const config = {
  time: 'time',
  startCommand: 'start',
  endCommand: 'end',
};

describe('Parser', () => {
  const log = new Log();
  const parser = new Parser(log, 'chatid', config);

  describe('constructor', () => {
    test('Create a new instance', () => {
      expect(parser).toBeInstanceOf(Parser);
    });
  });

  describe('getSaunaers', () => {
    test('Should return no sauna data if Telegram updates are too old', async () => {
      const saunaData = await parser.getSaunaers(MultipleBotCmdMessages.result);
      expect(saunaData).toStrictEqual({});
    });
    test('Should return correct sauna Data', async () => {
      const messages: Update[] = JSON.parse(JSON.stringify(MultipleBotCmdMessages.result));
      messages[0].message!.date = Date.now() - 3600;
      messages[1].message!.date = Date.now() - 3500;
      messages[2].message!.date = Date.now() - 3400;
      messages[3].message!.date = Date.now() - 3300;
      messages[4].message!.date = Date.now() - 3200;
      messages[5].message!.date = Date.now() - 3100;
      const saunaData = await parser.getSaunaers(messages);
      expect(saunaData).toStrictEqual({});
    });
  });
});
