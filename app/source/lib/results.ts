import { SaunaData } from "../types/saunad";
import Log from "../util/log";
import { Times } from '../types/config';
import { time } from "console";

export default class Results {
  log: Log;
  constructor(log: Log, private timeLimits: Times) {
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
      
      // To avoid catching a prvious session
      if (startTime > endTime) {
        results[1000].push(user);
        continue;
      }
      const timeIn = saunaData[user].start!.getTime() - saunaData[user].end!.getTime();
      this.log.debug(`timeIn: ${timeIn.toString()}`)

      const timeInMin = Math.round(timeIn / (1000 * 60));

      // Find the biggest time limit the result exceeds
      let biggestLimit = 0;
      Object.keys(this.timeLimits).forEach(timeLimitStr => {
        const timeLimit = Number(timeLimitStr);
        if (timeInMin > timeLimit && timeLimit > biggestLimit) {
          biggestLimit = timeLimit;
        }
      });
      results[biggestLimit].push(`${user} (${timeInMin.toString()} min)`);
    }
    return results;
  }
}
