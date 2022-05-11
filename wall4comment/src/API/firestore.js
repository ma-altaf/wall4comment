import { updateProfile } from "firebase/auth";
import {
    doc,
    setDoc,
    updateDoc,
    getFirestore,
    addDoc,
    collection,
    Timestamp,
} from "firebase/firestore";
import { auth } from "./auth";
import app from "./firebase";

const db = getFirestore(app);
const userRef = () => doc(db, "users", `${auth.currentUser.uid}`);
const postColRef = () =>
    collection(db, `users/${auth.currentUser.uid}`, `posts`);

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
    await addDoc(postColRef(), { ...postContent, time: Timestamp.now() });
};

const getPostList = async (limit = 1, docOffset = null) => {
    // TODO: implement getting a list of limit documents starting at docOffset
};

export { setName, updateName, updateProfilePic, addNewPost, getPostList };
