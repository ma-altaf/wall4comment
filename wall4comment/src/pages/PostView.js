import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../API/auth";
import { getCommentsList, getPost } from "../API/firestore";
import LoadingCover from "./LoadingCover";
import BackBtn from "../components/BackBtn";
import { BiCommentX } from "react-icons/bi";
import timeDiffString from "../API/time";

const NUM_REQ = 5;

function PostView() {
    const bottomRef = useRef();
    const lastVisibleIndex = useRef(0);
    const lastVisibleComment = useRef(0);
    const descriptionRequested = useRef(false);
    const user = useContext(AuthContext);
    const { postID } = useParams();
    const [postDescription, setPostDescription] = useState({});
    const [comments, setcomments] = useState([]);

    const getComments = async () => {
        try {
            const reqComments = await getCommentsList(
                user.uid,
                postID,
                NUM_REQ,
                lastVisibleComment.current
            );
            lastVisibleComment.current = reqComments[reqComments.length - 1];
            setcomments((comments) => [
                ...comments,
                ...reqComments.map((comment) => comment.data()),
            ]);
        } catch (error) {
            console.log(error);
        }
    };

    const setDescription = async () => {
        try {
            const postData = await getPost(user.uid, postID);
            setPostDescription(postData.data());
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (user && !descriptionRequested.current) {
            descriptionRequested.current = true;
            setDescription();
            getComments();
        }

        return;
    }, []);

    const addPagination = (index) => {
        lastVisibleIndex.current = index;

        const callback = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    getComments();
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

    return user ? (
        <div className="bg-gray-100 w-full overflow-x-hidden min-h-screen p-2">
            <header className="flex text-3xl top-0 w-full">
                <BackBtn />
                <h1 className="w-full text-center uppercase">Post View</h1>
            </header>
            <PostDescription postDescription={postDescription} />
            <div className="w-full h-fit pt-0 flex flex-col items-center">
                {comments.length !== 0 ? (
                    comments.map(({ comment, commentID, time }, index) => {
                        if (
                            (index + 1) % NUM_REQ === 0 &&
                            index > lastVisibleIndex.current
                        )
                            addPagination(index);
                        return (
                            <PostComment
                                comment={comment}
                                key={commentID}
                                time={time}
                            />
                        );
                    })
                ) : (
                    <div className="flex justify-center items-center w-screen p-4 overflow-hidden">
                        <div className="flex items-center flex-col text-gray-400 text-3xl">
                            <BiCommentX className="w-56 h-56" />
                            <h1>No comments received yet</h1>
                        </div>
                    </div>
                )}
                <div
                    className="bg-gray-50 h-40 w-11/12 lg:w-4/6 p-2 m-12 flex justify-center items-center"
                    ref={bottomRef}
                >
                    ads banner
                </div>
            </div>
        </div>
    ) : (
        <LoadingCover />
    );
}

function PostDescription({ postDescription }) {
    const { title, description, time } = postDescription;
    return (
        postDescription && (
            <div className="w-full h-fit flex flex-col items-center">
                <div className="bg-white rounded-lg m-4 p-4 shadow-sm w-11/12 lg:w-4/6">
                    <h1 className="text-3xl font-semibold">{title}</h1>
                    {description && (
                        <>
                            <div className="w-full h-px bg-gray-300 my-2 rounded-full"></div>
                            <h1 className="text-xl">{description}</h1>
                        </>
                    )}
                    <h5 className="text-right -mb-2 text-gray-400 text-sm">
                        {time && timeDiffString(time.toMillis())}
                    </h5>
                </div>
            </div>
        )
    );
}

function PostComment({ comment, time }) {
    return (
        <div className="bg-white rounded-lg m-2 p-4 shadow-sm w-11/12 lg:w-4/6 text-lg">
            <p>{comment}</p>
            <h5 className="text-right -mb-2 text-gray-400 text-sm">
                {time && timeDiffString(time.toMillis())}
            </h5>
        </div>
    );
}

export default PostView;
