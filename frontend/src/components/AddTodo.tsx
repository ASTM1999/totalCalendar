import { useRecoilState } from 'recoil'
import { todoListState } from '../contexts/atoms/contextValueState'
import { useState } from 'react'

const AddTodo = () => {
    const [newTodo, setNewTodo] = useState('')
    const [todoList, setTodoList] = useRecoilState(todoListState)

    const hanedleAddTodo = () => {
        if (newTodo) {
            setTodoList([...todoList, newTodo])
            setNewTodo('')
        }
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