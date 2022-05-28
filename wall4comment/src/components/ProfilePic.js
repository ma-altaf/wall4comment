import React from "react";
import defaultPP from "../asset/defaultPic.jpg";
import { motion } from "framer-motion";

function ProfilePic({ image, rounded = false, imgRef }) {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`w-52 h-52 ${
                rounded && "rounded-full bg-gray-200"
            } overflow-hidden pointer-events-none`}
        >
            <img
                ref={imgRef}
                src={image || defaultPP}
                className="object-cover w-full h-full"
            />
        </motion.div>
    );
}

export default ProfilePic;
