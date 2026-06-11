import './assets/main.css'

import { createApp } from 'vue'
import { createRouter } from 'vue-router'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

const app = createApp(App)

app.use(router)
app.use(PrimeVue, { unstyled: false })

app.mount('#app')

