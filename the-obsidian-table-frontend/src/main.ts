import './assets/main.css'

import { createApp } from 'vue'
import { createRouter } from 'vue-router'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura';

const app = createApp(App);

app.use(PrimeVue, {
    // Default theme configuration
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            cssLayer: false
        }
    }
 });

app.use(router)
app.use(PrimeVue, { unstyled: false })

app.mount('#app')

