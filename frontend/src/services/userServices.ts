import axios from "axios"
import { API_BASE_URL } from "../config/apiBase"
import { UserData, Users } from "./interface";


function logOutUser(): void {
    if (isUserloggedIn()) {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("username")
    }
}
function isUserloggedIn() {
    return localStorage.accessToken !== undefined;
}
async function getUsername(): Promise<string | null> {
    // console.log("localStorage: ", localStorage)
    if (isUserloggedIn()) {
        return localStorage.name
    } else {
        return null
    }
}

async function getEmail(): Promise<string | null> {
    if (isUserloggedIn()) {
        return localStorage.useremail
    } else {
        return null
    }
}

async function getTel(): Promise<string | null> {
    if (isUserloggedIn()) {
        return localStorage.tel
    } else {
        return null
    }
}
async function getrole(): Promise<string | null> {
    if (isUserloggedIn()) {
        return localStorage.role
    } else {
        return null
    }
}



async function authUser(params: any) {
    try {
        console.log(`params : ${params.password}`)
        console.log(`params : ${params.username}`)
        const userData = await axios.post(`${API_BASE_URL}/auth/login`, params)
        if (userData) {
            console.log("test authUser")
            localStorage.setItem("accessToken", userData.data.accessToken)
            localStorage.setItem("userId", userData.data.userId)
            localStorage.setItem("useremail", userData.data.email)
            return userData.data
        } else {
            console.log('else')
        }
        
    } catch (err) {
        console.error(`Error authenticating user: ${err}`);
        throw new Error("Email not found");
    }
}

async function updateUserData(userId: any, updatedUserData: any) {
    if (isUserloggedIn()) {
        try {
            const response = await axios.put(`${API_BASE_URL}/users/${userId}/user-update`, updatedUserData, {
                headers: {
                    Authorization: `Bearer ${localStorage.accessToken}`,
                },
            });

            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('เกิดข้อผิดพลาดในการอัปเดตข้อมูลผู้ใช้');
            }
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูลผู้ใช้:', error);
            throw error;
        }
    }
}

// UserService.ts

async function getUserData(userId: any): Promise<UserData> {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${userId}`)
        // console.log(response)
        return response.data
    } catch (err) {
        console.log(`Error fetching data`, err)
        throw err
    }
}

function getUserId(): string {
    // console.log("localStorage: ", localStorage)
    if (isUserloggedIn()) {
        return localStorage.userId
    } else {
        return ""
    }
}

async function fetchUsers(): Promise<Users[]> {
    const res = await fetch(`${API_BASE_URL}/users`)
    const users = await res.json()
    // console.log("UserService.ts users: ", users)
    return users
}
function getAccessToken(): string {
    return localStorage.accessToken
}

async function getGoogle(tokenResponse: any) {
    console.log("tokenResponse", tokenResponse)
    const res = await axios
        .get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                Authorization: `Bearer ${tokenResponse.access_token}`
            }
        })

    createDataUserGoogle(res.data)
    return res.data
}

const createDataUserGoogle = async (userdata: any) => {
    console.log("createDataUser work", userdata)
    const newUser: Users = {
        email: userdata.email,
        username: userdata.name,
        role: 'user',
        tel: 'เพิ่มเบอร์โทร',
        byGoogle: true,
        sub: userdata.sub,
    };
    console.log("newuser:", newUser)
    await createUser(newUser)
    await authUser({ username: newUser.email, password: newUser.sub })
}

async function createUser(newUser: Users) {
    try {
        const res = await axios.post(`${API_BASE_URL}/users/register`, newUser)
        console.log(res.data)

    } catch (err) {
        console.log(`Error create data`, err)
        throw err
    }
}

export const UserService = {
    fetchUsers,
    getAccessToken,
    getUserId,
    getUserData,
    authUser,
    getUsername,
    isUserloggedIn,
    getEmail,
    logOutUser,
    getTel,
    getrole,
    updateUserData,
    getGoogle
}
