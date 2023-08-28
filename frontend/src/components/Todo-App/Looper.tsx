import { useState } from "react"
import { Link } from "react-router-dom"

const Looper = () => {
    const [text, setText] = useState('');
    const [round, setRound] = useState('');
    const [rows, setRows] = useState([]); // Store generated rows

    function handleLoop() {
        const generatedRows = [];
        for (let i = round; i > 0; i--) {
            let row = '';
            for (let j = 0; j < i; j++) {
                row += text;
            }
            generatedRows.push(row);
        }
        setRows(generatedRows); // Save generated rows to state
    }

    return (
        <div>
            <nav>
                {location.pathname === '/practice/looper' && (
                    <button>
                        <Link to='/practice'>Practice</Link>
                    </button>
                )}
            </nav>
            <h1>
                Looper Test
            </h1>
            <br />

            {/* <form style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center"

            }}> */}
                <div style={{
                    width: "60%",
                    display: "flex",
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <p>
                        Enter Text
                    </p>
                </div>
                <div
                    style={{
                        width: "60%",
                        display: "flex",
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>
                    <input
                        type="text"
                        value={round}
                        onChange={(e) => setRound(e.target.value)}
                    />
                    <p>Enter Round</p>
                </div>

                <button onClick={handleLoop}>Loop</button>

                <div>
                    {rows.map((row, index) => (
                        <p key={index}>{row}</p>
                    ))}
                </div>
            {/* </form> */}
        </div>)
}
export default Looper