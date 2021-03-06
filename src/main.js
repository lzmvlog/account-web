import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App).use(router)

const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:8090/'

axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let token = localStorage.getItem("token");
    if (token != null) {
        // 设置token
       config.headers.Authorization = "Bearer " + token
    }
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
});

// // 添加响应拦截器
// axios.interceptors.response.use(function (response) {
//     // 对响应数据做点什么
//     return response
// }, function (error) {
//     // 对响应错误做点什么
//     return Promise.reject(error)
// });

app.use(ElementPlus, {
    locale: zhCn,
})
app.mount('#app')
