import { useParams } from "react-router-dom";

function PostView() {
    const { postID } = useParams();
    return <div>PostView: {postID}</div>;
}

export default PostView;
