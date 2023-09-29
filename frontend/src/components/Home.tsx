// import { Link } from "react-router-dom"
import TestCalendar from "./TestCalendar"
import Activity from "./Activity"
import Header from "./Header"


const Home = () => {

    return (
        <div className="Home">
            <nav>
                <ul>
                    {/* <li><Link to="/practice">Practice</Link></li> */}
                    {/* <li><Link to="/login">Login</Link></li> */}
                    {/* <li><Link to="/register">Register</Link></li> */}
                    {/* <li><Link to="/registerOption">Sign With Google</Link></li> */}
                    {/* <li><Link to="/calendar">Calendar</Link></li> */}
                    {/* <li><Link to="/testcalendar">Calendar</Link></li> */}
                </ul>
            </nav>
            <Header />
            <TestCalendar />
            <Activity />
            <p>
                header เหลือใส่ Icon
            </p>
            <p>เพิ่มการแจ้งเตือน == ให้กับ admin </p>
            <p>
                select สำหรับเลือกแสดงข้อมูล สร้าง database รับและ CRUD เชื่อม recoil
            </p>
            <p>
                login เหลือ validate
            </p>
            <p>
                ปฏิทิน: 2แก้ไข 3จัดตามหมวด excel
            </p>
            <p>
                activity: 1comment  2like 3edit
            </p>
            <p>ปุ่ม search</p>
            <p>role admin: แก้ไขบทบาท</p>
            <p> ss </p>






        </div>
    )
}

export default Home