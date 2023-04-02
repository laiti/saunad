import { Update } from 'messaging-api-telegram/dist/TelegramTypes';
import { SaunadConfig } from '../types/config';
import { SaunaData, MessageData } from '../types/saunad';
import Log from '../util/log';
import TimeUtil from '../util/time';

export default class TelegramParser {
  log: Log;
  time: TimeUtil;
  constructor(log: Log, private config: SaunadConfig) {
    this.log = log;
    this.time = new TimeUtil();
  }

  private async parseUpdate(update: Update, cmdPrefix: string[]): Promise<MessageData> {
    // Check first that it is a message containing text and with command prefix
    if (!update.message?.text) {
      throw new Error(`update.message.text missing`);
    }
    if (!update.message.from?.username) {
      throw new Error('message.from or username is not defined');
    }
    if (!update.message.entities) {
      throw new Error('update.message.entities is missing');
    }
    let matchedPrefix = "";
    for(const prefix of cmdPrefix) {
        if (update.message.text.startsWith(prefix)) {
            matchedPrefix = prefix;
        }
    }
    if (matchedPrefix === "") {
      throw new Error('Unexpected command prefix');
    }
    // There might be multiple entities; if one of them has type bot_command, that's enough for us
    for (const entity of update.message.entities) {
      if (entity.type === 'bot_command') {
        return {
          text: update.message.text,
          date: update.message.date,
          username: update.message.from.username,
          command: matchedPrefix
        };
      }
    }
    throw new Error('update.message.entities does not contain bot_command as type');
  }

  async getSaunaers(updates: Update[]): Promise<SaunaData> {
    const saunaData: SaunaData = {};
    for (const update of updates) {
      let msgData: MessageData;

      // Check if the command is valid
      try {
        msgData = await this.parseUpdate(update, [this.config.startCommand, this.config.endCommand]);
      } catch (err) {
        // Errors from data are not fatal
        this.log.debug(`parser: ${err}`);
        continue;
      }

      // If there is no data yet, initialize it
      if (!(msgData.username in saunaData)) {
        saunaData[msgData.username] = { start: undefined, end: undefined };
      }

      const messageDate = new Date(msgData.date * 1000);
      // Check which command the data contains
      if (msgData.command === this.config.startCommand) {
        saunaData[msgData.username].start = messageDate;
        this.log.debug(`Sauna data updated: { ${msgData.username}: start: ${messageDate.toString()} }`);
      } else if (msgData.command === this.config.endCommand) {
        saunaData[msgData.username].end = messageDate;
        this.log.debug(`Sauna data updated: { ${msgData.username}: end: ${messageDate.toString()} }`);
      } else {
        this.log.info(`Unknown command ${msgData.command}`)
      }
      this.log.debug(`saunadata: ${JSON.stringify(saunaData)}`)
    }
    return saunaData;
  }
}
