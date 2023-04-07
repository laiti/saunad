import Log from "../util/log";
import { MessageConfig, Times } from "../types/config";

export default class Message {
  log: Log;
  constructor(log: Log, private config: MessageConfig) {
    this.log = log;
  }
    
  async form(results: Times, attempts: number): Promise<string> {
    let resultMsg = "";
    Object.keys(this.config.timeLimits).forEach(timeLimitStr => {
      if (results[timeLimitStr].length > 0) {
        resultMsg += this.config.timeLimits[timeLimitStr][0];
        resultMsg += "\n"
        resultMsg += results[timeLimitStr].toString();
      }
    });
    if (resultMsg === "") {
      return resultMsg;
    }
    // Todays date
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    let message = this.config.header;
    message += ` ${dd}.${mm}.${yyyy}`;
    message += '\n\n';
    message += resultMsg;
    message += `\n\n\n${this.config.apiPrefix}${this.config.apiRetries[attempts]}`;
    message += `\n${this.config.hashTag}`;
    return message;
  }
}