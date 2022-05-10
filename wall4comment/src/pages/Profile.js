import { useContext, useRef, useState } from "react";
import { auth, AuthContext } from "../API/auth";
import { getLocalImg } from "../API/filePicker";
import { updateImg, updateName } from "../API/firestore";
import Logo from "../components/Logo";
import ProfilePic from "../components/ProfilePic";
import { BiEdit } from "react-icons/bi";
import { MdDone } from "react-icons/md";

function Profile() {
    const nameButtonRef = useRef(null);
    let defaultUser = auth.currentUser?.displayName;
    const user = useContext(AuthContext);
    const [username, setUsername] = useState(
        auth.currentUser?.displayName || "..."
    );

    const changeName = async () => {
        if (username.length > 0) {
            username !== defaultUser && (await updateName(username));
            defaultUser = username;
        } else {
            setUsername(defaultUser);
        }
        nameButtonRef.current.classList.add("bg-gray-400");
    };

    return user ? (
        <>
            <div className="flex items-center flex-col w-screen h-fit p-4 pt-32">
                <div
                    className="rounded-full z-50"
                    onClick={() => {
                        alert("drag and drop image to change profile picture");
                        // TODO: open file to choose image

                        // updateImg(getLocalImg);
                    }}
                    // TODO: fix drag and drop feature
                    onDrop={(event) => {
                        event.preventDefault();
                        alert("dropped");
                    }}
                >
                    <ProfilePic image={auth.currentUser.photoURL} rounded />
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
                            ref={nameButtonRef}
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
