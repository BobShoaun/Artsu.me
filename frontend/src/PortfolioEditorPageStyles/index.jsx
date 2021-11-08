import { Link, useParams } from "react-router-dom";
import { users } from "../users.json";
import Footer from "../components/Footer";
import { useState } from "react";
import "./index.css";

const PortfolioEditorPageStyles = () => {

  const { username } = useParams(); // reading from database
  const user = users.find(user => user.username === username);
  const themeColor = user.portfolioSettings.themeColor
  let layoutId = user.portfolioSettings.layoutId

  const [layout, setlayout] = useState(layoutId)

  function importLayouts(f) {
    let layouts = {};
    f.keys().map(key => layouts[key.replace("./", "")] = f(key));
    return layouts
  }

  const layouts = importLayouts(require.context('./static/', false, /\.png$/))

  function layoutOnClick(index) {
    setlayout(index+1)
  }

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
          {Object.keys(themeColor).map((key, index) => {
            return (
              <div>
                <input className="h-20 w-20 border-0 cursor-pointer" type="color" id={key} defaultValue={themeColor[key]}
                onChange={e => themeColor[key]=e.target.value}/>
                <br/>
                <div className="dark:text-white text-xs text-center">{key}</div>
              </div>)
            }
          )}
            
        </div>
        </section>
        <section className="dark:text-white my-10 ml-10" id="chooseLayout">
        2. Choose Layout
        <div className="container mx-auto flex item-center gap-20 py-10">
          {
            Object.keys(layouts).map( (key, index) => {
              return (
                <a className={`${layout===index+1
                  ? "bg-gray-500"
                  : "hover:bg-gray-600"
                  }`} onClick={() => layoutOnClick(index)}>
                  <img className="layoutImg" src={layouts[key].default}/>
                  <div className="dark:text-white text-xs text-center my-5">
                    {key.replace(".png", "")}
                  </div>
                </a>
              )
            })
          }
        </div>
        </section>
        <section className="my-5" id="buttons">
          <div className="text-left inline-block">
            <Link className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full my-5 mx-5"
            to={`/portfolio/edit/content/${user.username}`}
            >
              Previous
            </Link>
          </div>
          <div class=" float-right inline-block">
            <Link className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full my-5 mx-5"
            to={`/portfolio/${user.username}`} /* write to database */
            >
              Update Settings
            </Link>
          </div>
        </section>
      
      <Footer />
    </main>
  );
};

export default PortfolioEditorPageStyles;
