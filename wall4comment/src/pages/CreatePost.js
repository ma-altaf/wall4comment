import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewPost } from "../API/firestore";
import BackBtn from "../components/BackBtn";

function CreatePost() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (
        <div className="bg-gray-100 w-screen overflow-x-hidden min-h-screen p-2">
            <header className="flex text-3xl sticky top-0">
                <BackBtn />
                <h1 className="w-full text-center uppercase">
                    Creating new post
                </h1>
            </header>
            <div className="flex flex-col my-4 lg:my-14 md:mx-14 lg:mx-28">
                <TitleInput title={title} setTitle={setTitle} />
                <DescriptionInput
                    description={description}
                    setDescription={setDescription}
                />
                <CreatePostBtn title={title} description={description} />
                <h5 className="mt-4">*Title is required</h5>
            </div>
        </div>
    );
}

function TitleInput({ title, setTitle }) {
    return (
        <div className="h-fit text-lg my-2">
            <label htmlFor="title" className="m-1 mr-8 uppercase font-bold">
                Title*
            </label>
            <input
                value={title}
                id="title"
                type={"text"}
                onChange={(event) => setTitle(event.target.value)}
                className="rounded-lg border-2 border-black w-full md:w-3/5 lg:w-3/6 p-2 focus:border-blue-600 outline-none duration-100"
            ></input>
        </div>
    );
}

function DescriptionInput({ description, setDescription }) {
    return (
        <div className="flex flex-col h-fit text-lg my-2">
            <label htmlFor="title" className="m-1 mr-8 uppercase font-bold">
                Description
            </label>
            <textarea
                value={description}
                rows={8}
                id="title"
                type={"text"}
                onChange={(event) => setDescription(event.target.value)}
                className="rounded-lg border-2 border-black w-full p-2 focus:border-blue-600 outline-none duration-100"
            ></textarea>
        </div>
    );
}

function CreatePostBtn({ title, description }) {
    const navigate = useNavigate();

    const createPost = async (event) => {
        event.target.disabled = true;

        if (title.length == 0) {
            alert("Title cannot be empty");
            event.target.disabled = false;
            return;
        }

        try {
            await addNewPost({
                title: title.trim(),
                description: description.trim(),
            });
            navigate("/profile");
        } catch (error) {
            console.log(error.message);
            alert("Sorry, post could not be added");
            event.target.disabled = false;
        }
    };

    return (
        <button
            className="mt-4 px-6 py-2 rounded-full bg-blue-600 text-white w-fit uppercase hover:cursor-pointer hover:"
            onClick={createPost}
        >
            create post
        </button>
    );
}

export default CreatePost;
