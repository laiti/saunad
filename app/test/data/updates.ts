// Example responses from Telegram Bot API for testing

export const MessageResponse = {
  ok: true,
  result: {
    messageId: 4,
    from: { id: 1337, isBot: true, firstName: 'Sauna Bot', username: 'SaunaKlupiBot' },
    chat: {
      id: -1337,
      title: 'saunad',
      type: <const>'group',
      all_members_are_administrators: true,
    },
    date: 1608929895, // 2020-12-25T20:58:15+00:00
    text: 'SAUNA TEST',
  },
};

export const SingleBotCmdMessage = {
  ok: true,
  result: [
    {
      updateId: 1337,
      message: {
        messageId: 5,
        from: {
          id: 13375,
          isBot: false,
          firstName: 'User',
          lastName: 'Name',
          username: 'username',
          language_code: 'en',
        },
        chat: {
          id: -13378,
          title: 'saunad',
          type: <const>'group',
          all_members_are_administrators: true,
        },
        date: 1608930502, // 2020-12-25T21:08:22+00:00
        text: '/saunoihin',
        entities: [{ offset: 0, length: 7, type: <const>'bot_command' }],
      },
    },
  ],
};

export const MultipleBotCmdMessages = {
  ok: true,
  result: [
    {
      updateId: 265294191,
      message: {
        messageId: 5,
        from: {
          id: 41358582,
          isBot: false,
          firstName: 'User1',
          lastName: 'Name',
          username: 'username1',
          language_code: 'en',
        },
        chat: {
          id: -434691860,
          title: 'saunad',
          type: <const>'group',
          all_members_are_administrators: true,
        },
        date: 1608930502, // 2020-12-25T21:08:22+00:00
        text: '/sanoihin',
        entities: [{ offset: 0, length: 7, type: <const>'bot_command' }],
      },
    },
    {
      updateId: 265294192,
      message: {
        messageId: 6,
        from: {
          id: 41358000,
          isBot: false,
          firstName: 'Naser',
          lastName: 'Ume',
          username: 'naser_ume',
          language_code: 'en',
        },
        chat: {
          id: -434691860,
          title: 'saunad',
          type: <const>'group',
          all_members_are_administrators: true,
        },
        date: 1608930670, // 2020-12-25T21:11:10+00:00
        left_chat_participant: {
          id: 211246197,
          isBot: true,
          firstName: 'Telegram Bot',
          username: 'BotsyBot',
        },
        left_chat_member: {
          id: 211246197,
          isBot: true,
          firstName: 'Telegram Bot',
          username: 'BotsyBot',
        },
      },
    },
    {
      updateId: 265294193,
      message: {
        messageId: 7,
        from: {
          id: 41358444,
          isBot: false,
          firstName: 'User2',
          lastName: 'Name',
          username: 'nasserume',
          language_code: 'en',
        },
        chat: {
          id: -434691860,
          title: 'saunad',
          type: <const>'group',
          all_members_are_administrators: true,
        },
        date: 1608930679, // 2020-12-25T21:11:19+00:00
        text: '/saunoihin',
        entities: [{ offset: 0, length: 5, type: <const>'bot_command' }],
      },
    },
    {
      updateId: 265294194,
      message: {
        messageId: 8,
        from: {
          id: 41358511,
          isBot: false,
          firstName: 'Monni',
          lastName: 'Boi',
          username: 'bonni_moi',
          language_code: 'en',
        },
        chat: {
          id: -434691860,
          title: 'saunad',
          type: <const>'group',
          all_members_are_administrators: true,
        },
        date: 1608930680, // 2020-12-25T21:11:20+00:00
        text: '/saun',
        entities: [{ offset: 0, length: 5, type: <const>'bot_command' }],
      },
    },
    {
      updateId: 265294195,
      message: {
        messageId: 9,
        from: {
          id: 41358566,
          isBot: false,
          firstName: 'Pikku',
          lastName: 'Kyy',
          username: 'viperface',
          language_code: 'en',
        },
        chat: {
          id: -434691860,
          title: 'saunad',
          type: <const>'group',
          all_members_are_administrators: true,
        },
        date: 1608990227, // 2020-12-26T13:43:47+00:00
        text: '/saunoihin',
        entities: [{ offset: 0, length: 9, type: <const>'bot_command' }],
      },
    },
    {
      updateId: 265294196,
      message: {
        messageId: 10,
        from: {
          id: 41358533,
          isBot: false,
          firstName: 'Duuni',
          lastnName: 'Peikko',
          username: 'muumilaakso',
          language_code: 'en',
        },
        chat: {
          id: -434691860,
          title: 'saunad',
          type: <const>'group',
          all_members_are_administrators: true,
        },
        date: 1608990232, // 2020-12-26T13:43:52+00:00
        text: '/saunoihin',
        entities: [{ offset: 0, length: 7, type: <const>'bot_command' }],
      },
    },
  ],
};

export const NoValidBotCmdMessages = {
  ok: true,
  result: [
    {
      updateId: 265294191,
      message: {
        messageId: 5,
        from: {
          id: 41358582,
          isBot: false,
          firstName: 'User1',
          lastName: 'Name',
          username: 'username1',
          language_code: 'en',
        },
        chat: {
          id: -434691860,
          title: 'saunad',
          type: <const>'group',
          all_members_are_administrators: true,
        },
        date: 1608930502, // 2020-12-25T21:08:22+00:00
        text: '/saunoihin',
        entities: [{ offset: 0, length: 7, type: <const>'mention' }],
      },
    },
    {
      updateId: 265294192,
      message: {
        messageId: 6,
        from: {
          id: 41358000,
          isBot: false,
          firstName: 'Naser',
          lastName: 'Ume',
          username: 'naser_ume',
          language_code: 'en',
        },
        chat: {
          id: -434691860,
          title: 'saunad',
          type: <const>'group',
          all_members_are_administrators: true,
        },
        date: 1608930670, // 2020-12-25T21:11:10+00:00
        left_chat_participant: {
          id: 211246197,
          isBot: true,
          firstName: 'Telegram Bot',
          username: 'BotsyBot',
        },
        left_chat_member: {
          id: 211246197,
          isBot: true,
          firstName: 'Telegram Bot',
          username: 'BotsyBot',
        },
      },
    },
    {
      updateId: 265294193,
      /* message: {
        messageId: 7,
        from: {
          id: 41358444,
          isBot: false,
          firstName: 'User2',
          lastName: 'Name',
          username: 'nasserume',
          language_code: 'en',
        },
        chat: {
          id: -434691860,
          title: 'saunad',
          type: <const>'group',
          all_members_are_administrators: true,
        },
        date: 1608930679, // 2020-12-25T21:11:19+00:00
        text: '/saunad',
        entities: [{ offset: 0, length: 5, type: <const>'bot_command' }],
      },
      */
    },
    {
      updateId: 265294194,
      message: {
        messageId: 8,
        from: {
          id: 41358511,
          isBot: false,
          firstName: 'Monni',
          lastName: 'Boi',
          // username: 'bonni_moi',
          language_code: 'en',
        },
        chat: {
          id: -434691860,
          title: 'saunad',
          type: <const>'group',
          all_members_are_administrators: true,
        },
        date: 1608930680, // 2020-12-25T21:11:20+00:00
        text: '/saunoihin',
        entities: [{ offset: 0, length: 5, type: <const>'bot_command' }],
      },
    },
    {
      updateId: 265294195,
      message: {
        messageId: 9,
        from: {
          id: 41358566,
          isBot: false,
          firstName: 'Pikku',
          lastName: 'Kyy',
          username: 'viperface',
          language_code: 'en',
        },
        chat: {
          id: -434691860,
          title: 'saunad',
          type: <const>'group',
          all_members_are_administrators: true,
        },
        date: 1608990227, // 2020-12-26T13:43:47+00:00
        text: '/saunoihin',
        // entities: [{ offset: 0, length: 9, type: <const>'bot_command' }],
      },
    },
    {
      updateId: 265294196,
      message: {
        messageId: 10,
        from: {
          id: 41358533,
          isBot: false,
          firstName: 'Duuni',
          lastnName: 'Peikko',
          username: 'muumilaakso',
          language_code: 'en',
        },
        chat: {
          id: -434691860,
          title: 'saunad',
          type: <const>'group',
          all_members_are_administrators: true,
        },
        date: 1608990232, // 2020-12-26T13:43:52+00:00
        // text: '/saunoihin',
        entities: [{ offset: 0, length: 7, type: <const>'bot_command' }],
      },
    },
    {
      updateId: 265294197,
      message: {
        messageId: 10,
        /* from: {
          id: 41358533,
          isBot: false,
          firstName: 'Duuni',
          lastnName: 'Peikko',
          username: 'muumilaakso',
          language_code: 'en',
        }, */
        chat: {
          id: -434691860,
          title: 'saunad',
          type: <const>'group',
          all_members_are_administrators: true,
        },
        date: 1608990233, // 2020-12-26T13:43:52+00:00
        text: '/saunoihin',
        entities: [{ offset: 0, length: 7, type: <const>'bot_command' }],
      },
    },
  ],
};
