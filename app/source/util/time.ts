export default class TimeUtil {
  async randomDate(minDate: Date, maxDate: Date): Promise<Date> {
    const minTime = minDate.getTime();
    const maxTime = maxDate.getTime();
    if (minTime > maxTime) {
      throw new Error('minDate is after MaxDate');
    }
    const randDate = new Date(minTime + Math.random() * (maxTime - minTime));
    return randDate;
  }

  async dateFromTime(timeStamp: string): Promise<Date> {
    const hoursMinutes = timeStamp.split(':');
    const resultDate = new Date();
    resultDate.setHours(parseInt(hoursMinutes[0]));
    resultDate.setMinutes(parseInt(hoursMinutes[1]));
    resultDate.setSeconds(0);
    resultDate.setMilliseconds(0);
    return resultDate;
  }

  async isDateBetween(date: Date, minDate: Date, maxDate: Date): Promise<boolean> {
    const time = date.getTime();
    if (time < minDate.getTime() || time > maxDate.getTime()) {
      return false;
    }
    return true;
  }
}
