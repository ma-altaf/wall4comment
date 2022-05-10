import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function CreatePost() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const createPost = (event) => {
        event.target.disabled = true;

        setTitle((prev) => prev.trim());
        setDescription((prev) => prev.trim());

        if (title.length == 0) {
            alert("Title cannot be empty");
            event.target.disabled = false;
            return;
        }

        console.log("creating post");
        console.log("title:", title.trim());
        console.log("description:", description.trim());

        // only re-enable if creating post did not go through
        event.target.disabled = false;
    };

    const navigate = useNavigate();
    return (
        <div className="bg-gray-100 w-screen overflow-x-hidden min-h-screen p-4">
            <header className="flex text-3xl sticky top-0">
                <BiArrowBack
                    onClick={() => navigate(-1)}
                    className="cursor-pointer"
                />
                <h1 className="w-full text-center uppercase">
                    Creating new post
                </h1>
            </header>
            <div className="flex flex-col my-4 lg:my-14 md:mx-14 lg:mx-28">
                <div className="h-fit text-lg my-2">
                    <label
                        htmlFor="title"
                        className="m-1 mr-8 uppercase font-bold"
                    >
                        Title*
                    </label>
                    <input
                        value={title}
                        id="title"
                        type={"text"}
                        onChange={(event) => setTitle(event.target.value)}
                        className="rounded border-2 border-black w-full md:w-3/5 lg:w-3/6 p-2 focus:border-blue-600 outline-none duration-100"
                    ></input>
                </div>
                <div className="flex flex-col h-fit text-lg my-2">
                    <label
                        htmlFor="title"
                        className="m-1 mr-8 uppercase font-bold"
                    >
                        Description
                    </label>
                    <textarea
                        value={description}
                        rows={8}
                        id="title"
                        type={"text"}
                        onChange={(event) => setDescription(event.target.value)}
                        className="rounded border-2 border-black w-full p-2 focus:border-blue-600 outline-none duration-100"
                    ></textarea>
                </div>
                <button
                    className="mt-4 px-6 py-2 rounded-full bg-blue-600 text-white w-fit uppercase hover:cursor-pointer hover:"
                    onClick={createPost}
                >
                    create post
                </button>
                <h5 className="mt-4">*Title is required</h5>
            </div>
        </div>
    );
}

export default CreatePost;
