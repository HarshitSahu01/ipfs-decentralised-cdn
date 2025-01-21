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
  clientId: '95257542474-g5rcjabfkbrvlul3ls6n51p37eu8ksjn.apps.googleusercontent.com'
})

app.use(router)
app.mount('#app')
