import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./index.css";

import { Link } from "react-router-dom"; // removed useParams as it is unused
import UploadArtworkModal from "./UploadArtworkModal";
import { useState, useEffect } from "react";

import { useAuthentication } from "../hooks/useAuthentication";
import axios from "axios";
import { apiUrl } from "../config";

import ArtworkPreview from "../components/ArtworkPreview";

const ProfilePage = () => {
  const [accessToken, user] = useAuthentication();
  const [showArtworkModal, setShowArtworkModal] = useState(false);

  const [artworks, setArtworks] = useState([]);

  const primary = { main: "rose-600", light: "rose-500", dark: "rose-700" };
  const secondary = { main: "teal-700", light: "teal-500", dark: "teal-800" };

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
    getArtworks();
  }, []);

  if (!accessToken)
    return (
      <main className="dark:bg-gray-900">
        <Navbar />
        <h1 className="dark:text-white text-2xl font-semibold text-center py-5 min-h-screen">
          403 Unauthorized
        </h1>
        <Footer />
      </main>
    );

  return (
    <main className="dark:bg-gray-900">
      {showArtworkModal && (
        <UploadArtworkModal
          onClose={() => {
            setShowArtworkModal(false);
            getArtworks();
          }}
        />
      )}

      <Navbar />
      <div className="container mx-auto flex mb-20 py-20 gap-8 text-center">
        <aside className="profile-avatar-wrapper">
          <div className="gap-3">
            <img
              className="profile-avatar mx-auto shadow-lg rounded-lg"
              src={user.avatarUrl}
              alt={`${user.name} avatar`}
            />
          </div>
          <h3 className="dark:text-gray-200 mt-3 mb-6 font-semibold content-center text-center">
            {user.name}
          </h3>
          <Link
            to={`/profile/${user.username}/upload-avatar`}
            key={user.id}
            className={`mx-auto hover:bg-gray-600 rounded-lg transition-all cursor-pointer p-1`}
          >
            <button className="text-gray-800 font-semibold bg-gray-200 hover:bg-opacity-90 bg-opacity-75 py-1 px-3 text-sm text-center">
              Upload New Avatar
            </button>
          </Link>
        </aside>
        <section className="dark:bg-gray">
          <ul className="items-centre gap-10 container mx-auto">
            <ul className="flex items-center gap-10 mx-auto mb-6">
              <li color="white">
                <h3 className="dark:text-gray-200 font-semibold text-right">name: </h3>
              </li>
              <li className="ml-auto">
                <input className="" type="text" defaultValue={user.username} />
              </li>
            </ul>
            <ul className="flex items-center gap-10 mx-auto mb-6">
              <li color="white">
                <h3 className="dark:text-gray-200 font-semibold text-right">username: </h3>
              </li>
              <li className="ml-auto">
                <input className="" type="text" defaultValue={user.email} />
              </li>
            </ul>
            {/* <ul className="flex items-center gap-10 mx-auto mb-6">
              <li>
                <h3 className="dark:text-gray-200 font-semibold text-right">password:</h3>
              </li>
              <li className="ml-auto">
                <input className="" type="password" />
              </li>
            </ul> */}
            <ul className="flex items-center gap-10 mx-auto mb-6">
              <li>
                <h3 className="dark:text-gray-200 font-semibold text-right">new password:</h3>
              </li>
              <li className="ml-auto">
                <input className="" type="password" />
              </li>
            </ul>
            <ul className="flex items-center gap-10 mx-auto mb-10">
              <li>
                <h3 className="dark:text-gray-200 font-semibold text-right">confirm password:</h3>
              </li>
              <li className="ml-auto">
                <input className="" type="password" />
              </li>
            </ul>
            <div className="text-right">
              <button className="text-gray-800 font-semibold bg-gray-200 hover:bg-opacity-90 bg-opacity-75 py-1 px-3 text-sm">
                Submit
              </button>
            </div>
          </ul>
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
                primary={primary}
                secondary={secondary}
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
