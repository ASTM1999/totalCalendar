
import { useNavigate } from "react-router-dom"
import {  useGoogleLogin } from "@react-oauth/google"


const RegisterOption = () => {


    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate('/register')
    }
    const signInWithGoogle = useGoogleLogin({
        onSuccess: tokenResponse => console.log(tokenResponse),
    });

    const handleSignInWithGoogle = () => {
        signInWithGoogle();
    };
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

                </header>
                <div
                    className="sign-in"
                    style={{ padding: "10px" }}
                    onClick={handleSignInWithGoogle}
                >
                    <h4>Create a Accout</h4></div>
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


            </div>
        </div>

    )
}
export default RegisterOption