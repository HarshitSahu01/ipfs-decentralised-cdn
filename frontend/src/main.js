import './assets/main.css'
import vue3GoogleLogin from 'vue3-google-login'
// import './assets/tailwind.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia();
app.use(pinia);
 
app.use(vue3GoogleLogin, {
  clientId: '595257542474-jkpc0gkiqddtsidalh80vik7h4veakm8.apps.googleusercontent.com'
})

app.use(router)
app.mount('#app')
