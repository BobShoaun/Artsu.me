import { useRef, useState } from "react";
import { apiUrl } from "../config";
import { useAuthentication } from "../hooks/useAuthentication";
import axios from "axios";

const UploadAvatarModal = ({ onClose }) => {
  const { accessToken, user, login } = useAuthentication();

  const [imageUrl, setImageUrl] = useState("");
  const imageInput = useRef(null);

  const upload = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", imageInput.current.files[0]);

    try {
      const { data } = await axios.put(`${apiUrl}/users/${user._id}/avatar`, formData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      login(data, accessToken);
      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main
      onClick={onClose}
      className="cursor-pointer fixed inset-0 z-30 overflow-auto bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-sm flex"
    >
      <form
        onClick={e => e.stopPropagation()}
        onSubmit={upload}
        className="bg-gray-700 p-8 m-auto max-w-4xl shadow-lg rounded-md cursor-auto"
      >
        <img className="mb-5 max-w-sm" src={imageUrl} alt={""} />
        <label className="dark:text-gray-200 text-sm text-right mb-2">Avatar:</label>
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
        <button
          type="submit"
          className="text-white tracking-wider py-2.5 text-sm rounded-sm shadow-lg font-semibold bg-gradient-to-r from-rose-400 to-teal-500 hover:to-teal-400 hover:from-rose-400 block w-full"
        >
          UPLOAD
        </button>
      </form>
    </main>
  );
};

export default UploadAvatarModal;
