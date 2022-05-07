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
        </>
    );
}

export default Hompage;
