import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import id_root from '~/static/locale/id/root.json'


const resources = {
  "id": {
    root: id_root
  }
}

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: 'id',
    fallbackLng: 'id',
    keySeparator: ".",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export { i18next }