import Log from "../util/log";
import { MessageConfig, Times } from "../types/config";

export default class Message {
  log: Log;
  constructor(log: Log, private config: MessageConfig) {
    this.log = log;
  }
    
  async form(results: Times, attempts: number): Promise<string> {
    let resultMsg = "";
    let message = "";
    const limits = Object.keys(this.config.timeLimits);
    for (const timeLimit in limits) {
      this.log.debug(`timelimits: ${JSON.stringify(this.config.timeLimits)}`);
      this.log.debug(`keys: ${JSON.stringify(Object.keys(this.config.timeLimits))}`);
      this.log.debug(`results: ${JSON.stringify(results)}`);
      this.log.debug(`timeli: ${JSON.stringify(timeLimit)}`);
      this.log.debug(`timelil: ${JSON.stringify(results[timeLimit])}`);
      if (results[limits[timeLimit]].length > 0) {
        resultMsg += this.config.timeLimits[limits[timeLimit]][0];
        resultMsg += ":\n"
        resultMsg += results[limits[timeLimit]].toString();
        this.log.debug(JSON.stringify(resultMsg));
      }
    }
    if (resultMsg === "") {
      return resultMsg;
    }
    message = this.config.header;
    message += '\n\n';
    message += resultMsg;
    message += `\n\n${this.config.apiPrefix}${this.config.apiRetries[attempts]}`;
    message += `\n\n${this.config.hashTag}`;
    return message;
  }
}