import React from "react";

function Logo({ shrink = false }) {
    return (
        <div
            className={`relative flex uppercase text-center justify-center items-center h-fit pointer-events-none`}
        >
            <h1
                className={`font-bold w-fit block ${
                    shrink
                        ? "text-xl -translate-y-3 translate-x-4"
                        : "-translate-y-6 translate-x-8 text-3xl"
                }`}
            >
                wall
            </h1>
            <h1
                className={`font-extrabold text-blue-600 lue text-opacity-40 ${
                    shrink ? "text-6xl" : "text-8xl"
                }`}
            >
                4
            </h1>
            <h1
                className={`font-bold w-fit ${
                    shrink
                        ? "text-xl translate-y-4 -translate-x-3"
                        : "translate-y-8 -translate-x-6 text-3xl"
                }`}
            >
                comment
            </h1>
        </div>
    );
}

export default Logo;
