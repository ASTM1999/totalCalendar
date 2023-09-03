import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [userlogin, setUserLogin] = useState('Anusorn sriprom')
    const [email, setEmail] = useState('anusornsriprom1999@gmail.com')
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

    const handleCheckboxChange = () => {
        setShowPassword(!showPassword);
    };

    const signInWithGoogle = useGoogleLogin({
        onSuccess: tokenResponse => console.log(tokenResponse)
    })
    const handleSignInWithGoogle = () => {
        signInWithGoogle()
    }

    const handleNavigateRegister = () => {
        navigate('/register')
    }
    const handleNavigateHome = () => {
        navigate('/')
    }

    return (
        <div className="container-signin">

            <div className="SingIn">
                <header>

                    <button className="iconT" onClick={handleNavigateHome}>
                        <img
                            src="../../public/iconTotalCalendar.png"
                        />
                    </button>

                    <div className="sign-in"><h2>Sign In</h2></div>
                    {/* <div className="sign-in"><h4>Hi  &nbsp; {userlogin}</h4></div>
                        <div style={{ paddingBottom: '20px' }}>
                            <b>
                                <p className="show-user">
                                    {email}
                                </p>
                            </b>
                        </div> */}
                    <div className="enter-you-accout">
                        <h4>Enter Your Accout</h4>
                    </div>
                </header>

                {/* <div className="continue"><p>To Continue, first verify it's you</p></div> */}
                <div className="input-div">
                    <input
                        className="input"
                        placeholder="Enter your email" />

                    {/* <input
                        className="input"
                        placeholder="Enter your password"
                        type={showPassword ? 'text' : 'password'}
                    />

                    <br />
                    <label>
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={handleCheckboxChange}

                        />
                        &nbsp;&nbsp;&nbsp;&nbsp;Show password
                    </label> */}
                </div>

                <div className="button-cn" >
                    <div className="createAccout" onClick={handleNavigateRegister}>
                        <a><b>Create Accout</b></a>
                    </div>
                    {/* <div className="createAccout-1">
                        <a><b>Forgot password?</b></a>
                    </div> */}
                    <button className="next">
                        <b>
                            Next
                        </b>
                    </button>

                </div>
                <div className="or">
                    <p><b>Or</b></p>
                </div>

                <button className="google-sign" onClick={handleSignInWithGoogle}>
                    <img
                        src="../../public/google-icon.png"
                        alt="Google Logo"
                        className="google-logo"
                    />

                    <b><p>Sign up with Google</p></b>
                </button>
                {/* <div className="createAccout-1">
                <a><b>Continue with email</b></a>
            </div> */}


            </div>
        </div>
    )
}

export default Login