import { default as numeral } from 'numeral'

// load a locale
numeral.register('locale', 'id', {
  delimiters: {
      thousands: '.',
      decimal: ','
  },
  abbreviations: {
      thousand: 'RB',
      million: 'JT',
      billion: 'M',
      trillion: 'T'
  },
  ordinal : function (number) {
    return ''
  },
  currency: {
      symbol: 'Rp'
  }
});

// switch between locales
numeral.locale('id');

export default numeral