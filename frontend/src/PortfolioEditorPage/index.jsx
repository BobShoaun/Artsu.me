import { Link, useParams } from "react-router-dom";
import { users } from "../users.json";
import Footer from "../components/Footer";
import layout from './static/layout.png'

const PortfolioEditorPage = () => {

  const { slug } = useParams();
  const user = users.find(user => user.slug === slug);

  return (
    <main className="bg-gray-700">
      <header className="z-20 py-5 shadow-lg bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-sm sticky top-0">
        <div className="container mx-auto flex item-center gap-10">
        <a>
          <Link to="/" className="dark:text-white text-2xl font-semibold">
            artsu.me
          </Link>
        </a>
        <a className="dark:text-white text-2xl ml-auto">
          Edit Portfolio - Styles
        </a>
        <a className="dark:text-white text-l font-semibold ml-auto">Logout</a>
        </div>
      </header>
      <section className="dark:text-white my-10 ml-10" id="chooseColor">
        1. Choose colors
        <div className="container mx-auto flex item-center gap-20 py-10">
          <div>
            <div style={{display: "inline-block", width: "70px", height: "70px", background: "purple"}}></div>
            <br/><div className="dark:text-white text-xs text-center">Primary</div>
          </div>
          <div>
            <div style={{display: "inline-block", width: "70px", height: "70px", background: "darkred"}}></div>
            <br/><div className="dark:text-white text-xs text-center">Secondary</div>
          </div>
          <div>
            <div style={{display: "inline-block", width: "70px", height: "70px", background: "gold"}}></div>
            <br/><div className="dark:text-white text-xs text-center">Highlight</div>
          </div>
          <div>
            <div style={{display: "inline-block", width: "70px", height: "70px", background: "darkgray"}}></div>
            <br/><div className="dark:text-white text-xs text-center">Background</div>
          </div>
        </div>
      </section>
      <section className="dark:text-white my-10 ml-10" id="chooseLayout">
        2. Choose Layout
        <div className="container mx-auto flex item-center gap-20 py-10">
          <div>
            <img className="w-60" src={layout}></img>
            <br/><div className="dark:text-white text-xs text-center">Traditional</div>
          </div>
        </div>
      </section>
      <div class="text-right">
        <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full my-5 mx-5">
          Continue
        </button>
      </div>
      <Footer />
    </main>
  );
};

export default PortfolioEditorPage;
