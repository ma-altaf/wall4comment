import { updateProfile } from "firebase/auth";
import {
    doc,
    setDoc,
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

const db = getFirestore(app);

enableIndexedDbPersistence(db).catch((err) => {
    if (err.code == "failed-precondition") {
        alert("caching could not be enabled");
    } else if (err.code == "unimplemented") {
        alert("Browser does not support caching");
    }
});

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
            time: serverTimestamp(),
        }
    );
    console.log(newCommentRef);
    await updateDoc(doc(db, `users/${userID}/posts/`, `${postID}`), {
        commentCount: increment(1),
    });

    await updateDoc(newCommentRef, {
        commentID: newCommentRef.id,
    });
};

// TODO: change to the actual link
const getPostLink = (postID) =>
    `http://localhost:3000/writeComment/${uid()}/${postID}`;

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
    getPostLink,
};
