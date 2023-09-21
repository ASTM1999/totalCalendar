import { useRecoilState } from "recoil";
import { counterState } from "../../contexts/atoms/contextValueState";
import { Link } from "react-router-dom";


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
            {location.pathname === '/practice/counter' && (
                <nav>
                    <ul>
                        <li><Link to='/practice'>Practice</Link></li>
                    </ul>
                </nav>
            )}

            <h1>Recoil Counter Example</h1>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
{/* 
            <div className="popup-indiv">myDiv1</div>
            <div className="popup-indiv">myDiv2</div>
            <div className="popup-indiv">myDiv3</div>
            <div className="popup-indiv">myDiv4</div>
            <div className="popup-indiv">myDiv5</div>
            <div className="popup-indiv">myDiv6</div> */}
        </div>
    );
}

export default Counter