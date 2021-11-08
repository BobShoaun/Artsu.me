import { Link, useHistory } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { users } from "../users.json";
import { useAuthentication } from "../hooks/useAuthentication";

import ArtsumeModal from "../components/ArtsumeModal";

const UploadAvatarPage = () => {
    const history = useHistory();
    const fileRef = useRef(null);

    const [fileError, setFileError] = useState("");

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
                <button
                    onClick={upload}
                    className="text-white tracking-wider py-2.5 mb-5 text-sm rounded-sm shadow-lg font-semibold bg-gradient-to-r from-rose-400 to-teal-500 hover:to-teal-400 hover:from-rose-400 block w-full"
                >
                    UPLOAD
                </button>
            </form>
        </ArtsumeModal>
    );
};

export default UploadAvatarPage;
