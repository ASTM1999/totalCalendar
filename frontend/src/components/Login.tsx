
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../contexts/atoms/contextValueState";
import { UserService } from "../services/userServices";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
    // const [userlogin, setUserLogin] = useState('Anusorn sriprom')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [name, setName] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [emailloged, setEmailloged] = useState(0)

    const navigate = useNavigate()
    const setUserState = useSetRecoilState(userState)

    const handleCheckboxChange = () => {
        setShowPassword(!showPassword);
    };
    const googleLogin = useGoogleLogin({
        onSuccess: async tokenResponse => {
            console.log("google login")
            try {
                const user = await UserService.getGoogle(tokenResponse)
                await navigate('/')
                // console.log("googleLogin",user)
                setUserState((prevUserState) => [...prevUserState, user])
                localStorage.setItem('username', user.name)
                window.location.reload()
            } catch (err) {
                console.log(`Register Failed ${err}`)
            }
        },
        onError: errorResponse => console.log(errorResponse),
    });


    const handleSignInWithGoogle = async () => {
        console.log('คลิก Sign up with Google')
        googleLogin()
        // console.log(googleLogin)
    }

    const handleNavigateRegister = () => {
        navigate('/register')
    }
    const handleNavigateHome = () => {
        navigate('/')
    }


    // ทอสอบ code
    const handleNextClick = async () => {
        console.log(password)
        if (!password) {
            try {
                // const params = { username, password }; // แนบข้อมูลที่จำเป็นในการยืนยันตัวตน
                const userData = await UserService.authUser({ username: email });
                console.log(userData)
                if (userData.message === 'Email not found') {
                    console.log(`test`)
                } else {
                    setName(userData.username)
                    setEmailloged(1)
                }
            } catch (err) {
                console.error(`Login failed: ${err}`);
            }
        } else {
            try {
                const userData = await UserService.authUser({ username: email, password: password })
                // console.log("from recoil: loogin", userData)
                // console.log("from recoil: loogin", userData.message)
                if (userData.message === 'Inconrect email') {
                    console.log("try again")
                } else {
                    setUserState((prevUserState) => [...prevUserState, userData])
                    // setLogin(true)
                    navigate('/')

                }
            } catch (error) {
                console.error(`Login failed: ${error}`);
            }
        }
    }

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
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
                            onChange={(e) => setPassword(e.target.value)}
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
                {emailloged === 0 && (
                    <>
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
                    </>
                )}

            </div>
        </div>
    )
}

export default Login