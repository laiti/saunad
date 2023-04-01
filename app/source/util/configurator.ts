import config from 'config';
import { LogLevel } from './log';

import {
  Config,
  TelegramConfig,
  MessageConfig,
  SaunadConfig
} from '../types/config';

export default class Configurator {
  static async collect(): Promise<Config> {
    const telegramConfig: TelegramConfig = config.get('telegram');
    const saunadConfig: SaunadConfig = config.get('saunad');
    const messageConfig: MessageConfig = config.get('messages');
    const logLevel: LogLevel = config.get('logLevel');

    return {
      telegram: telegramConfig,
      saunad: saunadConfig,
      messages: messageConfig,
      logLevel: logLevel,
    };
  }
}
