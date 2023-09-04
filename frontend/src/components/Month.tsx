import { useState } from 'react';
import '../calendar-test.css'

const Month = ({ year, month }) => {
  // สร้างปฏิทินของเดือนและปีที่กำหนด
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  // ข้อมูล
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);

  // สร้างวันของเดือน
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const [events, setEvents] = useState({
    '2023-01-01': 'New Year\'s Day',
    '2023-01-05': 'Sample Event 1',
    // เพิ่มข้อมูลเหตุการณ์เพิ่มเติมตามต้องการ ไว้เชื่อม data base
  });
  const handleDateClick = (date) => {
    // console.log("data", data)
    // แปลงรูปแบบของวันที่ใน selectedDate เพื่อให้เหมือนกับรูปแบบใน events
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    setSelectedDate(formattedDate);

    // ดึงเหตุการณ์ที่ตรงกับวันที่เลือก
    const selectedDateEvents = events[formattedDate] ? [events[formattedDate]] : [];

    setSelectedDateEvents(selectedDateEvents);
  };
  console.log(selectedDate);
  console.log(events);
  console.log(selectedDateEvents);


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
                  <td key={colIndex} onClick={() => handleDateClick(`${year}-${month + 1}-${day}`)}>
                    {day !== null ? day : ''}
                  </td>
                );
              })}
            </tr>
          ))}

          {days.length < 7 && (
            <tr>
              {[...Array(7 - days.length)].map((_, index) => (
                <td key={index}>{index + 1}</td>
              ))}
            </tr>
          )}
        </tbody>
      </table>

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
