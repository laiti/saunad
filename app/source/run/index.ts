import Telegram from '../lib/api';
import TelegramParser from '../lib/parser';
import Configurator from '../util/configurator';
import Log from '../util/log';

// Load config and logger
const config = Configurator.collect();
const log = new Log(config.logLevel);

const parser = new TelegramParser(log, config.saunad);
const telegram = new Telegram(config);
// Get updates
const updateData = await telegram.getUpdatesWithRetry();
// Parse updates
const saunaData = parser.getSaunaers(updateData.updates);
// Return result
