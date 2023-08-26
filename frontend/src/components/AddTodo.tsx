import { useRecoilState } from 'recoil'
import { todoListState } from '../contexts/atoms/contextValueState'
import { useState } from 'react'
import { Todo } from '../services/interface'

const AddTodo = () => {
    const [newTodo, setNewTodo] = useState('')
    const [todoList, setTodoList] = useRecoilState<Todo[]>(todoListState)

    const hanedleAddTodo = () => {
        if (newTodo) {
            const newTodoItem: Todo = { id: generateUniqueId(), text: newTodo, completed: false }
            setTodoList([...todoList, newTodoItem])
            setNewTodo('')
        }
    }
    const generateUniqueId = () => {
        // สร้างและคืนค่า id ที่ไม่ซ้ำกัน
        return parseInt(Math.random().toString().substring(2)); // แปลงสตริงเป็นเลข
    }
    return (
        <div>
            <input
                type='text'
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
            />
            <button onClick={hanedleAddTodo}>Add Todo</button>
        </div>
    )
}
export default AddTodo