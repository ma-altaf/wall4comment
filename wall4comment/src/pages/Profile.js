import { useContext } from "react";
import { AuthContext } from "../API/auth";

function Profile() {
    const user = useContext(AuthContext);
    return <>{user && user.email}</>;
}

export default Profile;
