
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UserService } from "../services/userServices";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [username, setUsername] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const navigate = useNavigate();

    const isPasswordValid = (password: string) => {
        // ตรวจสอบความยาว


        // ตัวเลข

    };
    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
    };

    const handleUsername = (e: any) => {
        setUsername(e.target.value);
    };

    const handlePasswordConfirmChange = (e: any) => {
        setPasswordConfirm(e.target.value);
        setPasswordsMatch(password === e.target.value);
    };

    const handleNavigateHome = () => {
        navigate('/');
    };
    const handleNavigate = () => {
        navigate('/registerOption');
    };


    const handleSubmit = async () => {

        const emailPattern = /^[bB0-9]+@[aAtTsSuUcC0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please Check format email of Univercity!',
            })
        }
        else if (password.length < 8) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please make sure your password is at least 8 characters long!',
            })
        }
        else if (passwordsMatch && email && password && username) {
            console.log("Registration data:", { email, password, username });
            const data = {
                email: email,
                password: password,
                username: username,
                role: "user",
            }
            const res = await UserService.createUserDto(data)
            if (res) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Successed',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/login')
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '400 (Bad Request)',
                    text: 'Email Aready',
                })
            }


        } else if (!/\d/.test(password) || !/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please make sure your password is includes a mix of numbers, uppercase, and lowercase letters.!',
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Passwords do not match!',
            })

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