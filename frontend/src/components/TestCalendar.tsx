
import { useEffect, useState } from 'react';
import '../css/calendar-test.css';
import { EventsServices } from '../services/eventsService';

import Option from './Option';

import { UserService } from '../services/userServices';
import Header from './Header';

import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { dataEventState } from '../contexts/atoms/contextValueState';

import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import PopContantEvent from './PopContant';

import 'reactjs-popup/dist/index.css';
import { eventsExport } from '../config/event';



const TestCalendar = () => {
  //   const year = new Date().getFullYear();
  //   const [currentMonth, setCurrentMonth] = useState(0); // 0 คือเดือนที่ 1
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [selectedOption, setSelectedOption] = useState('มหาวิทยาลัยเทคโนโลยีสุรนารี');
  // const users = useRecoilValue(userState);
  // const role = users.map((user) => user.role);
  // const [selectedOption, setSelectedOption] = useState('วันหยุด');
  const [role, setRole] = useState<string | null>('')
  const [option, setOption] = useState<string | null>('')
  const [username, setUsername] = useState<string | null>('')
  const setDataEvent = useSetRecoilState(dataEventState)
  // const [eventDataFormath, setEventDataFormath] = useState()
  const [formatDate, setFormatDate] = useState<string>()
  const [popup, setPopup] = useState<boolean>()
  const [findEvent, setFindEvent] = useState<any>()



  // const handleNextMonth = () => {
  //   if (currentMonth === 0)
  //     setCurrentMonth((prevMonth) => prevMonth + 6);
  // };

  // const handlePrevMonth = () => {
  //   if (currentMonth === 6)
  //     setCurrentMonth((prevMonth) => prevMonth - 6);
  // };

  const handleExportFile = async () => {
    console.log('export work')
    // console.log('events: ', events)
    await EventsServices.exportToExcel(eventsExport)

  }

  const allowedExtensions = ['.xlsx', '.xls']
  const handleUpload = async () => {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, post it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (selectedFile) {

          const fileExtension = selectedFile.name.slice(((selectedFile.name.lastIndexOf(".") - 1) >>> 0) + 2);
          if (allowedExtensions.includes(`.${fileExtension.toLowerCase()}`)) {
            // ไฟล์ถูกต้อง (ไฟล์ Excel)
            const formData = new FormData();
            formData.append('files', selectedFile);
            formData.append('option', selectedOption);
            try {
              console.log("formData: ", formData)
              console.log(selectedOption)
              await EventsServices.postEvent(formData);
              Swal.fire(
                'Posted!',
                'Your file has been Posted.',
                'success'
              )
              console.log('File uploaded successfully');
              getEventData()

            } catch (error) {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                // footer: '<a href="">Why do I have this issue?</a>'
              })
              console.error('Error uploading file:', error);
            }
          } else {
            Swal.fire({
              icon: 'error',
              title: 'File Not excel...',
              text: 'please choose file excel!',
              // footer: '<a href="">Why do I have this issue?</a>'
            })
          }


        } else {
          Swal.fire({
            icon: 'error',
            title: 'File Empty...',
            text: 'please choose file!',
            // footer: '<a href="">Why do I have this issue?</a>'
          })
        }
      }
    })

  };

  // const handleOptionChange = (event: any) => {
  //   setSelectedOption(event.target.value);
  // };
  const fetchUserData = async () => {
    try {
      const role = await UserService.getrole();
      setRole(role);
      const option = await UserService.getOption()
      setOption(option)
      const username = await UserService.getUsername()
      setUsername(username)
      // console.log("role", role)
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const getEventData = async () => {
    try {
      const dataEvent = await EventsServices.getEvents(selectedOption)
      setDataEvent(dataEvent)
      console.log("fetch Event: ", dataEvent)
    } catch (err) {
      console.log(`Error fetch data: ${err}`)
    }
  }


  const navigate = useNavigate()
  const handleClickHome = () => {
    navigate('/')
  }

  const handleOptionChange = async (e: any) => {
    setSelectedOption(e.target.value);
    console.log(e.target.value)
    const dataEvent = await EventsServices.getEvents(e.target.value)
    setDataEvent(dataEvent)
  };



  const eventsJson = useRecoilValue(dataEventState)
  const events: any[] = [];
  const [fileName, setFileName] = useState('');

  // console.log(eventsJson)

  // const convertDate = (dateStr: string) => {
  //   const [day, month, year] = dateStr.split('/').map(Number); // แยกวันที่, เดือน, และปีจากสตริง
  //   if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
  //     const newDate = new Date(year, month - 1, day); // month - 1 เนื่องจากเดือนใน JavaScript เริ่มที่ 0
  //     return newDate.toISOString();
  //   }
  //   return null; // คืนค่า null เมื่อไม่สามารถแปลงได้
  // }
  
  // for (const key in eventsJson) {
  //   const item: any = eventsJson[key];
  //   if (item.event && item.start) {
  //     // ตรวจสอบค่าว่างเปล่าหรือไม่
  //     const start = item.start ? convertDate(item.start) : null;
  //     const end = item.end ? convertDate(item.end) : null;
  
  //     if (start) {
  //       const event = {
  //         start: start,
  //         end: end,
  //         title: item.event,
  //         detail: item.detail,
  //       };
  
  //       events.push(event);
  //     }
  //   }
  // }
  
  
  const convertDate = (date: any) => {
    const baseDate = new Date(1900, 0, 1); // วันที่เริ่มต้น
    const newDate = new Date(baseDate);
    newDate.setDate(baseDate.getDate() + date - 2); // เพิ่มหรือลดวันตามรหัส
    return newDate.toISOString(); // แปลงเป็น '2023-01-01'
  }
  const convertDateEnd = (end: any) => {
    if (typeof end === 'number' && !isNaN(end)) {
      return convertDate(end);
    }
    return null;
  }

  for (const key in eventsJson) {
    const item: any = eventsJson[key];
    if (item.event) {
      // console.log(item.end)
      const event = {
        start: convertDate(item.start),
        end: convertDateEnd(item.end),
        title: item.event,
        detail: item.detail,
      };
      // console.log(event)
      if (event.end) {
        const endDate = new Date(event.end);
        endDate.setSeconds(endDate.getSeconds() + 1);
        event.end = endDate.toISOString();
      }

      events.push(event);
    }
  }

  console.log(`events`, events)


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file || null);
      setFileName(file.name)
    }
  };


  // async function formatData(e: any) {
  //   const year = e.getFullYear();
  //   const month = String(e.getMonth() + 1).padStart(2, "0");
  //   const day = String(e.getDate()).padStart(2, "0");

  //   const formattedDate = `${year}-${month}-${day}`;
  //   try {
  //     setFormatDate(formattedDate)
  //     return formattedDate
  //   } catch (err) {
  //     console.log(`failed ${err}`)
  //   }
  // }

  async function formatData(e: any) {
    const formattedDate = e.toISOString();
    try {
      setFormatDate(formattedDate)
      return formattedDate;
    } catch (err) {
      console.log(`failed ${err}`)
    }
  }


  const handleClickEvent = async (e: any, date: any) => {
    try {
      console.log(e)
      console.log(date)
      const formattedDate = await formatData(date);
      console.log("formatDate: ", formattedDate);
      // console.log("event: ", events);
      // const filterEvent: any = events.filter((item: any) => item.date === formattedDate);
      const findEvent: any = events.find((item) => item.start === formattedDate && item.title === e);

      console.log(findEvent);
      setFindEvent(findEvent)
      setPopup(true)

    } catch (err) {
      console.log(`failed ${err}`);
    }
  }
  // console.log(findEvent)
  const onClose = () => {
    setPopup(false)
  }
  useEffect(() => {
    fetchUserData()
    getEventData()
  }, [])


  // const eventss = [
  //   {
  //     title: 'ไปเที่ยวกันไหม',
  //     start: '2023-11-01',
  //     end: '2023-12-02',
  //     detail: 'จะไปก็รีบไป'
  //   }
  // ];

  return (
    <>
      <Header />
      <div className="calendar">
        <div className="headBox" style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <div className="dv-headbox" style={{ width: "95%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div className="">
              <h1>Overview</h1>
              <div className="breadcrum-info">
                <b>
                  <p onClick={handleClickHome} style={{ marginRight: "6px", cursor: "pointer" }}>Home</p>
                </b>
                <p>- {username}</p>
              </div>
            </div>
            <div className="bt-activity" style={{ marginRight: "20px", }}>

              <div className='optionCalendar'>
                <Option selectedOption={selectedOption} onOptionChange={handleOptionChange} />
                {((role === "admin" && option === selectedOption) || role === "superadmin") && (
                  <div className='export'>

                    <label className="custom-file-export" onClick={handleExportFile}>
                      <img src='../../public/xlsx-icon.svg' alt='xlsx' style={{ width: "18px", marginLeft: "15px" }} />
                      <p style={{ width: "18px", marginLeft: "10px" }}>{'FormatData'}</p>
                    </label>
                  </div>
                )}
              </div>

              {((role === "admin" && option === selectedOption) || role === "superadmin") && (
                <div className='upload'>
                  <div className="uploadExcelFile">
                    <b><p className='bt-upload' onClick={handleUpload}>Upload Excel File</p></b>
                  </div>

                  <label className="custom-file-upload">
                    <input className="hidden-text" type="file" onChange={handleFileChange} />
                    <img src='../../public/xlsx-icon.svg' alt='xlsx' style={{ width: "18px", marginRight: "10px" }} />
                    <p>{fileName || 'เลือกไฟล์'}</p>
                  </label>
                </div>
              )}

            </div>
          </div>
        </div>

        <div className='container-calendart'>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventClick={(info) => handleClickEvent(info.event.title, info.event.start)}
          />


          {/* <div className="calendar">
          {[...Array(6)].map((_, index) => (
            <Month key={currentMonth + index} year={year} month={currentMonth + index} />
          ))}
        </div>
        <div className="month-navigation">
          <button onClick={handlePrevMonth}>Previous</button>
          <button onClick={handleNextMonth}>Next</button>
        </div>
        {(role === "useradmin" || role === "admin") && (
          <div>
            <p>Excel</p>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            // <button onClick={handleload}>load</button>
          </div>
        )} */}

        </div>
      </div>
      {popup && (
        <PopContantEvent title={findEvent.title} detail={findEvent.detail} start={findEvent.start} end={findEvent.end} onClose={onClose} component="calendar" />
      )}
    </>
  );
};

export default TestCalendar;
