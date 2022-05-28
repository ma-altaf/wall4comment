import { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { addNewPost } from "../API/firestore";
import { BiImageAdd, BiX } from "react-icons/bi";
import BackBtn from "../components/BackBtn";
import { useUploadPostImg } from "../API/storage";
import { motion } from "framer-motion";

function CreatePost() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageList, setImageList] = useState([]);

    return (
        <div className="overflow-x-hidden min-h-screen p-2">
            <header className="flex text-3xl sticky top-0">
                <BackBtn />
                <motion.h1
                    className="w-full text-center uppercase"
                    initial={{ y: "-150%" }}
                    animate={{ y: 0 }}
                >
                    Creating new post
                </motion.h1>
            </header>
            <div className="flex flex-col my-4 lg:my-14 md:mx-14 lg:mx-28">
                <TitleInput title={title} setTitle={setTitle} />
                <DescriptionInput
                    description={description}
                    setDescription={setDescription}
                    imageList={imageList}
                    setImageList={setImageList}
                />
                <CreatePostBtn
                    title={title}
                    description={description}
                    imageList={imageList}
                />
                <motion.h5
                    className="mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                >
                    *Title is required
                </motion.h5>
            </div>
        </div>
    );
}

function TitleInput({ title, setTitle }) {
    return (
        <motion.div
            className="h-fit text-lg my-2"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
        >
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
        </motion.div>
    );
}

function DescriptionInput({
    description,
    setDescription,
    imageList,
    setImageList,
}) {
    return (
        <motion.div
            className="flex flex-col h-fit text-lg my-2"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.05 }}
        >
            <label htmlFor="title" className="m-1 mr-8 uppercase font-bold">
                Description
            </label>
            <div className="bg-gray-200 rounded-lg">
                <textarea
                    value={description}
                    rows={8}
                    id="title"
                    type={"text"}
                    onChange={(event) => setDescription(event.target.value)}
                    className="rounded-lg border-2 border-black w-full p-2 m-0 focus:border-blue-600 outline-none duration-100"
                ></textarea>
                <ImageSection
                    imageList={imageList}
                    setImageList={setImageList}
                />
            </div>
        </motion.div>
    );
}

function ImageSection({ imageList, setImageList }) {
    return (
        <div className="p-5 overflow-hidden grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <ImageGallery imageList={imageList} setImageList={setImageList} />
            <AddImageBtn setImageList={setImageList} />
        </div>
    );
}

function AddImageBtn({ setImageList }) {
    const imgInputRef = useRef();

    const imgHandler = async (event) => {
        const newImgs = event.currentTarget.files;
        if (!newImgs) {
            return;
        }
        setImageList((prevImgList) => [...prevImgList, ...newImgs]);
    };

    return (
        <>
            <input
                type={"file"}
                className="hidden"
                accept="image/*"
                ref={imgInputRef}
                onChange={imgHandler}
                multiple
            />

            <button
                className="p-6 rounded-lg flex justify-center items-center bg-gray-300 hover:bg-gray-400 duration-200"
                onClick={() => {
                    imgInputRef.current.click();
                }}
            >
                <span className="flex flex-col items-center uppercase">
                    <BiImageAdd className="text-6xl" />
                    Add image
                </span>
            </button>
        </>
    );
}

function ImageGallery({ imageList, setImageList }) {
    return (
        <>
            {imageList.map((image, index) => (
                <ImageHolder
                    key={index}
                    index={index}
                    image={image}
                    setImageList={setImageList}
                />
            ))}
        </>
    );
}

function ImageHolder({ index, image, setImageList }) {
    const removeImg = () => {
        setImageList((prevImgList) =>
            prevImgList.filter((_, imgIndex) => imgIndex !== index)
        );
    };

    return (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            exit={{ opacity: 0 }}
            className="rounded-lg overflow-hidden w-fit h-fit relative hover:cursor-pointer"
            onClick={removeImg}
        >
            <div
                title="Click to remove image"
                className="w-full h-full flex items-center justify-center absolute opacity-0 hover:opacity-100 bg-black bg-opacity-50 backdrop-blur-[1px] duration-200"
            >
                <BiX className="text-white text-3xl pointer-events-none" />
            </div>
            <img
                className="pointer-events-none object-cover"
                src={URL.createObjectURL(image)}
                alt={image.name}
            />
        </motion.div>
    );
}

function CreatePostBtn({ title, description, imageList }) {
    const navigate = useNavigate();
    const [uploading, setUploading] = useState(false);
    const [progress, upload] = useUploadPostImg();

    const createPost = async (event) => {
        event.target.disabled = true;
        setUploading(true);

        if (title.length === 0) {
            alert("Title cannot be empty");
            event.target.disabled = false;
            setUploading(false);
            return;
        }

        try {
            const postID = await addNewPost({
                title: title.trim(),
                description: description.trim(),
            });

            if (imageList.length !== 0) {
                await upload(postID, imageList);
            } else navigate("/profile");
        } catch (error) {
            alert("Sorry, post could not be added");
            event.target.disabled = false;
            setUploading(false);
        }
    };

    return (
        <motion.button
            className="mt-4 px-6 py-2 rounded-full bg-blue-600 text-white w-fit uppercase overflow-hidden relative duration-200"
            onClick={createPost}
            style={uploading ? { width: "100%" } : {}}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
        >
            <span
                className="bg-black opacity-25 h-full absolute top-0 left-0 duration-100"
                style={{ width: `${progress}%` }}
            ></span>
            {uploading ? (
                progress === 100 ? (
                    <>
                        <p>Done</p>
                        <Navigate to="/profile" />
                    </>
                ) : (
                    <p>Uploading...</p>
                )
            ) : (
                <p>Create Post</p>
            )}
        </motion.button>
    );
}

export default CreatePost;
