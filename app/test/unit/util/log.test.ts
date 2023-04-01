import Log from '../../../source/util/log';

const logSpy = jest.spyOn(console, 'log').mockImplementation();
const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
const errorSpy = jest.spyOn(console, 'error').mockImplementation();

describe('Log', () => {
  beforeEach(() => {
    logSpy.mockClear();
    warnSpy.mockClear();
    errorSpy.mockClear();
  });

  test('log debug message', () => {
    const log = new Log('debug');
    log.debug('debug message');
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith('DEBUG: ', 'debug message');
  });
  test('log info message', () => {
    const log = new Log('info');
    log.info('info message');
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith('INFO: ', 'info message');
  });
  test('log warn message', () => {
    const log = new Log('warn');
    log.warn('warning message');
    expect(logSpy).toHaveBeenCalledTimes(0);
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(errorSpy).toHaveBeenCalledTimes(0);
    expect(warnSpy).toHaveBeenCalledWith('WARNING: ', 'warning message');
  });
  test('log error message', () => {
    const log = new Log('error');
    log.error('error message');
    expect(logSpy).toHaveBeenCalledTimes(0);
    expect(warnSpy).toHaveBeenCalledTimes(0);
    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(errorSpy).toHaveBeenCalledWith('ERROR: ', 'error message');
  });
  test('Attempt to log debug when loglevel is info', () => {
    const log = new Log('info');
    log.debug('debug level log message');
    expect(logSpy).toHaveBeenCalledTimes(0);
    expect(warnSpy).toHaveBeenCalledTimes(0);
    expect(errorSpy).toHaveBeenCalledTimes(0);
  });
  test('Attempt to log info when logLevel is warn', () => {
    const log = new Log('warn');
    log.info('info level log message');
    expect(logSpy).toHaveBeenCalledTimes(0);
    expect(warnSpy).toHaveBeenCalledTimes(0);
    expect(errorSpy).toHaveBeenCalledTimes(0);
  });
  test('Attempt to log warning when loglevel is error', () => {
    const log = new Log('error');
    log.warn('warning level log message');
    expect(logSpy).toHaveBeenCalledTimes(0);
    expect(warnSpy).toHaveBeenCalledTimes(0);
    expect(errorSpy).toHaveBeenCalledTimes(0);
  });
  test('log warning when loglevel is info', () => {
    // Constructor should fallback to info if no level is set
    const log = new Log();
    log.warn('warning level log message');
    expect(logSpy).toHaveBeenCalledTimes(0);
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith('WARNING: ', 'warning level log message');
    expect(errorSpy).toHaveBeenCalledTimes(0);
  });
  test('log error when loglevel is warn', () => {
    const log = new Log('warn');
    log.error('error level log message');
    expect(logSpy).toHaveBeenCalledTimes(0);
    expect(warnSpy).toHaveBeenCalledTimes(0);
    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(errorSpy).toHaveBeenCalledWith('ERROR: ', 'error level log message');
  });
  test('Attempt invalid log level', () => {
    expect(() => {
      new Log('monkku');
    }).toThrow('Log level "monkku" is invalid');
  });
});
