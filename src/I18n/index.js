// i18n/index.js
import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    "weather": "Weather",
  "favorites": "Favorites",
  "switchDayMode": "Switch to Night Mode",
  "switchNightMode": "Switch to Day Mode",
  "switchLanguage": "switch Language"
  },
  uk: {
    "weather": "Погода",
    "favorites": "Улюблене",
    "switchDayMode": "Переключити в нічний режим",
    "switchNightMode": "Переключити в денний режим",
    "switchLanguage": "Змінити мову"
  },
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'uk',
  messages,
})

export default i18n
