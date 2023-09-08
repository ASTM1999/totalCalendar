import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    // const [userlogin, setUserLogin] = useState('Anusorn sriprom')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [emailloged, setEmailloged] = useState(0)
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


    // ทอสอบ code
    const handleNextClick = () => {
        setEmail(email)
        setName('anusorn')
        if (emailloged === 1) {
            navigate('/')
        }
        else if (email === 'anusornsriprom1999@gmail.com') { // เปรียบเทียบ email กับ visual data
            setEmailloged(1); // เปลี่ยน emailloged เป็น 1
        } else {
            alert('email not have in database')
            // กรณี email ไม่ตรงกับ visual data
            // ใส่โค้ดที่คุณต้องการในกรณีนี้
        }
    }
    const handleEmailChange = (event: any) => {
        setEmail(event.target.value); // อัพเดตค่า email เมื่อผู้ใช้กรอก email
    }

    console.log(emailloged)
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


                    {emailloged === 1 && (
                        <div>

                            <div className="sign-in">
                                <h4 style={{
                                    display: "flex",
                                    justifyContent: "center"
                                }}>Hi
                                    &nbsp; {name}
                                </h4>
                            </div>
                            <div style={{ paddingBottom: '20px' }}>
                                <b>
                                    <p className="show-user">
                                        {email}
                                    </p>
                                </b>
                            </div>
                        </div>
                    )}

                    <div className="enter-you-accout">
                        <h4>Enter Your Accout</h4>
                    </div>
                </header>

                {emailloged === 1 && (
                    <div className="continue"><p>To Continue, first verify it's you</p></div>
                )}

                {emailloged === 0 ? (

                    <div className="input-div">
                        <input
                            className="input"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                ) : (
                    <div className="input-div">
                        <input

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
                        </label>
                    </div>
                )}

                <div className="button-cn" >

                    {emailloged === 0 ? (
                        <div className="createAccout" onClick={handleNavigateRegister}>
                            <a><b>Create Accout</b></a>
                        </div>

                    ) : (
                        <div className="createAccout-1">
                            <a><b>Forgot password?</b></a>
                        </div>

                    )}

                    <button className="next" onClick={handleNextClick}>
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

            </div>
        </div>
    )
}

export default Login