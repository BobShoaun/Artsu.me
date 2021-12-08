import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useAuthentication } from "../hooks/useAuthentication";
import axios from "axios";
import { apiUrl } from "../config";
import Loading from "../components/Loading";
import Unauthenticated from "../components/Unauthenticated";
import "./index.css";

const PortfolioEditorPage = () => {
  const { isLoggedIn, accessToken, user, redirectToLogin } = useAuthentication();
  const [portfolio, setPortfolio] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [heroLayout, setHeroLayout] = useState(null);
  const [experienceLayout, setExperienceLayout] = useState(null);
  const [projectLayout, setProjectLayout] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!isLoggedIn) redirectToLogin();
  }, [isLoggedIn, redirectToLogin]);

  const getPortfolio = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/users/username/${user.username}/portfolio`);
      setPortfolio(data);
      setHeroLayout(data.section.hero.layoutId);
      setExperiences(data.section.experience.experiences);
      setProjects(data.section.project.artworkIds);
      setProjectLayout(data.section.project.layoutId);
      setExperienceLayout(data.section.experience.layoutId);
    } catch (e) {
      console.log(e);
    }
  };

  const getArtworks = async () => {
    if (portfolio) {
      const userId = portfolio.userId;
      try {
        const { data } = await axios.get(`${apiUrl}/users/${userId}/artworks`);
        setArtworks(data);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const savePortfolio = async e => {
    console.log(portfolio);
    e.preventDefault();
    if (!checkExperienceCompletion()) return;
    portfolio.section.hero.layoutId = heroLayout;
    portfolio.section.experience.layoutId = experienceLayout;
    portfolio.section.experience.experiences = experiences;
    portfolio.section.project.layoutId = projectLayout;
    portfolio.section.project.artworkIds = projects;
    const userId = portfolio.userId;
    try {
      const { data } = await axios.patch(
        `${apiUrl}/users/${userId}/portfolio`,
        [
          { op: "replace", path: "/color", value: color },
          { op: "replace", path: "/section", value: portfolio.section },
        ],
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      // login(data, accessToken);
    } catch (e) {
      console.log(e);
    }
    alert("Portfolio saved successfully");
  };

  const checkExperienceCompletion = () => {
    // users shouldn't send empty experience
    let companyFlag = true;
    let posFlag = true;
    let desFlag = true;
    experiences.forEach( exp => {
      if (!exp.company) {
        setErrorMsg("* Company cannot be empty in experience.")
        companyFlag = false
      }
      else if(!exp.position) {
        setErrorMsg("* Position cannot be empty in experience.")
        posFlag = false
      }
      else if(!exp.description) {
        setErrorMsg("* Description cannot be empty in experience.")
        desFlag = false
      }
    })
    if (companyFlag && posFlag && desFlag) {
      setErrorMsg("")
      return true
    }
    else {
      return false
    }
  }

  useEffect(getPortfolio, [user._id])
  useEffect(getArtworks, [portfolio])

  useEffect(getPortfolio, [user]);
  useEffect(getArtworks, [portfolio]);
  if (!isLoggedIn) return <Unauthenticated />;
  if (!portfolio) return <Loading />;

  const color = portfolio.color;
  const hero = portfolio.section.hero;
  const project = portfolio.section.project;
  const contact = portfolio.section.contact;
  console.log(portfolio);
  // if no value

  const emptyExperience = {
    company: "",
    position: "",
    startDate: null,
    endDate: null,
    description: null,
    artworkIds: [],
  };

  const removeFromArray = (e, ary) => {
    // remove e from array ary
    if (ary.includes(e)) {
      return ary.filter(element => element !== e);
    } else {
      return ary;
    }
  };

  function displayExperience(experience) {
    // return an existing experience
    return (
      <div
        key={experiences.indexOf(experience)}
        className="transition-all bg-gray-800 rounded-lg p-5 shadow-lg"
      >
        <div id="portfolio-editor-experience-remove-button">
          <button
            className=" bg-rose-800 hover:bg-rose-600 text-white text-sm py-1 px-2 mb-10"
            onClick={e => {
              const temp = experiences.filter((exp, idx) => {
                return experiences.indexOf(experience) !== idx;
              });
              portfolio.section.experience.experiences = temp;
              setExperiences([...temp]);
            }}
          >
            Remove
          </button>
        </div>
        <div className="grid gap-5 portfolio-form-short">
          <label className="dark:text-gray-200 text-sm text-right mt-2">Company:</label>
          <input
            className="border"
            type="text"
            defaultValue={experience.company}
            onChange={e => (experience.company = e.target.value)}
          />
          <label className="dark:text-gray-200 text-sm text-right mt-2">Position:</label>
          <input
            className="border"
            type="text"
            defaultValue={experience.position}
            onChange={e => (experience.position = e.target.value)}
          />
        </div>
        <div className="mt-10 grid gap-5 portfolio-form mb-10">
          <label className="dark:text-gray-200 text-sm text-right mt-2">Description:</label>
          <textarea
            className="border text-sm dark:text-gray-300"
            rows="4"
            cols="100"
            defaultValue={experience.description}
            onChange={e => (experience.description = e.target.value)}
          ></textarea>
        </div>
        <label className="dark:text-gray-200 text-sm text-right">Select Related Artworks:</label>
        <div className="flex flex-wrap mx-10">
          {artworks.map(artwork => {
            return (
              <div className="w-40 mx-5" key={artwork._id}>
                <div
                  className={`${
                    experience.artworkIds.includes(artwork._id)
                      ? "bg-gray-600"
                      : "hover:bg-gray-700"
                  }`}
                  onClick={() => {
                    if (experience.artworkIds.includes(artwork._id)) {
                      experience.artworkIds = removeFromArray(artwork._id, experience.artworkIds);
                    } else {
                      experience.artworkIds.push(artwork._id);
                    }
                    const temp = [...experiences];
                    portfolio.section.experience.experiences = temp;
                    setExperiences(temp);
                  }}
                >
                  <img
                    className="portfolio-editor-choose-experience-artwork cursor-pointer py-5"
                    src={artwork.imageUrl}
                    alt={artwork.name}
                  />
                </div>
                <div className="pl-3">
                  <h2 className="dark:text-white text-base px-0 mb-1 text-center">
                    {artwork.name}
                  </h2>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <main className="bg-gray-900">
      <header className="z-20 py-5 shadow-lg bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-sm sticky top-0">
        <div className="container mx-auto flex item-center gap-10">
          <Link to="/" className="dark:text-white text-2xl font-semibold">
            artsu.me
          </Link>
          <h2 className="dark:text-white text-2xl ml-auto">Edit Portfolio</h2>
          <Link
            to={`/portfolio/${user.username}`}
            className="dark:text-white font-semibold text-2xl ml-auto"
          >
            {user.name}
          </Link>
        </div>
      </header>
      <section className="dark:text-white container mx-auto pt-20">
        <h2>1. Colors</h2>
        <div className="container mx-auto flex item-center gap-20 py-10">
          {Object.keys(color).map((key, index) => {
            return (
              <div key={key}>
                <input
                  className="h-20 w-20 cursor-pointer bg-transparent"
                  type="color"
                  id={key}
                  defaultValue={color[key]}
                  onChange={e => (color[key] = e.target.value)}
                />
                <br />
                <div className="dark:text-white text-sm text-center">{key}</div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="dark:text-white container mx-auto pt-10">
        <h2 className="mb-10">2. Hero</h2>
        <div className="grid gap-5 portfolio-form">
          <label className="dark:text-gray-200 text-sm text-right mt-2">Heading:</label>
          <input
            defaultValue={hero.heading}
            onChange={e => (hero.heading = e.target.value)}
            className="px-2 py-1"
            type="text"
          />
          <label className="dark:text-gray-200 text-sm text-right mt-2">Subtitle:</label>
          <input
            defaultValue={hero.subtitle}
            onChange={e => (hero.subtitle = e.target.value)}
            className="px-2 py-1"
            type="text"
          />
        </div>
        <h3 className="mt-10">Select a layout:</h3>
        <div className="container mx-auto flex flex-wrap item-center gap-20 py-5">
          <div
            className={`${0 === heroLayout ? "bg-gray-700" : "hover:bg-gray-800"}`}
            onClick={() => {
              setHeroLayout(0);
            }}
          >
            <div className="portfolio-editor-layout-div">
              <img
                className="cursor-pointer mx-1 my-5 h-20"
                src="http://res.cloudinary.com/artsu-me/image/upload/v1638859308/tqxu5yt4vk7mx4jrrixx.png"
                alt="layout 1"
              />
            </div>
            <div className="dark:text-white text-xs text-center my-5">layout 1</div>
          </div>
          <div
            className={`${1 === heroLayout ? "bg-gray-700" : "hover:bg-gray-800"}`}
            onClick={() => setHeroLayout(1)}
          >
            <div className="portfolio-editor-layout-div">
              <img
                className="cursor-pointer mx-1 my-5 h-20"
                src="http://res.cloudinary.com/artsu-me/image/upload/v1638860134/gpjdxg5kundpoyaclxet.png"
                alt="layout 2"
              />
            </div>
            <div className="dark:text-white text-xs text-center my-5">layout 2</div>
          </div>
          <div
            className={`${2 === heroLayout ? "bg-gray-700" : "hover:bg-gray-800"}`}
            onClick={() => setHeroLayout(2)}
          >
            <div className="portfolio-editor-layout-div">
              <img
                className=" cursor-pointer mx-2 my-5 h-20"
                src="http://res.cloudinary.com/artsu-me/image/upload/v1638860736/tepx7rjuiwfyhtcynggj.png"
                alt="layout 3"
              />
            </div>
            <div className="dark:text-white text-xs text-center my-5">layout 3</div>
          </div>
        </div>
      </section>

      <section className="dark:text-white container mx-auto mt-20">
        <h2 className="mb-10">
          3. Experiences
          <label className="dark:text-gray-400 text-sm mt-1 mb-5 portfolio-editor-section-visible">
            <input
              type="checkbox"
              className="portfolio-editor-section-checkbox mx-1"
              onChange={e => (portfolio.section.experience.isVisible = !e.target.checked)}
              defaultChecked={!portfolio.section.experience.isVisible}
            ></input>
            Keep Experiences Private
          </label>
        </h2>
        <div className="space-y-20">
          {experiences.map(experience => displayExperience(experience))}
        </div>
        <button
          className="bg-gray-600 hover:bg-gray-500 text-white text-sm py-1 px-1 my-10"
          onClick={e => {
            const newExperience = JSON.parse(JSON.stringify(emptyExperience));
            experiences.push(newExperience);
            const temp = [...experiences];
            portfolio.section.experience.experiences = temp;
            setExperiences(temp);
          }}
        >
          Add Experience
        </button>

        <h3 className="mt-10">Select a layout:</h3>
        <div className="container mx-auto flex item-center gap-20 py-5">
          <div
            className={`${0 === experienceLayout ? "bg-gray-700" : "hover:bg-gray-800"}`}
            onClick={() => setExperienceLayout(0)}
          >
            <img
              className=" cursor-pointer mx-5 my-5 h-20"
              src="http://res.cloudinary.com/artsu-me/image/upload/v1638863729/uqadikxkjeojoye89zmv.png"
              alt="layout 1"
            />
            <div className="dark:text-white text-xs text-center my-5">layout 1</div>
          </div>
          <div
            className={`${1 === experienceLayout ? "bg-gray-700" : "hover:bg-gray-800"}`}
            onClick={() => setExperienceLayout(1)}
          >
            <img
              className=" items-center cursor-pointer mx-5 my-5 h-20"
              src="http://res.cloudinary.com/artsu-me/image/upload/v1638863953/faiesnys3xjrfhcinld8.png"
              alt="layout 2"
            />
            <div className="dark:text-white text-xs text-center my-5">layout 2</div>
          </div>
        </div>
      </section>

      <section className="dark:text-white container mx-auto mt-10">
        <h2 className="mb-10">
          4. Projects
          <label className="dark:text-gray-400 text-sm mt-1 mb-5 portfolio-editor-section-visible">
            <input
              type="checkbox"
              className="portfolio-editor-section-checkbox mx-1"
              onChange={e => (project.isVisible = !e.target.checked)}
              defaultChecked={!project.isVisible}
            ></input>
            Keep Projects Private
          </label>
        </h2>
        <h3 className="mx-5">Select artworks you want to display:</h3>

        <div className="flex flex-wrap mx-10 my-10">
          {artworks.map(artwork => {
            return (
              <div className="w-52 mx-5" key={artwork._id}>
                <div
                  className={`${
                    projects.includes(artwork._id)
                      ? "bg-gray-600 rounded-lg"
                      : "hover:bg-gray-700 rounded-lg"
                  }`}
                  onClick={() => {
                    if (projects.includes(artwork._id)) {
                      setProjects(removeFromArray(artwork._id, projects));
                    } else {
                      setProjects([...projects, artwork._id]);
                    }
                    project.artworkIds = projects;
                  }}
                >
                  <img
                    className="portfolio-content-artwork-img cursor-pointer py-5"
                    src={artwork.imageUrl}
                    alt={artwork.name}
                  />
                </div>
                <div className="pl-3">
                  <h2 className="dark:text-white text-lg font-semibold mt-5 mb-1 text-center">
                    {artwork.name}
                  </h2>
                </div>
              </div>
            );
          })}
        </div>

        <h3 className="mt-10">Select a layout:</h3>
        <div className="container mx-auto flex item-center gap-20 py-5">
          <div
            className={`${0 === projectLayout ? "bg-gray-700" : "hover:bg-gray-800"}`}
            onClick={() => setProjectLayout(0)}
          >
            <img
              className=" cursor-pointer mx-5 my-5 h-20"
              src="http://res.cloudinary.com/artsu-me/image/upload/v1638864064/n1fz5atyefq3zcony0mf.png"
              alt="layout 1"
            />
            <div className="dark:text-white text-xs text-center my-5">layout 1</div>
          </div>
          <div
            className={`${1 === projectLayout ? "bg-gray-700" : "hover:bg-gray-800"}`}
            onClick={() => setProjectLayout(1)}
          >
            <img
              className=" items-center cursor-pointer mx-5 my-5 h-20"
              src="http://res.cloudinary.com/artsu-me/image/upload/v1638909073/k7dr6fdjwvej7jpcdk2g.png"
              alt="layout 2"
            />
            <div className="dark:text-white text-xs text-center my-5">layout 2</div>
          </div>
          <div
            className={`${2 === projectLayout ? "bg-gray-700" : "hover:bg-gray-800"}`}
            onClick={() => setProjectLayout(2)}
          >
            <img
              className=" items-center cursor-pointer mx-5 my-5 h-20"
              src="http://res.cloudinary.com/artsu-me/image/upload/v1638909099/scqallfnjvxjwf8civf6.png"
              alt="layout 3"
            />
            <div className="dark:text-white text-xs text-center my-5">layout 3</div>
          </div>
        </div>

        <div className="flex container mx-auto my-10">
          <div className="m-auto">
            <Link
              to={`/artworks`}
              className="text-gray-900 bg-gray-300 hover:bg-gray-400 py-1.5 px-10 mb-5 text-sm rounded-sm shadow-lg font-medium transition"
            >
              Manage All Artworks
            </Link>
          </div>
        </div>
      </section>

      <section className="dark:text-white container mx-auto mt-10" id="chooseLayout">
        <h2 className="mb-10">
          5. Contact
          <label className="dark:text-gray-400 mt-1 mb-5 portfolio-editor-contact-visible">
            <input
              type="checkbox"
              className="portfolio-editor-section-checkbox mx-1 mt-1"
              defaultChecked={!contact.isVisible}
              onChange={e => (contact.isVisible = !e.target.checked)}
            ></input>
            Do not receive messages from other users
          </label>
        </h2>
      </section>
      <div className="float-right mr-5">
        {errorMsg && <em className="text-rose-400 text-sm float-left">{errorMsg}</em>}
      </div>
      <br />

      <div className="flex justify-start" id="buttons">
        <div className="ml-5 mt-1 mb-5">
          <Link
            className="text-gray-900 bg-gray-300 hover:bg-gray-400 py-1.5 px-3 mb-5 text-sm rounded-sm shadow-lg font-medium transition"
            to={`/portfolio/${user.username}`}
          >
            Quit
          </Link>
        </div>
        <div className="ml-auto mb-5 mr-5">
          <button
            onClick={savePortfolio}
            className="text-gray-900 bg-gray-300 hover:bg-gray-400 py-1.5 px-3 mb-5 text-sm rounded-sm shadow-lg font-medium transition"
          >
            Save
          </button>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default PortfolioEditorPage;
