import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { announcementsState, activityState, campsState, writingPostState, } from "../contexts/atoms/contextValueState";
import PostList from "./PostList";
import { activityServices } from "../services/activityService";
import { campServices } from "../services/campService";
import { announcementServices } from "../services/announementService";
// import SearchBar from "./SearchBar";
// import { EventsServices } from "../services/eventsService";
import { UserService } from "../services/userServices";
import WritingPopup from "./WritingPopup";
import { useNavigate } from "react-router-dom";
import Option from "./Option";
import Header from "./Header";
import Swal from "sweetalert2";

// interface activityProp {
//     selectedOption: string
// }


const Activity = () => {
    const [writingPost, setWritingPost] = useRecoilState(writingPostState);
    // const announcements = useRecoilValue(announcementsState);
    // const camps = useRecoilValue(campsState);
    const setActivities = useSetRecoilState(activityState);
    const setCamp = useSetRecoilState(campsState)
    const setAnnouncement = useSetRecoilState(announcementsState)
    // const setDataEvent = useSetRecoilState(dataEventState)
    const [selectedOption, setSelectedOption] = useState('มหาวิทยาลัยเทคโนโลยีสุรนารี');

    const [, setSearchText] = useState('');
    const login = UserService.isUserloggedIn()

    // console.log("selecttion: ",selectedOption)

    // 1. กำหนดค่าเริ่มต้นเป็น 'announcement'
    // const [activeType, setActiveType] = useState('announcement');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [role, setRole] = useState<string | null>()
    const [detail, setDetail] = useState('')
    const [pic, setPic] = useState('')
    const [title, setTitle] = useState('')
    const [id, setId] = useState('')

    const [selectedDateStart, setSelectedDateStart] = useState<Date | null>(new Date());
    const [selectedDateEnd, setSelectedDateEnd] = useState<Date | null | any>(new Date());
    const [username, setUserName] = useState<string | null>()
    const [option, setOption] = useState<string | null>()





    // console.log(writingPost)
    const [activeTab, setActiveTab] = useState("announcement");
    const navigate = useNavigate()
    const handleTabClick = (tabName: any) => {
        setActiveTab(tabName);
        setWritingPost({ type: tabName, title: '', detail: '' });
    };
    // console.log(writingPost)
    // console.log(writingPost.type)
    const handleClickHome = () => {
        navigate('/')
    }





    // const handleTypeChange = (type: any) => {
    //     // setActiveType(type);
    //     setWritingPost({ type, title: '', detail: '' });

    // };




    // const getEventData = async () => {
    //     try {
    //         const dataEvent = await EventsServices.getEvents()
    //         setDataEvent(dataEvent)
    //     } catch (err) {
    //         console.log(`Error fetch data: ${err}`)
    //     }
    // }



    // const handleSearch = (text: any) => {
    //     setSearchText(text);
    // };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };
    const handleSaveClick = async () => {
        try {
            if (!activeTab || !title || !detail || !id || !selectedDateStart || !selectedOption) {
                console.error("กรุณากรอกข้อมูลให้ครบถ้วน");
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                })
                return;
            } else if (new Date() > new Date(selectedDateEnd)) {
                console.error("เลือกวันสิ้นสุดให้มากกว่าวันปัจจุบัน");
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'เลือกวันสิ้นสุดให้มากกว่าวันปัจจุบัน',
                })
                return;
            }

            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, post it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const createActivityData = {
                        type: activeTab,
                        title: title,
                        detail: detail,
                        userOwner: id,
                        startDate: selectedDateStart,
                        endDate: selectedDateEnd,
                        option: selectedOption,
                        picture: images,
                    };
                    console.log(createActivityData)
                    await activityServices.createActivity(createActivityData, activeTab);
                    Swal.fire(
                        'Created!',
                        'Your file has been Created.',
                        'success'
                    )
                    setIsEditing(false);
                    fetchActivity()
                }
            })

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                // footer: '<a href="">Why do I have this issue?</a>'
            })
            console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูลผู้ใช้:", error);
        }
    }
    const handleOptionChange = async (event: any) => {
        // console.log("Handle option click");
        // console.log("selectedOption Before:", selectedOption);
        // console.log("event:", event.target.value);

        setSelectedOption(event.target.value);
        setTimeout(async (newOption: any) => {
            // console.log("selectedOption After:", newOption);


            const ac = await activityServices.getActivity(newOption)
            const ca = await campServices.getCamp(newOption)
            const an = await announcementServices.getannouncement(newOption);
            setActivities(ac)
            setCamp(ca)
            setAnnouncement(an);
        }, 0, event.target.value);
    };


    async function fetchUser() {
        const id = await UserService.getUserId()
        const data = await UserService.getUserData(id)
        const username = await UserService.getUsername()
        setUserName(username)
        setRole(data.role)
        setId(id)
    }
    const fetchActivity = async () => {
        try {
            const option = await UserService.getOption()
            setOption(option)
            const ac = await activityServices.getActivity(selectedOption)
            const ca = await campServices.getCamp(selectedOption)
            const an = await announcementServices.getannouncement(selectedOption)
            // console.log("announcementServices: ", an)
            setActivities(ac)
            setCamp(ca)
            setAnnouncement(an)
        } catch (err) {
            console.log(`Error fetching data: ${err}`)
        }
    }
    const [images, setImage] = useState<any>([])
    const [imageURLs, setImageURLs] = useState<any>([])

    // const fetchImage = () => {
    //     if (images.length < 1) return;
    //     const newImageUrls: any = []
    //     images.forEach(image => newImageUrls.push(URL.createObjectURL(image)))
    //     setImageURLs(newImageUrls)
    // }
    // function onImageChange(e:any) {
    //     setImageURLs([...e.target.files])
    // }

    useEffect(() => {
        fetchActivity()
        // getEventData
        fetchUser()
        // fetchImage()
    }, [])


    // const onPicChange = (acceptedFiles: any) => {
    //     setUploadedImage(acceptedFiles[0]);
    //     console.log(uploadedImage)
    // };

    // console.log('images: ',images)
    // console.log('imageURLs: ',imageURLs)
    return (
        <>
            <Header />

            <div className="activity">
                <div className="container-activity">

                    <div className="headBox">
                        <div className="dv-headbox">
                            <div className="">

                                <h1>Announcement</h1>
                                <div className="breadcrum-info">
                                    <b>
                                        <p onClick={handleClickHome} style={{ marginRight: "6px", cursor: "pointer" }}>Home</p>
                                    </b>
                                    <p>- {username}</p>
                                </div>
                            </div>
                            <div className="bt-activity" style={{ marginRight: "20px" }}>
                                <div style={{ marginRight: "20px" }}>
                                    <Option selectedOption={selectedOption} onOptionChange={handleOptionChange} />
                                </div>
                                {((login && selectedOption === option)|| role === 'superadmin') && (
                                    <button onClick={handleEditClick} className="bt-headPD">Create</button>
                                )}
                            </div>
                        </div>
                    </div>



                    <div className="headActivity">

                        {selectedOption === 'มหาวิทยาลัยเทคโนโลยีสุรนารี' ? (
                            <div className="nav-activity">
                                <ul className="nav-card-profile">
                                    <li className="nav-item">
                                        <a className={`nav-link-activity ${activeTab === "announcement" ? "active" : ""}`}
                                            onClick={() => handleTabClick("announcement")}>ประกาศเกี่ยวกับมหาลัย</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className={`nav-link-activity ${activeTab === "camp" ? "active" : ""}`}
                                            onClick={() => handleTabClick("camp")}>ค่ายของมหาลัย</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className={`nav-link-activity ${activeTab === "activity" ? "active" : ""}`}
                                            onClick={() => handleTabClick("activity")}>กิจกรรมภายในมหาลัย</a>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="nav-activity">
                                <ul className="nav-card-profile">
                                    <li className="nav-item">
                                        <a className={`nav-link-activity ${activeTab === "announcement" ? "active" : ""}`}
                                            onClick={() => handleTabClick("announcement")}>ประกาศของคณะ</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className={`nav-link-activity ${activeTab === "activity" ? "active" : ""}`}
                                            onClick={() => handleTabClick("activity")}>กิจกรรมภายในคณะ</a>
                                    </li>
                                </ul>
                            </div>
                        )}





                    </div>



                    <div className="body-activity">
                        <div style={{ height: "100%", display: "flex", justifyContent: "center", padding: "10px", borderRadius: "20px" }}>
                            <PostList type={writingPost.type} fetch={fetchActivity} />
                        </div>
                    </div>
                </div>


                {/* <div className="title-activity">
                <button
                    style={{ width: "33.33%", backgroundColor: activeType === 'announcement' ? '#FAF0D7' : '' }}
                    onClick={() => handleTypeChange('announcement')}
                >
                    ประกาศเกี่ยวกับมหาลัย
                </button>
                <button
                    style={{ width: "33.33%", backgroundColor: activeType === 'camp' ? '#FAF0D7' : '' }}
                    onClick={() => handleTypeChange('camp')}
                >
                    ค่ายต่างๆ
                </button>
                <button
                    style={{ width: "33.33%", backgroundColor: activeType === 'activity' ? '#FAF0D7' : '' }}
                    onClick={() => handleTypeChange('activity')}
                >
                    กิจกรรม
                </button>
            </div> */}


                {/* <div className="container-post">
                <SearchBar onSearch={handleSearch} /> */}
                {/* 
                {isEditing && (
                    <div className="writebox">
                        <p>1. ระบุหัวข้อในใบประกาศ</p>
                        <input
                            style={{ width: "980px" }}
                            type="title"
                            value={title || ""}
                            onChange={(e) => setTitle(e.target.value)}
                        /><br />
                        <p>2. เขียนรายละเอียดเพื่ออธิบาย</p>
                        <textarea
                            style={{ width: "980px" }}
                            value={detail || ""}
                            onChange={(e) => setdetail(e.target.value)}
                        />
                    </div>
                )} */}


                {
                    (role === "admin" || role === "superadmin" || (role === "user" && activeTab !== "announcement")) &&
                    (isEditing ? (
                        <>
                            {/* <button onClick={handleSaveClick}>ยืนยัน</button>
                            <button onClick={handleCancelClick}>ยกเลิก</button> */}
                            <WritingPopup
                                title={title}
                                detail={detail}
                                // imageURLs={imageURLs}
                                selectedDateStart={selectedDateStart}
                                selectedDateEnd={selectedDateEnd}
                                // onImageChange={(e) => onImageChange(e.target.value)}
                                onStartDate={(date) => setSelectedDateStart(date)}
                                onEndDate={(date) => setSelectedDateEnd(date)}
                                onTitleChange={(e) => setTitle(e.target.value)}
                                onDetailChange={(e) => setDetail(e.target.value)}
                                onConfirm={handleSaveClick}
                                onCancel={handleCancelClick}
                            />
                        </>
                    ) : (
                        <>
                            {/*  <button onClick={handleEditClick}>เขียน</button> */}
                        </>
                    )
                    )
                }
                {/* <PostList type={writingPost.type} /> */}
                {/* </div> */}
            </div >
        </>
    );
}

export default Activity;
