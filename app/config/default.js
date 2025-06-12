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
    startCommand: '/tosauna',
    endCommand: '/fromsauna'
  },

  messages: {
    header: 'SAUNA AWARDS',
    hashTag: '#saunad',
    apiHeader: 'Telegram API was accessed: ',
    round: 'round',
    rounds: 'rounds',
    apiRetries: {
      1: 'once',
      2: 'twice',
      3: 'three times',
      4: 'four times',
      5: 'five times or more',
    },
    timeLimits: {
      0:    ['LESS THAN HOUR IN SAUNA 😡'],
      60:   ['MORE THAN HOUR IN SAUNA 😠'],
      120:  ['MORE THAN TWO HOURS IN SAUNA ☺️'],
      180:  ['MORE THAN THREE HOURS IN SAUNA 🏆'],
      1000: ['LOST IN SAUNA ⚰️'],
      2000: ['NEVER WENT TO SAUNA']
    }
  },

  logLevel: 'info'
};

module.exports = configuration;
