
import { useNavigate } from "react-router-dom"
import { googleLogout, useGoogleLogin } from "@react-oauth/google"
import { useEffect, useState } from "react"
import { UserService } from "../services/userServices"
import axios from "axios"
import { Users } from "../services/interface"


const RegisterOption = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState<Users[] | null>(null)



    // const signInWithGoogle = useGoogleLogin({
    //     onSuccess: tokenResponse => {
    //         console.log(tokenResponse)
    //         console.log(tokenResponse.access_token)
    //     },
    //     onError: (error) => console.log(`login Failed ${error}`)
    // });


    const handleSignInWithGoogle = () => {
        console.log('คลิก Sign up with Google')
        googleLogin();
    };

    const handleNavigateHome = () => {
        navigate('/')
    }
    const handleNavigate = () => {
        navigate('/register')
    }
    const logOut = () => {
        googleLogout();
        setUser(null);
    };

   
    const googleLogin = useGoogleLogin({
        onSuccess: async tokenResponse => {
            console.log("OnSuccess")
            try {
                await UserService.getGoogle(tokenResponse)
            } catch (err) {
                console.log(`Register Failed ${err}`)
            }
          
        },
        onError: errorResponse => console.log(errorResponse),
    });


    return (

        <div className="container-signin">

            <div className="SingIn">
                <header>
                    <button className="iconT" onClick={handleNavigateHome}>
                        <img
                            src="../../public/iconTotalCalendar.png" alt="Logo"
                        />
                    </button>
                </header>

                <div
                    className="sign-in"
                    style={{ padding: "10px" }}
                    onClick={handleSignInWithGoogle}
                >
                    <h4>Create a Accout</h4>
                </div>

                <button className="google-sign"
                    onClick={handleSignInWithGoogle} >
                    <img
                        src="../../public/google-icon.png"
                        alt="Google Logo"
                        className="google-logo"
                    />
                    <b><p>Sign up with Google</p></b>
                </button>
                <div className="createAccout-1" style={{ padding: "10px" }} onClick={handleNavigate}>
                    <p><b>Continue with email</b></p>
                </div>
                {user && (
                    <div>
                        {/* <img
                            src={user.}
                        /> */}
                        <button onClick={logOut}>Log out</button>
                    </div>
                )}

            </div>
        </div>

    )
}
export default RegisterOption