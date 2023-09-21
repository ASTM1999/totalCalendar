import axios from "axios";
import { API_BASE_URL } from "../config/apiBase";


async function getannouncement() {
    try {
        const response = await axios.get(`${API_BASE_URL}/announcement`)
        // console.log(response)
        return response.data
    } catch (err) {
        console.log(`Error fetching data`, err)
        throw err
    }
}

// async function createannouncementService() {
//     try{
//         const response = await axios.post(`${API_BASE_URL}acivity`)
//     }
// }

export const announcementServices = {
    getannouncement,
}