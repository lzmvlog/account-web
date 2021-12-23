import axios from "axios";

// getSubList 获取列表
export function getSubList() {
    return axios.get("/sub/list")
}

// saveSubject 保存科目
export function saveSubject(param) {
    return axios.post("/sub/save", param)
}

// page 分页获取列表
export function page(data) {
    return axios.get("/sub/page", data)
}
