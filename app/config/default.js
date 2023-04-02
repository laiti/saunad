const configuration = {
  telegram: {
    chatId: '',
    apiKey: '',
    apiUrl: 'https://api.telegram.org/bot',
    timeout: 10,
    maxAttempts: 5,
    sendOptions: { disableWebPagePreview: true, disableNotification: true },
  },

  saunad: {
    time: '23:00',
    startCommand: '/saunoihin',
    endCommand: '/saunad'
  },

  messages: {
    apiRetries: {
      1: 'rynkyti',
      2: 'rynkyti pam',
      3: 'rynkyti pam pam',
      4: 'rynkyti rynkyti pam pam',
      5: 'rynkyti rynkyti pam pam pam',
    },
    timeLimits: {
      0:    ['PETTURIT'],
      60:   ['MAINEHAITTAA'],
      120:  ['EI MAINEHAITTAA'],
      240:  ['SAUNATIMO AWARD OF HONNOURS 🏆'],
      1000: ['RIBS'],
      2000: ['WTF']
    }
  },

  logLevel: 'info'
};

module.exports = configuration;
