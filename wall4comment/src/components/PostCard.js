import { useRef, useState } from "react";
import { BiComment, BiTrash, BiShare } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { deletePost, getPostLink } from "../API/firestore";
import { deletePostImages } from "../API/storage";
import timeDiffString from "../API/time";
import { AnimatePresence, motion } from "framer-motion";

function PostCard({ title, commentCount = 0, postID, time, index = 0 }) {
    const postRef = useRef();
    const [isCopied, setIsCopied] = useState(false);
    const [isDeletePrompt, setIsDeletePrompt] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await deletePostImages(postID);
            await deletePost(postID);
            postRef.current.style.display = "none";
        } catch (error) {
            alert("post could not be deleted");
        }
    };

    const handleShare = () => {
        const link = getPostLink(postID);
        navigator.clipboard.writeText(link);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 700);
    };

    return (
        <motion.div
            className="m-2 pb-10 p-4 h-fit rounded-lg shadow-md bg-white relative hover:shadow-lg duration-200 cursor-pointer overflow-hidden"
            transition={{ delay: index * 0.05 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            ref={postRef}
            onClick={() => navigate(`/postView/${postID}`)}
            title="Click to view post"
        >
            <h1 className="font-semibold text-2xl pointer-events-none">
                {title}
            </h1>
            <h5 className="text-gray-400 absolute left bottom-0 mb-2 pointer-events-none">
                {time && timeDiffString(time.toMillis())}
            </h5>
            <div className="flex justify-center items-center text-gray-500 absolute right-2 bottom-0 mb-2">
                <motion.div
                    layout
                    transition={{ duration: 0.1 }}
                    className="text-lg rounded-lg hover:bg-blue-600 hover:text-white p-1 duration-200"
                    title="Click to copy link to post"
                    onClick={(event) => {
                        event.stopPropagation();
                        event.currentTarget.blur();
                        handleShare(event);
                    }}
                >
                    <BiShare />
                </motion.div>
                <div
                    className="text-lg mr-px rounded-lg hover:bg-red-500 hover:text-white p-1 duration-200 pointer-events-auto"
                    title="Click to delete post"
                    onClick={(event) => {
                        event.stopPropagation();
                        setIsDeletePrompt(true);
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
            <AnimatePresence>
                {isCopied && (
                    <motion.div
                        className="overflow-hidden w-full flex flex-col items-center justify-center bg-blue-500 text-white absolute bottom-0 left-0"
                        onClick={(e) => e.stopPropagation()}
                        initial={{ height: 0 }}
                        animate={{ height: "100%" }}
                        exit={{ height: 0, top: 0 }}
                        transition={{ easings: "easeInOut", duration: 0.4 }}
                        title=""
                    >
                        <h1 className="font-semibold text-2xl">
                            Link copied to clipboard
                        </h1>
                    </motion.div>
                )}
                {isDeletePrompt && (
                    <motion.div
                        className="overflow-hidden w-full flex flex-col items-center justify-center bg-red-500 text-white absolute bottom-0 left-0"
                        onClick={(e) => e.stopPropagation()}
                        initial={{ height: 0 }}
                        animate={{ height: "100%" }}
                        exit={{ height: 0, top: 0 }}
                        transition={{ easings: "easeInOut", duration: 0.4 }}
                        title=""
                    >
                        <h1 className="font-semibold text-2xl">
                            Confirm Deletion
                        </h1>
                        <div className="flex items-center justify-center p-1">
                            <button
                                className="rounded px-4 py-1 mx-1"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsDeletePrompt(false);
                                }}
                                title="Cancel deletion"
                            >
                                Cancel
                            </button>
                            <button
                                className="rounded-lg px-4 py-1 mx-1 bg-red-600"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete();
                                }}
                                title="Confirm deletion"
                            >
                                Delete
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default PostCard;
