import {Link, useHistory, useParams} from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { users } from "../users.json";
import { useAuthentication } from "../hooks/useAuthentication";

import ArtsumeModal from "../components/ArtsumeModal";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const UploadAvatarPage = () => {
    const history = useHistory();
    const fileRef = useRef(null);
    const { username } = useParams();

    const [fileError, setFileError] = useState("");
    const user = users.find(user => user.username === username);
    const [, loggedInUser] = useAuthentication();

    const upload = e => {
        e.preventDefault();
        const file = fileRef.current.value;

        setFileError("");

        //add more file selector errors here once we figure out file types
        if (file.file === null) {
            setFileError("File must be selected");
            return;
        }

    };

    if (loggedInUser === user){
    return (
        <ArtsumeModal>
            <form className="">
                <label className="dark:text-gray-200 text-sm text-right mb-2">
                    File:
                </label>
                {fileError && (
                    <em className="text-rose-400 text-sm float-right">
                        *{fileError}
                    </em>
                )}
                <input ref={fileRef} type="file" className="px-2 py-1 mb-10"/>
                <button
                    onClick={upload}
                    className="text-white tracking-wider py-2.5 mb-5 text-sm rounded-sm shadow-lg font-semibold bg-gradient-to-r from-rose-400 to-teal-500 hover:to-teal-400 hover:from-rose-400 block w-full"
                >
                    UPLOAD
                </button>
            </form>
        </ArtsumeModal>
    );
}
else{
        return(
            <main className="dark:bg-gray-900">
                <Navbar />
                <h1 className="dark:text-white text-2xl font-semibold text-center py-5 min-h-screen">403 Unauthorized</h1>
                <Footer />
            </main>
        );
    }
};

export default UploadAvatarPage;
