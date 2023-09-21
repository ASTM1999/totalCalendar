import { useRecoilValue } from "recoil";
import { userState } from "../contexts/atoms/contextValueState";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const users = useRecoilValue(userState);
    const userEmails = users.map((user) => user.email);
    console.log(userEmails);
    const navigate = useNavigate()

    function handleClick() {
        navigate('/contactAdmin')
        console.log('test')
    }
    function handleClickUserInfo () {
        navigate('/UserProfile')
        console.log('UserProfile')
    }
    return (
        <div className="header">
            <div className="contactAdminDiv">
                <button className="contactAdminButton" onClick={handleClick}>ติดต่อ Admin</button>
            </div>
            <div className="userinfo" onClick={handleClickUserInfo}>
                 
                <b>{userEmails}</b>
            </div>
        </div>
    );
};

export default Header;
