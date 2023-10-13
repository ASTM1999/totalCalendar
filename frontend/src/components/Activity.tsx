import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { announcementsState, activityState, campsState, writingPostState, dataEventState } from "../contexts/atoms/contextValueState";
import PostList from "./PostList";
import { activityServices } from "../services/activityService";
import { campServices } from "../services/campService";
import { announcementServices } from "../services/announementService";
import SearchBar from "./SearchBar";
import { EventsServices } from "../services/eventsService";
import { UserService } from "../services/userServices";
import WritingPopup from "./WritingPopup";
import { useNavigate } from "react-router-dom";

interface activityProp {
    selectedOption: string
}


const Activity = (selectedOption: activityProp) => {
    const [writingPost, setWritingPost] = useRecoilState(writingPostState);
    // const announcements = useRecoilValue(announcementsState);
    // const camps = useRecoilValue(campsState);
    const setActivities = useSetRecoilState(activityState);
    const setCamp = useSetRecoilState(campsState)
    const setAnnouncement = useSetRecoilState(announcementsState)
    const setDataEvent = useSetRecoilState(dataEventState)

    const [, setSearchText] = useState('');

    // console.log("selecttion: ",selectedOption)

    // 1. กำหนดค่าเริ่มต้นเป็น 'announcement'
    // const [activeType, setActiveType] = useState('announcement');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [role, setRole] = useState<string | null>()
    const [detail, setDetail] = useState('')
    const [title, setTitle] = useState('')
    const [id, setId] = useState('')

    const [selectedDateStart, setSelectedDateStart] = useState<Date | null>(new Date());
    const [selectedDateEnd, setSelectedDateEnd] = useState<Date | null>(new Date());


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





    const handleTypeChange = (type: any) => {
        // setActiveType(type);
        setWritingPost({ type, title: '', detail: '' });
        
    };


    const fetchActivity = async () => {
        try {
            const ac = await activityServices.getActivity()
            const ca = await campServices.getCamp()
            const an = await announcementServices.getannouncement()
            console.log(ac,ca,an)
            setActivities(ac)
            setCamp(ca)
            setAnnouncement(an)
        } catch (err) {
            console.log(`Error fetching data: ${err}`)
        }
    }

    const getEventData = async () => {
        try {
            const dataEvent = await EventsServices.getEvents()
            setDataEvent(dataEvent)
        } catch (err) {
            console.log(`Error fetch data: ${err}`)
        }
    }

    async function fetchUser() {
        const id = await UserService.getUserId()
        const data = await UserService.getUserData(id)
        setRole(data.role)
        setId(id)
    }

    const handleSearch = (text: any) => {
        setSearchText(text);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };
    const handleSaveClick = async () => {
        try {
            const createActivityData = {
                type: activeTab,
                title: title,
                detail: detail,
                userOwner: id,
                startDate: selectedDateStart,
                endDate: selectedDateEnd,
                option: selectedOption.selectedOption
                //
            };
            console.log(createActivityData)
            await activityServices.createActivity(createActivityData, activeTab);
            setIsEditing(false);
            fetchActivity()
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูลผู้ใช้:", error);
        }
    }



    useEffect(() => {
        fetchActivity()
        getEventData()
        fetchUser()
    }, [])


    return (
        <div className="activity">

            <div className="container-activity">

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



                <div className="headActivity">
                    <div className="headBox">
                        <h1>{activeTab}</h1>
                        <div className="breadcrum-info">
                            <b>
                                <p onClick={handleClickHome} style={{ marginRight: "6px", cursor: "pointer" }}>Home</p>
                            </b>
                            <p>- Accout</p>
                        </div>
                    </div>

                    <div className="bt-activity">
                        <button onClick={handleEditClick} className="bt-headPD">Create</button>
                    </div>
                </div>



                <div className="body-activity">
                    <div>
                        <PostList type={writingPost.type} />
                    </div>
                </div>
            </div>











            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>
            <p>w</p>

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


                {(role === "useradmin" || role === "admin" || (role === "user" && activeTab !== "announcement")) &&
                    (isEditing ? (
                        <>
                            {/* <button onClick={handleSaveClick}>ยืนยัน</button>
                            <button onClick={handleCancelClick}>ยกเลิก</button> */}
                            <WritingPopup
                                title={title}
                                detail={detail}
                                selectedDateStart={selectedDateStart}
                                selectedDateEnd={selectedDateEnd}
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
        </div>
    );
}

export default Activity;
