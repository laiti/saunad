import { LogLevel } from '../util/log';

export interface TelegramConfig {
  chatId: string;
  apiKey: string;
  apiUrl: string;
  timeout: number;
  maxAttempts: number;
  sendOptions: Record<string, unknown>;
}

export interface SaunadConfig {
  time: string;
  startCommandPrefix: string;
  endCommandPrefix: string;
}

interface ApiRetries {
  1: string,
  2: string,
  3: string,
  4: string,
  5: string,
}

export interface MessageConfig {
  apiRetries: ApiRetries,
}

export interface Config {
  telegram: TelegramConfig;
  saunad: SaunadConfig;
  messages: MessageConfig;
  logLevel: LogLevel;
}
