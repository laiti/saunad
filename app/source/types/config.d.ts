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
  startCommand: string;
  endCommand: string;
}

interface ApiRetries {
  [Key: number]: string,
}

export interface Times {
  [Key: number]: string[],
}

export interface MessageConfig {
  header: string,
  hashTag: string,
  apiPrefix: string,
  apiRetries: ApiRetries,
  timeLimits: Times,
}

export interface Config {
  telegram: TelegramConfig;
  saunad: SaunadConfig;
  messages: MessageConfig;
  logLevel: LogLevel;
}
