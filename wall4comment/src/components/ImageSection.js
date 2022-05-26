import { useEffect, useRef, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

function ImageSection({ postImagesURL }) {
    const [imgIndex, setImgIndex] = useState(0);
    const arrows = useRef([]);

    useEffect(() => {
        if (postImagesURL.length === 1) {
            arrows.current.forEach((el) => (el.style.display = "none"));
        }

        return;
    }, []);

    const updateImgIndex = (step) => {
        setImgIndex((prevIndex) => {
            // update previous index to the new index
            prevIndex += step;

            // new index below 0, loop around to last image
            if (prevIndex < 0) {
                return postImagesURL.length - 1;
            }

            // new index above/equal to the number of images, loop around to first image
            if (prevIndex >= postImagesURL.length) {
                return 0;
            }

            setImgIndex(prevIndex);
        });
    };

    return (
        <div className="w-full p-2 overflow-hidden flex justify-evenly items-center text-3xl">
            <button
                ref={(el) => (arrows.current[0] = el)}
                className="hover:bg-gray-100 h-fit aspect-square rounded-full p-1 z-10 duration-200"
                title="Click to see next image"
                onClick={() => updateImgIndex(-1)}
            >
                <BiChevronLeft />
            </button>
            <div className="rounded-lg overflow-hidden max-w-[70%] m-2">
                <img
                    className="w-full max-h-[80vh]"
                    src={postImagesURL[imgIndex]}
                    alt=""
                />
            </div>

            <button
                ref={(el) => (arrows.current[1] = el)}
                className="hover:bg-gray-100 h-fit aspect-square rounded-full p-1 z-10 duration-200"
                title="Click to see previous image"
                onClick={() => updateImgIndex(1)}
            >
                <BiChevronRight />
            </button>
        </div>
    );
}

export default ImageSection;
