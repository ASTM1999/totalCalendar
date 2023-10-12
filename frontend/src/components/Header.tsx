
import { useNavigate } from "react-router-dom";
import { UserService } from "../services/userServices";
import { useEffect, useState } from "react";
// import { useState } from "react";

import userIcon from "../../public/user-solid.svg"

const Header = () => {
    const [useremail, setEmail] = useState<string | null>()
    const [Role, setRole] = useState<string | null>()
    // console.log("useremail:",email)
    const login = UserService.isUserloggedIn()
    // console.log(userEmails);
    console.log(userIcon)
    const navigate = useNavigate()

    function handleClick() {
        if (login) {
            navigate('/contactAdmin')
            console.log('test')
        } else {
            navigate('/login')
        }
    }
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
            // console.log("useEffect")
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
    useEffect(() => {
        fetchUserData()
    })

    const [activeTab, setActiveTab] = useState("overview");
    const handleTabClick = (tabName: any) => {
        setActiveTab(tabName);
    };
    return (
        <div className="header">

            <div className="div-bt-header">
         
                <ul className="tap-card">
                    <li className="tap-item">
                        <a className={`tap-link ${activeTab === "overview" ? "active" : ""}`} onClick={() => handleTabClick("overview")}>Overview</a>
                    </li>
                    <li className="tap-item">
                        <a className={`tap-link ${activeTab === "setting" ? "active" : ""}`} onClick={() => handleTabClick("setting")}>Announcement</a>
                    </li>
                    <li className="tap-item">
                        <a className={`tap-link ${activeTab === "security" ? "active" : ""}`} onClick={() => handleTabClick("security")}>Calendar</a>
                    </li>
                    <li className="tap-item">
                        <a className={`contactAdminButton `} onClick={handleClick}>ติดต่อ Admin</a>
                    </li>
                </ul>
            </div>

            <div  >
                {login === false ? (
                    <p className="pleaseLogin" onClick={handleLogin}>
                        Login
                    </p>
                ) : (
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                        {Role === "admin" && (
                            <img
                                // style={ {width: "16px", }}
                                src="../../public/bell-regular.svg"
                                alt="bell Logo"
                                className="bell-logo"
                                onClick={handleChangePage}
                            />
                        )}
                        <p className="userinfo" onClick={handleClickUserInfo}>
                            {/* <b>{useremail}</b> */}
                            <img src={userIcon} alt="react logo" width={"32px"} />

                        </p>
                        <button
                            style={{
                                marginLeft: "10px"
                            }}
                            onClick={logOut}>Log out</button>
                    </div>

                )}
            </div>
        </div>
    );
};

export default Header;
