import { useContext, useState, useRef } from "react";
import { auth, AuthContext } from "../API/auth";
import { updateName } from "../API/firestore";
import Logo from "../components/Logo";
import ProfilePic from "../components/ProfilePic";
import { BiEdit } from "react-icons/bi";
import { MdDone } from "react-icons/md";
import { uploadProfilePic } from "../API/storage";

function Profile() {
    const imgInputRef = useRef();
    const imgRef = useRef();
    const user = useContext(AuthContext);
    const [username, setUsername] = useState(
        auth.currentUser?.displayName || "..."
    );
    const [userImg, setUserImg] = useState(auth.currentUser?.photoURL);
    const [defaultUser, setDefaultUser] = useState(username);

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
        <>
            <div className="flex items-center flex-col w-screen h-fit p-4 pt-32">
                <input
                    type={"file"}
                    className="hidden"
                    accept="image/*"
                    ref={imgInputRef}
                    onChange={imgHandler}
                />
                <div
                    className="rounded-full z-50"
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
                        className="text-3xl text-center focus:outline-none focus:border-blue-600 focus:border-b-2 duration-300"
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
                            className="bg-blue-600 rounded m-1 p-1"
                            onClick={() => {
                                changeName();
                            }}
                        >
                            <MdDone className="text-white" />
                        </button>
                    ) : (
                        <label htmlFor="username">
                            <BiEdit className="text-3xl text-gray-400" />
                        </label>
                    )}
                </div>
            </div>
        </>
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
