import { atom, useRecoilState } from "recoil";
import { counterState } from "../contexts/atoms/contextValueState";


function Counter() {
    const [count, setCount] = useRecoilState(counterState);

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        setCount(count - 1)
    }
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    );
}

export default Counter