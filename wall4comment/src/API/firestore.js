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
    deleteDoc,
} from "firebase/firestore";
import { auth } from "./auth";
import app from "./firebase";

const db = getFirestore(app);
const uid = () => auth.currentUser.uid;
const userRef = () => doc(db, "users", `${uid()}`);
const postColRef = () => collection(db, `users/${uid()}`, `posts`);

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
    const documentSnapshots = query(postColRef(), orderBy("time", "desc"));

    return (await getDocs(documentSnapshots)).docs;
};

const deletePost = (postID) => {
    deleteDoc(doc(db, `users/${uid()}/posts/${postID}`));
};

const getPost = async (postID) => {
    return await getDoc(doc(db, `users/${uid()}/posts/`, `${postID}`));
};

export {
    setName,
    updateName,
    updateProfilePic,
    addNewPost,
    getPostList,
    deletePost,
    getPost,
};
