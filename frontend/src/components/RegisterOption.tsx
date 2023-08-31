const RegisterOption = () => {



    return (
        <div className="container-signin">

            <div className="SingIn">
                <header>

                    <button className="iconT">
                        <img
                            src="../../public/iconTotalCalendar.png"
                        />
                    </button>

                </header>

                <div className="sign-in" style={{padding:"10px"}}><h4>Create a Accout</h4></div>
                <button className="google-sign">
                    <img
                        src="../../public/google-icon.png"
                        alt="Google Logo"
                        className="google-logo"
                    />

                    <b><p>Sign up with Google</p></b>
                </button>
                <div className="createAccout-1" style={{ padding: "10px" }}>
                    <a><b>Continue with email</b></a>
                </div>


            </div>
        </div>
    )
}
export default RegisterOption