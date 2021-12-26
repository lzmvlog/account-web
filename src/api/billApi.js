import axios from "axios";

// getBillList 获取列表
export function getBillList() {
    return axios.get("/bill/listBill")
}
