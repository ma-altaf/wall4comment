import React from "react";
import { motion } from "framer-motion";

function ProfilePic({ image, userName, rounded = false, imgRef }) {
    const shortName = () =>
        userName
            ?.split(" ", 3)
            .reduce((shortName, subName) => (shortName += subName[0]), "");

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`w-52 h-52 ${
                rounded && "rounded-full bg-gray-200"
            } overflow-hidden pointer-events-none`}
        >
            {image ? (
                <img
                    ref={imgRef}
                    src={image}
                    className="object-cover w-full h-full"
                />
            ) : (
                <div className="w-full h-full bg-blue-600 flex justify-center items-center uppercase text-5xl tracking-wide text-white">
                    {shortName() || "w4c"}
                </div>
            )}
        </motion.div>
    );
}

export default ProfilePic;
