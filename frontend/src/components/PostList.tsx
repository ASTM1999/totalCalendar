
import { useRecoilValue } from 'recoil';
import { announcementsState, activityState, campsState } from '../contexts/atoms/contextValueState';
import { useEffect, useState } from 'react';
import { UserService } from '../services/userServices';
import { activityServices } from '../services/activityService';
// import { campServices } from '../services/campService';
// import { announcementServices } from '../services/announementService';
import SearchBar from './SearchBar';
import { Activity, Users } from '../services/interface';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import angleRight from '../../public/angle-right.svg'
import angleLeft from '../../public/angle-left.svg'
import Comment from './Comment';

interface PropsPostList {
    type: string;
    fetch: () => void;
}


const PostList = ({ type, fetch }: PropsPostList) => {
    const posts = useRecoilValue(type === 'activity' ? activityState : type === 'camp' ? campsState : announcementsState);
    const [isEditingMap, setIsEditingMap] = useState<{ [key: string]: boolean }>({});

    // const [EditTitleMap, setEditTitleMap] = useState<{ [key: string]: string }>({});
    // console.log(posts)
    // console.log("posts : ", posts)
    // const [isEditing, setIsEditing] = useState<boolean>(false);



    const [userId, setUserId] = useState<string>()
    const [title, setTitle] = useState<string>()
    const [detail, setDetail] = useState<string>()
    // const [email, setEmail] = useState<string | null>()
    // const [tel, setTel] = useState<string | null>()
    // const [username, setUsername] = useState<string | null>()
    const [filteredData, setFilteredData] = useState<Activity[]>([]);

    const [userpost, setUserpost] = useState<Users>()
    const [selectedDateStart, setSelectedDateStart] = useState<Date | null>(new Date());
    const [selectedDateEnd, setSelectedDateEnd] = useState<Date | null>(new Date());




    function formatText(text: any) {
        if (!text) {
            return '';
        }

        // แยกบรรทัดโดย '\n'
        const lines = text.split('\n');

        // สร้างลำดับของข้อความ
        const formattedText = lines.map((line: any, index: any) => {
            return (
                <p key={index}>
                    {` ${line}`}
                </p>
            );
        });

        return formattedText.map((item: any, index: any) => (
            <div key={index}>{item.props.children}</div>
        ));
    }
    // console.log("currentPage: ", currentPage)
    // console.log("indexOfLastItem: ", indexOfLastItem)
    // console.log("indexOfFirstItem: ", indexOfFirstItem)
    // console.log("moreNewDate: ", moreNewDate)
    // console.log("currentItem: ", currentItem)


    // const setActivities = useSetRecoilState(activityState);
    // const setCamp = useSetRecoilState(campsState)
    // const setAnnouncement = useSetRecoilState(announcementsState)
    // const getActivity = async () => {
    //     try {
    //         const ac = await activityServices.getActivity()
    //         const ca = await campServices.getCamp()
    //         const an = await announcementServices.getannouncement(selectedOption)
    //         console.log("camp: ", ca)
    //         setActivities(ac)
    //         setCamp(ca)
    //         setAnnouncement(an)
    //     } catch (err) {
    //         console.log(`Error fetching data: ${err}`)
    //     }
    // }
    // console.log(posts)
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
        console.log("type:", type)
        try {
            const updateActivity = await activityServices.updateActivity(type, postId, title, detail, selectedDateStart, selectedDateEnd);
            console.log("ipdateActivity: ", updateActivity)
            setIsEditingMap((prevState) => ({
                ...prevState,
                [postId]: false,
            }));
            fetch()
        } catch (error) {
            console.error(`Error updating activity: ${error}`);
        }
    };
    function formatDate(e: any) {
        const justLocalDate = new Date(e).toLocaleDateString();
        return justLocalDate
    }
    function formatDateTime(dateTime: any) {
        const options: any = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' };
        const date = new Date(dateTime);
        const formattedDate = date.toLocaleDateString('en-US', options);
        const suffix = (date.getHours() >= 12) ? 'pm' : 'am';
        return `${formattedDate} - ${date.getHours() % 12}:${date.getMinutes()} ${suffix}`;
    }

    const fetchUserData = async () => {
        try {
            // const tel = await UserService.getTel()
            // setTel(tel)
            // const userEmail = await UserService.getEmail()
            // setEmail(userEmail)
            const id = await UserService.getUserId()
            setUserId(id)
            // const name = await UserService.getUsername()
            // setUsername(name)

        } catch (error) {
            console.error("Error fetching user data:", error);
        }
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
        // getActivity()
        // console.log("userpost useEffect: ", userpost)
    }, [userpost])




    //option
    const itemsPerPageOptions = [5, 10, 20];
    const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

    //แสดงหน้า
    const [currentPage, setCurrentPage] = useState(1)
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const moreNewDate = posts.filter((item) => new Date(item.endDate) > new Date())
    const currentItem = moreNewDate.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(moreNewDate.length / itemsPerPage);
    const [searchResults, setSearchResults] = useState<Activity[]>([]);
    const [searchValue, setSearchValue] = useState('');

    // console.log("currentItem: ", moreNewDate)
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map((number) => (
        <li
            key={number}
            // id={number}
            onClick={() => setCurrentPage(number)}
            className={number === currentPage ? "activePage" : ""}

        >
            {number}
        </li>
    ));


    const handleSearch = (value: string) => {
        // console.log("searchValue: ", searchValue)
        // console.log("value handleSearch: ", value)
        setSearchValue(value);
        const results: Activity[] = currentItem.filter((item) => item.title.includes(value));

        setTimeout(() => {
            setSearchResults(results);
        }, 100);
    };
    const displayItems = searchResults.length > 0 ? searchResults : currentItem;

    // console.log(type)
    // console.log(searchValue)
    // console.log("searchResults: ", searchResults)

    return (
        <div className="post-list">

            <div className="post">
                <ul className='postlist-ul'>
                    <SearchBar onSearch={handleSearch} />
                    {displayItems
                        .map((post) => (
                            <li key={post._id} className='postlist-li'>
                                <div className='div-post-li' onClick={() => handleClickPost(post._id)}>
                                    <h2>{post.title}</h2>
                                    <div className="post-h">
                                        {/* <p>{formatDate(post.startDate)} - {formatDate(post.endDate)}</p> */}
                                        {(post.userOwner === userId) && (
                                            <div className="icon-owner" style={{ fontSize: "16px" }}>
                                                👑
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))
                    }




                    <div className="pagination">
                        <div>
                            <select
                                className='selectPagination'
                                value={itemsPerPage}
                                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                            >
                                {itemsPerPageOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="numpage">
                            <button className="icon-rl"
                                onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                                disabled={currentPage === 1}
                            >
                                {/* Previous */}
                                <img src={angleLeft} />
                            </button>
                            <ul className="page-numbers">
                                {renderPageNumbers}
                            </ul>
                            <button className="icon-rl"
                                onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                                disabled={indexOfLastItem >= moreNewDate.length}
                            >
                                <img src={angleRight} />
                                {/* Next */}
                            </button>
                        </div>


                    </div>
                </ul>
            </div>

            <div className="contantActivity">
                <div className="contantActivity-container">
                    {filteredData.map((item) => (
                        <>
                            <div className="head-contantActivity">
                                <h1>Contact Poster</h1>
                                <div className="cpname">
                                    <p>Post by</p>
                                    <b>
                                        <p>{userpost?.username}</p>
                                    </b>
                                    <p>{userpost?.email}</p>
                                </div>

                                <div className="cptel">
                                    <p style={{ marginRight: "5px" }}>เบอร์ติดต่อ:</p>
                                    <p>{userpost?.tel}</p>
                                </div>
                            </div>



                            {/* contant */}
                            <div key={item._id}>
                                {!isEditingMap[item._id] ? (
                                    <>
                                        <div className="body-contantActivity">

                                            <div className="hbody-contantActivity">
                                                <h2>
                                                    {item.title}
                                                </h2>
                                            </div>
                                            <div className="dbody-containActivity">

                                                <div>
                                                    <p style={{ marginBottom: "20px" }}>
                                                        {formatText(item.detail)}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className='date'><img src="../../public/iconfinder-icon(green).svg" alt="logOut" style={{ width: "16px", marginRight: "10px" }} />
                                                        <b style={{ marginRight: "10px" }}>
                                                            Start Date
                                                        </b>
                                                        {formatDateTime(item.startDate)}
                                                    </p>
                                                </div>
                                                <div>

                                                    <p className='date'><img src="../../public/iconfinder-icon.svg" alt="logOut" style={{ width: "16px", marginRight: "10px" }} />
                                                        <b style={{ marginRight: "10px" }}>
                                                            End Date
                                                        </b>
                                                        {formatDateTime(item.endDate)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bt-edit">
                                            {(item.userOwner === userId) && (
                                                !isEditingMap[item._id] ? (
                                                    <div className="" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                        <button className='bt-st-sc' onClick={() => handleEditClick(item._id)}>Edit</button>
                                                    </div>
                                                ) : (
                                                    <div className="" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                        <button className='bt-st' onClick={() => handleCancelClick(item._id)}>Cancel</button>
                                                        <button className='bt-st-sc' onClick={() => handleUpdateActivity(item._id)}>Save Change</button>
                                                    </div>
                                                )
                                            )}


                                        </div>
                                        <Comment postId={item._id} activityTab={type} />
                                    </>
                                ) : (
                                    <>
                                        <div>


                                            <div className="inhead">
                                                <label htmlFor="title"><h1>Title</h1></label>
                                                <input
                                                    className='editTextInput'
                                                    value={title}
                                                    placeholder={item.title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                />
                                            </div>

                                            <div className="indetail">
                                                <label htmlFor="detail"><h1>Detail</h1></label>
                                                <textarea
                                                    className='editTextArea'
                                                    value={detail}
                                                    placeholder={item.detail}
                                                    onChange={(e) => setDetail(e.target.value)}

                                                />
                                            </div>
                                            <div className="sdate">
                                                <label style={{ width: "253px" }}>Event Start Date</label>
                                                <DatePicker
                                                    selected={selectedDateStart}
                                                    onChange={(date: Date) => {
                                                        if (selectedDateEnd && date > selectedDateEnd) {
                                                            return;
                                                        }
                                                        setSelectedDateStart(date);
                                                    }}
                                                    showTimeSelect
                                                    timeFormat="HH:mm"
                                                    timeIntervals={15}
                                                    dateFormat="MMMM d, yyyy h:mm aa"
                                                    className="datecustom-picker"
                                                />
                                            </div>
                                            <div className="edate">
                                                <label style={{ width: "253px" }}>Event end Date Time</label>
                                                <DatePicker
                                                    selected={selectedDateEnd}
                                                    onChange={(date: Date) => {
                                                        if (selectedDateStart && date < selectedDateStart) {
                                                            return;
                                                        }
                                                        setSelectedDateEnd(date);
                                                    }}
                                                    showTimeSelect
                                                    timeFormat="HH:mm"
                                                    timeIntervals={15}
                                                    dateFormat="MMMM d, yyyy h:mm aa"
                                                    className="datecustom-picker"
                                                />
                                            </div>
                                            {(item.userOwner === userId) && (
                                                !isEditingMap[item._id] ? (
                                                    <div className="" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                        <button className='bt-st-sc' onClick={() => handleEditClick(item._id)}>Edit</button>
                                                    </div>
                                                ) : (
                                                    <div className="" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                        <button className='bt-st' onClick={() => handleCancelClick(item._id)}>Cancel</button>
                                                        <button className='bt-st-sc' onClick={() => handleUpdateActivity(item._id)}>Save Change</button>
                                                    </div>
                                                )
                                            )}
                                        </div>


                                    </>
                                )}
                            </div>

                        </>
                    ))}
                </div>






            </div>

        </div>
    );
};

export default PostList;
