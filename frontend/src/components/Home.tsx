import { Link } from "react-router-dom"
import TestCalendar from "./TestCalendar"
import Activity from "./Activity"


const Home = () => {

    return (
        <div className="Home">
            <nav>
                <ul>
                    {/* <li><Link to="/practice">Practice</Link></li> */}
                    <li><Link to="/login">Login</Link></li>
                    {/* <li><Link to="/register">Register</Link></li> */}
                    {/* <li><Link to="/registerOption">Sign With Google</Link></li> */}
                    {/* <li><Link to="/calendar">Calendar</Link></li> */}
                    {/* <li><Link to="/testcalendar">Calendar</Link></li> */}
                </ul>
            </nav>
            <TestCalendar />
            <Activity/>

        </div>
    )
}

export default Home