import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { useEffect, useState, useCallback, useContext } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

import Loading from "../../components/Loading";
import { AppContext } from "../../App";
import axios from "axios";

import Unauthenticated from "../../components/Unauthenticated";
import { Edit, Eye, Trash2 } from "react-feather";

const CollectionPage = () => {
  const { redirectToLogin } = useAuthentication();
  const [artworks, setArtworks] = useState([]);
  const [showArtworkModal, setShowArtworkModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [editingArtwork, setEditingArtwork] = useState(null);
  const { accessToken, user } = useContext(AppContext);

  const getArtworks = useCallback(async () => {
    try {
      const { data } = await axios.get(`/users/${user._id}/artworks`);
      setArtworks(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [user]);

  useEffect(() => {
    if (!accessToken) {
      redirectToLogin();
      return;
    }
    getArtworks();
  }, [accessToken, redirectToLogin, getArtworks]);

  const deleteArtwork = async artwork => {
    if (!window.confirm("Are you sure u want to delete " + artwork.name + "?")) return;
    try {
      await axios.delete(`/users/${user._id}/artworks/${artwork._id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      getArtworks();
    } catch (e) {
      console.log(e);
    }
  };

  if (!accessToken) return <Unauthenticated />;

  if (loading) return <Loading />;

  return (
    <main className="bg-gray-900 pt-20 min-h-screen">
      <Navbar />


      <section className="larger-container mx-auto py-10 mb-10">

        <div
          className="flex justify-center mt-7 mb-10"
        >
          <button
            className={`${
              "bg-gray-600 shadow-inner"
          } px-5 py-2 rounded-l-lg hover:bg-gray-600`}
          >
            Artsume
          </button>
          <button
            className={`${
              "bg-gray-800"
          } px-6 py-2 rounded-r-lg hover:bg-gray-600`}
          >
            Others
          </button>
        </div>

        <h1 className="dark:text-gray-200 text-xl font-semibold mb-10">Frames</h1>

        <div className="flex flex-wrap items-center gap-8 mb-14">
          {artworks.map(artwork => (
            <div
              key={artwork._id}
              className={`transition-all bg-gray-800 rounded-lg w-72 shadow-lg cursor-pointer hover:shadow-lg hover:scale-105 transition-transform transform`}
            >
              <div
                className="h-72 mb-5"
              >
                <img
                  className="shadow-xl object-scale-down w-full h-full rounded-t-lg"
                  src={artwork.imageUrl} // to keep old one working
                  alt={artwork.name}
                />
              </div>
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
      </section>
      <Footer />
    </main>
  );
};

export default CollectionPage;
