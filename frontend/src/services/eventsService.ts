import axios from "axios";
import { API_BASE_URL } from "../config/apiBase";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx'; // นำเข้า XLSX แบบนี้

async function getEvents(option: any) {
  try {
    // console.log(option)
    // console.log('get event frontend: ', option)
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
    // console.log('File uploaded successfully');

  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}



async function exportToExcel(event: any) {
  const fileType = `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8`;
  const fileExtension = 'xlsx';
  const ws = XLSX.utils.json_to_sheet(event);
  const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: fileType });
  saveAs(data, 'eventfile');
}


export const EventsServices = {
  getEvents,
  postEvent,
  exportToExcel,
}