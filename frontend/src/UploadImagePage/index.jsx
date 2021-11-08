import {Link, useHistory, useParams} from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { users } from "../users.json";
import { useAuthentication } from "../hooks/useAuthentication";

import ArtsumeModal from "../components/ArtsumeModal";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const UploadImagePage = () => {
    const history = useHistory();
    const fileRef = useRef(null);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const [, loggedInUser] = useAuthentication();
    const { username } = useParams();
    const user = users.find(user => user.username === username);

    const [fileError, setFileError] = useState("");
    const [titleError, setTitleError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");

    const upload = e => {
        e.preventDefault();
        const file = fileRef.current.value;
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;

        setFileError("");
        setTitleError("");
        setDescriptionError("");

        if (title.length === 0) {
            setTitleError("Artwork must have a title");
            return;
        }

        //add more file selector errors here once we figure out file types
        if (file.file === null) {
            setFileError("File must be selected");
            return;
        }

        if (description.length === 0) {
            setDescriptionError("Artwork must have a description");
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
                <input ref={fileRef} type="file" className="px-2 py-1 mb-10" />

                <label className="dark:text-gray-200 text-sm text-right mb-3">
                    Title:
                </label>
                {titleError && (
                    <em className="text-rose-400 text-sm float-right">
                        *{titleError}
                    </em>
                )}
                <input ref={titleRef} className="px-2 py-1 mb-10" type="text" />

                <label className="dark:text-gray-200 text-sm text-right mb-3">
                    Description:
                </label>
                {descriptionError && (
                    <em className="text-rose-400 text-sm float-right">
                        *{descriptionError}
                    </em>
                )}
                <textarea className="px-2 py-1 mb-8" ref={descriptionRef} rows="5">
                </textarea>
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

export default UploadImagePage;
