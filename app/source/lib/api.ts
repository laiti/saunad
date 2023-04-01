import { TelegramClient } from 'messaging-api-telegram';
import { Message, Update } from 'messaging-api-telegram/dist/TelegramTypes';
import Log from '../util/log';
import { Config } from '../types/config';


export default class Telegram {
  log: Log
  client: TelegramClient;
  constructor(private config: Config) {
    this.config = config;
    this.log = new Log(config.logLevel);
    this.client = new TelegramClient({ accessToken: config.telegram.apiKey });
  }

  // private function to get updates from API
  private async getUpdates(): Promise<Update[]> {
    return this.client.getUpdates({
      allowedUpdates: ['message'],
      limit: 100,
      timeout: this.config.telegram.timeout,
    });
  }

  private async sendMessage(message: string): Promise<Message> {
    return this.client.sendMessage(
      this.config.telegram.chatId,
      message,
      this.config.telegram.sendOptions,
    );
  }

  async getUpdatesWithRetry(): Promise<{ updates: Update[]; attempts: number; }> {
    this.log.info('Getting updates from chat');
    let updates: Update[] = [{ updateId: 1 }];
    let attempts = 0;
    // Request API until the response is not empty or we run out of attempts
    while (
      updates === undefined ||
      updates.length == 0 ||
      attempts >= this.config.telegram.maxAttempts
    ) {
      updates = await this.getUpdates();
      attempts++;
    }
    return { updates, attempts };
  }

  async send(message: string): Promise<boolean> {
    const resultMessage = this.sendMessage(message);
    // TODO: parse message
    return true;
  }
}

