
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Home from './components/Home'; // แก้เป็น path ที่เก็บ component Home
import About from './components/About'; // แก้เป็น path ที่เก็บ component About
import Counter from './components/Todo-App/Counter';
import TodoList from './components/Todo-App/TodoList';
import Practice from './components/Todo-App/Practice';
import Looper from './components/Todo-App/Looper';




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
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
