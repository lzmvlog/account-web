import axios from "axios";

// login 登录
export function login(data){
    return axios.post("/api/login", data)
}


