import { startTransition, useEffect, useRef, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";

function ImageSection({ postImagesURL }) {
    const [imgIndex, setImgIndex] = useState(0);
    const arrows = useRef([]);
    const [swipeToLeft, setSwipeToLeft] = useState(true);

    useEffect(() => {
        if (postImagesURL.length === 1) {
            arrows.current.forEach((el) => (el.style.display = "none"));
        }

        return;
    }, [postImagesURL.length]);

    const updateImgIndex = (step) => {
        setSwipeToLeft(step > 0);

        // ensure the swipe direction is evaluated before the image changes
        startTransition(() => {
            setImgIndex((prevIndex) => {
                // update previous index to the new index
                const newIndex = prevIndex + step;

                // new index below 0, loop around to last image
                if (newIndex < 0) {
                    return postImagesURL.length - 1;
                }

                // new index above/equal to the number of images, loop around to first image
                if (newIndex >= postImagesURL.length) {
                    return 0;
                }

                return newIndex;
            });
        });
    };

    return (
        <div className="w-full p-2 overflow-hidden flex justify-evenly items-center text-3xl">
            <motion.button
                ref={(el) => (arrows.current[0] = el)}
                className="hover:bg-gray-100 h-fit aspect-square rounded-full p-1 z-10 duration-200"
                title="Click to see next image"
                onClick={() => updateImgIndex(-1)}
                initial={{ x: 10 }}
                animate={{ x: 0 }}
            >
                <BiChevronLeft />
            </motion.button>

            <motion.div className="rounded-lg  max-w-[70%] m-2 overflow-hidden grid grid-cols-1 relative">
                <AnimatePresence initial={false}>
                    <motion.img
                        key={postImagesURL[imgIndex]}
                        className="w-full max-h[80vh] object-cover"
                        style={{
                            gridRowStart: 1,
                            gridColumnStart: 1,
                        }}
                        src={postImagesURL[imgIndex]}
                        initial={{
                            clipPath: swipeToLeft
                                ? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
                                : "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                        }}
                        animate={{
                            clipPath:
                                "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                        }}
                        exit={{
                            clipPath: swipeToLeft
                                ? "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
                                : "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
                        }}
                        transition={{ duration: 1 }}
                    />
                </AnimatePresence>
                {postImagesURL.length > 1 && (
                    <p className="absolute bottom-0 right-0 p-2 mix-blend-difference text-white text-lg md:text-3xl">
                        {imgIndex + 1}/{postImagesURL.length}
                    </p>
                )}
            </motion.div>

            <motion.button
                ref={(el) => (arrows.current[1] = el)}
                className="hover:bg-gray-100 h-fit aspect-square rounded-full p-1 z-10 duration-200"
                title="Click to see previous image"
                onClick={() => updateImgIndex(1)}
                initial={{ x: -10 }}
                animate={{ x: 0 }}
            >
                <BiChevronRight />
            </motion.button>
        </div>
    );
}

export default ImageSection;
