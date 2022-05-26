import { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import app from "./firebase";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "./firestore";

const auth = getAuth(app);
const uid = () => auth.currentUser.uid;
const userRef = () => doc(db, "users", `${uid()}`);
let AuthContext;

function AuthWrapper({ children }) {
    AuthContext = createContext(null);
    // user is set to false so that if there is no user it will be set to null
    const [user, setUser] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

const createAccount = async (username, email, password) => {
    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    await setName(username.trim());
    await sendEmailVerification(newUser.user);
};

const logIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
};

const logOut = async () => {
    await signOut(auth);
};

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

const resetPasswordEmail = async (email) => {
    await sendPasswordResetEmail(auth, email);
};

export {
    auth,
    AuthWrapper,
    AuthContext,
    createAccount,
    logIn,
    logOut,
    setName,
    updateName,
    updateProfilePic,
    resetPasswordEmail,
};
