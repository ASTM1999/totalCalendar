
import { useRecoilValue } from 'recoil';
import { activitiesState, announcementsState, campsState } from '../contexts/atoms/contextValueState';

const PostList = ({ type }: { type: string }) => {
    console.log(type)
    const posts = useRecoilValue(type === 'announcement' ? announcementsState : type === 'camp' ? campsState : activitiesState);

    return (
        <div className="post" style={{ width: "100%" }}>
            <ul style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column"
            }}>
                {posts.map((post, index) => (
                    <li key={index} style={{
                        width: "80%",
                        padding: "10px",
                        backgroundColor: "#D9D9D9",
                        borderRadius:"8px",
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
