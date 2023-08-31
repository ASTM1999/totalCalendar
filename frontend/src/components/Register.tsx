import { useState } from "react";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleCheckboxChange = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className="container-signin">

            <div className="SingIn">
                <header>

                    <button className="iconT">
                        <img
                            src="../../public/iconTotalCalendar.png"
                        />
                    </button>

                    {/* <div className="sign-in"><h2>Sign In</h2></div> */}
                    {/* <div className="sign-in"><h4>Hi  &nbsp; {userlogin}</h4></div>
                    <div style={{ paddingBottom: '20px' }}>
                        <b>
                            <p className="show-user">
                                {email}
                            </p>
                        </b>
                        
                    </div> */}
                    <div
                        style={{
                            fontSize: "14px",
                            color: "#817D7D",
                            fontFamily: 'Inria Serif'
                        }}>
                        <h4>Create Your Accout</h4>
                    </div>

                </header>

                {/* <div className="continue"><p>To Continue, first verify it's you</p></div> */}
                <div className="container-register">
                    <div className="div-input">
                        <input
                            className="input"
                            placeholder="Enter your email" />

                    </div>
                    <div className="div-input">
                        <input
                            className="input"
                            placeholder="Enter your password"
                            type={showPassword ? 'text' : 'password'}
                        />
                    </div>
                    <div className="div-input">
                        <input
                            className="input"
                            placeholder="Confirm your password"
                            type={showPassword ? 'text' : 'password'}
                        />
                    </div>
                    <div className="div-input">
                        <input
                            className="input"
                            placeholder="Enter your name" />
                    </div>




                </div>
                <div className="createAccout-1">
                    <a><b>Use One-Tap options instead</b></a>
                </div>


            </div>
        </div>
    )
}
export default Register