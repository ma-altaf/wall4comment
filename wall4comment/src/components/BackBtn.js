import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function BackBtn() {
    return (
        <motion.div initial={{ x: "-150%" }} animate={{ x: 0 }}>
            <Link to={-1}>
                <BiArrowBack title="Click to exit" className="cursor-pointer" />
            </Link>
        </motion.div>
    );
}

export default BackBtn;
