const axios = require('axios');

const baseAxios =  axios.create({
    baseURL: 'http://127.0.0.1:8080'
})

export const getData = baseAxios.get("/aaa")


