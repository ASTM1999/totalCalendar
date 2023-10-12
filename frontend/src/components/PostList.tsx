
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { announcementsState, activityState, campsState } from '../contexts/atoms/contextValueState';
import { useEffect, useState } from 'react';
import { UserService } from '../services/userServices';
import { activityServices } from '../services/activityService';
import { campServices } from '../services/campService';
import { announcementServices } from '../services/announementService';

const PostList = ({ type }: { type: string }) => {
    const posts = useRecoilValue(type === 'activity' ? activityState : type === 'camp' ? campsState : announcementsState);
    const [isEditingMap, setIsEditingMap] = useState<{ [key: string]: boolean }>({});

    const [userId, setUserId] = useState<string>()
    const [title, setTitle] = useState<string>()
    const [detail, setDetail] = useState<string>()

    const setActivities = useSetRecoilState(activityState);
    const setCamp = useSetRecoilState(campsState)
    const setAnnouncement = useSetRecoilState(announcementsState)
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
    const handleEditClick = (postId: string) => {
        setIsEditingMap((prevState) => ({
            ...prevState,
            [postId]: true,
        }));
    };
    const handleUpdateActivity = async (postId: string) => {
        try {
            console.log(postId)
            await activityServices.updateActivity(postId, title, detail, type);
            setIsEditingMap((prevState) => ({
                ...prevState,
                [postId]: false,
            }));
            getActivity()

        } catch (error) {
            console.error(`Error updating activity: ${error}`);
        }
    };
    const handleCancelClick = (postId: string) => {
        setIsEditingMap((prevState) => ({
            ...prevState,
            [postId]: false,
        }));
    };
    async function fetchUser() {
        const id = await UserService.getUserId()
        setUserId(id)
    }
    useEffect(() => {
        fetchUser()
    }, [])


    return (
        <div className="post" style={{ width: "100%" }}>
            <ul style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column"
            }}>
                {posts.map((post) => (
                    <li key={post._id} style={{
                        width: "80%",
                        padding: "10px",
                        backgroundColor: "#D9D9D9",
                        borderRadius: "8px",
                    }}>
                        {isEditingMap[post._id] ? (
                            <>
                                <input
                                    value={title}
                                    placeholder={post.title}
                                    onChange={(e) => setTitle(e.target.value)}
                                /><br />
                                <input
                                    value={detail}
                                    placeholder={post.detail}
                                    onChange={(e) => setDetail(e.target.value)}
                                /><br />
                            </>
                        ) : (
                            <>
                                <h3>{post.title}</h3>
                                <p>{post.detail}</p>
                                <p>{post.startDate}</p>
                                <p>{post.endDate}</p>
                            </>

                        )}
                        {(post.userOwner === userId) && (
                            isEditingMap[post._id] ? (
                                <>
                                    <button onClick={() => handleUpdateActivity(post._id)}>ยืนยัน</button>
                                    <button onClick={() => handleCancelClick(post._id)}>ยกเลิก</button>
                                </>
                            ) : (
                                <button onClick={() => handleEditClick(post._id)}>แก้ไข</button>
                            )
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
