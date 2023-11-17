import { Update } from 'messaging-api-telegram/dist/TelegramTypes';
import { Config } from '../types/config';
import { SaunaData, MessageData } from '../types/saunad';
import Log from '../util/log';
import TimeUtil from '../util/time';

/* Functions for parsing Telegram messages */

export default class TelegramParser {
  log: Log;
  time: TimeUtil;
  constructor(log: Log, private config: Config) {
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
    // There might be multiple entities; if one of them has type bot_command, that's enough for us. We also need to check that
    // message is in correct chat.
    for (const entity of update.message.entities) {
      if (entity.type === 'bot_command' && update.message.chat.id.toString() == this.config.telegram.chatId) {
        return {
          text: update.message.text,
          date: update.message.date,
          username: update.message.from.username,
          command: matchedPrefix
        };
      }
    }
    throw new Error('update.message.entities does not contain bot_command as type or chat ID did not match');
  }

  async getSaunaers(updates: Update[]): Promise<SaunaData> {
    const saunaData: SaunaData = {};
    for (const update of updates) {
      let msgData: MessageData;

      // Check if the command is valid
      try {
        msgData = await this.parseUpdate(update, [this.config.saunad.startCommand, this.config.saunad.endCommand]);
      } catch (err) {
        // Errors from data are not fatal
        this.log.debug(`parser: ${err}`);
        continue;
      }

      // pick the user who set the command
      let users = [msgData.username];

      const messageDate = new Date(msgData.date * 1000);

      // Check which command the data contains
      if (msgData.command === this.config.saunad.startCommand) {
        // Check if command parameter contains start timestamp (in format HH:MM) or other users (in format @user1 @user2)

        // Split command parameters from command
        const startStr = msgData.text.split(' ');

        this.log.debug(`Command parameters: ${startStr}`);

        // Parse all parameters set to command
        for (const paramRaw of startStr) {

          // Trim whitespaces around parameter
          const param = paramRaw.trim();

          // If parameter starts with /, it is a command and we skip it
          if (param.startsWith('/')) {
            this.log.debug(`Detected command itself: ${param}`);

            // If parameter starts with @, it is a user and we add it to users without @
          } else if (param.startsWith('@')) {
            const additionalUser = param.substring(1);
            this.log.debug(`Detected additional user '${additionalUser}' set by ${msgData.username}`);
            users.push(additionalUser);

          // HH:MM format is interpreted as time
          } else if (param.match(/^\d{1,2}:\d{1,2}$/)) {
            const time = param.split(':');
            const hours = parseInt(time[0]);
            const minutes = parseInt(time[1]);
            if (isNaN(hours) || isNaN(minutes)) {
              this.log.info(`Invalid time format '${param}'`);
            }
            messageDate.setHours(hours);
            messageDate.setMinutes(minutes);
            this.log.debug(`Detected set start time '${param}' by ${msgData.username}`);

          // Anything else won't be handled at all
          } else {
            this.log.info(`Invalid param '${param}' in start command '${msgData.text}', ignoring it.`);
          }
        }

        this.log.debug(`Users to be added: ${users.toString()}`);

        // Add all users to saunadata
        for (const user of users) {
          // If there is no data yet, initialize it
          if (!(user in saunaData)) {
            saunaData[user] = { start: undefined, end: undefined, rounds: undefined };
          }
          saunaData[user].start = messageDate;
          this.log.debug(`Sauna data updated: { ${user}: start: ${messageDate.toString()} }`);
        }

      } else if (msgData.command.startsWith(this.config.saunad.endCommand)) {
        saunaData[msgData.username].end = messageDate;

        // If command contained rounds info, we add it to data
        this.log.debug(`Command being handled: ${msgData.text}`);
        const roundsStr = msgData.text.split('@')[0].split(this.config.saunad.endCommand);
        const rounds = Math.round(parseInt(roundsStr[1]));
        this.log.debug(`Rounds found: ${rounds.toString()}`);
        if (!isNaN(rounds) && rounds > 0) {
          saunaData[msgData.username].rounds = rounds;
        }

        this.log.debug(`Sauna data updated: { ${msgData.username}: end: ${messageDate.toString()} }`);
      } else {
        this.log.info(`Unknown command ${msgData.command}`)
      }
    }
    return saunaData;
  }
}
