import { BiComment } from "react-icons/bi";
import { Link } from "react-router-dom";

function PostCard({ title, commentCount = 0, postID }) {
    return (
        <Link
            className="m-2 p-6 h-fit rounded-lg shadow-md bg-white relative hover:shadow-lg duration-200 cursor-pointer"
            to={`/postView/${postID}`}
        >
            <div className="flex justify-center items-center text-gray-500 absolute right-2 bottom-0">
                <BiComment className="text-sm mx-1" />
                <p className="text-lg">{commentCount}</p>
            </div>
            <h1 className="font-semibold text-2xl">{title}</h1>
        </Link>
    );
}

export default PostCard;
