import { useRef, useState } from "react";
import { BiComment, BiTrash, BiShare } from "react-icons/bi";
import { Link } from "react-router-dom";
import { deletePost, getPostLink } from "../API/firestore";
import timeDiffString from "../API/time";

function PostCard({ title, commentCount = 0, postID, time }) {
    const postRef = useRef();
    const [isCopied, setIsCopied] = useState(false);
    const handleDelete = () => {
        if (window.confirm(`Confirm deleting post.\nTitle: ${title}`)) {
            deletePost(postID);
            postRef.current.style.display = "none";
        }
    };

    const handleShare = () => {
        const link = getPostLink(postID);
        navigator.clipboard.writeText(link);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };

    return (
        <Link
            ref={postRef}
            className="m-2 pb-10 p-4 h-fit rounded-lg shadow-md bg-white relative hover:shadow-lg duration-200 cursor-pointer"
            to={`/postView/${postID}`}
            title="Click to view post"
        >
            <h1 className="font-semibold text-2xl">{title}</h1>
            <h5 className="text-gray-400 absolute left bottom-0 mb-2">
                {time && timeDiffString(time.toMillis())}
            </h5>
            <div className="flex justify-center items-center text-gray-500 absolute right-2 bottom-0 mb-2">
                <div
                    className="text-lg rounded-lg hover:bg-blue-600 hover:text-white p-1 duration-200"
                    title="Click to copy link to post"
                    onClick={(event) => {
                        event.preventDefault();
                        handleShare();
                    }}
                >
                    {isCopied ? (
                        <p className="text-sm uppercase rounded-lg py-1 px-2 -m-1 text-white bg-blue-600">
                            Copied!
                        </p>
                    ) : (
                        <BiShare />
                    )}
                </div>
                <div
                    className="text-lg mr-px rounded-lg hover:bg-red-500 hover:text-white p-1 duration-200"
                    title="Click to delete post"
                    onClick={(event) => {
                        event.preventDefault();
                        handleDelete();
                    }}
                >
                    <BiTrash />
                </div>

                <div
                    className="rounded bg-gray-100 flex justify-center items-center px-1 h-fit cursor-default"
                    title="Number of comment/s on this post"
                >
                    <BiComment className="text-lg mr-1" />
                    <p className="text-xl">{commentCount}</p>
                </div>
            </div>
        </Link>
    );
}

function copyAlert() {
    return <div></div>;
}

export default PostCard;
