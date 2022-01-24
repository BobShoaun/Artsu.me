import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { useEffect, useState, useCallback, useContext } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

import Loading from "../../components/Loading";
import { AppContext } from "../../App";
import axios from "axios";

import othersData from "./othersData";
import artsumeData from "./artsumeData";
import NFThumb from "../../components/NFThumb";

import Unauthenticated from "../../components/Unauthenticated";
import { Edit, Eye, Trash2 } from "react-feather";

const CollectionPage = () => {
  const { redirectToLogin } = useAuthentication();
  const [isArtsume, setIsArtsume] = useState(false);
  const [loading, setLoading] = useState(true);

  const { accessToken, user } = useContext(AppContext);


  useEffect(() => {
    if (!accessToken) {
      redirectToLogin();
      return;
    }
    setLoading(false);
  }, [accessToken, redirectToLogin]);



  if (!accessToken) return <Unauthenticated />;

  if (loading) return <Loading />;

  return (
    <main className="bg-gray-900 pt-20 min-h-screen">
      <Navbar />


      <section className="larger-container mx-auto py-10 mb-10">

        {/* Artsume/Others buttons */}

        <div
          className="flex justify-center mt-7 mb-10"
        >
          <button
            onClick={() => {setIsArtsume(true)}}
            className={`${
              isArtsume === true ? "bg-gray-600" : "bg-gray-800"
            } px-6 py-2 rounded-l-lg hover:bg-gray-700`}
          >
            Artsume
          </button>
          <button
            onClick={() => {setIsArtsume(false)}}
            className={`${
              isArtsume === false ? "bg-gray-600" : "bg-gray-800"
            } px-6 py-2 rounded-r-lg hover:bg-gray-700`}
          >
            Others
          </button>
        </div>

        {isArtsume ?

          // Artsume NFTs
          
          <div>
            <h1 className="dark:text-gray-200 text-xl font-semibold mb-10">Frames</h1>

            <div className="flex flex-wrap items-center gap-8 mb-14">
              {artsumeData.filter(i => i.category === "frame").map(artwork => (
                <NFThumb artwork={artwork}/>
              ))}
            </div>

            <h1 className="dark:text-gray-200 text-xl font-semibold mb-10">Walls</h1>

            <div className="flex flex-wrap items-center gap-8 mb-14">
              {artsumeData.filter(i => i.category === "wall").map(artwork => (
                <NFThumb artwork={artwork}/>
              ))}
            </div>

          </div>

        :

          // Other NFTs

          <div>
            <h1 className="dark:text-gray-200 text-xl font-semibold mb-10">Ethereum</h1>

            <div className="flex flex-wrap items-center gap-8 mb-14">
              {othersData.map(artwork => (
                <NFThumb artwork={artwork}/>
              ))}
            </div>

          </div>

        }
      </section>
      <Footer />
    </main>
  );
};

export default CollectionPage;
