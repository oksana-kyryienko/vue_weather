
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import axios from 'axios';

const app = createApp(App);


// Global registration of axios
app.config.globalProperties.$axios = axios;



app.use(router);
app.mount('#app');
