import axios from "axios";

export function getSubList() {
    return axios.get("/sub/list")
}
