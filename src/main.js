import './assets/main.css'
import "primeicons/primeicons.css";
import router from './components/router';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import { createApp } from 'vue'
import App from './App.vue'

const app= createApp(App)
app.use(router);
app.use(Toast)
app.mount('#app')
