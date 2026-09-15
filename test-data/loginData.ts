export const loginData = {
  validMtsUser: {
    username: 'web-automatizacija@mts-si.rs',
    password: '1234'
  },

  validTelekomUser: {
    username: 't.vasilije',
    password: 'vasilije@10'
  },

  invalidUser: {
    username: 'invalidUser',
    password: 'invalidPassword'
  },

  emptyField: {
    username: '',
    password: ''
  },

  globalUser: {
    username: 'test1@mtel.global',
    password: 'mtel123.'
  },
} as const;

export const providerOptions = [
  'Izaberi',
  'Telekom Srbija',
  'm:tel Crna Gora',
  'MOVE BIH',
  'MTEL DACH',
  'YUNET',
  'MTEL Македонија',
  'MOVE Slovenija',
  'MTEL Turk',
  'MOVE Global'
] as const;