import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// Pinia
import { createPinia } from 'pinia'

// Vue Router
import router from './router'

// VueLatex
import VueLatex from 'vatex'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(VueLatex)
app.mount('#app')
