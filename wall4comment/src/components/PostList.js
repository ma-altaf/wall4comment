import { useContext, useEffect, useRef, useState } from "react";
import { BiCommentAdd } from "react-icons/bi";
import { AuthContext } from "../API/auth";
import { getPostList } from "../API/firestore";
import PostCard from "../components/PostCard";

const NUM_REQ = 6;

function PostList() {
    const lastVisibleIndex = useRef(0);
    const lastVisiblePost = useRef();
    const bottomRef = useRef();
    const postRequested = useRef(false);
    const user = useContext(AuthContext);
    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        try {
            const requestedPosts = await getPostList(
                NUM_REQ,
                lastVisiblePost.current
            );
            lastVisiblePost.current = requestedPosts[requestedPosts.length - 1];
            setPosts((posts) => [
                ...posts,
                ...requestedPosts.map((post) => post.data()),
            ]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (user && !postRequested.current) {
            postRequested.current = true;
            getPosts();
        }

        return;
    }, [user]);

    const addPagination = (index) => {
        lastVisibleIndex.current = index;

        const callback = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    getPosts();
                    observer.disconnect();
                }
            });
        };
        setTimeout(() => {
            let observer = new IntersectionObserver(callback, {
                threshold: 0.5,
            });
            observer.observe(bottomRef.current);
        }, 300);
    };

    if (posts.length !== 0) {
        return (
            <div className="w-screen h-fit pb-12 lg:px-24">
                <div className="w-full grid gap-0 md:gap-1 lg:gap-4 grid-cols-1 md:grid-cols-2 md:px-12 lg:grid-cols-3 ">
                    {posts.map(
                        ({ title, commentCount, postID, time }, index) => {
                            if (
                                (index + 1) % NUM_REQ === 0 &&
                                index > lastVisibleIndex.current
                            )
                                addPagination(index);
                            return (
                                <PostCard
                                    key={postID}
                                    title={title}
                                    commentCount={commentCount}
                                    postID={postID}
                                    time={time}
                                />
                            );
                        }
                    )}
                </div>
                <div
                    className="bg-gray-50 h-40 mt-12 mx-2 md:mx-14 flex justify-center items-center"
                    ref={bottomRef}
                >
                    ads banner
                </div>
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
