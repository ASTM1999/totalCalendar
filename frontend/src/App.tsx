
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home'; // แก้เป็น path ที่เก็บ component Home
import About from './components/About'; // แก้เป็น path ที่เก็บ component About
import Counter from './components/Todo-App/Counter';
import TodoList from './components/Todo-App/TodoList';
import Practice from './components/Todo-App/Practice';
import Looper from './components/Todo-App/Looper';
import Login from './components/Login';
import Register from './components/Register';
import RegisterOption from './components/RegisterOption';
import Calendar from './components/Calendar';





function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/practice/counter" element={<Counter />} />
          <Route path="/practice/todolist" element={<TodoList />} />
          <Route path="/practice/looper" element={<Looper />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registerOption" element={<RegisterOption />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
