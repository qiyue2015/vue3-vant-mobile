import { createApp } from 'vue'
import { createHead } from '@unhead/vue/client'
import App from '@/App.vue'
import router from '@/router'
import pinia from '@/stores'
import 'virtual:uno.css'
import '@/styles/app.less'
import '@/styles/var.less'

const app = createApp(App)
const head = createHead()

app.use(head)
app.use(router)
app.use(pinia)

app.mount('#app')
