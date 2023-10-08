import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { announcementsState, activityState, campsState, writingPostState, dataEventState } from "../contexts/atoms/contextValueState";
import PostList from "./PostList";
import { activityServices } from "../services/activityService";
import { campServices } from "../services/campService";
import { announcementServices } from "../services/announementService";
import SearchBar from "./SearchBar";
import { EventsServices } from "../services/eventsService";
import { UserService } from "../services/userServices";

const Activity = () => {
    const [writingPost, setWritingPost] = useRecoilState(writingPostState);
    // const announcements = useRecoilValue(announcementsState);
    // const camps = useRecoilValue(campsState);
    const [activities, setActivities] = useRecoilState(activityState);
    const [camp, setCamp] = useRecoilState(campsState)
    const [announcement, setAnnouncement] = useRecoilState(announcementsState)
    const [searchText, setSearchText] = useState('');
    const [dataEvent, setDataEvent] = useRecoilState(dataEventState)



    // 1. กำหนดค่าเริ่มต้นเป็น 'announcement'
    const [activeType, setActiveType] = useState('announcement');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [role, setRole] = useState<string | null>()
    const [detail, setdetail] = useState('')
    const [title, setTitle] = useState('')
    const [id, setId] = useState('')
    // const [userId, setUserId] = useState('')


    // 2. ฟังก์ชันเมื่อคลิกปุ่มเปลี่ยนประเภทของโพสต์
    const handleTypeChange = (type: any) => {
        setActiveType(type);
        setWritingPost({ type, title: '', detail: '' });
    };


    const getActivity = async () => {
        try {
            const ac = await activityServices.getActivity()
            const ca = await campServices.getCamp()
            const an = await announcementServices.getannouncement()
            // console.log(ac,ca,an)
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
        const currentDate = new Date()
        try {
            const createActivityData = {
                type: activeType,
                title: title,
                detail: detail,
                userOwner: id,
                dateTime: currentDate.toISOString(),
                //
            };
            console.log(createActivityData)
            await activityServices.createActivity(createActivityData, activeType);
            setIsEditing(false);
            getActivity()
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูลผู้ใช้:", error);
        }
    }
    useEffect(() => {
        getActivity()
        getEventData()
        fetchUser()
    }, [])


    return (
        <div className="container-activity">
            <div className="title-activity">
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
            </div>


            <div className="container-post">
                <SearchBar onSearch={handleSearch} />

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
                )}
                {(role === "useradmin" || role === "admin" || (role === "user" && activeType !== "announcement")) &&
                    (isEditing ? (
                        <>
                            <button onClick={handleSaveClick}>ยืนยัน</button>
                            <button onClick={handleCancelClick}>ยกเลิก</button>
                        </>
                    ) : (
                        <button onClick={handleEditClick}>เขียน</button>
                    ))}
                <PostList type={writingPost.type} />





            </div>
        </div>
    );
}

export default Activity;
