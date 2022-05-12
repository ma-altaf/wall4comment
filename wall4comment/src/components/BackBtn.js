import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";

function BackBtn() {
    return (
        <Link to={-1}>
            <BiArrowBack title="Click to exit" className="cursor-pointer" />
        </Link>
    );
}

export default BackBtn;
