import { useRef, useState, useContext } from "react";
import ProfilePic from "../components/ProfilePic";
import LoadingProgress from "../components/LoadingProgress";
import { useUploadProfilePic } from "../API/storage";
import { AuthContext } from "../API/auth";

function ProfileImgEditable() {
    const user = useContext(AuthContext);
    const imgInputRef = useRef();
    const imgRef = useRef();
    const [userImg, setUserImg] = useState(user?.photoURL);
    const [progress, upload] = useUploadProfilePic();

    const imgHandler = async (event) => {
        const newImg = event.currentTarget.files[0];
        if (!newImg) {
            return;
        }
        try {
            await upload(newImg);
            setUserImg(URL.createObjectURL(newImg));
        } catch (error) {
            console.log(error);
            alert("Sorry, there was an error changing the profile picture");
        }
    };

    return (
        <>
            <input
                type={"file"}
                className="hidden"
                accept="image/*"
                ref={imgInputRef}
                onChange={imgHandler}
            />
            <div
                title="Click to change profile picture"
                className="rounded-full z-50 cursor-pointer relative overflow-hidden"
                onClick={() => {
                    imgInputRef.current.click();
                }}
            >
                {progress != 100 && <LoadingProgress progress={progress} />}
                <ProfilePic imgRef={imgRef} image={userImg} rounded />
            </div>
        </>
    );
}

export default ProfileImgEditable;
