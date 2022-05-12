import {
    getStorage,
    ref,
    getDownloadURL,
    uploadBytesResumable,
} from "firebase/storage";
import { auth } from "./auth";
import app from "./firebase";
import { updateProfilePic } from "./firestore";

const storage = getStorage(app);

const uploadProfilePic = async (image) => {
    try {
        const uid = auth.currentUser.uid;
        const imgRef = ref(storage, `users/${uid}/profilePic-${uid}`);
        const uploadTask = uploadBytesResumable(imgRef, image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
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
    } catch (error) {
        console.log(error);
    }
};

export { uploadProfilePic };
