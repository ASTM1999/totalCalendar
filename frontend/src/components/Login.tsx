const Login = () => {
    return (
        <div className="SingIn">
            <header>

                <button className="iconT">

                    <img
                        src="../../public/iconTotalCalendar.png"
                    />
                </button>

                <div className="sign-in"><h2>Sign In</h2></div>
                <div className="enter-you-accout">
                    <h4>Enter Your Accout</h4>
                </div>
            </header>
            <input className="input" placeholder="Enter your email" />

            <div className="button-cn">
                <div className="createAccout">
                    <a><b>Create Accout</b></a>
                </div>
                <button className="next">
                    <b>
                        Next
                    </b>
                </button>

            </div>
            <div className="or">
                <p><b>Or</b></p>
            </div>
            <button className="google-sign">
                <img
                    src="../../public/google-icon.png"
                    alt="Google Logo"
                    className="google-logo"
                />

                <b><p>Sign up with Google</p></b>
            </button>


        </div>
    )
}

export default Login