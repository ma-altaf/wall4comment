import { logOut } from "../API/auth";
import { BiExit } from "react-icons/bi";
import { motion } from "framer-motion";

function LogOutBtn() {
    return (
        <motion.button
            className="flex items-center absolute top-0 right-0 text-gray-400 m-1 md:m-2 lg:m-4"
            onClick={() => {
                window.confirm("Are sure you want to log out?") && logOut();
            }}
            initial={{ x: "150%" }}
            animate={{ x: 0 }}
        >
            <p className=" text-xl mr-2 uppercase">Log Out</p>
            <BiExit className=" text-2xl" />
        </motion.button>
    );
}

export default LogOutBtn;
