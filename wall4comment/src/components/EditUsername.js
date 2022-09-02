import { useState, useContext } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDone } from "react-icons/md";
import { AuthContext, updateName } from "../API/auth";
import { motion } from "framer-motion";

function EditUsername() {
    const user = useContext(AuthContext);
    const [username, setUsername] = useState(user?.displayName || "...");
    const [defaultUser, setDefaultUser] = useState(username);
    const changeName = async () => {
        if (username.length > 0) {
            try {
                if (username !== defaultUser) {
                    await updateName(username);
                    !user.photoURL && window.location.reload(); // changes profile image letters
                }
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
        <motion.div
            className="flex items-end m-6"
            title="Click to change username"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.05 }}
        >
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
                <motion.button
                    className="bg-blue-600 rounded-lg m-1 p-1 aspect-square"
                    title="Click to submit change"
                    onClick={() => {
                        changeName();
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                >
                    <MdDone className="text-white" />
                </motion.button>
            ) : (
                <motion.label
                    htmlFor="username"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                >
                    <BiEdit className="text-3xl text-gray-400 cursor-pointer" />
                </motion.label>
            )}
        </motion.div>
    );
}

export default EditUsername;
