
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [username, setUsername] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const navigate = useNavigate();

    const handleEmailChange = (e:any) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e:any) => {
        setPassword(e.target.value);
    };

    const handleUsername = (e:any) => {
        setUsername(e.target.value);
    };

    const handlePasswordConfirmChange = (e:any) => {
        setPasswordConfirm(e.target.value);
        setPasswordsMatch(password === e.target.value);
    };

    const handleNavigateHome = () => {
        navigate('/');
    };
    const handleNavigate = () => {
        navigate('/registerOption');
    };

    const handleSubmit = () => {
        if (passwordsMatch) {
            console.log("Registration data:", { email, password, username });
            navigate('/');
        } else {
            console.error("Passwords do not match");
            alert("Passwords do not match");
        }
    };

   
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
                            value={email}
                            className="input"
                            placeholder="Enter your email"
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="div-input">
                        <input
                            value={password}
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
                            value={username}
                            className="input"
                            placeholder="Enter your name"
                            onChange={handleUsername}
                        />
                    </div>
                    <div className="div-input">
                        <button className="next" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
                <div
                    className="createAccout-1"
                    onClick={handleNavigate}
                >
                    <p>
                        <b>Use One-Tap options instead</b>
                    </p>
                </div>
                <br />
                {/* <p>{user.email}</p>
                <p>{user.password}</p> */}
            </div>
        </div>
    )
}
export default Register