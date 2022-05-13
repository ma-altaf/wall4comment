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
    increment,
    writeBatch,
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
        commentCount: 0,
    });
    await updateDoc(newDocRef, {
        postID: newDocRef.id,
    });
};

const getPostList = async () => {
    const documentSnapshots = query(postColRef(), orderBy("time", "desc"));
    return (await getDocs(documentSnapshots)).docs;
};

const getCommentsList = async (userID, postID) => {
    const postRef = collection(
        db,
        `users/${userID}/posts/${postID}`,
        "comments"
    );
    const documentSnapshots = query(postRef, orderBy("time", "desc"));
    return (await getDocs(documentSnapshots)).docs;
};

const deletePost = (postID) => {
    deleteDoc(doc(db, `users/${uid()}/posts/${postID}`));
};

const getPost = async (userID, postID) => {
    return await getDoc(doc(db, `users/${userID}/posts/`, `${postID}`));
};

const getProfile = async (userID) => {
    return await getDoc(doc(db, `users/`, `${userID}`));
};

const addComment = async (userID, postID, comment) => {
    const newCommentRef = await addDoc(
        collection(db, `users/${userID}/posts/${postID}`, "comments"),
        {
            comment,
            time: Timestamp.now(),
        }
    );
    await updateDoc(doc(db, `users/${userID}/posts/`, `${postID}`), {
        commentCount: increment(1),
        commentID: newCommentRef.id,
    });
    await updateDoc(newCommentRef, {
        commentID: newCommentRef.id,
    });
};

export {
    setName,
    updateName,
    updateProfilePic,
    addNewPost,
    getPostList,
    deletePost,
    getPost,
    getProfile,
    addComment,
    getCommentsList,
};
