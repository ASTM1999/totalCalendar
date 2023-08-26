import { todoListState } from "../contexts/atoms/contextValueState"
import { useRecoilValue, useSetRecoilState } from 'recoil'
import AddTodo from "./AddTodo"



const TodoList = () => {
    const todoList = useRecoilValue(todoListState)
    const setTodoList = useSetRecoilState(todoListState)

    const handleDeleteTodo = (id: number) => {
        const updatedTodoList = todoList.filter(todo => todo.id !== id)
        setTodoList(updatedTodoList)
    }

    const handleEditTodo = (id: number) => {
        const newText = prompt('Enter a new name for the todo: ');
        if (newText) {
            // ค้นหา Todo ที่ต้องการแก้ไขโดยใช้ ID
            const updatedTodoList = todoList.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, text: newText }; // แก้ไขข้อความของ Todo นี้
                }
                return todo;
            });

            // อัพเดตรายการ Todo ใหม่
            setTodoList(updatedTodoList);
        }
    }

    return (
        <div>
            <h2>Todo List</h2>
            <AddTodo />
            <ul>
                {todoList.map((todo) => (
                    <li key={todo.id}>
                        {todo.text}
                        <button onClick={() => handleEditTodo(todo.id)}>Edit</button>
                        <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default TodoList