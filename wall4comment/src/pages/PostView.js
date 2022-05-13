import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../API/auth";
import { getPost } from "../API/firestore";
import LoadingCover from "./LoadingCover";
import BackBtn from "../components/BackBtn";
import { BiCommentX } from "react-icons/bi";
import timeDiffString from "../API/time";

function PostView() {
    let descriptionRequested = false;
    const user = useContext(AuthContext);
    const { postID } = useParams();
    const [postDescription, setPostDescription] = useState({});
    const [comments, setComments] = useState([
        { message: "great job", commentID: 1, time: 1652453911967 },
        { message: "great job again", commentID: 2, time: 1652453911967 },
        { message: "great game", commentID: 3, time: 1652453911967 },
        { message: "great game again", commentID: 4, time: 1652453911967 },
    ]);

    useEffect(() => {
        if (user && !descriptionRequested) {
            descriptionRequested = true;
            setDescription();
        }

        return;
    }, []);

    const setDescription = async () => {
        try {
            const postData = await getPost(postID);
            setPostDescription(postData.data());
        } catch (error) {
            console.log(error);
        }
    };

    return user ? (
        <div className="bg-gray-100 w-screen overflow-x-hidden min-h-screen p-2">
            <header className="flex text-3xl sticky top-0">
                <BackBtn />
                <h1 className="w-full text-center uppercase">Post View</h1>
            </header>
            <PostDescription postDescription={postDescription} />
            <div className="w-screen h-fit p-4 pt-0 flex flex-col items-center">
                {comments.length !== 0 ? (
                    comments.map(({ message, commentID, time }) => (
                        <PostComment
                            message={message}
                            key={commentID}
                            time={time}
                        />
                    ))
                ) : (
                    <div className="flex justify-center items-center w-screen p-4 overflow-hidden">
                        <div className="flex items-center flex-col text-gray-400 text-3xl">
                            <BiCommentX className="w-56 h-56" />
                            <h1>No comments received yet</h1>
                        </div>
                    </div>
                )}
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
            <div className="w-screen h-fit p-4 pb-1 flex flex-col items-center">
                <div className="bg-white rounded-lg m-4 p-4 shadow-sm w-11/12 lg:w-4/6">
                    <h1 className="text-3xl font-semibold">{title}</h1>
                    {description && (
                        <>
                            <div className="w-full h-px bg-gray-300 my-2 rounded-full"></div>
                            <h1 className="text-xl">{description}</h1>
                        </>
                    )}
                    <h5 className="text-right -mb-2 text-gray-400 text-sm">
                        {time && timeDiffString(Date.now(), time.toMillis())}
                    </h5>
                </div>
            </div>
        )
    );
}

function PostComment({ message, time }) {
    return (
        <div className="bg-white rounded-lg m-2 p-4 shadow-sm w-11/12 lg:w-4/6 text-lg">
            <p>{message}</p>
            <h5 className="text-right -mb-2 text-gray-400 text-sm">
                {/* {time && timeDiffString(Date.now(), time.toMillis())} */}
                {time && timeDiffString(Date.now(), time)}
            </h5>
        </div>
    );
}

export default PostView;
