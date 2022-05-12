import { updateProfile } from "firebase/auth";
import {
    doc,
    setDoc,
    updateDoc,
    getFirestore,
    addDoc,
    collection,
    Timestamp,
    query,
    orderBy,
    limit,
    getDoc,
    getDocs,
    startAfter,
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
    const newDocRef = await addDoc(postColRef(), {
        ...postContent,
        time: Timestamp.now(),
    });
    await updateDoc(newDocRef, { postID: newDocRef.id, commentCount: 0 });
};

const getPostList = async () => {
    console.log("post requested");
    const documentSnapshots = query(postColRef(), orderBy("time", "desc"));

    return (await getDocs(documentSnapshots)).docs;
};

export { setName, updateName, updateProfilePic, addNewPost, getPostList };
