
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { announcementsState, activityState, campsState } from '../contexts/atoms/contextValueState';
import { useEffect, useState } from 'react';
import { UserService } from '../services/userServices';
import { activityServices } from '../services/activityService';
import { campServices } from '../services/campService';
import { announcementServices } from '../services/announementService';
import SearchBar from './SearchBar';
import { Activity, Users } from '../services/interface';
import WritingPopup from './WritingPopup';

const PostList = ({ type }: { type: string }) => {
    const posts = useRecoilValue(type === 'activity' ? activityState : type === 'camp' ? campsState : announcementsState);
    const [isEditingMap, setIsEditingMap] = useState<{ [key: string]: boolean }>({});
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [, setSearchText] = useState('');

    const [userId, setUserId] = useState<string>()
    const [title, setTitle] = useState<string>()
    const [detail, setDetail] = useState<string>()
    const [email, setEmail] = useState<string | null>()
    const [tel, setTel] = useState<string | null>()
    const [username, setUsername] = useState<string | null>()
    const [filteredData, setFilteredData] = useState<Activity[]>([]);

    const [userpost, setUserpost] = useState<Users>()

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
    const handleCancelClick = (postId: string) => {
        setIsEditingMap((prevState) => ({
            ...prevState,
            [postId]: false,
        }));
    };
    const handleUpdateActivity = async (postId: any) => {
        try {
            console.log(postId)
            const updateActivity = await activityServices.updateActivity(postId, title, detail, type);
            console.log("ipdateActivity: ", updateActivity)
            setIsEditingMap((prevState) => ({
                ...prevState,
                [postId]: false,
            }));
            getActivity()

        } catch (error) {
            console.error(`Error updating activity: ${error}`);
        }
    };
    function formatDate(e: any) {
        const dateTime = new Date();
        const justLocalDate = dateTime.toLocaleDateString();
        return justLocalDate
    }
    const fetchUserData = async () => {
        try {
            const tel = await UserService.getTel()
            setTel(tel)
            const userEmail = await UserService.getEmail()
            setEmail(userEmail)
            const id = await UserService.getUserId()
            setUserId(id)
            const name = await UserService.getUsername()
            setUsername(name)

        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }
    const handleSearch = (text: any) => {
        setSearchText(text);
    }
    const handleClickPost = async (e: any) => {
        const filtered = posts.filter((item: any) => item._id === e);
        const ownerPost = filtered.map((e: any) => e.userOwner)
        const userPost = await UserService.getUserData(ownerPost[0])
        setUserpost(userPost)
        setFilteredData(filtered);
    }
    useEffect(() => {
        fetchUserData()
        console.log("userpost useEffect: ", userpost)
    }, [userpost])

    const [selectedDateStart, setSelectedDateStart] = useState<Date | null>(new Date());
    const [selectedDateEnd, setSelectedDateEnd] = useState<Date | null>(new Date());

    return (
        <div className="post-list">

            <div className="post">
                <ul className='postlist-ul'>
                    <SearchBar onSearch={handleSearch} />
                    {posts.map((post) => (
                        <li key={post._id} className='postlist-li'>
                            <div className='div-post-li' onClick={() => handleClickPost(post._id)}>
                                <h2>{post.title}</h2>
                                <p>{formatDate(post.startDate)} - {formatDate(post.endDate)}</p>
                            </div>

                            {/* )} */}
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

            <div className="contantActivity">
                {filteredData.map((item) => (
                    <>
                        <div className="head-contantActivity">
                            <h1>Contact Poster</h1>
                            <div className="cpname">
                                <p>Post by</p>
                                <p>{userpost?.username}</p>
                                <p>{userpost?.email}</p>
                            </div>

                            <div className="cptel">
                                <p>เบอร์ติดต่อ: </p>
                                <p>{userpost?.tel}</p>
                            </div>
                        </div>

                        <div className="body-contantActivity" key={item._id}>
                            <div className="hbody-contantActivity">
                                <h2>
                                    {item.title}
                                </h2>
                            </div>
                            <div className="dbody-containActivity">
                                {item.detail}
                            </div>
                        </div>
                        <div className="bt-edit">
                            {(item.userOwner === userId) && (
                                !isEditingMap[item._id] ? (
                                    <div className="" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <button className='bt-st-sc' onClick={() => handleEditClick(item._id)}>แก้ไข</button>
                                    </div>
                                ) : (
                                    <>
                                        <WritingPopup
                                            title={item.title}
                                            detail={item.detail}
                                            selectedDateStart={selectedDateStart}
                                            selectedDateEnd={selectedDateEnd}
                                            onStartDate={(date) => setSelectedDateStart(date)}
                                            onEndDate={(date) => setSelectedDateEnd(date)}
                                            onTitleChange={(e) => setTitle(e.target.value)}
                                            onDetailChange={(e) => setDetail(e.target.value)}
                                            onConfirm={() => handleUpdateActivity(item._id)}
                                            onCancel={() => handleCancelClick(item._id)}
                                        />
                                    </>
                                )

                            )}
                        </div>
                    </>
                ))}
            </div>

        </div>
    );
};

export default PostList;
