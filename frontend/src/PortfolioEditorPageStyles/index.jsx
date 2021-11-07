import { Link, useParams } from "react-router-dom";
import { users } from "../users.json";
import Footer from "../components/Footer";

const PortfolioEditorPageStyles = () => {

  const { slug } = useParams(); // reading from database
  const user = users.find(user => user.slug === slug);
  console.log(user)
  const themeColor = user.portfolioSettings.themeColor
  const layoutId = user.layoutId
  console.log(themeColor)

  function importLayouts(f) {
    let layouts = {};
    f.keys().map(key => layouts[key.replace("./", "")] = f(key));
    return layouts
  }

  const layouts = importLayouts(require.context('./static/', false, /\.png$/))
  console.log("layouts: ", layouts)

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
        2. Choose Layout
        <div className="container mx-auto flex item-center gap-20 py-10">
          {
            Object.keys(layouts).map( (key, index) => {
              return (
                <a className="hover:bg-gray-600">
                  <img style={{maxWidth: "10em"}} className="my-10 mx-10 items-center cursor-pointer" src={layouts[key].default} alt='layout'/>
                  <div className="dark:text-white text-xs text-center my-5">
                    {key.replace(".png", "")}
                  </div>
                </a>
              )
            })
          }
        </div>
        <div class="text-right">
          <Link className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full my-5 mx-5"
          to={`/portfolio/${user.slug}`}
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
