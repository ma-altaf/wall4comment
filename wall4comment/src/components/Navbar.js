import { Link } from "react-router-dom";
import Logo from "./Logo";

function Navbar() {
    return (
        <div className="flex justify-between items-center w-full h-16 px-4 md:px-10 z-50">
            <Logo shrink />
            <Link
                className="bg-blue-600 w-fit h-fit px-5 py-2 rounded-lg uppercase text-white"
                to="/signup"
            >
                account
            </Link>
        </div>
    );
}

export default Navbar;
