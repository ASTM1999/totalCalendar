
import { useRecoilValue } from 'recoil';
import { announcementsState, activityState, campsState } from '../contexts/atoms/contextValueState';

const PostList = ({ type }: { type: string }) => {
    const posts = useRecoilValue(type === 'activity' ? activityState : type === 'camp' ? campsState : announcementsState);
    // const posts = useRecoilValue(type === 'activityState' ? activityState: type === 'camp'? campsState: announcementsState)
    // console.log(`Post : ${posts}`)

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
                        <h3>{post.title}</h3>
                        <p>{post.detail}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
