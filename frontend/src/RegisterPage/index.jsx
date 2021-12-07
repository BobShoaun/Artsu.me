import { Link, useHistory } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useAuthentication } from "../hooks/useAuthentication";

import ArtsumeModal from "../components/ArtsumeModal";

import { apiUrl } from "../config";
import axios from "axios";

const RegisterPage = () => {
  const history = useHistory();
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const { accessToken: jwt, login: _login } = useAuthentication();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // redirect to main page if logged in
    if (!jwt) return;
    history.push("/");
  });

  useEffect(() => {
    setUsername(fullName.replaceAll(" ", "-").toLocaleLowerCase());
  }, [fullName]);

  const register = async e => {
    e.preventDefault();
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    setErrorMessage("");

    if (fullName.length === 0) return setErrorMessage("name cannot be empty");
    if (username.length === 0) return setErrorMessage("username cannot be empty");
    if (username.match(/\s/g)) return setErrorMessage("username cannot have spaces");
    if (password.length < 8) return setErrorMessage("password too short (min 8 chars)");
    if (password !== confirmPassword) return setErrorMessage("password does not match");

    try {
      await axios.post(`${apiUrl}/users/register`, {
        name: fullName,
        username,
        password,
      });

      const { data } = await axios.post(`${apiUrl}/users/login`, {
        username,
        password,
      });

      const accessToken = data.accessToken;
      const user = data.user;

      _login(user, accessToken);
      history.push("/");
    } catch (e) {
      if (e.response.status === 409) return setErrorMessage("username taken");
      setErrorMessage(e.response.data);
    }
  };

  return (
    <ArtsumeModal>
      <header className="mb-10 text-center">
        <h1 to="/" className="dark:text-gray-100 text-5xl mb-1 font-semibold">
          Welcome
        </h1>
        <p className="dark:text-gray-200 text-lg">to your special art resume</p>
      </header>
      <form className="">
        <div className="flex items-center gap-7 mb-10">
          <div className="flex-grow-0">
            <label className="dark:text-gray-200 text-sm text-right mb-2">Full name:</label>

            <input
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className="px-2 py-1"
              type="text"
              name="name"
            />
          </div>
          <div className="flex-grow-0">
            <label className="dark:text-gray-200 text-sm text-right mb-2">Username:</label>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="px-2 py-1"
              type="text"
              name="username"
            />
          </div>
        </div>

        <label className="dark:text-gray-200 text-sm text-right mb-3">Password:</label>
        <input ref={passwordRef} className="px-2 py-1 mb-10" type="password" />

        <label className="dark:text-gray-200 text-sm text-right mb-3">Confirm password:</label>

        <input ref={confirmPasswordRef} className="px-2 py-1 mb-3" type="password" />

        <div className="text-center mb-5">
          {errorMessage && <em className="text-rose-400 text-sm">*{errorMessage}</em>}
        </div>

        <button
          onClick={register}
          className="text-white tracking-wider py-2.5 mb-5 text-sm rounded-sm shadow-lg font-semibold bg-gradient-to-r from-rose-400 to-teal-500 hover:to-teal-400 hover:from-rose-400 block w-full"
        >
          REGISTER
        </button>
        <h4 className="text-gray-100 text-sm text-center">
          Already have an account?{" "}
          <Link className="hover:underline" to="/login">
            Login instead!
          </Link>
        </h4>
      </form>
    </ArtsumeModal>
  );
};

export default RegisterPage;
