import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../contexts/atoms/contextValueState";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [user, setUser] = useRecoilState(userState)
    const [passwordConfirm, setPasswordConfirm] = useState(undefined);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const navigate = useNavigate()



    const handleEmailChange = (e: any) => {
        setUser({ ...user, email: e.target.value });
    };
    const handlePasswordChange = (e: any) => {
        setUser({ ...user, password: e.target.value });
    };
    const handleUsername = (e: any) => {
        setUser({ ...user, username: e.target.value });
    };
    const handlePasswordConfirmChange = (e: any) => {
        setPasswordConfirm(e.target.value);
        setPasswordsMatch(user.password === e.target.value);
    };

    const handleNavagate = () => {
        navigate('/registerOption')
    }
    const handleNavigateHome = () => {
        navigate('/')
    }

    const handleSubmit = () => {
        if (passwordsMatch) {
            console.log("Registration data:", user);
            navigate('/')
        } else {
            console.error("Passwords do not match");
            alert("Passwords do not match")
        }
    };

    console.log("user", user)
    return (
        <div className="container-signin">

            <div className="SingIn">
                <header>
                    <button className="iconT" onClick={handleNavigateHome}>
                        <img
                            src="../../public/iconTotalCalendar.png"
                        />
                    </button>
                    <div
                        style={{
                            fontSize: "14px",
                            color: "#817D7D",
                            fontFamily: 'Inria Serif'
                        }}>
                        <h4>Create Your Accout</h4>
                    </div>
                </header>

                <div className="container-register">
                    <div className="div-input">
                        <input
                            value={user.email}
                            className="input"
                            placeholder="Enter your email"
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="div-input">
                        <input
                            value={user.password}
                            className="input"
                            placeholder="Enter your password"
                            type='password'
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="div-input">
                        <input
                            value={passwordConfirm}
                            className="input"
                            placeholder="Confirm your password"
                            type='password'
                            onChange={handlePasswordConfirmChange}
                        />
                    </div>
                    <div className="div-input">
                        <input
                            value={user.username}
                            className="input"
                            placeholder="Enter your name"
                            onChange={handleUsername}
                        />
                    </div>
                    <div className="div-input">
                        <button onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
                <div
                    className="createAccout-1"
                    onClick={handleNavagate}
                >
                    <p>
                        <b>Use One-Tap options instead</b>
                    </p>
                </div>
                <br />
                <p>{user.email}</p>
                <p>{user.password}</p>
            </div>
        </div>
    )
}
export default Register