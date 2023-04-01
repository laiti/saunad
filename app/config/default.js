const configuration = {
  telegram: {
    chatId: '',
    apiKey: '',
    apiUrl: 'https://api.telegram.org/bot',
    timeout: 10,
    maxAttempts: 3,
    sendOptions: { disableWebPagePreview: true, disableNotification: true },
  },
  aws: {
    region: 'eu-west-1',
  },
  dynamoDB: {
    tableName: '',
    apiVersion: '2012-08-10',
  },
  mongo: {
    user: '',
    password: '',
    database: '',
  },

  // If dynamic  is set, it overrides the static times
  times: {
    staticWeekday: ['13:34', '13:37', '14:27'],
    staticWeekend: ['13:37', '14:17', '15:27', '16:17'],
    dynamic: false,
    playTime: ['10:00', '20:00'],
    announceTime: '09:30',
    timeWindow: 1, // how many minutes there is playtime each time
    days: {
      '24.12.': [2, 'merry christmas'],
    },
    randomDays: {
      '1:100': [0, 'bad luck'],
    },
  },
  // Give bonus point for each bonusPerSec seconds that occur
  // between the /monkku command and end of last time in case
  // there were no other players
  // monniBonus: give one bonus if monkku was played during the last N seconds
  score: {
    betMultiplier: 2,
    bonusPerSec: 10,
    monniBonus: [1, 1],
  },

  monkku: {
    commandPrefix: '/monkku',
    bossi: 'bossi',
    monni: 'monni',
    team: 'team',
  },

  messages: {
    totalPot: 'Money in pot',
    players: 'Players',
    noPlayers: 'No players today',
    retry: 'API returned empty array, retrying soon',
  },

  logLevel: 'info',
};

module.exports = configuration;
