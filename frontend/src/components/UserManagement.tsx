import { useNavigate } from "react-router-dom"
import Header from "./Header"
import { useEffect, useState } from "react"
import { UserService } from "../services/userServices"
import { contactService } from "../services/contactService"
import { Contract } from "../services/interface"
import PopContantEvent from './PopContant';

const UserManagement = () => {
    // user
    const [username, setUserName] = useState<string | null>()
    const [role, setRole] = useState<string | null>()
    const [roleUpdate, setRoleUpdate] = useState<string | null>()
    const [userId, setUserId] = useState<string | null>()
    const [status, setStatus] = useState<string>()
    const [option, setOption] = useState<string>()
    const [popup, setPopup] = useState<boolean>()
    const [title, setTitle] = useState<string>('')
    const [time, setTime] = useState()
    const [detail, setDetail] = useState<string>('')

    const navigate = useNavigate()

    const handleClickHome = () => {
        navigate('/')
    }




    //data from contact

    const [contactRequire, setContactRequire] = useState<any>([])


    console.log("contactRequire: ", contactRequire)
    //user from data 


    // table
    // const res = await commentService.getComment({ type: activityTab, activityId: postId });
    // res.map(async (item: CommentUI) => {
    //     const userComment = await UserService.getUserbyId(item.userId)
    //     item.userId === userComment
    // })
    // const commentData = await Promise.all(res.map(async (item: CommentUI) => {
    //     const userComment = await UserService.getUserbyId(item.userId);
    //     item.userId = userComment;
    //     return item;
    // }));
    // table
    //data from contact


    //pagination
    const itemsPerPageOptions = [5, 10, 20];
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

    // คำนวณหน้าที่ต้องการแสดง
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    //pagination


    function formatDateTime(dateTime: any) {
        const options: any = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' };
        const date = new Date(dateTime);
        const formattedDate = date.toLocaleDateString('en-US', options);
        const suffix = (date.getHours() >= 12) ? 'pm' : 'am';
        return `${formattedDate} - ${date.getHours() % 12}:${date.getMinutes()} ${suffix}`;
    }

    async function fetchUser() {
        const id = await UserService.getUserId()
        const data = await UserService.getUserData(id)
        const username = await UserService.getUsername()
        setUserName(username)
        setRole(data.role)
        setUserId(id)
    }
    async function fetchRequest() {
        const data = await contactService.getContact()
        if (data) {
            const filteredData: any = data.filter((item: any) => item.require_role !== '');

            const usernameRequire = await Promise.all(
                filteredData.map(async (item: any) => {
                    const userRequire = await UserService.getUserbyId(item.userOwner)
                    const username = userRequire?.data.username;
                    const role = userRequire?.data.role;
                    const status = userRequire?.data.status

                    const newItem = {
                        ...item,
                        username: username,
                        role: role,
                        status: status,
                    }
                    // console.log("userRequire: ", userRequire)
                    // console.log("userRequire: ", userRequire)
                    return newItem
                })
            )
            console.log("usernameRequire : ", usernameRequire)
            setContactRequire(usernameRequire)
        }
    }
    useEffect(() => {
        fetchUser()
        fetchRequest()

    }, [])

    const handleCencle = async (id: any, require: any, status: any, roleUpdate: any) => {
        try {
            // console.log("xmark")
            await setOption('')
            const data = {
                role: roleUpdate,
                status: status,
                option: require,
                id: id
            }
            console.log("data: ", data)
            const res = await UserService.updateUserData(id, data)

            fetchRequest()

        } catch (err) {
            console.log(`Approve Failed ${err}`)
        }
    }
    const handleApprove = async (id: any, require: any, status: any, roleUpdate: any) => {

        await setOption(require)
        try {
            const data = {
                role: roleUpdate,
                status: status,
                option: require,
                id: id
            }
            console.log("data: ", data)
            const res = await UserService.updateUserData(id, data)
            fetchRequest()
        } catch (err) {
            console.log(`Approve Failed ${err}`)
        }

    }
    const handleShowDetailRequire = (detail: any, title: string, time: any) => {
        console.log("detail :", detail)
        setPopup(true)
        setTitle(title)
        setDetail(detail)
        setTime(time)
    }
    const onClose = () => {
        setPopup(false)
    }
    return (
        <>
            <Header />

            <div className="usermanagement">
                <div className="container-usermanagement">


                    <div className="headBox">
                        <div className="dv-headbox">
                            <div className="">
                                <h1>User Management</h1>
                                <div className="breadcrum-info">
                                    <b>
                                        <p onClick={handleClickHome} style={{ marginRight: "6px", cursor: "pointer" }}>Home</p>
                                    </b>
                                    <p>- {username}</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="list-permission">
                        <div className="head-list">
                            <h2>
                                {/* Header List */}
                            </h2>
                        </div>


                        <div className="bo-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>NAME</th>
                                        <th>ROLE</th>
                                        <th>REQUIRE ROLE</th>
                                        <th>STATUS</th>
                                        <th style={{ width: '100px' }}>CREATED DATE</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contactRequire.map((item: any, index: any) => (
                                        <tr key={index}>
                                            <td>{item.username}</td>
                                            <td>{item.role}</td>
                                            <td >
                                                <b>
                                                    <p onClick={() => handleShowDetailRequire(item.detail, item.require_role, item.time)} className={`th-requureRole ${item.status === "active" ? "active" : ""}`}>
                                                        {item.require_role}
                                                    </p>
                                                </b>
                                            </td>
                                            <td>{item.status}</td>
                                            <td>{formatDateTime(item.time)}</td>
                                            <td>
                                                <img className="icon-approve" src="../../public/check-green.svg" alt="check"
                                                    onClick={() => handleApprove(item.userOwner, item.require_role, 'active', "useradmin")} />
                                                <img className="icon-approve" src="../../public/xmark-red.svg" alt="xmark"
                                                    onClick={() => handleCencle(item.userOwner, item.require_role, 'pending', "user")} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>



                        <div className="pagination">
                            <div>
                                Show{' '}
                                <select
                                    value={itemsPerPage}
                                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                >
                                    {itemsPerPageOptions.map((option, index) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>{' '}
                                entries
                            </div>

                            <div>
                                <button onClick={() => setCurrentPage(currentPage - 1)}>
                                    Previous
                                </button>
                                Page {currentPage}
                                <button onClick={() => setCurrentPage(currentPage + 1)}>
                                    Next
                                </button>
                            </div>
                        </div>

                    </div>


                </div>
            </div >
            {popup && (
                <PopContantEvent title={title} detail={detail} date={time} component="userManagement" onClose={onClose} />
            )}
        </>
    )
}

export default UserManagement