import Logo from "../components/Logo";

function Hompage() {
    return (
        <>
            <div className="flex w-full justify-center items-center h-screen">
                <div className="w-3/5 m-5 p-5">
                    <Logo />
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
