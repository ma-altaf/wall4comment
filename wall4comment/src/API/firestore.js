import { updateProfile } from "firebase/auth";
import { doc, setDoc, updateDoc, getFirestore } from "firebase/firestore";
import { auth } from "./auth";
import app from "./firebase";

const db = getFirestore(app);

const setName = async (username) => {
    try {
        // set username on firestore auth
        await updateProfile(auth.currentUser, {
            displayName: username,
        });

        // set username on firestore
        const usernameRef = doc(db, "users", `${auth.currentUser.uid}`);
        await setDoc(usernameRef, {
            username,
        });
    } catch (error) {
        console.log(error.message);
    }
};

const updateName = async (username) => {
    try {
        // update username on firestore auth
        await updateProfile(auth.currentUser, {
            displayName: username,
        });

        // update username on firestore
        const usernameRef = doc(db, "users", `${auth.currentUser.uid}`);
        await updateDoc(usernameRef, {
            username,
        });
    } catch (error) {
        console.log(error.message);
    }
};

export { setName, updateName };
