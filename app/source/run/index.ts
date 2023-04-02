import Results from '../lib/results';
import Telegram from '../lib/api';
import TelegramParser from '../lib/parser';
import Configurator from '../util/configurator';
import Log from '../util/log';
import Message from '../lib/message';

// Load config and logger
const config = Configurator.collect();
const log = new Log(config.logLevel);

const parser = new TelegramParser(log, config.saunad);
const telegram = new Telegram(config);
const results = new Results(log, config.messages.timeLimits );
const message = new Message(log, config.messages);
// Get updates
(async function() {
  const updateData = await telegram.getUpdatesWithRetry();
  // Parse updates
  const saunaData = await parser.getSaunaers(updateData.updates);
  // Calculate result array
  const result = await results.calculate(saunaData, updateData.attempts)
  // Form result message for Telegram
  const msg = await message.form(result);

  log.info(`updatedata result: ${JSON.stringify(updateData)}`);
  log.info(`saunadata result: ${JSON.stringify(saunaData)}`);
  log.info(`result: ${JSON.stringify(result)}`);
  log.info(`message: ${msg}`);
}());