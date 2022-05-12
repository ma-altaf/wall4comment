import React from "react";
import Logo from "../components/Logo";

function LoadingCover() {
    return (
        <div className="flex justify-center items-center uppercase w-screen h-screen">
            <div className="text-xl flex items-center flex-col">
                <Logo shrink />
                <h1>LOADING...</h1>
            </div>
        </div>
    );
}

export default LoadingCover;
