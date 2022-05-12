import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import app from "./firebase";

const auth = getAuth(app);
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

const logOut = async () => {
    await signOut(auth);
};

export { auth, AuthWrapper, AuthContext, logOut };
