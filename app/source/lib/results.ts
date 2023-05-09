import { SaunaData } from "../types/saunad";
import Log from "../util/log";
import { MessageConfig, Times } from '../types/config';

export default class Results {
  log: Log;
  constructor(log: Log, private messages: MessageConfig) {
    this.log = log;
  }
  
  async calculate(saunaData: SaunaData): Promise<Times> {
    const results: Times = {
      0:    [],
      60:   [],
      120:  [],
      240:  [],
      1000: [],
      2000: [],
    };

    // Loop through all users in data
    for (const user in saunaData) {
      if (saunaData[user].start === undefined) {
        // No start data
        results[2000].push(user);
        continue;

      // No end data, still in sauna
      } else if (saunaData[user].end === undefined) {
        results[1000].push(user);
        continue;
      }

      // Undefined-checks above
      const startTime = saunaData[user].start!.getTime();
      const endTime = saunaData[user].end!.getTime();
      
      // To avoid catching a previous session
      if (startTime > endTime) {
        results[1000].push(user);
        continue;
      }
      const timeIn = saunaData[user].end!.getTime() - saunaData[user].start!.getTime();
      this.log.debug(`timeIn: ${timeIn.toString()}`)

      const timeInMin = Math.round(timeIn / (1000 * 60));

      // Find the biggest time limit the result exceeds
      let biggestLimit = 0;
      Object.keys(this.messages.timeLimits).forEach(timeLimitStr => {
        const timeLimit = Number(timeLimitStr);
        if (timeInMin > timeLimit && timeLimit > biggestLimit) {
          biggestLimit = timeLimit;
        }
      });

      // If there was rounds info, add it too
      let roundInfo = "";
      if (saunaData[user].rounds !== undefined) {
        roundInfo = `${saunaData[user].rounds!.toString()} ${this.messages.rounds}, `;
      }

      results[biggestLimit].push(`${user}: ${roundInfo}${timeInMin.toString()} min`);
    }
    return results;
  }
}
