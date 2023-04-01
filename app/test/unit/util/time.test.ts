import TimeUtil from '../../../../source/lib/util/time';

describe('Time', () => {
  const time = new TimeUtil();
  const minDate = new Date(2001, 0, 1, 22, 44, 34);
  const maxDate = new Date();

  describe('constructor', () => {
    test('Create a new instance', () => {
      expect(time).toBeInstanceOf(TimeUtil);
    });

    describe('randomDate', () => {
      test('Generate random date', async () => {
        const randDate = await time.randomDate(minDate, maxDate);
        expect(randDate).toBeInstanceOf(Date);
        expect(randDate.getTime()).toBeGreaterThan(minDate.getTime());
        expect(randDate.getTime()).toBeLessThan(maxDate.getTime());
      });
      test('Throw error when minDate is after maxDate', async () => {
        const promise = time.randomDate(maxDate, minDate);
        expect(promise).rejects.toThrowError();
      });
    });

    describe('dateFromTime', () => {
      test('Get date out of timestamp', async () => {
        const expectedDate = new Date();
        expectedDate.setHours(13);
        expectedDate.setMinutes(37);
        expectedDate.setSeconds(0);
        expectedDate.setMilliseconds(0);
        const TSDate = await time.dateFromTime('13:37');
        expect(TSDate).toStrictEqual(expectedDate);
      });
    });
    describe('isDateBetween', () => {
      test('Date is between two given dates', async () => {
        const date = new Date('2020-12-30T14:59:18+00:00');
        const minDate = new Date('2020-12-29T14:59:18+10:00');
        const maxDate = new Date('2020-12-30T20:59:18+02:00');
        const result = await time.isDateBetween(date, minDate, maxDate);
        expect(result).toBeTruthy();
      });
      test('Date is less than minDate', async () => {
        const date = new Date('2020-12-25T23:08:22+02:00');
        const minDate = new Date('2020-12-25T23:09:00+02:00');
        const maxDate = new Date('2020-12-30T20:59:18+02:00');
        const result = await time.isDateBetween(date, minDate, maxDate);
        expect(result).toBeFalsy();
      });
      test('Date is more than maxDate', async () => {
        const date = new Date('2020-12-31T05:59:13-20:00');
        const minDate = new Date('2020-12-30T14:59:18+00:00');
        const maxDate = new Date('2020-12-30T20:59:18+02:00');
        const result = await time.isDateBetween(date, minDate, maxDate);
        expect(result).toBeFalsy();
      });
      test('Date is more than maxDate with UNIX timestamps', async () => {
        const date = new Date(1608930502000);
        const minDate = new Date(1608930540000);
        const maxDate = new Date(1608990240000);
        const result = await time.isDateBetween(date, minDate, maxDate);
        expect(result).toBeFalsy();
      });
    });
  });
});
