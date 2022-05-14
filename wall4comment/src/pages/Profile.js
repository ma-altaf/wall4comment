import { useContext, useEffect } from "react";
import { AuthContext } from "../API/auth";
import { Link, useNavigate } from "react-router-dom";
import LoadingCover from "./LoadingCover";
import LogOutBtn from "../components/LogOutBtn";
import EditUsername from "../components/EditUsername";
import ProfileImgEditable from "../components/ProfileImgEditable";
import PostList from "../components/PostList";

function Profile() {
    const navigate = useNavigate();
    const user = useContext(AuthContext);

    useEffect(() => {
        if (user == null) {
            navigate("/signup");
        }

        return;
    }, [user]);

    return user ? (
        <div className="min-h-screen overflow-x-hidden">
            <div className="flex items-center flex-col w-screen h-fit p-8 md:pt-14 lg:pt-24">
                <LogOutBtn />
                <ProfileImgEditable />
                <EditUsername />
                <Link
                    className="px-6 py-2 bg-blue-600 text-white uppercase rounded-full"
                    to={"/createPost"}
                >
                    New post
                </Link>
            </div>
            <PostList />
        </div>
    ) : (
        <LoadingCover />
    );
}

export default Profile;
