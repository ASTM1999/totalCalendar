import { useEffect, useState } from 'react';
import Option from './Option';
import { Contract } from '../services/interface';
import { contactService } from '../services/contactService';
import { UserService } from '../services/userServices';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';



const ContactAdmin = () => {
    const [title, setTitle] = useState("");
    const [recommend, setRecommend] = useState("");
    const [detail, setDetail] = useState("");

    const [selectedOption, setSelectedOption] = useState('');
    const login = UserService.isUserloggedIn()
    const [id, setId] = useState('')
    const [activeTab, setActiveTab] = useState("recommend");
    // const [role, setRole] = useState<string | null>()
    const navigate = useNavigate()

    const handleClickTitle = (num: any) => {
        setTitle(num);
    };

    const handleSubmit = async () => {
        if (login) {

            console.log('submit');
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Send it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        if (title && recommend) {
                            const createContract: Contract = {
                                title: title,
                                recommend: recommend,
                                userOwner: id,
                                time: new Date()
                            }
                            console.log("createContract: ", createContract)
                            await contactService.createContact(createContract)
                            Swal.fire(
                                'Sended!',
                                'Your file has been Sended.',
                                'success'
                            )
                        } else if (selectedOption && detail) {
                            const createContract: Contract = {
                                require_role: selectedOption,
                                detail: detail,
                                userOwner: id,
                                time: new Date()
                            }
                            console.log("createContract: ", createContract)
                            await contactService.createContact(createContract)
                            Swal.fire(
                                'Required!',
                                'Your file has been Required.',
                                'success'
                            )
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'กรอกข้อมูลไม่ครบ',
                                // footer: '<a href="">Why do I have this issue?</a>'
                            })
                        }

                    } catch (err) {
                        Swal.fire({
                            icon: 'error',
                            title: 'File Empty...',
                            text: 'please Send file!',
                            // footer: '<a href="">Why do I have this issue?</a>'
                        })
                    }
                }
            })
        } else {
            navigate('/login')

        }

    };

    const handleRecommend = (e: any) => {
        setRecommend(e.target.value);
    };

    const handleDetail = (e: any) => {
        setDetail(e.target.value);
    };

    const handleOptionChange = (event: any) => {
        setSelectedOption(event.target.value);
    };


    async function fetchUser() {
        const id = await UserService.getUserId()
        const data = await UserService.getUserData(id)
        // setRole(data.role)
        setId(id)
    }

    const handleClickHome = () => {
        navigate('/')
    }
    const handleTabClick = (tabName: any) => {
        setActiveTab(tabName);
    };
    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <>
            <Header />

            <div className="ContactAdmin" >
                {/* <h1 style={{ marginBottom: '135px', marginTop: '80px' }}>ติดต่อ Admin</h1> */}
                <div className="container-activity">
                    <div className="headBox">
                        <div className="dv-headbox">
                            <div className="">
                                <h1>Contact Us</h1>
                                <div className="breadcrum-info">
                                    <b>
                                        <p onClick={handleClickHome} style={{ marginRight: "6px", cursor: "pointer" }}>Home</p>
                                    </b>
                                    <p>- Accout</p>
                                </div>
                            </div>
                            <div className="bt-activity" style={{ marginRight: "20px" }}>
                                {/* <div >
                                <Option selectedOption={selectedOption} onOptionChange={handleOptionChange} />
                            </div> */}
                                {/* <button onClick={handleEditClick} className="bt-headPD">Create</button> */}
                            </div>
                        </div>
                    </div>

                    <div className="headActivity">
                        <div className="nav-activity">
                            <ul className="nav-card-profile">
                                <li className="nav-item">
                                    <a className={`nav-link-activity ${activeTab === "recommend" ? "active" : ""}`} onClick={() => handleTabClick("recommend")}>ข้อเสนอแนะ</a>
                                </li>
                                <li className="nav-item">
                                    <a className={`nav-link-activity ${activeTab === "optionRole" ? "active" : ""}`} onClick={() => handleTabClick("optionRole")}>ขอบทบาทการเป็น Admin</a>
                                </li>
                            </ul>
                        </div>
                    </div>




                    <div className="box-ContactAdmin">
                        {activeTab === "recommend" ? (
                            <div className="boxInsite1">
                                <div className="icon-h1" style={{ marginBottom: "20px", borderBottom: "2px solid whitesmoke", width: "100%" }}>
                                    <img src="../../public/pen-line.svg" alt="logOut" style={{ width: "36px", marginRight: "10px" }} />
                                    <h1>ข้อเสนอแนะ</h1>
                                </div>
                                <div className="eventn">

                                    {/* <h1 style={{ marginBottom: "20px", borderBottom: "2px solid whitesmoke" }}>ข้อเสนอแนะ</h1> */}

                                    <h3 className="eventname">เรื่อง</h3>
                                    <input
                                        style={{ fontSize: "18px", paddingLeft: "20px", height: "49.2px", backgroundColor: "#F9F9F9", border: "none", borderRadius: "20px" }}
                                        type="text"
                                        placeholder="หัวข้อ"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="eventds">
                                    <h3>รายละเอียด</h3>
                                    <textarea
                                        style={{ fontSize: "18px", padding: "20px", height: "270px", backgroundColor: "#F9F9F9", border: "none", borderRadius: "20px" }}
                                        placeholder="รายละเอียด"
                                        value={recommend}
                                        onChange={handleRecommend}
                                    />
                                </div>



                                {/* <h3 className='headerContact'>ข้อเสนอแนะ</h3>
                            <textarea
                                value={inputValue}
                                onChange={handleInputChange}
                                placeholder='เขียนข้อเสนอแนะ'
                                className='inputContact'
                            /> */}
                                <div>
                                    <button className="bt-headPD" onClick={handleSubmit}>
                                        Send
                                    </button>
                                </div>


                            </div>
                        ) : (
                            <div className="boxInsite2">
                                <div className="icon-h1" style={{ marginBottom: "20px", borderBottom: "2px solid whitesmoke", width: "100%" }}>
                                    <img src="../../public/hammer.svg" alt="logOut" style={{ width: "36px", marginRight: "10px" }} />
                                    <h1>ขอเป็น Admin</h1>
                                </div>
                                <div className="" style={{ width: "100%" }}>

                                    {/* <h2 className='headerContact1'>บทบาท admin vvv</h2> */}
                                    {/* <h1 style={{ marginBottom: "20px", borderBottom: "2px solid whitesmoke", width: "100%" }}>ขอเป็น Admin</h1> */}
                                    <h3>เลือกบทบาท</h3>
                                    <div className="options">
                                        <Option selectedOption={selectedOption} onOptionChange={handleOptionChange} />
                                    </div>


                                </div>
                                <div className="eventds">
                                    <h3 style={{ marginTop: "30px" }}>รายละเอียด</h3>
                                    <textarea
                                        style={{ fontSize: "18px", padding: "20px", height: "270px", backgroundColor: "#F9F9F9", border: "none", borderRadius: "20px" }}
                                        placeholder="รายละเอียด"
                                        value={detail}
                                        onChange={handleDetail}
                                    />
                                </div>
                                <div>
                                    <button className="bt-headPD" onClick={handleSubmit}>Send</button>
                                </div>
                                <p style={{ marginTop: "10px" }}>ติดต่อเรื่องบทบาท 099-299-9999</p>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactAdmin;
