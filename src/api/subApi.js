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
