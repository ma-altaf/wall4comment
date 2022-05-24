import Navbar from "../components/Navbar";

function Hompage() {
    return (
        <>
            <Navbar />
            <div className="flex w-full justify-center items-center h-screen -mt-16">
                <div className="w-full md:w-3/4 m-5 p-5">
                    <h1 className="text-5xl text-center">
                        Send & receive truthful constructive comments
                    </h1>
                    <div className="text-justify mt-12">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                    </div>
                </div>
            </div>
            <h5 className="w-full flex items-center justify-end px-10 h-16 -mt-16">
                Developed by&nbsp;
                <a
                    className="underline text-blue-500"
                    target="_blank"
                    rel="noreferrer"
                    href="https://altafagowun.web.app/"
                >
                    A.Altaf
                </a>
            </h5>
        </>
    );
}

export default Hompage;
