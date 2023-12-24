// main.js

import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import axios from 'axios'
import './reset.css'
import './main.css'
import { createI18n, useI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false,
  fullbackLockale: 'en'
  
})

const app = createApp(App)

app.config.globalProperties.$axios = axios

app.use(router)
app.mount('#app')
