import { useRef, useState, useContext } from "react";
import ProfilePic from "../components/ProfilePic";
import { uploadProfilePic } from "../API/storage";
import { AuthContext } from "../API/auth";

function ProfileImgEditable() {
    const user = useContext(AuthContext);
    const imgInputRef = useRef();
    const imgRef = useRef();
    const [userImg, setUserImg] = useState(user?.photoURL);

    const imgHandler = async (event) => {
        const newImg = event.currentTarget.files[0];
        if (!newImg) {
            return;
        }
        try {
            await uploadProfilePic(newImg);
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
                className="rounded-full z-50 cursor-pointer"
                onClick={() => {
                    imgInputRef.current.click();
                }}
            >
                <ProfilePic imgRef={imgRef} image={userImg} rounded />
            </div>
        </>
    );
}

export default ProfileImgEditable;
