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
  });
});
