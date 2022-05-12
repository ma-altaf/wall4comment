import React from "react";
import defaultPP from "../asset/defaultPic.jpg";

function ProfilePic({ image, rounded = false, imgRef }) {
    return (
        <div
            className={`w-52 h-52 ${
                rounded && "rounded-full bg-gray-200"
            } overflow-hidden pointer-events-none`}
        >
            <img
                ref={imgRef}
                src={image || defaultPP}
                className="object-cover w-full h-full"
            />
        </div>
    );
}

export default ProfilePic;
