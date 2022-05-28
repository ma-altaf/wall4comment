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
                        Wall 4 Comment is a platform where users can create
                        posts which includes text and photos. These posts can
                        then be shared through custom links to enable the
                        audience where the links are being posted to send
                        anonymous comments about the content of the posts. With
                        the anonymity provided to the audience, we aim for them
                        to provide more honest feedbacks which they might be
                        hesitant to provide otherwise.
                    </div>
                </div>
            </div>
            <h5 className="w-full flex items-center justify-end px-4 md:px-10 h-16 -mt-16">
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
