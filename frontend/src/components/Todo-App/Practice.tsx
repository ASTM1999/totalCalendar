
import { RecoilRoot } from "recoil"
import { MyContextProvider } from "../../contexts/MyContextProvider"
import Counter from "./Counter"
import { ChildComponent } from "../../contexts/ChildComponent"
import TodoList from "./TodoList"
import { Link } from "react-router-dom"



const Practice = () => {
    return (
        <div>
            {location.pathname === '/practice' && (
                <nav>
                    <ul style={{
                        display: "flex",
                        justifyContent: 'space-evenly'
                    }}>
                        <button><Link to='/'>Home</Link></button>
                        <button><Link to='/practice/counter'>Counter</Link></button>
                        <button><Link to='/practice/todolist'>TodoList</Link></button>
                        <button><Link to='/practice/looper'>Looper</Link></button>
                    </ul>
                </nav>
            )}



            <h1>Recoil VS Context</h1>
            <MyContextProvider>
                <ChildComponent />
            </MyContextProvider>
            <Counter />
            <TodoList />


        </div>
    )
}

export default Practice