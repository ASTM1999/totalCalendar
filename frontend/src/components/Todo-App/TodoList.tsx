import { todoListState } from "../../contexts/atoms/contextValueState"
import { useRecoilValue, useSetRecoilState } from 'recoil'
import AddTodo from "./AddTodo"
import { Link } from "react-router-dom"



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
            {location.pathname === '/practice/todolist' && (
                <nav>
                    <ul>
                        <li><Link to='/practice'>Practice</Link></li>
                    </ul>
                </nav>
            )}
            <h2>Todo List</h2>
            <p>Todolist Practice</p>
            <AddTodo />
            <ul style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start'
            }}>
                {todoList.map((todo) => (
                    <li key={todo.id} style={{ width: '100%', display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span>{todo.text}</span>
                        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                            <button onClick={() => handleEditTodo(todo.id)}>Edit</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div >
    )
}
export default TodoList