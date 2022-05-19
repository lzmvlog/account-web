import axios from "axios";

// getUserPage 分页获取列表
export function getUserPage(current, size) {
    return axios.get("/api/pageUser?page=" + current + "&size=" + size)
}

// register 开账号
export function register(param) {
    return axios.post("/api/register", param)
}

// disable 禁用
export function disable(id) {
    return axios.get("/api/disable/" + id)
}

// getOne 获取一个用户
export function getOne(id) {
    return axios.get("/api/getOne/" + id)
}

// editUser 修改用户信息
export function editUser(param) {
    return axios.post("/api/updateUser", param)
}
