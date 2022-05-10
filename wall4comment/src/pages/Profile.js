import { useContext, useState, useRef, useEffect } from "react";
import { auth, AuthContext, logOut } from "../API/auth";
import { updateName } from "../API/firestore";
import Logo from "../components/Logo";
import ProfilePic from "../components/ProfilePic";
import { BiEdit, BiCommentAdd, BiExit } from "react-icons/bi";
import { MdDone } from "react-icons/md";
import { uploadProfilePic } from "../API/storage";
import PostCard from "../components/PostCard";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();
    const imgInputRef = useRef();
    const imgRef = useRef();
    const user = useContext(AuthContext);
    const [username, setUsername] = useState(
        auth.currentUser?.displayName || "..."
    );
    const [userImg, setUserImg] = useState(auth.currentUser?.photoURL);
    const [defaultUser, setDefaultUser] = useState(username);
    const [posts, setPosts] = useState([
        {
            title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            numComment: 10,
            postID: "dfjahdfafkasdf",
        },
        {
            title: "Lorem Ipsum is simply.",
            numComment: 1,
            postID: "eiureoqeroew",
        },
        {
            title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Using Lorem to get some random text for the UI",
            numComment: 100,
            postID: "816481541631",
        },
        {
            title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Using Lorem to get some random text for the UI",
            numComment: 100,
            postID: "816481541631",
        },
        {
            title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Using Lorem to get some random text for the UI",
            numComment: 100,
            postID: "816481541631",
        },
    ]);

    useEffect(() => {
        if (user == null) {
            navigate("/signup");
        }

        return;
    }, [user]);

    const changeName = async () => {
        if (username.length > 0) {
            username !== defaultUser && (await updateName(username));
            setDefaultUser(username);
        } else {
            setUsername(defaultUser);
        }
    };

    const imgHandler = async (event) => {
        const newImg = event.currentTarget.files[0];
        if (!newImg) {
            return;
        }
        try {
            await uploadProfilePic(newImg);
            setUserImg(URL.createObjectURL(newImg));
        } catch (error) {
            console.log(error);
            alert("Sorry, there was an error changing the profile picture");
        }
    };

    return user ? (
        <div className="bg-gray-100 min-h-screen overflow-x-hidden">
            <div className="flex items-center flex-col w-screen h-fit p-8 md:pt-14 lg:pt-24">
                <button
                    className="flex items-center absolute top-0 right-0 text-gray-400 m-4"
                    onClick={() => {
                        window.confirm("Are sure you want to exit?") &&
                            logOut();
                    }}
                >
                    <p className=" text-xl mr-2 uppercase">Log Out</p>
                    <BiExit className=" text-2xl" />
                </button>
                <input
                    type={"file"}
                    className="hidden"
                    accept="image/*"
                    ref={imgInputRef}
                    onChange={imgHandler}
                />
                <div
                    className="rounded-full z-50 cursor-pointer"
                    onClick={() => {
                        imgInputRef.current.click();
                    }}
                >
                    <ProfilePic imgRef={imgRef} image={userImg} rounded />
                </div>
                <div className="flex items-end m-6">
                    <input
                        size={username.length}
                        id="username"
                        className="text-3xl text-center focus:outline-none focus:border-blue-600 focus:border-b-2 duration-300 bg-transparent"
                        value={username}
                        onChange={(event) => {
                            setUsername(event.target.value);
                            event.currentTarget.size = username.length || 1;
                        }}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                changeName();
                                event.currentTarget.blur();
                            }
                        }}
                    ></input>
                    {username !== defaultUser ? (
                        <button
                            className="bg-blue-600 rounded m-1 p-1 aspect-square"
                            onClick={() => {
                                changeName();
                            }}
                        >
                            <MdDone className="text-white" />
                        </button>
                    ) : (
                        <label htmlFor="username">
                            <BiEdit className="text-3xl text-gray-400 cursor-pointer" />
                        </label>
                    )}
                </div>
                <Link
                    className="px-6 py-2 bg-blue-600 text-white uppercase rounded-full"
                    to={"/createPost"}
                >
                    New post
                </Link>
            </div>
            {posts.length != 0 ? (
                <div className="w-screen h-fit pb-4 grid gap-0 md:gap-1 lg:gap-4 grid-cols-1 md:grid-cols-2 md:px-12 lg:grid-cols-3 lg:px-24">
                    {posts.map(({ title, numComment, postID }, index) => {
                        return (
                            <PostCard
                                key={index}
                                title={title}
                                numComment={numComment}
                                postID={postID}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className="flex justify-center items-center w-screen pb-4 overflow-hidden">
                    <div className="flex items-center flex-col text-gray-400 text-3xl">
                        <BiCommentAdd className="w-56 h-56" />
                        <h1>Create your first post !</h1>
                    </div>
                </div>
            )}

            <div />
        </div>
    ) : (
        <div className="flex justify-center items-center uppercase w-screen h-screen">
            <div className="text-xl flex items-center flex-col">
                <Logo shrink />
                <h1>LOADING...</h1>
            </div>
        </div>
    );
}

export default Profile;
