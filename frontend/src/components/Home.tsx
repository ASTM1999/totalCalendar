import Counter from "./Counter"
import { RecoilRoot } from "recoil"
import { ChildComponent } from "../contexts/ChildComponent"
import { MyContextProvider } from "../contexts/MyContextProvider"
import TodoList from "./TodoList"

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <p>Recoil Counter Example</p>
            <p>Recoil VS Context</p>
            <RecoilRoot>
                <MyContextProvider>
                    <Counter />
                    <ChildComponent />
                    {/* <p>Todolist Practice</p>
                    <TodoList /> */}
                </MyContextProvider>
            </RecoilRoot>

        </div>
    )
}

export default Home