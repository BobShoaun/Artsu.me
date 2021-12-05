import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
//NOTE: replace with API calls

import { useSelector } from "react-redux";
import { useScrollToTop } from "../hooks/useScrollToTop";

import axios from "axios";
import { apiUrl } from "../config";

import "./index.css";
import ProjectSection from "./ProjectSection";
import ContactSection from "./ContactSection";
import HeroSection from "./HeroSection";
import ExperienceSection from "./ExperienceSection";

const PortfolioPage = () => {
  const { username } = useParams();
  const { isPublic } = useSelector(state => state.general);
  const { accessToken, user } = useSelector(state => state.authentication);

  // const user = users.find(user => user.username === username);
  // will get user from backend

  const primary = { main: "rose-600", light: "rose-500", dark: "rose-700" };
  const secondary = { main: "teal-600", light: "teal-500", dark: "teal-800" };

  useScrollToTop();

  //phase2: create method here for API call to contact the owner of the profile

  const [portfolio, setPortfolio] = useState(null);

  const getPortfolio = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/users/username/${username}/portfolio`);
      setPortfolio(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(getPortfolio, [username]);

  if (!portfolio) return null; // TODO loading state

  return (
    <main className="dark:bg-gray-900 scroll-smooth">
      <header className="z-20 py-5 shadow-lg bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-sm sticky top-0">
        <div className="container mx-auto flex item-center gap-10">
          <a href="#main" className="dark:text-white text-lg font-semibold">
            {portfolio.user.name}
          </a>
          {!isPublic && (
            <Link to="/" className="text-gray-200 text-sm hover:underline self-center">
              Back to Browse
            </Link>
          )}
          {accessToken && user.username === portfolio.user.username && (
            <Link
              to={`/portfolio/edit/${portfolio.user.username}`}
              className="text-gray-200 text-sm hover:underline self-center"
            >
              Edit Portfolio
            </Link>
          )}
          <a
            href="#experiences"
            className="ml-auto text-gray-200 text-sm hover:underline underline-offset"
          >
            Experiences
          </a>
          <a href="#projects" className="text-gray-200 text-sm hover:underline underline-offset">
            Projects
          </a>
          <a href="#contact" className="text-gray-200 text-sm hover:underline underline-offset">
            Contact Me
          </a>
        </div>
      </header>

      {portfolio.section.hero.isVisible && (
        <HeroSection portfolio={portfolio} primary={primary} secondary={secondary} />
      )}

      {portfolio.section.experience.isVisible && (
        <ExperienceSection portfolio={portfolio} primary={primary} secondary={secondary} />
      )}
      {portfolio.section.project.isVisible && (
        <ProjectSection portfolio={portfolio} primary={primary} secondary={secondary} />
      )}

      {portfolio.section.contact.isVisible && (
        <ContactSection portfolio={portfolio} primary={primary} secondary={secondary} />
      )}

      <footer className="py-20 bg-gray-900">
        <h4 className="text-center dark:text-gray-300 font-semibold text-xs">
          Page created with <Link to="/">Artsu.me</Link>
        </h4>
      </footer>
    </main>
  );
};

export default PortfolioPage;
