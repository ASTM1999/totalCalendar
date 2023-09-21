import axios from "axios"
import { API_BASE_URL } from "../config/apiBase"

async function authUser(params: any) {
    try {
        console.log(`params : ${params}`)
        const response = await axios.post(`${API_BASE_URL}/auth/login`, params)
        return response.data
    } catch (err) {
        console.error(`Error authenticating user: ${err}`);
        // สร้างข้อความผิดพลาดที่เหมาะสมสำหรับผู้ใช้แสดงบน UI
        throw new Error("Email not found");
    }
}

export const UserService = {
    authUser,
}
