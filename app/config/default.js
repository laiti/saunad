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
    startCommandPrefix: '/saunoihin',
    endCommandPrefix: '/saunad'
  },

  messages: {
    apiRetries: {
      1: 'rynkyti',
      2: 'rynkyti pam',
      3: 'rynkyti pam pam',
      4: 'rynkyti rynkyti pam pam',
      5: 'rynkyti rynkyti pam pam pam',
    }
  },

  logLevel: 'info',
};

module.exports = configuration;
