import Month from './Month';
import { useEffect, useState } from 'react';
import '../css/calendar-test.css';
import { EventsServices } from '../services/eventsService';

import Option from './Option';
import Activity from './Activity';
import { UserService } from '../services/userServices';

const TestCalendar = () => {
  const year = new Date().getFullYear();
  const [currentMonth, setCurrentMonth] = useState(0); // 0 คือเดือนที่ 1
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // const users = useRecoilValue(userState);
  // const role = users.map((user) => user.role);
  const [selectedOption, setSelectedOption] = useState('วันหยุด');
  const [role, setRole] = useState<string|null>('')

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
    setSelectedFile(file || null);
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

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };
  const fetchUserData = async () => {
    try {
      const role = await UserService.getrole();
      setRole(role);
      console.log("role", role)
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchUserData()
  })
  return (
    <div className='container-calendart'>

      <div>
        <Option selectedOption={selectedOption} onOptionChange={handleOptionChange} />
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
      {(role === "useradmin" || role === "admin") && (
        <div>
          <p>Excel</p>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
          {/* <button onClick={handleload}>load</button> */}
        </div>
      )}
      <Activity selectedOption={selectedOption} />
    </div>
  );
};

export default TestCalendar;
