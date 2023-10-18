import { useEffect, useState } from "react";
import { UserService } from "../services/userServices";
import { CommentUI } from "../services/interface";

import { commentService } from "../services/commentService";
import { useRecoilState, } from "recoil";
import { commentState, loginState } from "../contexts/atoms/contextValueState";
import { useNavigate } from "react-router-dom";



interface CommentProps {
    postId: string;
    activityTab: string;
}


const Comment = ({ postId, activityTab }: CommentProps) => {
    const [comment, setComment] = useState('');
    const [userId, setUserId] = useState<string | null>()
    const [commentRecoil, setCommentState] = useRecoilState(commentState)
    const login = UserService.isUserloggedIn()
    const navigate = useNavigate()
    function formatDateTime(dateTime: any) {
        const options: any = { year: 'numeric', month: 'short', day: 'numeric' };
        const date = new Date(dateTime);
        const formattedDate = date.toLocaleDateString('en-US', options);
        const suffix = (date.getHours() >= 12) ? 'pm' : 'am';
        return `${formattedDate}  ${date.getHours() % 12}:${date.getMinutes()} ${suffix}`;
    }
    // console.log(commentRecoil)
    const handleCommentChange = (event: any) => {
        setComment(event.target.value);
    };
    const handlePostClick = async () => {
        try {
            if (loginState) {

                const commentCreate: CommentUI = {
                    comment: comment,
                    userId: userId,
                    activityId: postId,
                    type: activityTab,
                    date: new Date()
                }
                const res = await commentService.createComment(commentCreate)
                console.log(res)
                setComment('')
                getComment()
            } else {
                navigate('/login')
            }
        } catch (err) {
            navigate('/login')
            console.log(`Failed: ${err}`)
        }
    }
    const getComment = async () => {
        try {
            console.log("getComment: ")
            const res = await commentService.getComment({ type: activityTab, activityId: postId });
            // res.map(async (item: CommentUI) => {
            //     const userComment = await UserService.getUserbyId(item.userId)
            //     item.userId === userComment
            // })
            const commentData = await Promise.all(res.map(async (item: CommentUI) => {
                const userComment = await UserService.getUserbyId(item.userId);
                item.userId = userComment;
                return item;
            }));
            const commentFilter = commentData.filter((item) => item.activityId === postId)
            console.log("commentFilter: ", commentFilter)
            setCommentState(commentFilter)
            // const commentFilter = commentData.filter((item) => {
            //     console.log("item.id", item._id)
            //     console.log("item", item)
            //     item._id === postId
            // })
        } catch (err) {
            console.log(`Failed: ${err}`)
        }
    }

    // ทำการโหลดข้อมูลโดย asynchronous
    // console.log("userData: ", userData)
    // console.log(activityTab)
    // console.log(userId)
    const fetchUserData = async () => {
        try {
            const getUserId = await UserService.getUserId()
            // const user = await UserService.getUserData(getUserId)
            // const id = await UserService.getUserId()
            setUserId(getUserId)
            // setUserData(user)
        } catch (err) {
            console.log(`Failed ${err}`)
        }
    }



    useEffect(() => {
        getComment()
        fetchUserData()
    }, [])

    return (
        <div className="comment">
            <h2>User Reviews</h2>

            <div className="inputComment">
                <input
                    className="inputcomment-focus"
                    style={{ width: '90%', }}
                    placeholder="Comment"
                    value={comment}
                    onChange={handleCommentChange}
                />
                {comment && (
                    <button className="bt-inputcomment-focus" onClick={handlePostClick}>Post</button>
                )}
            </div>



            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Comment</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {commentRecoil.map((commentRecoil, index) => (
                        <tr key={index}>
                            <td>{commentRecoil.userId.data.username}</td>
                            <td>{commentRecoil.comment}</td>
                            <td>{formatDateTime(commentRecoil.date)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Comment