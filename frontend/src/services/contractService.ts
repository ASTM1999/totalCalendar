import axios from "axios"
import { Contract } from "./interface"
import { API_BASE_URL } from "../config/apiBase"

async function getContract() {
    console.log("test get contract")
}

async function createContract(data: Contract) {
    try {
        const res = await axios.post(`${API_BASE_URL}/contract`, data)
        // console.log(res)
        return res
    } catch (err) {
        console.log(`create failed ${err}`)
    }
}
export const contractService = {
    getContract,
    createContract,
}