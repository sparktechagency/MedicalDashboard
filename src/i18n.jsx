
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next'
import en from './Language/en/english.json'
import es from './Language/es/spanish.json'

i18n.use(initReactI18next).init({
    resources:{
        en:{translation:en},
        de:{translation:es}
    },
    fallbackLn:'en',
    interpolation:{
        escapeBalue:false
    }
})

export default i18n;