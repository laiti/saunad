import Log from "../util/log";
import { MessageConfig, Times } from "../types/config";

export default class Message {
  log: Log;
  constructor(log: Log, private config: MessageConfig) {
    this.log = log;
  }
    
  async form(results: Times): Promise<string> {
    let message = "";
    for (const timeLimit in Object.keys(results)) {
      this.log.debug(JSON.stringify(this.config.timeLimits));
      this.log.debug(JSON.stringify(Object.keys(this.config.timeLimits)));
      this.log.debug(JSON.stringify(results));
      this.log.debug(JSON.stringify(timeLimit));
      this.log.debug(JSON.stringify(results[timeLimit]));
      if (results[timeLimit].length > 0) {
        message += this.config.timeLimits[timeLimit][0];
        message += results[timeLimit].toString();
      }
    }
    return message;
  }
}