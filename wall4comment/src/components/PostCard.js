import { useRef } from "react";
import { BiComment, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { deletePost } from "../API/firestore";

function PostCard({ title, commentCount = 0, postID }) {
    const postRef = useRef();

    const handleDelete = () => {
        if (window.confirm(`Confirm deleting post.\n Title: ${title}`))
            deletePost(postID);
        postRef.current.style.display = "none";
    };

    return (
        <Link
            ref={postRef}
            className="m-2 p-6 h-fit rounded-lg shadow-md bg-white relative hover:shadow-lg duration-200 cursor-pointer"
            to={`/postView/${postID}`}
            title="Click to view post"
        >
            <div className="flex justify-center items-center text-gray-500 absolute right-2 bottom-0 mb-2">
                <div
                    className="text-lg mx-1 rounded hover:bg-gray-100 p-1"
                    title="Click to delete post"
                    onClick={(event) => {
                        event.preventDefault();
                        handleDelete();
                    }}
                >
                    <BiTrash />
                </div>

                <div
                    className="rounded bg-gray-100 flex justify-center items-center px-1 h-fit"
                    title="Number of comment/s on this post"
                >
                    <BiComment className="text-lg mr-1" />
                    <p className="text-xl">{commentCount}</p>
                </div>
            </div>
            <h1 className="font-semibold text-2xl">{title}</h1>
        </Link>
    );
}

export default PostCard;
