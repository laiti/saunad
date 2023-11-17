import Results from '../lib/results';
import Telegram from '../lib/api';
import TelegramParser from '../lib/parser';
import Configurator from '../util/configurator';
import Log from '../util/log';
import Message from '../lib/message';

// Load config and logger
const config = Configurator.collect();
const log = new Log(config.logLevel);

const parser = new TelegramParser(log, config.telegram.chatId, config.saunad);
const telegram = new Telegram(config);
const results = new Results(log, config.messages);
const message = new Message(log, config.messages);

// Get updates
(async function () {
  const updateData = await telegram.getUpdatesWithRetry();
  log.debug(`updatedata result: ${JSON.stringify(updateData)}`);
  // Parse updates
  const saunaData = await parser.getSaunaers(updateData.updates);
  log.debug(`saunadata result: ${JSON.stringify(saunaData)}`);

  // Calculate result array
  const result = await results.calculate(saunaData);
  log.info(`result: ${JSON.stringify(result)}`);

  // Form result message for Telegram
  const msg = await message.form(result, updateData.attempts);

  // Send message to Telegram
  if (msg === '') {
    log.info('No sauna today.');
  } else {
    await telegram.send(msg);
  }
})();
