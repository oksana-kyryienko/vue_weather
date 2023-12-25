// main.js

import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import axios from 'axios'
import './reset.css'
import './main.css'

import i18n from './I18n'


const app = createApp(App)

app.config.globalProperties.$axios = axios
app.use(i18n)

app.use(router)
app.mount('#app')
