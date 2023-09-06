import { useState } from 'react';
import '../calendar-test.css'
import { useRecoilState } from 'recoil';
// import { selectedDateState, selectedDateEventsState } from './../contexts/atoms/'; // แนะนำตรวจสอบ path ที่ถูกต้อง
import { selectedDateState, selectedDateEventsState } from '../contexts/atoms/contextValueState';
import { format } from 'date-fns';

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


  // สร้างวันของเดือน
  const days: any = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const [events, setEvents] = useState([
    { date: '2023-01-01', name: 'New Year\'s Day' },
    { date: '2023-01-05', name: 'Sample Event 1' },
  ]);



  const handleDateClick = (date: string) => {

    const clickedDate = new Date(date);
    const formattedDate = format(clickedDate, 'yyyy-MM-dd');

    const event = events.find(event => event.date === formattedDate);

    // console.log(event)
    // console.log(date)
    // console.log(typeof (date))
    // const event = events.find(event => event.date === date);

    if (event) {
      setSelectedDate(formattedDate);
      setSelectedDateEvents([event.name]);
      // มีเหตุการณ์ในวันที่คลิก
      console.log(`Event on ${date}: ${event.name}`);
    } else {
      setSelectedDate(formattedDate);
      setSelectedDateEvents([]);
      // ไม่มีเหตุการณ์ในวันที่คลิก
      console.log(`No event on ${date}`);
    }
  };



  console.log("selectedDate: ", selectedDate);
  console.log("events: ", events);
  console.log("selectedDateEvents", selectedDateEvents);


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
                  // <td key={colIndex} onClick={() => handleDateClick(`${year}-${month + 1}-${day}`)}>
                  //   {day !== null ? day : ''}
                  // </td>
                  <td key={colIndex} onClick={() => handleDateClick(`${year}-${month + 1}-${day}`)}>
                    {day !== null ? day : ''}
                    {day !== null && events.some(event => event.date === `${year}-${month + 1}-${day}`) && (
                      <span>Event!</span>
                    )}
                  </td>

                );
              })}
            </tr>
          ))}


        </tbody>

      </table>

      {/* recoil */}
      {selectedDate && (
        <div className="event-details">
          <h4>Events for {selectedDate}</h4>
          <ul>
            {events[selectedDate] && <li>{events[selectedDate]}</li>}
            {selectedDateEvents.map((event, index) => (
              <li key={index}>{event}</li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
};

export default Month;
