const UserProfile = () => {
    return (
        <div className="userprofile">
            <div className="iconPic">

            </div>

            <div className="info">
                <h3 className="infouser">ข้อมูลผู้ใช้</h3>
                <div className="boxInfo">
                    <p className="text-info">ชื่อนามสกุล</p>
                    <p className="text-info">อีเมล</p>
                    <p className="text-info">เบอร์โทร</p>
                    <p className="text-info">บทบาท</p>
                </div>
                <button>แก้ไข</button>
            </div>

            <div className="password-info">
                <div className="boxPassword">
                    <input className="passwordInput" placeholder="รหัสผ่านเดิม" />
                    <input className="passwordInput" placeholder="รหัสผ่านเดิม" />
                    <input className="passwordInput" placeholder="รหัสผ่านเดิม" />
                </div>
                <div className="bt-passwordInfo">
                    <button>ยืนยัน</button>
                </div>
            </div>
        </div>
    )
}

export default UserProfile