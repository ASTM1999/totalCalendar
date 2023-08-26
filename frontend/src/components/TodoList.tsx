import { todoListState } from "../contexts/atoms/contextValueState"
import { useRecoilValue } from 'recoil'
import AddTodo from "./addTodo"


const TodoList = () => {
    const todoList = useRecoilValue(todoListState)

    return (
        <div>
            <h2>Todo List</h2>
            <TodoList />
            <AddTodo />
            <ul>
                {todoList.map((todo, index) => (
                    <li key={index}>{todo}</li>
                ))}
            </ul>
        </div>
    )
}
export default TodoList