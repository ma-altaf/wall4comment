import {
    getStorage,
    ref,
    getDownloadURL,
    uploadBytesResumable,
    deleteObject,
    listAll,
} from "firebase/storage";
import { useState } from "react";
import { auth } from "./auth";
import app from "./firebase";
import { updateProfilePic } from "./firestore";

const storage = getStorage(app);

const useUploadProfilePic = () => {
    // default 100 since there is no progress required (used to toggle display)
    const [progress, setProgress] = useState(100);
    const uid = auth.currentUser.uid;
    const imgRef = ref(storage, `users/${uid}/profilePic-${uid}`);

    const upload = async (image) => {
        const uploadTask = uploadBytesResumable(imgRef, image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                setProgress(
                    Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    )
                );
            },
            (error) => {
                alert("Sorry, new profile picture could not be uploaded");
                console.log(error);
            },
            () => {
                try {
                    updateProfilePic(getDownloadURL(uploadTask.snapshot.ref));
                } catch (error) {
                    console.log(error);
                }
            }
        );
    };

    return [progress, upload];
};

const useUploadPostImg = () => {
    // default 100 since there is no progress required (used to toggle display)
    const [progress, setProgress] = useState(0);
    const uid = auth?.currentUser?.uid;

    const upload = async (postID, images) => {
        let NumImgUploaded = 0;
        images.forEach((image, index) => {
            const imgRef = ref(
                storage,
                `users/${uid}/${postID}/image-${index}`
            );
            const uploadTask = uploadBytesResumable(imgRef, image);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    console.log(
                        `image ${index}`,
                        Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                                100
                        )
                    );
                },
                (error) => {
                    alert(`Sorry, image ${index + 1} could not be uploaded!`);
                    // TODO: remove firestore and storage if an image could not be uploaded
                    console.log(error);
                },
                () => {
                    setProgress(
                        Math.round((++NumImgUploaded / images.length) * 100)
                    );
                }
            );
        });
    };

    return [progress, upload];
};

const deletePostImages = async (postID) => {
    const uid = auth?.currentUser?.uid;
    const postRef = ref(storage, `users/${uid}/${postID}`);
    (await listAll(postRef)).items.forEach((imgRef) => deleteObject(imgRef));
};

export { useUploadProfilePic, useUploadPostImg, deletePostImages };
