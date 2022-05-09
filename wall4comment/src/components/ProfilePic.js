import React from "react";
import defaultPP from "../asset/pp1.jpg";

function ProfilePic({ image, rounded = false }) {
    return (
        <div
            className={`w-52 h-52 bg-gray-400 ${
                rounded && "rounded-full"
            } overflow-hidden pointer-events-none`}
        >
            <img
                src={image || defaultPP}
                className="w-full h-full object-cover"
            />
        </div>
    );
}

export default ProfilePic;
