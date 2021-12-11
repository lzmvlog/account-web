import  {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

const app = createApp(App).use(router)

const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:8090/'

app.use(ElementPlus)
app.mount('#app')

