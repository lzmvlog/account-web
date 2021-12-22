import axios from "axios";

export function getSubList() {
    return axios.get("/sub/list")
}

export function saveSubject(param) {
    return axios.post("/sub/save", param)
}
