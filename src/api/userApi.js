import axios from "axios";

// getUserPage 分页获取列表
export function getUserPage(current, size) {
    return axios.get("/api/pageUser?page=" + current + "&size=" + size)
}

// register 开账号
export function register(param){
    return axios.post("/api/register", param)
}
