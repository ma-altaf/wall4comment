import { updateProfile } from "firebase/auth";
import {
    doc,
    setDoc,
    updateDoc,
    getFirestore,
    addDoc,
    collection,
} from "firebase/firestore";
import { auth } from "./auth";
import app from "./firebase";

const db = getFirestore(app);
const userRef = () => doc(db, "users", `${auth.currentUser.uid}`);

const setName = async (username) => {
    // set username on firebase auth
    await updateProfile(auth.currentUser, {
        displayName: username,
    });

    // set username on firestore
    await setDoc(userRef(), {
        username,
    });
};

const updateName = async (username) => {
    // update username on firebase auth
    await updateProfile(auth.currentUser, {
        displayName: username,
    });

    // update username on firestore
    await updateDoc(userRef(), {
        username,
    });
};

const updateProfilePic = async (photoURLPromise) => {
    const photoURL = await photoURLPromise;

    // update user profile picture URl on firebase auth
    await updateProfile(auth.currentUser, {
        photoURL,
    });
    // update user profile picture URl on firestore auth
    await updateDoc(userRef(), {
        photoURL,
    });
};

const addNewPost = async (postContent) => {
    const newPostRef = collection(db, `users/${auth.currentUser.uid}`, `posts`);
    await addDoc(newPostRef, postContent);
};

export { setName, updateName, updateProfilePic, addNewPost };
