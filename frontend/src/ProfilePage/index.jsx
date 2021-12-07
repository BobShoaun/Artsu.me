import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./index.css";

import { Link } from "react-router-dom"; // removed useParams as it is unused
import UploadArtworkModal from "./UploadArtworkModal";
import UploadAvatarModal from "./UploadAvatarModal";
import { useState, useEffect, useRef } from "react";

import { useAuthentication } from "../hooks/useAuthentication";
import axios from "axios";
import { apiUrl } from "../config";

import Unauthenticated from "../components/Unauthenticated";
import ArtworkPreview from "../components/ArtworkPreview";

const ProfilePage = () => {
  const { isLoggedIn, accessToken, user, redirectToLogin, login } = useAuthentication();
  const [showArtworkModal, setShowArtworkModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const [artworks, setArtworks] = useState([]);
  const nameInput = useRef(null);
  const usernameInput = useRef(null);
  const newPasswordInput = useRef(null);
  const confirmPasswordInput = useRef(null);
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");

  //phase2: create method here for API call to update user information
  const getArtworks = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/users/${user._id}/artworks`);
      setArtworks(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      redirectToLogin();
      return;
    }
    getArtworks();
  }, [accessToken, user]);

  const updateInfo = async e => {
    e.preventDefault();
    try {
      const name = nameInput.current.value;
      const username = usernameInput.current.value;
      setNameError("");
      if (!name || !username) {
        setNameError("Name and Username cannot be empty");
        return;
      }
      const { data } = await axios.patch(
        `${apiUrl}/users/${user._id}`,
        [
          { op: "replace", path: "/name", value: name },
          { op: "replace", path: "/username", value: username },
        ],
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      login(data, accessToken);
      alert("Updated name and username.");
    } catch (e) {
      console.log(e);
    }
  };

  const updatePassword = async e => {
    e.preventDefault();
    try {
      const newPassword = newPasswordInput.current.value;
      const confirmPassword = confirmPasswordInput.current.value;
      setPasswordError("");
      if (newPassword !== confirmPassword) {
        setPasswordError("Passwords do not match");
        return;
      }
      if (newPassword.length < 4) {
        setPasswordError("Passwords must be at least 4 characters");
        return;
      }
      await axios.put(
        `${apiUrl}/users/${user._id}/password`,
        { password: newPassword },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      newPasswordInput.current.value = "";
      confirmPasswordInput.current.value = "";
      alert("Updated password.");
    } catch (e) {
      console.log(e);
    }
  };

  if (!isLoggedIn) return <Unauthenticated />;

  return (
    <main className="dark:bg-gray-900">
      <Navbar />

      {showArtworkModal && (
        <UploadArtworkModal
          onClose={() => {
            setShowArtworkModal(false);
            getArtworks();
          }}
        />
      )}

      {showAvatarModal && (
        <UploadAvatarModal
          onClose={() => {
            setShowAvatarModal(false);
          }}
        />
      )}

      <div className="container mx-auto flex gap-12 px-10 pt-32 pb-20">
        <aside className="ml-auto mt-5">
          <img
            className="mx-auto shadow-lg rounded-lg mb-4 w-52"
            src={user.avatarUrl}
            alt={`${user.name} avatar`}
          />

          <div className="text-center">
            <button
              onClick={() => setShowAvatarModal(true)}
              className="text-gray-900 bg-gray-300 hover:bg-gray-400 py-1.5 px-3 mb-5 text-sm rounded-sm shadow-lg font-medium transition"
            >
              Update Avatar
            </button>
          </div>
        </aside>
        <section className="mr-auto">
          <h1 className="text-white text-xl font-bold mb-8">General Information</h1>
          <form action="" onSubmit={updateInfo} className="pl-5">
            <label className="dark:text-gray-200 text-sm text-right mb-2">Name:</label>
            <input
              ref={nameInput}
              defaultValue={user.name}
              className="px-2 py-1 mb-7"
              type="text"
            />
            <label className="dark:text-gray-200 text-sm text-right mb-3">Username:</label>
            <input
              ref={usernameInput}
              defaultValue={user.username}
              className="px-2 py-1 mb-5"
              type="text"
            />
            <div className="text-right">
              {nameError && <em className="text-rose-400 text-sm float-left">*{nameError}</em>}

              <button
                type="submit"
                className="text-gray-900 bg-gray-300 hover:bg-gray-400 py-1.5 px-3 mb-5 text-sm rounded-sm shadow-lg font-medium transition"
              >
                Update Info
              </button>
            </div>
          </form>
          <h1 className="text-white text-xl font-bold mb-8">Password</h1>
          <form action="" onSubmit={updatePassword} className="pl-5">
            <label className="dark:text-gray-200 text-sm text-right mb-2">New Password:</label>
            <input ref={newPasswordInput} className="px-2 py-1 mb-7" type="password" />
            <label className="dark:text-gray-200 text-sm text-right mb-3">Confirm Password:</label>
            <input ref={confirmPasswordInput} className="px-2 py-1 mb-5" type="password" />
            <div className="text-right">
              {passwordError && (
                <em className="text-rose-400 text-sm float-left">*{passwordError}</em>
              )}
              <button
                type="submit"
                className="text-gray-900 bg-gray-300 hover:bg-gray-400 py-1.5 px-3 mb-5 text-sm rounded-sm shadow-lg font-medium transition"
              >
                Change Password
              </button>
            </div>
          </form>
          <h1 className="text-white text-xl font-bold mb-3">Portfolio</h1>
          <Link
            to="/portfolio/editor"
            className="text-gray-900 block text-center w-full bg-gray-300 hover:bg-gray-400 py-1.5 px-3 mb-5 text-sm rounded-sm shadow-lg font-medium transition"
          >
            Go to Portfolio editor
          </Link>
        </section>
      </div>

      <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900" id="artworks">
        <div className="container mx-auto mb-10">
          <h1 className="dark:text-white text-2xl font-semibold text-center mb-14">My Artworks</h1>
          <div className="flex flex-wrap items-center justify-around gap-x-10 gap-y-10">
            {artworks.map(artwork => (
              <ArtworkPreview
                key={artwork._id}
                artwork={artwork}
                // primary={primary}
                // secondary={secondary}
              />
            ))}
          </div>
        </div>
        <div className="text-center">
          <button
            onClick={() => setShowArtworkModal(true)}
            className="text-gray-800 font-semibold bg-gray-200 hover:bg-opacity-90 bg-opacity-75 py-1 px-3 text-sm"
          >
            Upload New Artwork
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ProfilePage;
