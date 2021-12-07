import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import UploadArtworkModal from "./UploadArtworkModal";
import { useAuthentication } from "../hooks/useAuthentication";

import Loading from "../components/Loading";
import axios from "axios";
import { apiUrl } from "../config";

import Unauthenticated from "../components/Unauthenticated";
import EditArtworkModal from "./EditArtworkModal";
import { Edit, Eye, Trash2 } from "react-feather";

const ArtworkListPage = () => {
  const { isLoggedIn, user, redirectToLogin, accessToken } = useAuthentication();
  const [artworks, setArtworks] = useState([]);
  const [showArtworkModal, setShowArtworkModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [editingArtwork, setEditingArtwork] = useState(null);

  const getArtworks = useCallback(async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/users/${user._id}/artworks`);
      setArtworks(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [user]);

  useEffect(() => {
    if (!isLoggedIn) {
      redirectToLogin();
      return;
    }
    getArtworks();
  }, [isLoggedIn, redirectToLogin, getArtworks]);

  const deleteArtwork = async artwork => {
    if (!window.confirm("Are you sure u want to delete " + artwork.name + "?")) return;
    try {
      const { data } = await axios.delete(`${apiUrl}/users/${user._id}/artworks/${artwork._id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      getArtworks();
    } catch (e) {
      console.log(e);
    }
  };

  if (!isLoggedIn) return <Unauthenticated />;

  if (loading) return <Loading />;

  return (
    <main className="bg-gray-900 pt-20 min-h-screen">
      <Navbar />

      {showArtworkModal && (
        <UploadArtworkModal
          onClose={() => {
            setShowArtworkModal(false);
            getArtworks();
          }}
        />
      )}
      {editingArtwork && (
        <EditArtworkModal
          artwork={editingArtwork}
          onClose={() => {
            setEditingArtwork(null);
            getArtworks();
          }}
        />
      )}

      <section className="container mx-auto py-10 mb-10">
        <h1 className="dark:text-gray-200 text-xl font-semibold mb-14">My Artworks</h1>
        <div className="flex flex-wrap items-center justify-evely gap-4 mb-12">
          {artworks.map(artwork => (
            <div
              key={artwork._id}
              className={`transition-all bg-gray-800 rounded-lg p-5 shadow-lg`}
            >
              <img
                className="mb-5 shadow-xl mx-auto h-44"
                src={artwork.imageUrl} // to keep old one working
                alt={artwork.name}
              />
              <div className="text-center">
                <h2 className="dark:text-white text-lg font-semibold mb-1">{artwork.name}</h2>
                <p className="dark:text-gray-300 text-sm mb-3">{artwork.summary}</p>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <button
                  onClick={() => deleteArtwork(artwork)}
                  className="flex items-center text-sm font-medium shadow-md bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-sm text-gray-100 gap-2"
                >
                  <Trash2 size={15} /> Delete
                </button>
                <button
                  onClick={() => setEditingArtwork(artwork)}
                  className="flex items-center text-sm font-medium shadow-md bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-sm text-gray-100 gap-2"
                >
                  <Edit size={15} /> Edit
                </button>
                <Link
                  to={`/artwork/${artwork._id}`}
                  className="flex items-center text-sm font-medium bg-gray-700 shadow-md hover:bg-gray-600 px-3 py-1 rounded-sm text-gray-100 gap-2"
                >
                  <Eye size={15} /> View
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={() => setShowArtworkModal(true)}
            className="text-white tracking-wider py-2.5 px-10 mb-5 text-sm rounded-sm shadow-lg font-semibold bg-gradient-to-r from-rose-400 to-teal-500 hover:to-teal-400 hover:from-rose-400 transition"
          >
            Upload New Artwork
          </button>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ArtworkListPage;
