import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    AuthContext,
    createAccount,
    logIn,
    resetPasswordEmail,
} from "../API/auth";

function Signup() {
    const user = useContext(AuthContext);
    const [isLogIn, setIsLogIn] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/profile");
        }
        return;
    }, [user]);

    const submit = async (event) => {
        event.target.disabled = true;
        let newMessage = "";

        // remove trailing and leading spaces
        setUsername((prev) => prev.trim());
        setEmail((prev) => prev.trim());

        // validate inputs
        // username
        if (!isLogIn && username.length <= 0) {
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
        if (newMessage) {
            event.target.disabled = false;
            return;
        }

        try {
            if (isLogIn) {
                await logIn(email, password);
            } else {
                await createAccount(username, email, password);
                alert(
                    "Please, verify your email addresss by clicking on the link in the email we sent you."
                );
                window.location.reload();
            }
        } catch (error) {
            setMessage(
                `- Oops, ${error.code
                    .substring(error.code.indexOf("/") + 1)
                    .replace(/-/g, " ")}`
            );
            event.target.disabled = false;
        }
    };

    return (
        <div className="flex w-screen h-screen justify-center items-center bg-gray-100">
            <form className="p-8 bg-white rounded-lg w-4/5 md:max-w-screen-sm flex flex-col items-center">
                <h1 className="uppercase font-bold text-center text-3xl mb-5">
                    {isLogIn ? "Log In" : "Create Account"}
                </h1>
                {message && (
                    <div className="whitespace-pre-line w-full bg-red-100 rounded-lg py-2 px-4">
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
                    type="submit"
                    className="text-white bg-blue-600 disabled:bg-gray-400 disabled:text-black w-fit h-fit px-5 py-2 rounded-lg uppercase mt-8 mb-5 hover:bg-blue-500"
                    onClick={(event) => {
                        event.preventDefault();
                        submit(event);
                    }}
                >
                    Submit
                </button>
                <h5>
                    {isLogIn
                        ? "Don't have an account?"
                        : "Already have an account?"}
                    &nbsp;
                    <button
                        className="text-blue-600 underline"
                        onClick={(event) => {
                            event.preventDefault();
                            setIsLogIn((prev) => {
                                setUsername("");
                                setConfirmPassword("");
                                setMessage("");
                                return !prev;
                            });
                        }}
                    >
                        {isLogIn ? "Create Account" : "Log In"}
                    </button>
                </h5>
                {isLogIn && (
                    <h5>
                        Forgot your password? &nbsp;
                        <button
                            className="text-blue-600 underline"
                            onClick={async (event) => {
                                event.preventDefault();
                                event.target.disabled = true;
                                setMessage("");

                                if (
                                    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                                        email
                                    )
                                ) {
                                    setMessage(
                                        "Please, enter the email for which you wish to reset the password"
                                    );
                                    event.target.disabled = false;
                                    return;
                                }
                                try {
                                    await resetPasswordEmail(email);
                                    alert(
                                        "Please, check your email address for the password reset link."
                                    );
                                } catch (error) {
                                    alert(
                                        "Could not send the password reset email.\nPlease ensure the email entered is the correct one."
                                    );
                                    event.target.disabled = false;
                                }
                            }}
                        >
                            Reset Password
                        </button>
                    </h5>
                )}
            </form>
        </div>
    );
}

export default Signup;
