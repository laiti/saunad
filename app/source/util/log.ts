export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export default class Log {
  logLevels: { [key: string]: number } = {
    debug: 1,
    info: 2,
    warn: 3,
    error: 4,
  };

  level: number;

  constructor(level = 'info') {
    if (!this.logLevels[level]) {
      throw new Error(`Log level "${level}" is invalid`);
    }
    this.level = this.logLevels[level];
  }

  debug(msg: string): this {
    if (this.level <= this.logLevels.debug) {
      console.log('DEBUG: ', msg);
    }
    return this;
  }

  info(msg: string): this {
    if (this.level <= this.logLevels.info) {
      console.log('INFO: ', msg);
    }
    return this;
  }

  warn(msg: string): this {
    if (this.level <= this.logLevels.warn) {
      console.warn('WARNING: ', msg);
    }
    return this;
  }

  error(msg: string): this {
    console.error('ERROR: ', msg);
    return this;
  }
}
