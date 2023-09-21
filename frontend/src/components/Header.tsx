import {  useRecoilValue } from "recoil";
import { loginState, userState } from "../contexts/atoms/contextValueState";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";

const Header = () => {
    const users = useRecoilValue(userState);
    const userEmails = users.map((user) => user.email);
    const login = useRecoilValue(loginState)
    console.log(userEmails);
    const navigate = useNavigate()

    function handleClick() {
        navigate('/contactAdmin')
        console.log('test')
    }
    function handleClickUserInfo() {
        navigate('/UserProfile')
        console.log('UserProfile')
    }
    function handleLogin() {
        navigate('/login')
    }
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
                    <p className="userinfo" onClick={handleClickUserInfo}>
                        <b>{userEmails}</b>
                    </p>
                )}
            </div>
        </div>
    );
};

export default Header;
