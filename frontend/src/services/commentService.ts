import axios from "axios";
import { API_BASE_URL } from "../config/apiBase";
import { CommentUI } from "./interface";


async function createComment(data: CommentUI) {
    try {
        console.log(data.activityId)
        const res = await axios.post(`${API_BASE_URL}/${data.type}/${data.activityId}/comment`, data)
        return res
    } catch (err) {
        console.log(`Failed ${err}`)
        throw err
    }
}

async function getComment(data: any) {
    try {
        // console.log(data)
        const res = await axios.get(`${API_BASE_URL}/${data.type}/${data.activityId}/comment`)
        console.log(res.data)
        return res.data
    } catch (err) {
        console.log(`Failed ${err}`)
    }
}

export const commentService = {
    createComment,
    getComment,
}