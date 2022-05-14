import React from "react";
import Logo from "../components/Logo";

function Thank() {
    return (
        <div className="w-screen min-h-screen flex flex-col text-center justify-center items-center overflow-hidden">
            <Logo />
            <span className="h-16" />
            <h1 className="uppercase text-3xl font-semibold">
                Thank you for submitting a comment !!!
            </h1>
        </div>
    );
}

export default Thank;
