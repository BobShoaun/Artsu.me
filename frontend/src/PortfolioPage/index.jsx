import { useEffect, useState } from "react"; // removed useRef
import { Link, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { useAuthentication } from "../hooks/useAuthentication";

import axios from "axios";
import { apiUrl } from "../config";

import "./index.css";
import ProjectSection from "./ProjectSection";
import ContactSection from "./ContactSection";
import HeroSection from "./HeroSection";
import ExperienceSection from "./ExperienceSection";

import Loading from "../components/Loading";

const PortfolioPage = () => {
  const { username } = useParams();
  const { isPublic } = useSelector(state => state.general);
  const { user, isLoggedIn } = useAuthentication(); // removed accessToken

  useScrollToTop();

  const [portfolio, setPortfolio] = useState(null);

  const getPortfolio = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/users/username/${username}/portfolio`);
      setPortfolio(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPortfolio();
  }, [username, apiUrl]);

  // from css tricks https://css-tricks.com/snippets/javascript/lighten-darken-color/
  const lightenDarkenColor = (col, amt) => {
    let usePound = false;
    if (col[0] === "#") {
      col = col.slice(1);
      usePound = true;
    }
    let num = parseInt(col, 16);
    let r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
    let b = ((num >> 8) & 0x00ff) + amt;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
    let g = (num & 0x0000ff) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
  };

  if (!portfolio) return <Loading />;

  const primary = {
    main: portfolio.color.primary,
    light: lightenDarkenColor(portfolio.color.primary, 20),
    dark: lightenDarkenColor(portfolio.color.primary, -20),
  };
  const secondary = {
    main: portfolio.color.secondary,
    light: lightenDarkenColor(portfolio.color.secondary, 30),
    dark: lightenDarkenColor(portfolio.color.secondary, -30),
  };

  return (
    <main
      className="dark:bg-gray-900 scroll-smooth portfolio"
      style={{
        "--primary": primary.main,
        "--primary-light": primary.light,
        "--primary-dark": primary.dark,
        "--secondary": secondary.main,
        "--secondary-light": secondary.light,
        "--secondary-dark": secondary.dark,
      }}
    >
      <header className="z-20 py-5 shadow-lg bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-sm fixed top-0 left-0 right-0">
        <div className="container mx-auto flex item-center gap-10">
          <a href="#main" className="dark:text-white text-lg font-semibold">
            {portfolio.user.name}
          </a>
          {!isPublic && (
            <Link to="/" className="text-gray-200 text-sm hover:underline self-center">
              Back to Browse
            </Link>
          )}
          {isLoggedIn && user._id === portfolio.userId && (
            <Link
              to={`/portfolio/editor`}
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

      {portfolio.section.hero.isVisible && <HeroSection portfolio={portfolio} />}
      {portfolio.section.experience.isVisible && <ExperienceSection portfolio={portfolio} />}
      {portfolio.section.project.isVisible && <ProjectSection portfolio={portfolio} />}
      {portfolio.section.contact.isVisible && <ContactSection portfolio={portfolio} />}

      <footer className="py-20 bg-gray-900">
        <h4 className="text-center dark:text-gray-300 font-semibold text-xs">
          Page created with <Link to="/">Artsu.me</Link>
        </h4>
      </footer>
    </main>
  );
};

export default PortfolioPage;
