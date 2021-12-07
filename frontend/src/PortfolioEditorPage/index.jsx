import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useAuthentication } from "../hooks/useAuthentication";
import UploadArtworkModal from "../ArtworkListPage/UploadArtworkModal";

import axios from "axios";
import { apiUrl } from "../config";
import Loading from "../components/Loading";
import Unauthenticated from "../components/Unauthenticated";

import "./index.css";

const PortfolioEditorPage = () => {

  const { isLoggedIn, accessToken, user, redirectToLogin, login } = useAuthentication();
  const [portfolio, setPortfolio] = useState(null);
  const [newExperiences, setNewExperiences] = useState([])
  const [artworks, setArtworks] = useState([])
  const [showArtworkModal, setShowArtworkModal] = useState(false);
  const [heroLayout, setHeroLayout] = useState(null)
  const [experienceLayout, setExperienceLayout] = useState(null)
  const [projectLayout, setProjectLayout] = useState(null)

  const getPortfolio = async () => {
    console.log("user", user)
    try {
      const { data } = await axios.get(`${apiUrl}/users/username/${user.username}/portfolio`);
      setPortfolio(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getArtworks = async () => {
    if (portfolio) {
      const userId = portfolio.userId
      try {
        const { data } = await axios.get(`${apiUrl}/users/${userId}/artworks`)
        setArtworks(data)
        console.log(data)
      } catch (e) {
        console.log(e)
      }
    }
  };

  const savePortfolio = async e => {
    e.preventDefault()
    console.log(portfolio)
    portfolio.section.hero.layoutId = heroLayout
    portfolio.section.experience.layoutId = experienceLayout
    portfolio.section.project.layoutId = projectLayout
    const userId = portfolio.userId
    try {
      console.log(color)
      const { data } = await axios.patch(`${apiUrl}/users/${userId}/portfolio`, 
      [
        { op: "replace", path: "/color", value: color },
        { op: "replace", path: "/section", value: portfolio.section },
      ],
      { headers: { Authorization: `Bearer ${accessToken}` } })
      // login(data, accessToken);
    } catch(e) {
      console.log(e)
    }
    alert("Portfolio saved successfully");
  }

  useEffect(getPortfolio, [user._id])
  useEffect(getArtworks, [portfolio])

  if (!portfolio) {
    return <Loading />
  }

  const color = portfolio.color
  const hero = portfolio.section.hero
  let experiences = portfolio.section.experience.experiences
  const projects = portfolio.section.project
  const contact = portfolio.section.contact
  if (!heroLayout && heroLayout != hero.layoutId) setHeroLayout(hero.layoutId)
  if (!projectLayout && projectLayout != projects.layoutId) setProjectLayout(projects.layoutId)
  if (!experienceLayout && experienceLayout != portfolio.section.experience.layoutId) setExperienceLayout(portfolio.section.experience.layoutId)
  

  

  /* function selectArt(artid) {
    if (SelectedArt.includes(artid)) {
      setSelectedArt(SelectedArt.filter(id => artid !== id));
    } else {
      setSelectedArt(SelectedArt.concat(artid));
    }
    return;
  } */

  const emptyExperience = {
    company: '',
    position: '',
    startDate: null,
    endDate: null,
    description: null,
    artworkIds: []
  }

  const removeFromArray = (e, ary) => {
    // remove e from array ary
    if (ary.includes(e)) {
      return ary.filter ( element => element !== e)
    } else {
      return ary
    }
  }

  function displayExperience(experience) {
    // return an existing experience
    return (
      <div key={experience._id} className="transition-all bg-gray-800 rounded-lg p-5 shadow-lg">
          <div className="grid gap-5 portfolio-form-short">
            <label className="dark:text-gray-200 text-sm text-right mt-2">
              Company: 
            </label>
            <input className="border" type="text" defaultValue={experience.company}
                   onChange={e => experience.company = e.target.value}/>
            <label className="dark:text-gray-200 text-sm text-right mt-2">
              Position: 
            </label>
            <input className="border" type="text" defaultValue={experience.position}
                   onChange={e => experience.position = e.target.value}/>
            <label className="dark:text-gray-200 text-sm text-right mt-2">
              Start Date: 
            </label>
            <input className="bg-transparent border px-1" type="date" 
                   defaultValue={experience.startDate}
                   onChange={e => experience.startDate = e.target.value}/>
            <label className="dark:text-gray-200 text-sm text-right mt-2">
              End Date:
            </label>
            <input className="bg-transparent border px-1" type="date" 
                   defaultValue={experience.endDate}
                   onChange={e => experience.endDate = e.target.value}/>
          </div>
          <div className="mt-10 grid gap-5 portfolio-form mb-10">
            <label className="dark:text-gray-200 text-sm text-right mt-2">
              Description:
            </label>
            <textarea
              className="border text-sm dark:text-gray-300"
              rows="4"
              cols="100"
              defaultValue={experience.description}
              onChange={e => experience.description = e.target.value}
            ></textarea>
            </div>
            <label className="dark:text-gray-200 text-sm text-right">
              Select Related Artworks:
            </label>
            <div className="flex flex-wrap mx-10">
            { artworks.map(artwork => {
              return (
                <div className="w-40 mx-5" key={artwork._id}> 
                  <div className={`${experience.artworkIds.includes(artwork._id) ? "bg-gray-600" : "hover:bg-gray-700"}`}
                       onClick={() => {
                        if(experience.artworkIds.includes(artwork._id)) {experience.artworkIds=removeFromArray(artwork._id, experience.artworkIds)}
                        else {experience.artworkIds.push(artwork._id)}
                        const temp = [...experiences]
                        setNewExperiences(temp)
                        console.log(experiences)
                  }}>
                    <img
                      className="portfolio-editor-choose-experience-artwork cursor-pointer py-5"
                      src={artwork.imageUrl}
                      alt={artwork.name}
                    />
                  </div>
                  <div className="pl-3">
                    <h2 className="dark:text-white text-lg font-semibold mb-1 text-center">
                      {artwork.name}
                    </h2>
                  </div>
                </div>
              );
              
            })}
            </div>
          
          <div id="portfolio-editor-experience-remove-button">
          <button className="bg-gray-700 hover:bg-gray-600 text-white text-sm py-1 px-2 mt-10"
                  onClick={e => {
                    const temp = experiences.filter( experienceObj => {
                      return experience != experienceObj
                    })
                    console.log(temp)
                    setNewExperiences([...temp])
                    console.log(newExperiences)
                  }} >
            Remove
          </button>
          </div>
      </div>)
  }



  if (!isLoggedIn) return <Unauthenticated />;

  return (
      <main className="bg-gray-900">
        {showArtworkModal && (
        <UploadArtworkModal
          onClose={() => {
            setShowArtworkModal(false);
            getArtworks();
          }}
        />
      )}
        <header className="z-20 py-5 shadow-lg bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-sm sticky top-0">
          <div className="container mx-auto flex item-center gap-10">
            <Link to="/" className="dark:text-white text-2xl font-semibold">
              artsu.me
            </Link>
            <h2 className="dark:text-white text-2xl ml-auto">
              Edit Portfolio
            </h2>
            <Link to={`/portfolio/${user.username}`} className="dark:text-white font-semibold text-2xl ml-auto">{user.name}</Link>
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
          <h2 className="mb-10">2. Hero
          <label className="dark:text-gray-400 text-sm mt-1 mb-5 portfolio-editor-section-visible">
            <input type="checkbox" className="portfolio-editor-section-checkbox mx-1"
                   onChange={e=>hero.isVisible = !e.target.checked}
                   defaultChecked={!hero.isVisible}></input>
            Keep Hero Private
          </label></h2>
          <div className="grid gap-5 portfolio-form">
            <label className="dark:text-gray-200 text-sm text-right mt-2">
              Heading:
            </label>
            <input
              defaultValue={hero.heading}
              onChange={e => hero.headding = e.target.value}
              className="px-2 py-1"
              type="text"
            />
            <label className="dark:text-gray-200 text-sm text-right mt-2">
              Subtitle:
            </label>
            <input
              defaultValue={hero.subtitle}
              onChange={e => hero.subtitle = e.target.value}
              className="px-2 py-1"
              type="text"
            />
          </div>
          <h3 className="mt-10">Select a layout:</h3>
          <div className="container mx-auto flex flex-wrap item-center gap-20 py-5" id="hero-layout">
            <div className={`${0 === heroLayout ? "bg-gray-700" : "hover:bg-gray-800"}`}
                 onClick={() => setHeroLayout(0)} >
              <div className="portfolio-editor-layout-div">
                <img
                  className="cursor-pointer mx-1 my-5 h-20"
                  src="http://res.cloudinary.com/artsu-me/image/upload/v1638859308/tqxu5yt4vk7mx4jrrixx.png"/>
              </div>
              <div className="dark:text-white text-xs text-center my-5">
                layout 1
              </div>
            </div>
            <div className={`${1 === heroLayout ? "bg-gray-700" : "hover:bg-gray-800"}`}
                onClick={() => setHeroLayout(1)}>
              <div className="portfolio-editor-layout-div">
                <img
                  className="cursor-pointer mx-1 my-5 h-20"
                  src="http://res.cloudinary.com/artsu-me/image/upload/v1638860134/gpjdxg5kundpoyaclxet.png"/>
              </div>
              <div className="dark:text-white text-xs text-center my-5">
                layout 2
              </div>
            </div>
            <div className={`${2 === heroLayout ? "bg-gray-700" : "hover:bg-gray-800"}`}
                onClick={() => setHeroLayout(2)}>
              <div className="portfolio-editor-layout-div">
                <img
                  className=" cursor-pointer mx-2 my-5 h-20"
                  src="http://res.cloudinary.com/artsu-me/image/upload/v1638860736/tepx7rjuiwfyhtcynggj.png"/>
              </div>
              <div className="dark:text-white text-xs text-center my-5">
                layout 3
              </div>
            </div>
            
          </div>
        </section>

        <section className="dark:text-white container mx-auto mt-20">
          <h2 className="mb-10">3. Experiences
            <label className="dark:text-gray-400 text-sm mt-1 mb-5 portfolio-editor-section-visible">
              <input type="checkbox" className="portfolio-editor-section-checkbox mx-1"
                     onChange={e => portfolio.section.experience.isVisible = !e.target.checked}
                     defaultChecked={!portfolio.section.experience.isVisible}></input>
              Keep Experiences Private
            </label></h2>
          <div className="space-y-20">
            {
              experiences.map(experience => displayExperience(experience))
            }
          </div>
          <button className="bg-gray-600 hover:bg-gray-500 text-white text-sm py-1 px-1 my-10"
                  onClick={e => {
                    const newExperience = JSON.parse(JSON.stringify(emptyExperience))
                    experiences.push(newExperience)
                    const temp = [...experiences]
                    setNewExperiences(temp)
                    console.log(experiences)
                  }} >
            Add Experience
          </button>

          <h3 className="mt-10">Select a layout:</h3>
          <div className="container mx-auto flex item-center gap-20 py-5">
            <div className={`${0 === experienceLayout ? "bg-gray-700" : "hover:bg-gray-800"}`}
                 onClick={() => setExperienceLayout(0)} >
              <img
                className=" cursor-pointer mx-5 my-5 h-20"
                src="http://res.cloudinary.com/artsu-me/image/upload/v1638863729/uqadikxkjeojoye89zmv.png"/>
              <div className="dark:text-white text-xs text-center my-5">
                layout 1
              </div>
            </div>
            <div className={`${1 === experienceLayout ? "bg-gray-700" : "hover:bg-gray-800"}`}
                onClick={() => setExperienceLayout(1)}>
              <img
                className=" items-center cursor-pointer mx-5 my-5 h-20"
                src="http://res.cloudinary.com/artsu-me/image/upload/v1638863953/faiesnys3xjrfhcinld8.png"/>
              <div className="dark:text-white text-xs text-center my-5">
                layout 2
              </div>
            </div>
          </div>
          
        </section>

        <section className="dark:text-white container mx-auto mt-10">
          <h2 className="mb-10">4. Projects
          <label className="dark:text-gray-400 text-sm mt-1 mb-5 portfolio-editor-section-visible">
            <input type="checkbox" className="portfolio-editor-section-checkbox mx-1"
                   onChange={e=>projects.isVisible = !e.target.checked}
                   defaultChecked={!projects.isVisible}></input>
            Keep Projects Private
          </label></h2>
          <div className="flex flex-wrap mx-10 my-10">
            { artworks.map(artwork => {
              return (
                <div className="w-48 mx-5" key={artwork._id}>
                  <img
                    className="portfolio-content-artwork-img"
                    src={artwork.imageUrl}
                    alt={artwork.name}
                  />
                  <div className="pl-3">
                    <h2 className="dark:text-white text-lg font-semibold mb-1 text-center">
                      {artwork.name}
                    </h2>
                  </div>
                </div>
              );
            })}
          </div>
        
          <div className="flex container mx-auto my-10">
          {/* <div className="m-auto">
              <button 
                onClick={() => setShowArtworkModal(true)}
                className="text-gray-800 font-semibold bg-gray-200 hover:bg-opacity-90 bg-opacity-75 py-1 px-3 text-sm">
                Upload New Artwork
              </button>
          </div> */}
          </div>
          <h3 className="mt-10">Select a layout:</h3>
          <div className="container mx-auto flex item-center gap-20 py-5">
            <div className={`${0 === projectLayout ? "bg-gray-700" : "hover:bg-gray-800"}`}
                 onClick={() => setProjectLayout(0)} >
              <img
                className=" cursor-pointer mx-5 my-5 h-20"
                src="http://res.cloudinary.com/artsu-me/image/upload/v1638864064/n1fz5atyefq3zcony0mf.png"/>
              <div className="dark:text-white text-xs text-center my-5">
                layout 1
              </div>
            </div>
            {/* <div className={`${1 === experienceLayout ? "bg-gray-500" : "hover:bg-gray-600"}`}
                onClick={() => setExperienceLayout(1)}>
              <img
                className=" items-center cursor-pointer mx-5 my-5 h-20"
                src="http://res.cloudinary.com/artsu-me/image/upload/v1638863953/faiesnys3xjrfhcinld8.png"/>
              <div className="dark:text-white text-xs text-center my-5">
                layout 2
              </div>
            </div> */}
          </div>
        
        </section>
        
        <section
          className="dark:text-white container mx-auto mt-10"
          id="chooseLayout"
        >
          <h2 className="mb-10">5. Contact
          <label className="dark:text-gray-400 mt-1 mb-5 portfolio-editor-contact-visible">
            <input type="checkbox" className="portfolio-editor-section-checkbox mx-1 mt-1"
                   defaultChecked={!contact.isVisible}
                   onChange={e=>contact.isVisible = !e.target.checked}></input>
            Do not receive messages from other users
          </label></h2>
        </section>


        <div className="flex justify-start" id="buttons">
          <div className="ml-5 mt-7 mb-5">
            <Link
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full"
              to={`/portfolio/${user.username}`}
            >
              Quit
            </Link>
          </div>
          <div className="ml-auto mb-5 mr-5">
            <button
            onClick={savePortfolio}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full my-5"
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
