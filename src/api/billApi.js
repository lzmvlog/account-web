import axios from "axios";

// getBillList 获取列表
export function getBillList() {
    return axios.get("/bill/listBill")
}

// saveBill 保存
export function saveBill(param) {
    return axios.post("/bill/saveBill", param)
}

// pageBill 分页获取列表
export function pageBill(current, size) {
    return axios.get("/bill/pageBill?page=" + current + "&size=" + size)
}

// getOne 获取单个账单信息
export function getOne(id) {
    return axios.get("/bill/findOneBill?id="+ id)
}

// updateBill 更新账单信息
export function updateBill(param) {
    return axios.post("/bill/updateBill", param)
}
