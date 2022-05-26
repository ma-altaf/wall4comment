import {
    doc,
    updateDoc,
    getFirestore,
    addDoc,
    collection,
    query,
    orderBy,
    limit,
    getDoc,
    getDocs,
    startAfter,
    deleteDoc,
    increment,
    serverTimestamp,
    enableIndexedDbPersistence,
} from "firebase/firestore";
import { auth } from "./auth";
import app from "./firebase";

export const db = getFirestore(app);

enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === "failed-precondition") {
        alert("caching could not be enabled");
    } else if (err.code === "unimplemented") {
        alert("Browser does not support caching");
    }
});

const uid = () => auth.currentUser.uid;
const postColRef = () => collection(db, `users/${uid()}`, `posts`);

const addNewPost = async (postContent) => {
    const newDocRef = await addDoc(postColRef(), {
        ...postContent,
        time: serverTimestamp(),
        commentCount: Number(0),
    });

    await updateDoc(newDocRef, {
        postID: newDocRef.id,
    });

    return newDocRef.id;
};

const getPostList = async (num, paginateDoc) => {
    let options = [];
    options.push(orderBy("time", "desc"));

    if (paginateDoc) options.push(startAfter(paginateDoc));

    if (num) options.push(limit(num));

    const documentSnapshots = query(postColRef(), ...options);
    return (await getDocs(documentSnapshots)).docs;
};

const getCommentsList = async (userID, postID, num, paginateDoc) => {
    let options = [];
    options.push(orderBy("time", "desc"));

    if (paginateDoc) options.push(startAfter(paginateDoc));

    if (num) options.push(limit(num));

    const postRef = collection(
        db,
        `users/${userID}/posts/${postID}`,
        "comments"
    );
    const documentSnapshots = query(postRef, ...options);
    return (await getDocs(documentSnapshots)).docs;
};

const deletePost = (postID) => {
    return deleteDoc(doc(db, `users/${uid()}/posts/${postID}`));
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
            time: serverTimestamp(),
        }
    );
    await updateDoc(doc(db, `users/${userID}/posts/`, `${postID}`), {
        commentCount: increment(1),
    });

    await updateDoc(newCommentRef, {
        commentID: newCommentRef.id,
    });
};

// TODO: change to the actual link
const getPostLink = (postID) =>
    `https://wall4comment.web.app/writeComment/${uid()}/${postID}`;

export {
    addNewPost,
    getPostList,
    deletePost,
    getPost,
    getProfile,
    addComment,
    getCommentsList,
    getPostLink,
};
