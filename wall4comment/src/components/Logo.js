import React from "react";

function Logo({ scale }) {
    return (
        <div
            className={`flex text-5xl uppercase text-center justify-center items-center scale-[${
                scale || 1
            }]`}
        >
            <h1 className="absolute -translate-y-3/4 -translate-x-1/2 font-bold w-fit">
                wall
            </h1>
            <h1 className=" text-9xl font-extrabold text-blue-600 lue text-opacity-40">
                4
            </h1>
            <h1 className="absolute translate-y-3/4 translate-x-1/2 font-bold w-fit">
                comment
            </h1>
        </div>
    );
}

export default Logo;
