
import { useLocation, useNavigate } from "react-router-dom";
import { UserService } from "../services/userServices";
import { useEffect, useState } from "react";
// import { useState } from "react";

import userIcon from "../../public/user-regular.svg"
import iconApp from '../../public/calendar.png'


const Header = () => {
    const [email, setEmail] = useState<string | null>(null)
    const [username, setUserName] = useState<string | null>()
    const [Role, setRole] = useState<string | null>()
    // console.log("useremail:",email)
    const login = UserService.isUserloggedIn()
    // console.log(userEmails);
    const [selectedOption, setSelectedOption] = useState('มหาวิทยาลัยเทคโนโลยีสุรนารี');

    // const [activeTab, setActiveTab] = useState("calendar");
    const location = useLocation();
    const { activeTab } = location.state || { activeTab: 'defaultTabValue' };


    const handleOptionChange = (event: any) => {
        setSelectedOption(event.target.value);
    };
    // console.log(userIcon)
    const navigate = useNavigate()


    function handleClickUserInfo() {
        navigate('/UserProfile')
        console.log('UserProfile')
    }
    function handleLogin() {
        navigate('/login')
    }

    const logOut = () => {
        UserService.logOutUser();
        setEmail(null);
        window.location.reload();
    };
    const handleChangePage = () => {
        navigate('')
    }
    // console.log(users.map((item)=>{
    //     console.log(item)
    // }))
    // console.log("login:", login)
    // console.log("userEmails:", email)
    // console.log("users:", users)
    const fetchUserData = async () => {
        try {
            const role = await UserService.getrole();
            setRole(role);
            // console.log("role",role)
            const userEmail = await UserService.getEmail()
            setEmail(userEmail)
            const user = await UserService.getUsername()
            setUserName(user)
            // console.log("useEffect")
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
    useEffect(() => {
        fetchUserData()

    }, [])



    const handleTabClick = (tabName: any) => {
        // console.log(tabName);
        if (tabName === 'contactAdmin') {
            // console.log("tabname: ", tabName);
            // console.log("tabname: ", tabName === 'contactAdmin');
            if (login) {
                navigate('/contactAdmin', { state: { activeTab: tabName } });
                // console.log('test');
            } else {
                navigate('/login');
            }
        } else if (tabName === 'announcement') {
            navigate('/Activity', { state: { activeTab: tabName } });
        } else if (tabName === 'calendar') {
            navigate('/', { state: { activeTab: tabName } });
        }
        else if (tabName === 'userManagement') {
            navigate('/UserManagement', { state: { activeTab: tabName } });
        }
        else if (tabName === 'Recommend') {
            navigate('/Recommend', { state: { activeTab: tabName } });
        }
        // setActiveTab(tabName); // ลบหรือคอมเมนต์บรรทัดนี้
    };

    function handleButtonClick(route: string): void {
        // console.log("handleButtonClick")
        if (!login) {
            navigate("/login");
        } else {
            navigate(route);
        }
    }
    // console.log("activityTap: ", activeTab)
    // console.log(Role)
    return (
        <>
            <div className="header">

                <div className="div-bt-header">

                    <ul className="tap-card">
                        <li className="tap-item">
                            <a >
                                <img
                                    style={{ width: "58px" }}
                                    src={iconApp}
                                />
                            </a>
                        </li>
                        <li className="tap-item">
                            <a className={`tap-link ${activeTab === "calendar" ? "active" : ""}`} onClick={() => handleTabClick("calendar")}>Calendar</a>
                        </li>
                        <li className="tap-item">
                            <a className={`tap-link ${activeTab === "announcement" ? "active" : ""}`} onClick={() => handleTabClick("announcement")}>Announcement</a>
                        </li>

                        {Role !== 'superadmin' ? (
                            <li className="tap-item">
                                <a className={`tap-link ${activeTab === "contactAdmin" ? "active" : ""}`} onClick={() => handleTabClick('contactAdmin')}>Contact Us</a>
                            </li>

                        ) : (
                            <>
                                <li className="tap-item">
                                    <a className={`tap-link ${activeTab === "userManagement" ? "active" : ""}`} onClick={() => handleTabClick('userManagement')}>User Management</a>
                                </li>
                                <li className="tap-item">
                                    <a className={`tap-link ${activeTab === "Recommend" ? "active" : ""}`} onClick={() => handleTabClick('Recommend')}>Recommend</a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>

                <div  >
                    {login === false ? (
                        <p className="pleaseLogin" onClick={handleLogin}>
                            Login
                        </p>
                    ) : (
                        <div className="iconDropdown">
                            {/* noti Icon */}
                            {/* <div className="dropdown-noti" style={{ marginRight: "10px" }}>
                                <img className="dropdown-icon-noti" alt="react logo" width={"32px"} src="../../public/bell-regular.svg" onClick={handleChangePage} />
                                <div className="dropdown-menu-noti">
                                    <div className="showname">
                                       
                                    </div>
                                    
                                </div>
                            </div> */}


                            {/* //userIcon */}
                            <div className="dropdown">
                                {/* <p style={{margin:"10px"}}>
                                    {username}
                                </p> */}
                                <img className="dropdown-icon" src={userIcon} alt="react logo" width={"32px"} onClick={handleClickUserInfo} />
                                <div className="dropdown-menu">
                                    <div className="showname">
                                        <p>{username}</p>
                                        <p style={{ fontSize: "14px", marginBottom: "10px" }}>{email}</p>
                                        {/* <p style={{ fontSize: "14px", marginBottom:"10px" }}>{Role}</p> */}

                                        {/* <p>test</p> */}
                                    </div>
                                    <button className="dropdown-bt" onClick={() => handleButtonClick('/UserProfile')}>
                                        <img src="../../public/table-columns.svg" alt="logOut" style={{ width: "24px", marginRight: "10px" }} />
                                        Dashboards</button>
                                    <button className="dropdown-bt" onClick={logOut}>
                                        <img src="../../public/arrow-right-from-bracket.svg" alt="logOut" style={{ width: "24px", marginRight: "10px" }} />
                                        Log out</button>
                                </div>
                            </div>
                        </div>

                    )}
                </div>
            </div>
            {/* {activeTab === "overview" && (
                <>
                    <div>
                        <Option selectedOption={selectedOption} onOptionChange={handleOptionChange} />
                    </div>
                    <TestCalendar />
                    <Activity selectedOption={selectedOption} />
                </>
            )} */}

            {/* {activeTab === "announcement" && (
                <>
                   
                    <Activity />
                </>
            )}
            {activeTab === "calendar" && (

                <div className='container-calendart'>
                    <Option selectedOption={selectedOption} onOptionChange={handleOptionChange} />
                    <TestCalendar />
                </div>

            )}
            {activeTab === 'contactAdmin' && (
                <ContactAdmin />
            )} */}
        </>
    );
};

export default Header;
