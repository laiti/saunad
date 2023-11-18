import { Update } from 'messaging-api-telegram/dist/TelegramTypes';
import { SaunadConfig } from '../types/config';
import { SaunaData, MessageData, CommandData } from '../types/saunad';
import Log from '../util/log';
import TimeUtil from '../util/time';

/* Functions for parsing Telegram messages */

export default class TelegramParser {
  log: Log;
  time: TimeUtil;
  constructor(log: Log, private chatId: string, private config: SaunadConfig) {
    this.log = log;
    this.time = new TimeUtil();
  }

  // Functionality to validate a message
  private async parseUpdate(update: Update): Promise<MessageData> {
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

    // There might be multiple entities; if one of them has type bot_command, that's enough for us. We also need to check that
    // message is in correct chat.
    let errormsg = 'does not contain bot_command as type';
    for (const entity of update.message.entities) {
      if (entity.type === 'bot_command') {
        errormsg = 'chat ID did not match';
        if (update.message.chat.id.toString() == this.chatId) {
          return {
            text: update.message.text,
            date: update.message.date,
            username: update.message.from.username,
          };
        }
      }
    }
    throw new Error(`update.message.entities ${errormsg}`);
  }

  // Parse standard object from command line parameters
  private async parseCommand(msgData: MessageData): Promise<CommandData> {
    // pick the user who set the command
    let commandData: CommandData = {
      start: true,
      users: [msgData.username],
      date: new Date(msgData.date * 1000),
    };

    this.log.debug(`Command being handled: ${msgData.text}`);
    if (msgData.text.toLowerCase().startsWith(this.config.startCommand)) {
      commandData.start = true;
    } else if (msgData.text.toLowerCase().startsWith(this.config.endCommand)) {
      commandData.start = false;
    } else {
      throw new Error(`Unknown command: ${msgData.text}`);
    }

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
        commandData.users.push(additionalUser);

        // HH:MM format is interpreted as time
      } else if (param.match(/^\d{1,2}:\d{1,2}$/)) {
        const time = param.split(':');
        const hours = parseInt(time[0]);
        const minutes = parseInt(time[1]);
        if (isNaN(hours) || isNaN(minutes)) {
          this.log.info(`Invalid time format '${param}'`);
        }
        commandData.date.setHours(hours);
        commandData.date.setMinutes(minutes);
        this.log.debug(`Detected set start time '${param}' by ${msgData.username}`);

        // Parameter with one or two numbers is considered as rounds
      } else if (param.match(/^\d{1,2}$/)) {
        commandData.rounds = Math.round(parseInt(param));
        this.log.debug(`Rounds found: ${commandData.rounds.toString()}`);

        // Anything else won't be handled at all
      } else {
        this.log.info(`Invalid param '${param}' in start command '${msgData.text}', ignoring it.`);
      }
    }
    return commandData;
  }

  async getSaunaers(updates: Update[]): Promise<SaunaData> {
    const saunaData: SaunaData = {};
    for (const update of updates) {
      let msgData: MessageData;
      let commandData: CommandData;

      // Check if the command is valid
      try {
        msgData = await this.parseUpdate(update);
        commandData = await this.parseCommand(msgData);
      } catch (err) {
        // Errors from data are not fatal
        this.log.debug(`parseUpdate: ${err}`);
        continue;
      }

      this.log.debug(`Users to be added: ${commandData.users.toString()}`);

      // Add all users to saunadata
      for (const user of commandData.users) {
        // If there is no data yet, initialize it
        if (!(user in saunaData)) {
          saunaData[user] = {};
        }
        // Determine whether the date in the command is a start or end date
        if (commandData.start) {
          saunaData[user].start = commandData.date;
          this.log.debug(`Sauna data updated: { ${user}: start: ${commandData.date.toString()} }`);
        } else {
          saunaData[user].end = commandData.date;
          this.log.debug(
            `Sauna data updated: { ${msgData.username}: end: ${commandData.date.toString()} }`,
          );
        }
        saunaData[user].rounds = commandData.rounds;
      }
    }
    return saunaData;
  }
}
