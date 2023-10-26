import { useState, useEffect } from "react";
import { UserService } from "../services/userServices";
import { Users } from "../services/interface";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Swal from "sweetalert2";

function UserProfile() {
    const [name, setName] = useState<string | null>(null);
    const [tel, setTel] = useState<string | undefined>(undefined);
    const [email, setEmail] = useState<string | null>(null);
    const [option, setOption] = useState<string | null>(null);
    const [role, setRole] = useState<string | undefined>(undefined);
    const [userId, setUserId] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isEditingEmail, setIsEditingEmail] = useState<boolean>(false);

    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState("overview");
    // resetpassword
    const [userLoggedIn, setUserLoggedIn] = useState<Users | undefined>();
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    // const [picture, setPicture] = useState()

    // console.log("picture:", picture)

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
                    const option = await UserService.getOption()
                    setOption(option)

                    // setPicture(pic)
                }
            } catch (error) {
                console.error("เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:", error);
            }
        }
        fetchUserData();
    }, []);

    const resetPassword = () => {
        setIsEditing(true);
    }

    // console.log(role)

    const handleCancelClick = () => {
        setIsEditing(false);

    };
    const handleCancelEmail = () => {
        setIsEditingEmail(false);
    };

    const handleSaveClick = async () => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Changed it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const updatedUserData = {
                        username: name,
                        tel: tel,
                        email: email,
                        role: role,
                    };
                    console.log(updatedUserData)
                    await UserService.updateUserData(userId, updatedUserData);
                    // alert('success')
                    setIsEditing(false);
                    Swal.fire(
                        'Changed!',
                        'Your file has been Changed.',
                        'success'
                    )
                }
            })

        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูลผู้ใช้:", error);
            Swal.fire({
                icon: 'error',
                title: 'File Empty...',
                text: 'please choose file!',
                // footer: '<a href="">Why do I have this issue?</a>'
            })
        }
    };

    const handleClickHome = () => {
        navigate('/')
    }

    const handleResetPassword = async () => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Changed it!'
            }).then(async (result) => {
                if (result.isConfirmed) {

                    if (newPassword === "") {
                        console.error("พลาสเวิดว่างเปล่า")
                        Swal.fire({
                            icon: 'error',
                            title: 'Password Empty...',
                            text: 'พลาสเวิดว่างเปล่า!',
                            // footer: '<a href="">Why do I have this issue?</a>'
                        })
                        return;
                    } else if (newPassword !== confirmPassword) {
                        console.error("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
                        Swal.fire({
                            icon: 'error',
                            title: 'Password Not Match...',
                            text: 'รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน!',
                            // footer: '<a href="">Why do I have this issue?</a>'
                        })
                        return;


                    }
                    else if (userLoggedIn?.password !== password) {
                        console.error(`รหัสผ่านไม่ถูกต้อง`)
                        Swal.fire({
                            icon: 'error',
                            title: 'Current Password...',
                            text: 'รหัสผ่านไม่ถูกต้อง!',
                            // footer: '<a href="">Why do I have this issue?</a>'
                        })
                        return;
                    }


                    const updateuserPassword = { ...userLoggedIn, password: newPassword }
                    console.log(updateuserPassword)
                    await UserService.updateUserData(userId, updateuserPassword);
                    // รีเซ็ตรหัสผ่านสำเร็จ
                    console.log("รีเซ็ตรหัสผ่านสำเร็จ");
                    Swal.fire(
                        'Changed!',
                        'Your file has been Changed.',
                        'success'
                      )
                }
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                // footer: '<a href="">Why do I have this issue?</a>'
            })
            console.error("เกิดข้อผิดพลาดในการรีเซ็ตรหัสผ่าน:", error);
        }
    };

    const handleTabClick = (tabName: any) => {
        setActiveTab(tabName);
    };

    const handleEditEmail = () => {
        setIsEditingEmail(true);
    }
    const handleResetEmail = () => {
        console.log("test")
    }

    return (
        <>
            <Header />

            <div className="userprofile">
                <div className="containerProfile">


                    <div className="head-info">
                        <div className="head-info1">
                            <h1>Accout Overview</h1>
                            <div className="breadcrum-info">
                                <b>

                                    <p onClick={handleClickHome} style={{ marginRight: "6px", cursor: "pointer" }}>Home</p>
                                </b>
                                <p>- Accout</p>
                            </div>
                        </div>
                    </div>

                    <div className="card-profile">
                        <div className="picture">
                            {/* <img
                        src={picture} 
                        alt="User Profile Picture" 
                    /> */}
                        </div>

                        <ul className="nav-card-contact">
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
                            <div className="icon-h1">
                                <img src="../../public/address-card-solid.svg" alt="logOut" style={{ width: "36px", marginRight: "10px" }} />
                                <h1>Profile Details</h1>
                            </div>
                            <button className="bt-headPD" onClick={() => handleTabClick("setting")}>

                                Edit Profile</button>
                        </div>
                        <div className="containerPD">
                            <div className="lbox">
                                <label style={{ width: "350px" }}>Full Name</label>
                                <p className="plabel">{name}</p>
                            </div>

                            <div className="lbox">
                                <label style={{ width: "350px" }}>Contact Phone</label>
                                <p className="plabel">{tel}</p>
                            </div>

                            <div className="lbox">
                                <label style={{ width: "350px" }}>Contact Email</label>
                                <p className="plabel">{email}</p>
                            </div>

                            <div className="lbox">
                                <label style={{ width: "350px" }}>Role</label>
                                <p className="plabel">{role}</p>
                            </div>
                            {role === 'admin' && (
                                <div className="lbox">
                                    <label style={{ width: "350px" }}>Admin of</label>
                                    <p className="plabel">{option}</p>

                                </div>
                            )}
                        </div>
                    </div>


                    <div className="profile-details" style={{ display: activeTab === "setting" ? "block" : "none" }}>
                        <div className="headSet">
                            <div className="icon-h1">
                                <img src="../../public/gears.svg" alt="logOut" style={{ width: "36px", marginRight: "10px" }} />
                                <h1>Profile Setting</h1>
                            </div>
                        </div>
                        <div className="containerST">
                            <div className="lbox">
                                <label style={{ width: "350px" }}>Full Name</label>
                                <input
                                    className="input-pf"
                                    type="text"
                                    value={name || ""}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="lbox">
                                <label style={{ width: "350px" }}>Contact Phone</label>
                                <input
                                    className="input-pf"
                                    type="tel"
                                    value={tel || ""}
                                    onChange={(e) => setTel(e.target.value)}
                                />
                            </div>

                            <div className="lbox">
                                <label style={{ width: "350px" }}>Contact Email</label>
                                <input
                                    className="input-pf"
                                    type="email"
                                    value={email || ""}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="lbox">
                                <label style={{ width: "350px" }}>Role</label>
                                <p className="plabel">{role}</p>
                            </div>

                        </div>
                        <div className="div-bt-button-st">
                            <button className="bt-st" onClick={() => handleTabClick("overview")}>Discard</button>
                            <button className="bt-st-sc" onClick={handleSaveClick}>Save Change</button>
                        </div>

                    </div>


                    <div className="profile-details" style={{ display: activeTab === "security" ? "block" : "none" }}>
                        <div className="headSet">
                            <div className="icon-h1">
                                <img src="../../public/shield-halved.svg" alt="logOut" style={{ width: "36px", marginRight: "10px" }} />
                                <h1>security</h1>
                                {/* <h1>Profile Details</h1> */}
                            </div>
                        </div>
                        <div className="containerSR">
                            <div className="lboxdown">
                                {!isEditingEmail ? (
                                    <>
                                        <div className="">
                                            <label htmlFor="">Email Address</label>
                                            <p className="plabel">{email}</p>
                                        </div>
                                        {/* <div>
                                            <button className="bt-st" onClick={handleEditEmail}>Change Email</button>
                                        </div> */}
                                    </>
                                ) : (
                                    <>
                                        <div >
                                            <div className="rspassword">
                                                <label style={{ width: "350px" }}>Enter new Email Address</label>
                                                <input
                                                    className="input-pf"
                                                    type="email"
                                                    value={email || ""}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                            <div className="rspassword">
                                                <label htmlFor="input">Current Password</label>
                                                <input
                                                    className="input-pf"
                                                    type="password"
                                                    value={password || ""}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                /><br />
                                            </div>
                                            <div>
                                                <button className="bt-st-sc" onClick={handleResetEmail}>Update Email</button>
                                                <button className="bt-st" onClick={handleCancelEmail}>Cancel</button>
                                            </div>
                                        </div>
                                    </>
                                )
                                }

                            </div>
                            <div className="lboxdown">
                                {!isEditing ? (
                                    <>
                                        <div className="">
                                            <label htmlFor="">Password</label>
                                            <p className="plabel">********</p>
                                        </div>
                                        <div>
                                            <button className="bt-st" onClick={resetPassword}>Reset Password</button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <div className="lbox-rs">
                                                <div className="rspassword">
                                                    <label htmlFor="input">Current Password</label>
                                                    <input
                                                        className="input-pf"
                                                        type="password"
                                                        value={password || ""}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    /><br />
                                                </div>

                                                <div className="rspassword">
                                                    <label htmlFor="">New Password</label>
                                                    <input
                                                        className="input-pf"
                                                        type="password"
                                                        value={newPassword || ""}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                    /><br />
                                                </div>

                                                <div className="rspassword">
                                                    <label htmlFor="">Comfirm New Password</label>
                                                    <input
                                                        className="input-pf"
                                                        type="password"
                                                        value={confirmPassword || ""}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                    /><br />
                                                </div>

                                            </div>
                                            <div>
                                                <button className="bt-st-sc" onClick={handleResetPassword}>Update Password</button>
                                                <button className="bt-st" onClick={handleCancelClick}>Cancel</button>
                                            </div>
                                        </div>
                                    </>
                                )}


                            </div>
                        </div>
                    </div>


                    {/* <div className="info">
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
            </div> */}

                    {/* <div className="resetpassword" >
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
            </div> */}
                </div>
            </div>
        </>
    );
}

export default UserProfile;
