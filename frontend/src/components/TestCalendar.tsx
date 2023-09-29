import Month from './Month';
import { useState } from 'react';
import '../css/calendar-test.css';
import Form from 'react-bootstrap/Form';
import { EventsServices } from '../services/eventsService';

const TestCalendar = () => {
  const year = new Date().getFullYear();
  const [currentMonth, setCurrentMonth] = useState(0); // 0 คือเดือนที่ 1
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleNextMonth = () => {
    if (currentMonth === 0)
      setCurrentMonth((prevMonth) => prevMonth + 6);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 6)
      setCurrentMonth((prevMonth) => prevMonth - 6);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('files', selectedFile);

      try {
        await EventsServices.postEvent(formData); 
        console.log('File uploaded successfully');
      
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleload = async () => {
    const load = await EventsServices.getEvents()
    console.log(load)
  }



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
      <div>
        <p>Excel</p>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        <button onClick={handleload}>load</button>
      </div>
    </div>
  );
};

export default TestCalendar;
