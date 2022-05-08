import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../API/auth";

function Signup() {
    const [isLogIn, setIsLogIn] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const submit = async () => {
        let newMessage = "";

        // validate inputs
        // username
        if (!isLogIn && username.length < 3) {
            newMessage += "\n- Username must contain atleast 3 characters.";
        }
        // email
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            newMessage += "\n- Incorrect Email.";
        }
        // password
        if (password.length < 6) {
            newMessage += "\n- Password must contain atleast 6 characters.";
        }
        // confirm password
        if (!isLogIn && password !== confirmPassword) {
            newMessage += "\n- Passwords do not match";
        }

        if (newMessage.startsWith("\n")) {
            newMessage = newMessage.substring(1);
        }

        setMessage(newMessage);

        // client side validation not met, no need to continue
        if (newMessage) return;

        try {
            if (isLogIn) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }

            navigate("/profile");
        } catch (error) {
            setMessage(error.message);
        }

        console.log(username);
        console.log(email);
        console.log(password);
    };

    return (
        <div className="flex w-screen h-screen justify-center items-center bg-gray-100">
            <div className="p-8 bg-white rounded w-3/5 max-w-screen-sm flex flex-col items-center">
                <h1 className="uppercase font-bold text-center text-3xl mb-5">
                    {isLogIn ? "Log In" : "Create Account"}
                </h1>
                {message && (
                    <div className="whitespace-pre w-full bg-red-100 rounded py-2 px-4">
                        <h2 className="font-bold">Oops we could not proceed</h2>
                        <p>{message}</p>
                    </div>
                )}
                {!isLogIn && (
                    <input
                        className="border-b-2 border-black w-full px-3 py-2 my-2 focus:outline-none focus:border-blue-600 duration-300"
                        type="text"
                        placeholder="USERNAME"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    ></input>
                )}
                <input
                    className="border-b-2 border-black w-full px-3 py-2 my-2 focus:outline-none focus:border-blue-600 duration-200"
                    type="email"
                    placeholder="EMAIL"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                ></input>
                <input
                    className="border-b-2 border-black w-full px-3 py-2 my-2 focus:outline-none focus:border-blue-600 duration-300"
                    type="password"
                    placeholder="PASSWORD"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                ></input>
                {!isLogIn && (
                    <input
                        className="border-b-2 border-black w-full px-3 py-2 my-2 focus:outline-none focus:border-blue-600 duration-300"
                        type="password"
                        placeholder="CONFIRM PASSWORD"
                        value={confirmPassword}
                        onChange={(event) =>
                            setConfirmPassword(event.target.value)
                        }
                    ></input>
                )}
                <button
                    className="text-white bg-blue-600 w-fit h-fit px-5 py-2 rounded uppercase mt-8 hover:bg-blue-500"
                    onClick={submit}
                >
                    Submit
                </button>
                <h5>
                    {isLogIn
                        ? "Don't have an account?"
                        : "Already have an account?"}
                    &nbsp;
                    <button
                        className="text-blue-600 underline mt-5"
                        onClick={() =>
                            setIsLogIn((prev) => {
                                setUsername("");
                                setConfirmPassword("");
                                setMessage("");
                                return !prev;
                            })
                        }
                    >
                        {isLogIn ? "Create Account" : "Log In"}
                    </button>
                </h5>
            </div>
        </div>
    );
}

export default Signup;
