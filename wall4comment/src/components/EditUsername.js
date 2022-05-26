import { useState, useContext } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDone } from "react-icons/md";
import { AuthContext, updateName } from "../API/auth";

function EditUsername() {
    const user = useContext(AuthContext);
    const [username, setUsername] = useState(user?.displayName || "...");
    const [defaultUser, setDefaultUser] = useState(username);
    const changeName = async () => {
        if (username.length > 0) {
            try {
                username !== defaultUser && (await updateName(username));
                setDefaultUser(username);
            } catch (error) {
                alert("Sorry, username could not be changed");
                setUsername(defaultUser);
            }
        } else {
            setUsername(defaultUser);
        }
    };
    return (
        <div className="flex items-end m-6" title="Click to change username">
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
                    className="bg-blue-600 rounded-lg m-1 p-1 aspect-square"
                    title="Click to submit change"
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
    );
}

export default EditUsername;
