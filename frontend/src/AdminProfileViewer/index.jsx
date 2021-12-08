import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./index.css";

import { Link, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl, defaultAvatarUrl } from "../config";
import { useAuthentication } from "../hooks/useAuthentication";
import loading from "../components/Loading";
import Loading from "../components/Loading";
import Unauthenticated from "../components/Unauthenticated";
import Unauthorized from "../components/Unauthorized";
import { useHistory } from "react-router-dom";

const AdminProfileViewer = () => {
  const history = useHistory();
  const { id } = useParams();
  const { user: adminUser, accessToken, login, redirectToLogin, isLoggedIn } = useAuthentication();
  const [user, setUser] = useState(null);
  const [artworks, setArtworks] = useState(null);
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) redirectToLogin();
  }, [isLoggedIn]);


  //phase2: create method here for API call to update user information
  const getUser = async () => {
    try {
      const { data: user } = await axios.get(`${apiUrl}/users/${id}`);
      setUser(user);
      const { data } = await axios.get(`${apiUrl}/users/${id}/artworks`);
      setArtworks(data);
      const { data: portfolio } = await axios.get(`${apiUrl}/users/username/${user.username}/portfolio`);
      setPortfolio(portfolio);
    } catch (e) {
      console.log(e);
      history.push("/404")
    }
  };

  const banUser = async () => {
    const { data } = await axios.patch(
      `${apiUrl}/users/${user._id}`,
      [
        { op: "replace", path: "/isBanned", value: !user.isBanned },
      ],
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    setUser(data)
  };

  const featureUser = async () => {
    const { data } = await axios.patch(
      `${apiUrl}/users/${user._id}`,
      [
        { op: "replace", path: "/isFeatured", value: !user.isFeatured},
      ],
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    setUser(data)
  };

  const makeAdmin = async () => {
    const { data } = await axios.patch(
      `${apiUrl}/users/${user._id}`,
      [
        { op: "replace", path: "/isAdmin", value: !user.isAdmin},
      ],
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    setUser(data)
  };

  const removeAvatar = async () => {
    const { data } = await axios.delete(`${apiUrl}/users/${user._id}/avatar`,
      { headers: { Authorization: `Bearer ${accessToken}` } });
    setUser(data)
  };

  const removeHeading = async () => {
    const { data } = await axios.patch(
      `${apiUrl}/users/${user._id}/portfolio`,
      [
        { op: "replace", path: "/section/hero/heading", value: ""},
      ],
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    setPortfolio(data)
  };

  const removeBiography = async () => {
    const { data } = await axios.patch(
      `${apiUrl}/users/${user._id}/portfolio`,
      [
        { op: "replace", path: "/section/hero/subtitle", value: ""},
      ],
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    setPortfolio(data)
  };


  useEffect(() => {
    console.log("use effect call");
    getUser();
    // getPortfolio();
  }, []);

  if (!user || !portfolio || !artworks) {
    console.log("user", user);
    console.log("portfolio", portfolio);
    console.log("artworks", artworks);
    console.log("returning null");
    return <Loading />;
  }


  const primary = { main: "rose-600", light: "rose-500", dark: "rose-700" };
  const secondary = { main: "teal-700", light: "teal-500", dark: "teal-800" };

  //phase2: create method here for API call to update user information

  if (isLoggedIn && adminUser.isAdmin) {
    return (
      <main className="dark:bg-gray-900">
        <Navbar />
        <div className="container mx-auto flex mb-20 py-20 gap-8 text-center pt-20">
          <aside className="profile-avatar-wrapper">
            <div className="gap-3">
              <img
                className="profile-avatar mx-auto shadow-lg rounded-lg"
                src={user.avatarUrl || defaultAvatarUrl}
                onError={e => (e.target.src = defaultAvatarUrl)}
                alt={`${user.name} avatar`}
              />
            </div>
            <h3 className="dark:text-gray-200 mt-3 mb-6 font-semibold content-center text-center">
              {user.name}
            </h3>
            <button
              onClick={() => removeAvatar()}
              className="text-gray-800 font-semibold bg-gray-200 hover:bg-opacity-90 bg-opacity-75 py-1 px-3 text-sm text-center">
              Remove User Avatar
            </button>
          </aside>
          <section className="dark:bg-gray">
            <ul className="items-centre gap-10 container mx-auto">
              <ul className="flex items-center gap-10 mx-auto mb-6">
                <li color="white">
                  <h3 className="dark:text-gray-200 font-semibold text-right">
                    name:{" "}
                  </h3>
                </li>
                <li className="ml-auto">
                  <p className="dark:text-gray-200 text-right">
                    {user.name}
                  </p>
                </li>
              </ul>
              <ul className="flex items-center gap-10 mx-auto mb-6">
                <li color="white">
                  <h3 className="dark:text-gray-200 font-semibold text-right">
                    username:{" "}
                  </h3>
                </li>
                <li className="ml-auto">
                  <p className="dark:text-gray-200 text-right">
                    {user.username}
                  </p>
                </li>
              </ul>
              <ul className="flex items-center gap-10 mx-auto mb-6">
                <li color="white">
                  <h3 className="dark:text-gray-200 font-semibold text-right">
                    heading:{" "}
                  </h3>
                </li>
                <li className="ml-auto">
                  <p className="dark:text-gray-200 text-right">
                    {portfolio.section.hero.heading}
                  </p>
                </li>
              </ul>
              <ul className="flex items-center gap-10 mx-auto mb-6">
                <li color="white">
                  <h3 className="dark:text-gray-200 font-semibold text-right">
                    biography:{" "}
                  </h3>
                </li>
                <li className="ml-auto">
                  <p className="dark:text-gray-200 text-right">
                    {portfolio.section.hero.subtitle}
                  </p>
                </li>
              </ul>
              <ul className="flex items-center gap-10 mx-auto mb-6">
                <li color="white">
                  <h3 className="dark:text-gray-200 font-semibold text-right">
                    Is user banned:{" "}
                  </h3>
                </li>
                <li className="ml-auto">
                  <p className="dark:text-gray-200 text-right">
                    {user.isBanned.toString()}
                  </p>
                </li>
              </ul>
              <ul className="flex items-center gap-10 mx-auto mb-6">
                <li color="white">
                  <h3 className="dark:text-gray-200 font-semibold text-right">
                    Is user featured:{" "}
                  </h3>
                </li>
                <li className="ml-auto">
                  <p className="dark:text-gray-200 text-right">
                    {user.isFeatured.toString()}
                  </p>
                </li>
              </ul>
              <ul className="flex items-center gap-10 mx-auto mb-6">
                <li color="white">
                  <h3 className="dark:text-gray-200 font-semibold text-right">
                    Is user an admin:{" "}
                  </h3>
                </li>
                <li className="ml-auto">
                  <p className="dark:text-gray-200 text-right">
                    {user.isAdmin.toString()}
                  </p>
                </li>
              </ul>

              <div className="text-right">
                <button
                  onClick={() => removeBiography()}
                  className="text-gray-800 font-semibold bg-gray-200 hover:bg-opacity-90 bg-opacity-75 py-1 px-3 text-sm mr-2">
                  Remove Biography
                </button>
                <button
                  onClick={() => removeHeading()}
                  className="text-gray-800 font-semibold bg-gray-200 hover:bg-opacity-90 bg-opacity-75 py-1 px-3 text-sm mr-2">
                  Remove Heading
                </button>
                <button
                  onClick={() => makeAdmin()}
                  className="text-gray-800 font-semibold bg-gray-200 hover:bg-opacity-90 bg-opacity-75 py-1 px-3 text-sm mr-2">
                  Toggle Admin Status
                </button>
                <button
                  onClick={() => banUser()}
                  className="text-gray-800 font-semibold bg-gray-200 hover:bg-opacity-90 bg-opacity-75 py-1 px-3 text-sm mr-2">
                  Toggle User Ban
                </button>
                <button
                  onClick={() => featureUser()}
                  className="text-gray-800 font-semibold bg-gray-200 hover:bg-opacity-90 bg-opacity-75 py-1 px-3 text-sm">
                  Feature User
                </button>
              </div>
            </ul>
          </section>
        </div>
        <section
          className="py-20 bg-gradient-to-b from-gray-800 to-gray-900"
          id="artworks"
        >
          <div className="container mx-auto mb-10">
            <h1 className="dark:text-white text-2xl font-semibold text-center mb-14">
              User Artworks
            </h1>
            <div className="flex flex-wrap items-center justify-around gap-x-10 gap-y-10">
              {artworks.map(artwork => {
                // const artwork = artworks.find(artwork => artwork._id === id);
                return (
                  <Link
                    to={`/admin/artwork/${artwork._id}`}
                    key={artwork._id}
                    className={`bg-gradient-to-br from-transparent to-transparent hover:from-${primary.main} hover:to-${secondary.main} transition-all rounded-lg p-7 cursor-pointer hover:shadow-xl`}
                  >
                    <img
                      className="artwork mb-5 shadow-xl mx-auto"
                      src={artwork.imageUrl}
                      alt={artwork.name}
                    />
                    <div className="pl-3">
                      <h2 className="dark:text-white text-lg font-semibold mb-1">
                        {artwork.name}
                      </h2>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
        <Footer />
      </main>

    );
  } else {
    return <Unauthorized/>
  }
};

export default AdminProfileViewer;
