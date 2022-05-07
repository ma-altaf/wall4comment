import { Link } from "react-router-dom";
import Logo from "./Logo";

function Navbar() {
    return (
        <div className="flex justify-between items-center w-full h-16 px-10">
            <Logo shrink={true} />
            <Link
                className="bg-blue-600 w-fit h-fit px-5 py-2 rounded uppercase"
                to="/signup"
            >
                account
            </Link>
        </div>
    );
}

export default Navbar;
