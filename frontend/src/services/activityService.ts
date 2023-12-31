import axios from "axios";
import { API_BASE_URL } from "../config/apiBase";


async function getActivity(option:any) {
  try {
    const response = await axios.get(`${API_BASE_URL}/activity?option=${option}`)
    // console.log(response)
    return response.data
  } catch (err) {
    console.log(`Error fetching data`, err)
    throw err
  }
}
async function createActivity(createActivityData: any, activityType: any) {
  console.log(createActivityData)
  try {
    const response = await axios.post(`${API_BASE_URL}/${activityType}`, createActivityData)
    console.log(response.data)
    return response.data
  } catch (err) {
    console.log(`Error create data`, err)
    throw err
  }
}
async function updateActivity( type: any,activityId: any, title: any, detail: any, startDate: any, endDate: any,) {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${type}/${activityId}/update`,
      { title, detail, startDate, endDate }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating activity: ${error}`);
    throw new Error('Failed to update activity');
  }
}


// async function createActivity() {
//     try{
//         const response = await axios.post(`${API_BASE_URL}acivity`)
//     }
// }

export const activityServices = {
  getActivity,
  createActivity,
  updateActivity,
}