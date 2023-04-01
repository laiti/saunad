export const configuration = {
    telegram: {
      chatId: '',
      apiKey: '',
      apiUrl: 'https://unittest.example/bot',
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
        1: 'test 1',
        2: 'test 2',
        3: 'test 3',
        4: 'test 4',
        5: 'test 5',
      }
    },
  
    logLevel: 'info',
  };
  
  module.exports = configuration;