import axios from "axios";
import { API_BASE_URL } from "../config/apiBase";


async function getEvents(option: any) {
  try {
    console.log(option)
    const response = await axios.get(`${API_BASE_URL}/events/pullbuffer?option=${option}`)
    return response.data
  } catch (err) {
    console.log(`Error fetching data`, err)
    throw err
  }
}

async function postEvent(formData: FormData) {
  try {
    // formData.append('option', option);
    await axios.post(`${API_BASE_URL}/events/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });
    console.log('File uploaded successfully');
    // You can add any additional logic here after successful upload
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error; // Rethrow the error to handle it in your component if needed
  }
}

export const EventsServices = {
  getEvents,
  postEvent,
}