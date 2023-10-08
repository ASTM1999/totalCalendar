import { useState } from 'react';
import '../css/calendar-test.css'
import { useRecoilState, useRecoilValue } from 'recoil';
// import { selectedDateState, selectedDateEventsState } from './../contexts/atoms/'; // แนะนำตรวจสอบ path ที่ถูกต้อง
import { selectedDateState, selectedDateEventsState, dataEventState } from '../contexts/atoms/contextValueState';
import { format } from 'date-fns';
import EventsPopup from './Popup';
import Popup from './Popup';

const Month = ({ year, month }: any) => {
  // สร้างปฏิทินของเดือนและปีที่กำหนด
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  // ข้อมูล
  // const [selectedDate, setSelectedDate] = useState<string | null>(null);
  // const [selectedDateEvents, setSelectedDateEvents] = useState([]);


  // recoil
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const [selectedDateEvents, setSelectedDateEvents] = useRecoilState(selectedDateEventsState);
  const [selectedEvent, setSelectedEvent] = useState(null);


  // สร้างวันของเดือน
  const days: any = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // const [eventstest, setEventstest] = useState([
  //   { date: '2023-01-01', name: 'New Year\'s Day' },
  //   { date: '2023-01-05', name: 'Sample Event 1' },
  //   { date: '2023-03-05', name: 'Sample Event 1' },
  // ]);
  const events = useRecoilValue(dataEventState)
  // console.log(eventstest)
  // console.log(events)

  const handleDateClick = (date: string) => {
    console.log(date)

    const clickedDate = new Date(date);
    const formattedDate = format(clickedDate, 'yyyy-MM-dd');


    const event = events.find(event => event.date === formattedDate);
    // console.log(`event ${event.date} && ${event.event}`)
    if (event.event) {
      setSelectedEvent(event);
    }



    if (event) {
      setSelectedDate(formattedDate);
      setSelectedDateEvents([event.event]);
      // มีเหตุการณ์ในวันที่คลิก
      console.log(`Event on ${date}: ${event.event}`);
    } else {
      setSelectedDate(formattedDate);
      setSelectedDateEvents([]);
      // ไม่มีเหตุการณ์ในวันที่คลิก
      console.log(`No event on ${date}`);
    }
  };


  const handleClosePopup = () => {
    setSelectedEvent(null);
  };
  // console.log("selectedDate: ", selectedDate);
  // console.log("events: ", events);
  // console.log("selectedDateEvents", selectedDateEvents);


  return (
    <div className="month">
      <h3>{`${year} ${month + 1}`}</h3>
      <table>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(Math.ceil(days.length / 7))].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {[...Array(7)].map((_, colIndex) => {
                const dayIndex = rowIndex * 7 + colIndex;
                const day = days[dayIndex];

                return (
                  <td
                    key={colIndex}
                    onClick={() => handleDateClick(`${year}-${month + 1}-${day}`)}
                    style={{
                      border: day !== null && day !== undefined ? '1px solid #ccc' : 'none',
                      
                    }}
                  >
                    {day !== null ? day : ''}
                  </td>


                );
              })}
            </tr>
          ))}


        </tbody>

      </table>

      {/* recoil */}
      {selectedEvent && <Popup event={selectedEvent} onClose={handleClosePopup} />}
    </div>
  );
};

export default Month;
