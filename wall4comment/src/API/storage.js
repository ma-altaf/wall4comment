import {
    getStorage,
    ref,
    getDownloadURL,
    uploadBytesResumable,
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

    return [upload, progress];
};

export { useUploadProfilePic };
