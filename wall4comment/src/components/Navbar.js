import { Link } from "react-router-dom";
import Logo from "./Logo";
import { motion } from "framer-motion";

function Navbar() {
    return (
        <motion.div
            className="flex justify-between items-center w-full h-16 px-4 md:px-10 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <Logo shrink />
            <Link
                className="bg-blue-600 w-fit h-fit px-5 py-2 rounded-lg uppercase text-white"
                to="/signup"
            >
                account
            </Link>
        </motion.div>
    );
}

export default Navbar;
