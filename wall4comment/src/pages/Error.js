import { Link } from "react-router-dom";

function Error() {
    return (
        <div className="flex w-full justify-center items-center flex-col h-screen">
            <h1 className="uppercase text-5xl font-bold">Error</h1>
            <div className="max-w-3/5">
                <div className="flex text-justify items-center flex-col m-5">
                    Oops, there was an error displaying this page. (ensure the
                    requested URL is correctly entered)
                    <Link
                        className="m-5 bg-blue-600 w-fit px-5 py-3 rounded-lg uppercase"
                        to="/"
                    >
                        return to Hompage
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Error;
