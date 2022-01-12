import ArtsumeModal from "../../components/ArtsumeModal";
import { useRef } from "react";
import { useHistory } from "react-router-dom";

const UsernamePage = () => {
  const history = useHistory();
  const usernameRef = useRef(null);

  const changeUsername = e => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <ArtsumeModal>
      <header className="mb-10 py-5 text-center">
        <h1 to="/" className="dark:text-gray-100 text-5xl mb-1 font-extrabold">
          Choose a Username
        </h1>
        <p className="dark:text-gray-200">
          Your username is a unique nickname used to identify you in this site. Don't worry, you can
          change it later.
        </p>
      </header>

      <form action="">
        <label htmlFor="username" className="dark:text-gray-200 text-sm text-right mb-2">
          Username:
        </label>
        <input id="username" ref={usernameRef} className="px-2 py-1 mb-8" type="text" />

        <button
          onClick={changeUsername}
          className="text-white tracking-wider py-2.5 text-sm rounded-sm shadow-lg font-semibold bg-gradient-to-r from-rose-400 to-teal-500 hover:to-teal-400 hover:from-rose-400 block w-full"
        >
          CONFIRM
        </button>
      </form>
    </ArtsumeModal>
  );
};

export default UsernamePage;
