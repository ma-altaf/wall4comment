import { useContext } from "react";
import { AuthContext } from "../API/auth";

function Profile() {
    const user = useContext(AuthContext);
    return (
        <>
            {user && <div>email: {user.email}</div>}
            {user && <div>name: {user.displayName}</div>}
        </>
    );
}

export default Profile;
