import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link, useParams } from "react-router-dom";
import { X } from "react-feather";
import { useAuthentication } from "../../hooks/useAuthentication";
import axios from "axios";
import { apiUrl } from "../../config";
import { useEffect, useState, useCallback } from "react";
import Loading from "../../components/Loading";
import Unauthorized from "../../components/Unauthorized";
import { useHistory } from "react-router-dom";

const AdminArtworkViewer = () => {
  const history = useHistory();
  const { id } = useParams();
  //replace with API call in phase 2
  // const artwork = artworks.find(artwork => artwork.id === parseInt(id));
  //replace with API call in phase 2
  // const user = users.find(user => user.id === artwork.authorId);
  const { user: adminUser, accessToken, redirectToLogin, isLoggedIn } = useAuthentication();
  // const artworkTags = [];
  // artwork.tagIds.forEach(tagid => {
  //   artworkTags.push(tags.find(tag => tag.id === tagid));
  // });

  const [user, setUser] = useState(null);
  const [artwork, setArtwork] = useState(null);
  const [reportingUsers, setReportingUsers] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) redirectToLogin();
  }, [isLoggedIn, redirectToLogin]);

  const getArtwork = useCallback(async () => {
    try {
      const { data: artwork } = await axios.get(`${apiUrl}/artworks/${id}`);
      setArtwork(artwork);
      const { data: user } = await axios.get(`${apiUrl}/users/${artwork.userId}`);
      setUser(user);
      let reportingUsers = [];
      for (let i = 0; i < artwork.reports.length; i++) {
        const { data: user } = await axios.get(`${apiUrl}/users/${artwork.reports[i].userId}`);
        reportingUsers.push(user);
      }
      setReportingUsers(reportingUsers);
    } catch (e) {
      history.push("/404");
      console.log(e);
    }
  }, [id, history]);

  const banArt = async () => {
    await axios.patch(
      `${apiUrl}/artworks/${artwork._id}`,
      [{ op: "replace", path: "/isBanned", value: !artwork.isBanned }],
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    getArtwork();
  };

  const removeSummary = async () => {
    const { data } = await axios.patch(
      `${apiUrl}/artworks/${id}`,
      [{ op: "replace", path: "/summary", value: "" }],
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    setArtwork(data);
  };

  const removeDescription = async () => {
    const { data } = await axios.patch(
      `${apiUrl}/artworks/${id}`,
      [{ op: "replace", path: "/description", value: "" }],
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    setArtwork(data);
  };

  const removeTag = async tagIndex => {
    await axios.patch(`${apiUrl}/artworks/${id}`, [{ op: "remove", path: `/tagIds/${tagIndex}` }], {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    getArtwork();
  };

  useEffect(() => {
    getArtwork();
  }, [getArtwork]);

  if (!user || !artwork || !reportingUsers) {
    return <Loading />;
  }

  if (isLoggedIn && adminUser.isAdmin) {
    return (
      <main className="bg-gray-900 min-h-screen">
        <Navbar />
        <div className="container mx-auto px-5 pt-20">
          <img
            className="pt-10 mb-5 max-w-xlg mx-auto h-96"
            src={artwork.imageUrl}
            alt={artwork.name}
          />
          <h1 className="place-self-center mb-5 text-white text-center text-5xl col-span-3">
            {artwork.name}
          </h1>
          <p className="text-center text-gray-300 font mb-14">{artwork.summary}</p>
          <section className="flex gap-x-10 px-5">
            <Link to={`/admin/${user.username}`} className={"hover:bg-gray-800 flex-none w-40"}>
              <img className="rounded-lg shadow-xl" src={user.avatarUrl} alt={user.name} />
              <p className="text-xl text-white text-center">{user.name}</p>
            </Link>
            <div>
              {artwork.tags.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-5 items-center">
                  {artwork.tags.map((tag, index) => (
                    <p
                      key={tag._id}
                      className={`flex gap-3 items-center text-gray-900 cursor-pointer font-semibold text-xs rounded-sm px-2 py-1`}
                      style={{ background: tag.color }}
                    >
                      #{tag.label}
                      <X
                        onClick={() => removeTag(index)}
                        size={20}
                        color="white"
                        strokeWidth={3}
                        className="cursor-pointer"
                      />
                    </p>
                  ))}
                </div>
              )}
              <p className="text-gray-200 text-sm">{artwork.description}</p>
              <ul className="items-centre gap-10">
                <ul className="flex items-center gap-10 mx-auto mb-6">
                  <li>
                    <h3 className="dark:text-gray-200 font-semibold">Artwork is banned: </h3>
                  </li>
                  <li>
                    <p className="dark:text-gray-200">{artwork.isBanned.toString()}</p>
                  </li>
                </ul>
              </ul>
            </div>
          </section>
          <div className="text-right mb-10 mx-auto">
            <button
              onClick={() => banArt()}
              className="text-gray-800 font-semibold bg-gray-200 hover:bg-opacity-90 bg-opacity-75 py-1 px-3 text-sm mr-2"
            >
              Toggle Ban Status
            </button>
            <button
              onClick={() => removeSummary()}
              className="text-gray-800 font-semibold bg-gray-200 hover:bg-opacity-90 bg-opacity-75 py-1 px-3 text-sm mr-2"
            >
              Remove Summary
            </button>
            <button
              onClick={() => removeDescription()}
              className="text-gray-800 font-semibold bg-gray-200 hover:bg-opacity-90 bg-opacity-75 py-1 px-3 text-sm"
            >
              Remove Description
            </button>
          </div>
          <div className="">
            <h1 className="text-white text-center font-bold">Reports:</h1>
            {artwork.reports.length > 0 && (
              <div className="gap-3 mb-5 items-center">
                {artwork.reports.map((report, index) => {
                  const reportingUser = reportingUsers[index];
                  return (
                    <ul className="items-centre gap-10">
                      <ul className="flex items-center gap-10 mx-auto mb-6">
                        <li>
                          <h3 className="dark:text-gray-200 font-semibold">
                            Report by: {reportingUser.username}
                          </h3>
                        </li>
                        <li>
                          <p className="dark:text-gray-200">{report.message}</p>
                        </li>
                      </ul>
                    </ul>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <Footer />
      </main>
    );
  } else {
    return <Unauthorized />;
  }
};

export default AdminArtworkViewer;
