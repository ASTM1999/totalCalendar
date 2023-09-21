import Month from './Month';
import { useState } from 'react';
import '../css/calendar-test.css';
import Form from 'react-bootstrap/Form';

const TestCalendar = () => {
  const year = new Date().getFullYear();
  const [currentMonth, setCurrentMonth] = useState(0); // 0 คือเดือนที่ 1

  const handleNextMonth = () => {
    if (currentMonth === 0)
      setCurrentMonth((prevMonth) => prevMonth + 6);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 6)
      setCurrentMonth((prevMonth) => prevMonth - 6);
  };
  

  return (
    <div className='container-calendart'>
      <div className="options">
        <Form.Select aria-label="Default select example">
          <option>Open this select menu</option>
          <option value="มหา">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
      </div>
      <div className="calendar">
        {[...Array(6)].map((_, index) => (
          <Month key={currentMonth + index} year={year} month={currentMonth + index} />
        ))}
      </div>
      <div className="month-navigation">
        <button onClick={handlePrevMonth}>Previous</button>
        <button onClick={handleNextMonth}>Next</button>
      </div>
    </div>
  );
};

export default TestCalendar;
