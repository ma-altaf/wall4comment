import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiSend } from "react-icons/bi";
import { addComment, getPost, getProfile } from "../API/firestore";
import timeDiffString from "../API/time";
import ProfilePic from "../components/ProfilePic";
import ImageSection from "../components/ImageSection";
import { getPostImageList } from "../API/storage";

function WriteComment() {
    const { userID, postID } = useParams();
    const descriptionRequested = useRef(false);
    const [postDescription, setPostDescription] = useState({});
    const [userProfile, setUserProfile] = useState({});
    const [postImagesURL, setPostImagesURL] = useState([]);

    useEffect(() => {
        if (!descriptionRequested.current) {
            descriptionRequested.current = true;
            setDescription();
            setImages();
            getUserProfile();
        }

        return;
    }, []);

    const setImages = async () => {
        try {
            const postImageList = await getPostImageList(userID, postID);
            setPostImagesURL(postImageList);
        } catch (error) {
            console.log(error);
            alert("Images could not be requested!");
        }
    };

    const getUserProfile = async () => {
        try {
            const userData = await getProfile(userID);
            setUserProfile(userData.data());
        } catch (error) {
            console.log(error);
        }
    };

    const setDescription = async () => {
        try {
            const postData = await getPost(userID, postID);
            setPostDescription(postData.data());
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col bg-gray-100 overflow-x-hidden min-h-screen p-2 pb-12">
            <div className="w-full flex flex-col items-center p-8 pb-4 overflow-x-hidden">
                <ProfilePic image={userProfile.photoURL} rounded />
                <p className="text-3xl pt-4">{userProfile.username}</p>
            </div>

            <div className="w-full h-fit flex flex-col items-center overflow-x-hidden">
                <div className="w-11/12 lg:w-4/6 rounded-lg bg-gray-200">
                    <PostDescription postDescription={postDescription} />
                    {postImagesURL.length !== 0 && (
                        <ImageSection postImagesURL={postImagesURL} />
                    )}
                    <CommentTextBox userID={userID} postID={postID} />
                </div>
            </div>
        </div>
    );
}

function PostDescription({ postDescription }) {
    const { title, description, time } = postDescription;
    return (
        postDescription && (
            <div className="bg-white rounded-lg p-4 shadow-sm w-full">
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
        )
    );
}

function CommentTextBox({ userID, postID }) {
    const [comment, setComment] = useState("");

    return (
        <div className="text-xl p-4">
            <h1 className="pb-2">Write your comment below</h1>
            <textarea
                className="bg-transparent w-full border-2 border-gray-300 rounded p-4 focus:outline-none focus:border-black"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                rows={8}
            />
            <div className="w-full flex justify-end">
                <SubmitCommentBtn
                    userID={userID}
                    postID={postID}
                    comment={comment}
                />
            </div>
        </div>
    );
}

function SubmitCommentBtn({ userID, postID, comment }) {
    const navigate = useNavigate();

    const submitComment = async (event) => {
        event.target.disabled = true;

        if (comment.length === 0) {
            alert("comment cannot be empty");
            event.target.disabled = false;
            return;
        }

        try {
            await addComment(userID, postID, comment);
            navigate("/thank");
        } catch (error) {
            alert("Sorry, comment could not be submitted");
            event.target.disabled = false;
        }
    };

    return (
        <button
            className="mt-4 px-6 py-2 rounded-full flex flex-row items-center bg-blue-600 text-white uppercase hover:cursor-pointer"
            onClick={submitComment}
        >
            <p>send&nbsp;</p>
            <BiSend />
        </button>
    );
}

export default WriteComment;
