import axios from "axios"
import { API_BASE_URL } from "../config/apiBase"
import { Users } from "./interface";


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
        return localStorage.username
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
async function getOption(): Promise<string | null> {
    if (isUserloggedIn()) {
        return localStorage.option
    } else {
        return null
    }
}


async function authUser(params: any) {
    try {
        // console.log(`params : ${params.password}`)
        // console.log(`params : ${params.username}`)
        const userData = await axios.post(`${API_BASE_URL}/auth/login`, params)
        if (userData) {
            // console.log("test authUser")
            localStorage.setItem("accessToken", userData.data.accessToken)
            localStorage.setItem("userId", userData.data.userId)
            localStorage.setItem("useremail", userData.data.email)
            localStorage.setItem("role", userData.data.role)
            localStorage.setItem("username", userData.data.username)
            localStorage.setItem("option", userData.data.option)
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


            return response.data;

        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูลผู้ใช้:', error);
            throw error;
        }
    }
}

// UserService.ts

async function getUserData(userId: any): Promise<Users> {
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
async function getPicture() {
    if (isUserloggedIn()) {
        return localStorage.picture
    }
}

async function getGoogle(tokenResponse: any) {
    // console.log("tokenResponse", tokenResponse)
    const res = await axios
        .get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                Authorization: `Bearer ${tokenResponse.access_token}`
            }
        })
    if (res.data) {
        localStorage.setItem('picture', res.data.picture)
        localStorage.setItem('username', res.data.name)
    }
    // createDataUserGoogle(res.data)
    return createDataUserGoogle(res.data)
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
    // console.log("newuser:", newUser)
    await createUser(newUser)
    const user = await authUser({ username: newUser.email, password: newUser.sub })
    return user

}

async function createUser(newUser: Users) {
    try {
        const res = await axios.post(`${API_BASE_URL}/users/register`, newUser)
        // console.log("res data creat user")
        // console.log(res.data)
        return res.data
    } catch (err) {
        return await authUser({ username: newUser.email, password: newUser.sub })
    }
}

async function getUserbyId(id: any) {
    try {
        const user = await axios.get(`${API_BASE_URL}/users/${id}`, id)
        // console.log(user)
        return user
    } catch (err) {
        console.log(`Failed ${err}`)
    }
}

async function createUserDto(data: any) {
    try {
        const res = await axios.post(`${API_BASE_URL}/users/register`, data)
        return res.data
    } catch (err) {
        console.log(`Failed ${err}`)
    }
}
async function forgotPassword(email: string) {
    await fetch(`${API_BASE_URL}/users/forgot-Password`, {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
async function getAllUser() {
    try {
        const user = await axios.get(`${API_BASE_URL}/users`)
        return user.data
    } catch (err) {
        console.log(`Failed ${err}`)
    }
}
export const UserService = {
    getAllUser,
    getUserbyId,
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
    getGoogle,
    getPicture,
    getOption,
    createUserDto,
    forgotPassword,
}
