
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Counter from './components/Todo-App/Counter';
import TodoList from './components/Todo-App/TodoList';
import Practice from './components/Todo-App/Practice';
import Looper from './components/Todo-App/Looper';
import Login from './components/Login';
import Register from './components/Register';
import RegisterOption from './components/RegisterOption';
import Calendar from './components/Calendar';
import TestCalendar from './components/TestCalendar';
import Header from './components/Header';
import ContactAdmin from './components/Contact';
import UserProfile from './components/UserProfile';
import Activity from './components/Activity';
import UserManagement from './components/UserManagement';






function App() {
  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path="/" element={<TestCalendar />} />
          <Route path="/" element={<Header />} />
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/UserManagement" element={<UserManagement />} />
          <Route path="/practice/counter" element={<Counter />} />
          <Route path="/practice/todolist" element={<TodoList />} />
          <Route path="/practice/looper" element={<Looper />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registerOption" element={<RegisterOption />} />
          <Route path="/testcalendat" element={<Calendar />} />


          <Route path="/contactAdmin" element={<ContactAdmin />} />

          <Route path="/Activity" element={<Activity />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
