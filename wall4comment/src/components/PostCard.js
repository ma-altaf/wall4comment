import React from "react";
import { BiComment } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function PostCard({ title, numComment, postID }) {
    const navigate = useNavigate();
    return (
        <div
            className="m-4 p-6 rounded-lg shadow-md bg-white relative hover:shadow-lg duration-200 cursor-pointer"
            onClick={() => navigate(`/postView/${postID}`)}
        >
            {numComment && (
                <div className="flex justify-center items-center text-gray-500 absolute right-2 bottom-0">
                    <BiComment className="text-sm mx-1" />
                    <p className="text-lg">{numComment}</p>
                </div>
            )}
            <h1 className="font-bold text-2xl">{title}</h1>
        </div>
    );
}

export default PostCard;
