import { useRef, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Sentencer from "sentencer";
import axios from "axios";
import { Check, X } from "react-feather";
import { AppContext } from "../../App";

const UsernamePage = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const { accessToken, user, setUser } = useContext(AppContext);

  const changeUsername = async e => {
    e.preventDefault();
    if (!(await validate())) return;

    try {
      const { data } = await axios.patch(
        `/users/${user._id}`,
        [{ op: "replace", path: "/username", value: username }],
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      console.log("change username", data);
      setUser(data);
      history.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  const generateRandom = e => {
    e.preventDefault();
    const username = Sentencer.make("{{ adjective }}-{{ noun }}");
    setUsername(username);
  };

  const validate = async e => {
    e?.preventDefault();
    setValidationMessage("");
    try {
      await axios.post("/users/username/validate", { username });
      setValidationMessage("valid");
      return true;
    } catch (e) {
      switch (e.response.data.result) {
        case "invalid":
          setValidationMessage("invalid: only [a-z0-9_.-] are allowed");
          break;
        case "duplicate":
          setValidationMessage("username taken");
          break;
        default:
          setValidationMessage(e.response.data.result);
          break;
      }
    }
    return false;
  };

  useEffect(() => {
    setValidationMessage("");
  }, [username]);

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
            <div className="flex items-center mb-2 mr-2">
              <label htmlFor="username" className="dark:text-gray-200 text-sm">
                Username:
              </label>

              {validationMessage === "valid" ? (
                <div className="text-sm text-teal-400 ml-auto flex items-center gap-1">
                  <Check size={15} />
                  <em className="">Available</em>
                </div>
              ) : (
                validationMessage && (
                  <div className="text-sm text-red-400 flex items-center gap-1 ml-auto">
                    <X size={15} />
                    <em className="">{validationMessage}</em>
                  </div>
                )
              )}
            </div>

            <input
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="px-2 py-1 mb-8"
              type="text"
            />

            <div className="flex items-center gap-3 mb-4 text-sm">
              <button
                onClick={validate}
                className="text-gray-800 grow tracking-wider py-2.5 font-semibold rounded-sm shadow-lg bg-gray-100 hover:bg-white"
              >
                Check Availability
              </button>

              <button
                onClick={generateRandom}
                className="text-gray-800 grow tracking-wider py-2.5 font-semibold rounded-sm shadow-lg bg-gray-100 hover:bg-white"
              >
                Randomly Generate
              </button>
            </div>

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
