import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Hompage() {
    const navigate = useNavigate();
    return (
        <>
            <Navbar />
            <div className="flex w-full justify-center items-center h-screen -mt-16">
                <div className="w-full md:w-3/4 m-5 p-5 flex flex-col items-center">
                    <motion.h1
                        className="text-5xl text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Send & receive truthful constructive comments
                    </motion.h1>
                    <motion.div
                        className="text-justify my-12"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                    >
                        Wall 4 Comment is a platform where users can create
                        posts which includes text and photos. These posts can
                        then be shared through custom links to enable the
                        audience where the links are being posted to send
                        anonymous comments about the content of the posts. With
                        the anonymity provided to the audience, we aim for them
                        to provide more honest feedbacks which they might be
                        hesitant to provide otherwise.
                    </motion.div>
                    <motion.button
                        className="bg-blue-600 w-fit h-fit px-5 py-2 rounded-lg uppercase text-white"
                        onClick={() => navigate("/signup")}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        Get Started
                    </motion.button>
                </div>
            </div>
            <motion.p
                className="w-full flex items-center justify-end px-4 md:px-10 h-16 -mt-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
            >
                Developed by&nbsp;
                <a
                    className="underline text-blue-500"
                    target="_blank"
                    rel="noreferrer"
                    href="https://altafagowun.web.app/"
                >
                    A.Altaf
                </a>
            </motion.p>
        </>
    );
}

export default Hompage;
