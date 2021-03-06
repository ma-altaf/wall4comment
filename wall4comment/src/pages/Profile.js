import { useContext, useEffect } from "react";
import { AuthContext, emailVerification } from "../API/auth";
import { useNavigate } from "react-router-dom";
import LoadingCover from "../components/LoadingCover";
import LogOutBtn from "../components/LogOutBtn";
import EditUsername from "../components/EditUsername";
import ProfileImgEditable from "../components/ProfileImgEditable";
import PostList from "../components/PostList";
import { motion } from "framer-motion";

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
                <motion.div
                    initial={{ y: "20%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    onClick={() => navigate("/createPost")}
                    className="px-6 py-2 bg-blue-600 text-white uppercase rounded-full cursor-pointer"
                >
                    New post
                </motion.div>
                {!user.emailVerified && <EmailVerificationBanner user={user} />}
            </div>
            <PostList />
        </div>
    ) : (
        <LoadingCover />
    );
}

function EmailVerificationBanner({ user }) {
    return (
        <div className="rounded-lg p-4 w-fit mt-6 bg-yellow-100">
            Please, verify your email by clicking on the link sent to your email
            address. <br /> Did not receive an email to verify your
            account?&nbsp;
            <button
                className="underline"
                onClick={() => emailVerification(user)}
            >
                Resend verification email
            </button>
        </div>
    );
}

export default Profile;
