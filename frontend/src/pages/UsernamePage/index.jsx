import ArtsumeModal from "../../components/ArtsumeModal";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Sentencer from "sentencer";

const UsernamePage = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");

  const changeUsername = e => {
    e.preventDefault();
    console.log("change username");
    return;
    history.push("/");
  };

  const generateRandom = e => {
    e.preventDefault();
    const username = Sentencer.make(
      "This sentence has {{ a_noun }} and {{ an_adjective }} {{ noun }} in it."
    );
    console.log(username);
  };

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        src="/low poly hills.jfif"
        alt=""
        className="w-full h-full absolute inset-0 z-0 object-cover"
      />

      <div className="max-w-[100rem] px-10 flex items-center h-full mx-auto gap-20 z-10 relative">
        <section className="max-w-2xl m-auto fade-up">
          <header className="text-center text-gray-800/90 mb-4">
            <h1 to="/" className="text-5xl mb-1 font-extrabold">
              Choose a Username
            </h1>
            <p className="font-semibold backdrop-blur-md p-4">
              Your username is a unique nickname used to identify you in this site. Don't worry, you
              can change it later.
            </p>
          </header>

          <form
            action=""
            className="bg-gray-800 bg-opacity-90 px-16 py-14 shadow-2xl rounded-lg backdrop-blur-md"
          >
            <label htmlFor="username" className="dark:text-gray-200 text-sm text-right mb-2">
              Username:
            </label>
            <input
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="px-2 py-1 mb-8"
              type="text"
            />

            <button
              onClick={generateRandom}
              className="mb-5 text-gray-800 tracking-wider py-2.5 text-sm rounded-sm shadow-lg font-semibold bg-gray-100 block w-full"
            >
              Randomly Generate
            </button>

            <button
              onClick={changeUsername}
              className="text-white tracking-wider py-2.5 text-sm rounded-sm shadow-lg font-semibold bg-gradient-to-r from-rose-400 to-teal-500 hover:to-teal-400 hover:from-rose-400 block w-full"
            >
              CONFIRM
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default UsernamePage;
