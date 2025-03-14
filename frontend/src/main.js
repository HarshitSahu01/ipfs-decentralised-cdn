import './assets/main.css'
import vue3GoogleLogin from 'vue3-google-login'
// import './assets/tailwind.css';

import { createApp } from 'vue'
import { pinia } from './stores/piniaLocalStoragePlugin'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(pinia);
 
app.use(vue3GoogleLogin, {
  clientId: '308263909394-jrvumsna2qssf93545jfa8d92gkqjucf.apps.googleusercontent.com'
})

app.use(router)
app.mount('#app')
