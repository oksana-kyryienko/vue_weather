import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import axios from 'axios'
import './reset.css'
import './main.css'

import { createI18n, useI18n } from 'vue-i18n'
import { languages, defaultLocale } from './I18n'

const messages = Object.assign(languages)

const localeStorageLang = localStorage.getItem('lang')

const i18n = createI18n({
  legacy: false,
  locale: localeStorageLang || defaultLocale,
  fallbackLocale: 'en',
  messages
})

const app = createApp(App)

app.config.globalProperties.$axios = axios
app.use(i18n)
app.use(router)

app.mixin({
  setup() {
    const { t } = useI18n()
    return { t }
  }
})

app.mount('#app')
