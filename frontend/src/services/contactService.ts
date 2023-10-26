import axios from "axios"
import { Contract } from "./interface"
import { API_BASE_URL } from "../config/apiBase"

async function getContact() {
    try {
        const res = await axios.get(`${API_BASE_URL}/contract`)
        return res.data
    } catch (err) {
        console.log(`contact failed ${err}`)
    }
}

async function createContact(data: Contract) {
    try {
        const res = await axios.post(`${API_BASE_URL}/contract`, data)
        console.log(res)
        return res.data
    } catch (err) {
        console.log(`create failed ${err}`)
    }
}
async function deleteContact(userOwner: any) {
    try {
        const res = await axios.delete(`${API_BASE_URL}/contract?userOwner=${userOwner}`)
        console.log(res)
        return res
    } catch (err) {
        console.log(`Failed ${err}`)
    }
}
export const contactService = {
    getContact,
    createContact,
    deleteContact,
}