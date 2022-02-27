import axios from "axios";

// getSubList 获取列表
export function getSubList() {
    return axios.get("/sub/listSub")
}

// saveSubject 保存科目
export function saveSubject(param) {
    return axios.post("/sub/saveSub", param)
}

// page 分页获取列表
export function pageSub(current, size) {
    return axios.get("/sub/pageSub?page=" + current + "&size=" + size)
}

// 根据id获取科目
export function getOne(id) {
    return axios.get("/sub/findOneSub?id=" + id)
}

// editSubject 修改科目信息
export function editSubject(param) {
    return axios.post("/sub/updateSub", param)
}

// disable 禁用
export function disable(id) {
    return axios.get("/sub/disable/" + id)
}
