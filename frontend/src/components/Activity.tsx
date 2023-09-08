import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { activitiesState, announcementsState, campsState, writingPostState } from "../contexts/atoms/contextValueState";
import PostList from "./PostList";

const Activity = () => {
    const [writingPost, setWritingPost] = useRecoilState(writingPostState);
    const announcements = useRecoilValue(announcementsState);
    const camps = useRecoilValue(campsState);
    const activities = useRecoilValue(activitiesState);

    // 1. กำหนดค่าเริ่มต้นเป็น 'announcement'
    const [activeType, setActiveType] = useState('announcement');

    // 2. ฟังก์ชันเมื่อคลิกปุ่มเปลี่ยนประเภทของโพสต์
    const handleTypeChange = (type: any) => {
        setActiveType(type);
        setWritingPost({ type, title: '', detail: '' });
    };

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
                <div className="search">
                    <input placeholder="search" />
                </div>
                <PostList type={writingPost.type} />
                <button>เขียน</button>
            </div>
        </div>
    );
}

export default Activity;
