import { updateProfile } from "firebase/auth";
import { doc, setDoc, updateDoc, getFirestore } from "firebase/firestore";
import { auth } from "./auth";
import app from "./firebase";

const db = getFirestore(app);
const userRef = () => doc(db, "users", `${auth.currentUser.uid}`);

const setName = async (username) => {
    try {
        // set username on firebase auth
        await updateProfile(auth.currentUser, {
            displayName: username,
        });

        // set username on firestore
        await setDoc(userRef(), {
            username,
        });
    } catch (error) {
        console.log(error.message);
    }
};

const updateName = async (username) => {
    try {
        // update username on firebase auth
        await updateProfile(auth.currentUser, {
            displayName: username,
        });

        // update username on firestore
        await updateDoc(userRef(), {
            username,
        });
    } catch (error) {
        console.log(error);
    }
};

const updateImg = async (image) => {
    console.log(image);
    // const photoURL = "";
    // try {
    //     // update user profile picture URl on firebase auth
    //     await updateProfile(auth.currentUser, {
    //         photoURL,
    //     });
    //     // update user profile picture URl on firestore auth
    //     await updateDoc(userRef(), {
    //         photoURL,
    //     });
    // } catch (error) {
    //     console.log(error.message);
    // }
};

export { setName, updateName, updateImg };
