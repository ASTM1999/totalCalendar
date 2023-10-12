import { useState, useEffect } from "react";
import { UserService } from "../services/userServices";
import { Users } from "../services/interface";
import { useNavigate } from "react-router-dom";

function UserProfile() {
    const [name, setName] = useState<string | null>(null);
    const [tel, setTel] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState("overview");
    // resetpassword
    const [userLoggedIn, setUserLoggedIn] = useState<Users | undefined>();
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        async function fetchUserData() {
            try {
                const getUserId = await UserService.getUserId();
                if (getUserId) {
                    setUserId(getUserId);
                    const userData = await UserService.getUserData(getUserId);
                    setName(userData.username);
                    setTel(userData.tel);
                    setEmail(userData.email);
                    setRole(userData.role);
                    const users = await UserService.fetchUsers()
                    const findUser = users.find((item) => item._id === getUserId);
                    setUserLoggedIn(findUser);
                }
            } catch (error) {
                console.error("เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:", error);
            }
        }
        fetchUserData();
    }, []);


    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleSaveClick = async () => {
        try {
            const updatedUserData = {
                name: name,
                tel: tel,
                email: email,
                role: role,
            };
            await UserService.updateUserData(userId, updatedUserData);
            setIsEditing(false);
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูลผู้ใช้:", error);
        }
    };

    const handleClickHome = () => {
        navigate('/')
    }

    const handleResetPassword = async () => {
        try {
            if (userLoggedIn?.password !== password) {
                console.error(`รหะสผ่านไม่ถูกต้อง`)
                return;
            }
            if (newPassword !== confirmPassword) {
                console.error("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
                return;
            }
            if (newPassword === "") {
                console.error("พลาสเวิดว่างเปล่า")
                return;
            }


            const updateuserPassword = { ...userLoggedIn, password: newPassword }
            console.log(updateuserPassword)
            await UserService.updateUserData(userId, updateuserPassword);
            // รีเซ็ตรหัสผ่านสำเร็จ
            console.log("รีเซ็ตรหัสผ่านสำเร็จ");
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการรีเซ็ตรหัสผ่าน:", error);
        }
    };

    const handleTabClick = (tabName: any) => {
        setActiveTab(tabName);
    };

    return (
        <div className="userprofile">
            <div className="head-info">
                <div className="head-info1">
                    <h1>Accout Overview</h1>
                    <div className="breadcrum-info">
                        <p onClick={handleClickHome} style={{ marginRight: "6px", cursor: "pointer" }}>Home</p>
                        <p>- Accout</p>
                    </div>
                </div>
            </div>

            <div className="card-profile">
                <div className="picture">
                    test pic
                </div>

                <ul className="nav-card-profile">
                    <li className="nav-item">
                        <a className={`nav-link ${activeTab === "overview" ? "active" : ""}`} onClick={() => handleTabClick("overview")}>Overview</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${activeTab === "setting" ? "active" : ""}`} onClick={() => handleTabClick("setting")}>Setting</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${activeTab === "security" ? "active" : ""}`} onClick={() => handleTabClick("security")}>Security</a>
                    </li>
                </ul>
            </div>

            <div className="profile-details" style={{ display: activeTab === "overview" ? "block" : "none" }}>
                <div className="headPD">
                    <h1>Profile Details</h1>
                    <button className="bt-headPD">Edir Profile</button>
                </div>
                <div className="containerPD">
                    <div className="lbox">
                        <label style={{ width: "350px" }}>Full Name</label>
                        <p>{name}</p>
                    </div>

                    <div className="lbox">
                        <label style={{ width: "350px" }}>Contact Phone</label>
                        <p>{tel}</p>
                    </div>

                    <div className="lbox">
                        <label style={{ width: "350px" }}>Contact Email</label>
                        <p>{email}</p>
                    </div>

                    <div className="lbox">
                        <label style={{ width: "350px" }}>Role</label>
                        <p>{role}</p>
                    </div>
                </div>
            </div>

            <div className="profile-details" style={{ display: activeTab === "setting" ? "block" : "none" }}>
                <div className="headSet">
                    <h1>Profile Setting</h1>
                </div>

            </div>

            <div className="profile-details" style={{ display: activeTab === "security" ? "block" : "none" }}>
                <div className="headSet">
                    <h1>security</h1>
                </div>
            </div>


            <div className="info">
                <h3 className="infouser">ข้อมูลผู้ใช้</h3>
                <div className="boxInfo">
                    <div className="textInfo">
                        <p className="text-info">ชื่อนามสกุล</p>
                        {isEditing ? (
                            <input
                                type="text"
                                value={name || ""}
                                onChange={(e) => setName(e.target.value)}
                            />
                        ) : (
                            <p>{name}</p>
                        )}
                    </div>
                    <div className="textInfo">
                        <p className="text-info">อีเมล</p>
                        {isEditing ? (
                            <input
                                type="email"
                                value={email || ""}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        ) : (
                            <p>{email}</p>
                        )}
                    </div>
                    <div className="textInfo">
                        <p className="text-info">เบอร์โทร</p>
                        {isEditing ? (
                            <input
                                type="tel"
                                value={tel || ""}
                                onChange={(e) => setTel(e.target.value)}
                            />
                        ) : (
                            <p>{tel}</p>
                        )}
                    </div>
                    <div className="textInfo">
                        <p className="text-info">บทบาท</p>
                        <p>{role}</p>
                    </div>
                </div>
                {isEditing ? (
                    <>
                        <button onClick={handleSaveClick}>ยืนยัน</button>
                        <button onClick={handleCancelClick}>ยกเลิก</button>
                    </>
                ) : (
                    <button onClick={handleEditClick}>แก้ไข</button>
                )}
            </div>

            <div className="resetpassword" >
                <p>ยืนยันพลาสเวิดเดิม</p>
                <input
                    type="password"
                    value={password || ""}
                    onChange={(e) => setPassword(e.target.value)}
                /><br />
                <p>ตั้งรหัสผ่านใหม่</p>
                <input
                    type="password"
                    value={newPassword || ""}
                    onChange={(e) => setNewPassword(e.target.value)}
                /><br />
                <p>ยืนยันรหัสผ่านใหม่</p>
                <input
                    type="password"
                    value={confirmPassword || ""}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                /><br />
                <button onClick={handleResetPassword}>ยืนยัน</button>
            </div>
        </div>
    );
}

export default UserProfile;
