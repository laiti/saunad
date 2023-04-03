import Log from "../util/log";
import { MessageConfig, Times } from "../types/config";

export default class Message {
  log: Log;
  constructor(log: Log, private config: MessageConfig) {
    this.log = log;
  }
    
  async form(results: Times): Promise<string> {
    let message = "";
    const limits = Object.keys(this.config.timeLimits);
    for (const timeLimit in limits) {
      this.log.debug(`timelimits: ${JSON.stringify(this.config.timeLimits)}`);
      this.log.debug(`keys: ${JSON.stringify(Object.keys(this.config.timeLimits))}`);
      this.log.debug(`results: ${JSON.stringify(results)}`);
      this.log.debug(`timeli: ${JSON.stringify(timeLimit)}`);
      this.log.debug(`timelil: ${JSON.stringify(results[timeLimit])}`);
      if (results[limits[timeLimit]].length > 0) {
        message += this.config.timeLimits[timeLimit][0];
        message += ":\n"
        message += results[timeLimit].toString();
        this.log.debug(JSON.stringify(message));
      }
    }
    return message;
  }
}