import axios from "axios";

// getBillList 获取列表
export function getBillList() {
    return axios.get("/bill/listBill")
}

// saveBill 保存
export function saveBill(param) {
    return axios.post("/bill/saveBill", param)
}
