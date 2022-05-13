import { useContext, useEffect, useState } from "react";
import { BiCommentAdd } from "react-icons/bi";
import { AuthContext } from "../API/auth";
import { getPostList } from "../API/firestore";
import PostCard from "../components/PostCard";

function PostList() {
    let postRequested = false;
    const user = useContext(AuthContext);
    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        try {
            let posts = await getPostList();
            setPosts([...posts.map((post) => post.data())]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (user && !postRequested) {
            postRequested = true;
            getPosts();
        }

        return;
    }, [user]);

    if (posts.length != 0) {
        return (
            <div className="w-screen h-fit pb-12 grid gap-0 md:gap-1 lg:gap-4 grid-cols-1 md:grid-cols-2 md:px-12 lg:grid-cols-3 lg:px-24">
                {posts.map(({ title, commentCount, postID, time }) => (
                    <PostCard
                        key={postID}
                        title={title}
                        commentCount={commentCount}
                        postID={postID}
                        time={time}
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center w-screen pb-4 overflow-hidden">
            <div className="flex items-center flex-col text-gray-400 text-3xl">
                <BiCommentAdd className="w-56 h-56" />
                <h1>Create your first post !</h1>
            </div>
        </div>
    );
}

export default PostList;
