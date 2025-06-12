import Log from '../util/log';
import type { MessageConfig, Times } from '../types/config';

/* Functionality to form a result message to be sent to Telegram */

export default class Message {
  log: Log;
  constructor(log: Log, private config: MessageConfig) {
    this.log = log;
  }

  async form(results: Times, attempts: number): Promise<string> {
    let resultMsg = '';
    Object.keys(this.config.timeLimits).forEach((timeLimitStr) => {
      this.log.debug(`handling: ${results[timeLimitStr]}`);
      if (results[timeLimitStr].length !== undefined && results[timeLimitStr].length > 0) {
        resultMsg += this.config.timeLimits[timeLimitStr][0];
        resultMsg += '\n';
        // Go through each result and add it to the message
        results[timeLimitStr].forEach((user: string[]) => {
          this.log.debug(`found user in ${timeLimitStr}: ${user}`);
          resultMsg += user.toString();
          resultMsg += '\n';
        });
        resultMsg += '\n';
      }
    });
    if (resultMsg === '') {
      return resultMsg;
    }
    // Todays date
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    let message = this.config.header;
    message += ` ${dd}.${mm}.${yyyy}`;
    message += '\n\n';
    message += resultMsg;
    message += `\n${this.config.apiPrefix}${this.config.apiRetries[attempts]}`;
    message += `\n${this.config.hashTag}`;
    return message;
  }
}
