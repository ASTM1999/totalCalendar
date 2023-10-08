
import { useNavigate } from "react-router-dom";
import { UserService } from "../services/userServices";
import { useEffect, useState } from "react";
// import { useState } from "react";

const Header = () => {
    const [useremail, setEmail] = useState<string | null>()
    const [Role, setRole] = useState<string | null>()
    // console.log("useremail:",email)
    const login = UserService.isUserloggedIn()
    // console.log(userEmails);
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
    return (
        <div className="header">

            <div className="contactAdminDiv">
                <button className="contactAdminButton" onClick={handleClick}>ติดต่อ Admin</button>
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
                            <b>{useremail}</b>
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
