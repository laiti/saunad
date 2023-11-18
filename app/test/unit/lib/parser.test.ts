import { Update } from 'messaging-api-telegram/dist/TelegramTypes';
import Parser from '../../../source/lib/parser';
import Log from '../../../source/util/log';
import { MultipleBotCmdMessages } from '../../data/updates';

const config = {
  time: 'time',
  startCommand: '/saunoihin',
  endCommand: '/saunad',
};

describe('Parser', () => {
  const log = new Log();
  const parser = new Parser(log, '-434691860', config);

  describe('constructor', () => {
    test('Create a new instance', () => {
      expect(parser).toBeInstanceOf(Parser);
    });
  });

  describe('getSaunaers', () => {
    /*
    test('Should return no sauna data if Telegram updates are too old', async () => {
      const saunaData = await parser.getSaunaers(MultipleBotCmdMessages.result);
      expect(saunaData).toStrictEqual({});
    });
    */
    test('Should return correct sauna Data', async () => {
      const timestamp = Math.floor(Date.now() / 1000);
      const messages: Update[] = JSON.parse(JSON.stringify(MultipleBotCmdMessages.result));
      messages[0].message!.date = timestamp - 3600;
      messages[1].message!.date = timestamp - 3000;
      messages[2].message!.date = timestamp - 2500;
      messages[3].message!.date = timestamp - 1500;
      messages[4].message!.date = timestamp - 1000;
      messages[5].message!.date = timestamp - 100;
      const expectedResult = {
        bonni_moi: {
          rounds: undefined,

          start: new Date(messages[3].message!.date * 1000),
        },
        muumilaakso: {
          end: new Date(messages[5].message!.date * 1000),
          rounds: 51,
          start: new Date(messages[2].message!.date * 1000),
        },
        nasserume: {
          end: new Date(messages[5].message!.date * 1000),
          rounds: 51,
          start: new Date(messages[2].message!.date * 1000),
        },
        viperface: {
          end: new Date(messages[5].message!.date * 1000),
          rounds: 51,
          start: new Date(messages[4].message!.date * 1000),
        },
      };
      const saunaData = await parser.getSaunaers(messages);
      expect(saunaData).toStrictEqual(expectedResult);
    });
  });
});
