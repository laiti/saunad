import { SaunaData } from "../types/saunad";
import Log from "../util/log";
import { Times } from '../types/config';

export default class Results {
  log: Log;
  constructor(log: Log, private timeLimits: Times) {
    this.log = log;
  }
  
  async calculate(saunaData: SaunaData, attempts: number): Promise<Times> {
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
        // No start data, wtf
        results[2000].push(user);
        continue;
      // No end data, still in sauna
      } else if (saunaData[user].end === undefined) {
        results[1000].push(user);
        continue;
      }

      // Undefined-checks above
      const timeIn = Math.abs(saunaData[user].start!.getTime() - saunaData[user].end!.getTime());
      const timeInMin = timeIn / (1000 * 60);

      // Find the biggest time limit the result exceeds
      let biggestLimit = 0;
      for (const timeLimitStr in Object.keys(this.timeLimits)) {
        const timeLimit = Number(timeLimitStr);
        if (timeInMin > timeLimit && timeLimit > biggestLimit) {
          biggestLimit = timeLimit;
        }
      }
      results[biggestLimit].push(user);
    }
    return results;
  }
}
