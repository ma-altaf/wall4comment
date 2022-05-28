import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function BackBtn() {
    const navigate = useNavigate();
    return (
        <motion.div
            initial={{ x: "-150%" }}
            animate={{ x: 0 }}
            onClick={() => navigate(-1)}
        >
            <BiArrowBack title="Click to exit" className="cursor-pointer" />
        </motion.div>
    );
}

export default BackBtn;
