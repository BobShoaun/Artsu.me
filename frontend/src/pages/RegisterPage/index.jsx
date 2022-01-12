import { Link, useHistory } from "react-router-dom";
import { useRef, useState, useEffect, useContext } from "react";

import ArtsumeModal from "../../components/ArtsumeModal";
import { AppContext } from "../../App";

import axios from "axios";
import SocialLogin from "../../components/SocialLogin";

const RegisterPage = () => {
  const history = useHistory();
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const emailRef = useRef(null);

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const { accessToken, setAccessToken, setUser } = useContext(AppContext);

  useEffect(() => {
    // redirect to main page if logged in
    if (!accessToken) return;
    history.push("/");
  }, []);

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
      await axios.post("/auth/register", {
        name: fullName,
        username,
        password,
      });

      const { data } = await axios.post("/auth/login", {
        username,
        password,
      });

      const accessToken = data.accessToken;
      const user = data.user;

      setUser(user);
      setAccessToken(accessToken);
      history.push("/");
    } catch (e) {
      if (e.response.status === 409) return setErrorMessage("username taken");
      setErrorMessage(e.response.data);
    }
  };

  return (
    <ArtsumeModal>
      <header className="mb-10 py-5 text-center">
        <h1 to="/" className="dark:text-gray-100 text-5xl mb-1 font-extrabold">
          Create Account
        </h1>
        <p className="dark:text-gray-200">The best art community awaits you</p>
      </header>
      <form className="">
        <div className="flex items-center gap-6 mb-8">
          <div className="flex-grow-0">
            <label htmlFor="given-name" className="dark:text-gray-200 text-sm text-right mb-2">
              Given name:
            </label>
            <input
              id="given-name"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className="px-2 py-1"
              type="text"
              name="name"
            />
          </div>
          <div className="flex-grow-0">
            <label htmlFor="family-name" className="dark:text-gray-200 text-sm text-right mb-2">
              Family name:
            </label>
            <input
              id="family-name"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="px-2 py-1"
              type="text"
              name="username"
            />
          </div>
        </div>

        <label htmlFor="email" className="dark:text-gray-200 text-sm text-right mb-3">
          Email:
        </label>
        <input id="email" ref={emailRef} className="px-2 py-1 mb-8" type="email" />

        <label htmlFor="password" className="dark:text-gray-200 text-sm text-right mb-3">
          Password:
        </label>
        <input id="password" ref={passwordRef} className="px-2 py-1 mb-8" type="password" />

        <label htmlFor="confirm-password" className="dark:text-gray-200 text-sm text-right mb-3">
          Confirm password:
        </label>
        <input
          id="confirm-password"
          ref={confirmPasswordRef}
          className="px-2 py-1 mb-8"
          type="password"
        />

        {errorMessage && <em className="text-rose-400 text-sm">*{errorMessage}</em>}

        <button
          onClick={register}
          className="text-white tracking-wider py-2.5 mb-10 text-sm rounded-sm shadow-lg font-semibold bg-gradient-to-r from-rose-400 to-teal-500 hover:to-teal-400 hover:from-rose-400 block w-full"
        >
          SIGN UP
        </button>

        <SocialLogin></SocialLogin>

        <h4 className="text-gray-100 text-sm text-center py-5">
          Already have an account?{" "}
          <Link className="underline" to="/login">
            Login instead!
          </Link>
        </h4>
      </form>
    </ArtsumeModal>
  );
};

export default RegisterPage;