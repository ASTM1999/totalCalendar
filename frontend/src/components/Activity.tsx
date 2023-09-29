import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { announcementsState, activityState, campsState, writingPostState, dataEventState } from "../contexts/atoms/contextValueState";
import PostList from "./PostList";
import { activityServices } from "../services/activityService";
import { campServices } from "../services/campService";
import { announcementServices } from "../services/announementService";
import SearchBar from "./SearchBar";
import { EventsServices } from "../services/eventsService";

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

    // 2. ฟังก์ชันเมื่อคลิกปุ่มเปลี่ยนประเภทของโพสต์
    const handleTypeChange = (type: any) => {
        setActiveType(type);
        setWritingPost({ type, title: '', detail: '' });
    };

    const createActivity = async () => {
        // console.log(activeType)

    }
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
        try{
            const dataEvent = await EventsServices.getEvents()
            setDataEvent(dataEvent)
        } catch (err) {
            console.log(`Error fetch data: ${err}`)
        }
    }
    

    const handleSearch = (text:any) => {
        setSearchText(text);
    };
    useEffect(() => {
        getActivity()
        getEventData()
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
                <PostList type={writingPost.type} />
                <button
                    onClick={createActivity}
                >
                    เขียน
                </button>
            </div>
        </div>
    );
}

export default Activity;
