import { useRef, useState } from "react";
import { apiUrl } from "../config";
import { useAuthentication } from "../hooks/useAuthentication";
import axios from "axios";

const UploadArtworkModal = ({ onClose }) => {
  const [accessToken, user] = useAuthentication();

  const [imageUrl, setImageUrl] = useState("");
  const imageInput = useRef(null);
  const titleInput = useRef(null);
  const summaryInput = useRef(null);
  const descriptionInput = useRef(null);
  const tagsInput = useRef(null);

  const [imageError, setImageError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [summaryError, setSummaryError] = useState("");

  const upload = async e => {
    e.preventDefault();

    setImageError("");
    setTitleError("");
    setSummaryError("");

    const image = imageInput.current?.files?.[0];
    const title = titleInput.current.value;
    const summary = summaryInput.current.value;
    const description = descriptionInput.current.value;

    if (!image) return setImageError("no image selected");
    if (!title) return setTitleError("cannot be empty");
    if (!summary) return setTitleError("cannot be empty");

    const formData = new FormData();
    formData.append("image", imageInput.current.files[0]);
    formData.append("name", title);
    formData.append("summary", summary);
    formData.append("description", description);

    try {
      const response = await axios.post(`${apiUrl}/users/${user._id}/artworks`, formData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      console.log("UPLOADED", response);
      onClose();
      // TODO show loading success prompt
    } catch (e) {
      setImageError("failed to upload artwork");
      console.log(e);
    }
  };

  return (
    <main
      onClick={onClose}
      className="fixed inset-0 z-30  overflow-auto bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-sm flex"
    >
      <form
        onClick={e => e.stopPropagation()}
        onSubmit={upload}
        className="bg-gray-700 p-8 m-auto max-w-4xl flex gap-8 shadow-lg rounded-md"
      >
        <div className="" style={{ flexBasis: "45%" }}>
          <img className="mb-5" src={imageUrl} />
          <label className="dark:text-gray-200 text-sm text-right mb-2">Image:</label>
          {imageError && <em className="text-rose-400 text-sm float-right">*{imageError}</em>}
          <input
            ref={imageInput}
            onChange={e => {
              const reader = new FileReader();
              reader.onload = e => setImageUrl(e.target.result);
              reader.readAsDataURL(e.target.files[0]);
            }}
            type="file"
            accept="image/*"
            className="py-1 mb-8 w-full text-sm text-gray-300"
          />

          <label className="dark:text-gray-200 text-sm text-right mb-2">Tags:</label>
          <textarea className="px-2 py-1 w-full" ref={tagsInput} rows="3"></textarea>
        </div>

        <div className="" style={{ flexBasis: "55%" }}>
          <label className="dark:text-gray-200 text-sm text-right mb-2">Title:</label>
          {titleError && <em className="text-rose-400 text-sm float-right">*{titleError}</em>}
          <input ref={titleInput} className="px-2 py-1 mb-8 w-full" type="text" />

          <label className="dark:text-gray-200 text-sm text-right mb-2">Summary:</label>
          {summaryError && <em className="text-rose-400 text-sm float-right">*{summaryError}</em>}
          <input ref={summaryInput} className="px-2 py-1 mb-8 w-full" type="text" />

          <label className="dark:text-gray-200 text-sm text-right mb-2">Description:</label>
          <textarea className="px-2 py-1 mb-8 w-full" ref={descriptionInput} rows="5"></textarea>

          <button
            type="submit"
            className="text-white tracking-wider py-2.5 text-sm rounded-sm shadow-lg font-semibold bg-gradient-to-r from-rose-400 to-teal-500 hover:to-teal-400 hover:from-rose-400 block w-full"
          >
            UPLOAD
          </button>
        </div>
      </form>
    </main>
  );
};

export default UploadArtworkModal;
