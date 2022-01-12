import { Link, useHistory } from "react-router-dom";
import { useRef, useState, useContext, useEffect } from "react";
import ArtsumeModal from "../../components/ArtsumeModal";
import axios from "axios";
import { AppContext } from "../../App";

import SocialLogin from "../../components/SocialLogin";

const LoginPage = () => {
  const history = useHistory();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { accessToken, setAccessToken, setUser } = useContext(AppContext);

  useEffect(() => {
    // redirect to main page if logged in
    if (!accessToken) return;
    history.push("/");
  }, []);

  const login = async e => {
    e.preventDefault();
    const usernameOrEmail = usernameRef.current.value;
    const password = passwordRef.current.value;
    setUsernameError("");
    setPasswordError("");

    if (!usernameOrEmail) return setUsernameError("field cannot be empty");
    if (!password) return setPasswordError("password cannot be empty");

    const isEmail = /\S+@\S+\.\S+/.test(usernameOrEmail);
    const body = isEmail
      ? { email: usernameOrEmail, password }
      : { username: usernameOrEmail, password };

    try {
      const { data } = await axios.post(`/auth/login`, body, { withCredentials: true });

      const accessToken = data.accessToken;
      const user = data.user;

      setAccessToken(accessToken);
      setUser(user);

      const params = new URLSearchParams(history.location.search);
      history.push(params.get("destination") ?? "/");
    } catch (e) {
      setUsernameError("invalid credentials");
    }
  };

  // const onGoogleLoginSuccess = async response => {
  //   try {
  //     const { data } = await axios.post(
  //       `/auth/google`,
  //       {
  //         token: response.tokenId,
  //       },
  //       { withCredentials: true }
  //     );

  //     const accessToken = data.accessToken;
  //     const user = data.user;

  //     setUser(user);
  //     setAccessToken(accessToken);

  //     const params = new URLSearchParams(history.location.search);
  //     history.push(params.get("destination") ?? "/");
  //   } catch (e) {
  //     setUsernameError("invalid credentials");
  //   }
  // };

  return (
    <ArtsumeModal>
      <header className="mb-10 py-5 text-center">
        <h1 to="/" className="dark:text-gray-100 text-5xl mb-1 font-extrabold">
          Welcome back!
        </h1>
        <p className="dark:text-gray-300">The best art community awaits you</p>
      </header>
      <form className="">
        <label htmlFor="username-email" className="dark:text-gray-200 text-sm text-right mb-2">
          Username or Email:
        </label>
        {usernameError && <em className="text-rose-400 text-sm float-right">*{usernameError}</em>}
        <input id="username-email" ref={usernameRef} className="px-2 py-1 mb-8" type="text" />
        <label htmlFor="password" className="dark:text-gray-200 text-sm text-right mb-3">
          Password:
        </label>
        {passwordError && <em className="text-rose-400 text-sm float-right">*{passwordError}</em>}
        <input id="password" ref={passwordRef} className="px-2 py-1 mb-4" type="password" />

        <div className="flex items-center gap-2 mb-8">
          <input
            id="remember-me"
            type="checkbox"
            name="remember-me"
            defaultChecked
            className="cursor-pointer"
          />
          <label htmlFor="remember-me" className="dark:text-gray-200 text-sm cursor-pointer">
            Remember me
          </label>
          <a href="" className="ml-auto text-gray-200 text-sm hover:underline focus:underline">
            Forgot password?
          </a>
        </div>

        <button
          onClick={login}
          className="text-white tracking-wider py-2.5 mb-10 text-sm rounded-sm shadow-lg font-semibold bg-gradient-to-r from-rose-400 to-teal-500 hover:to-teal-400 hover:from-rose-400 transition block w-full"
        >
          LOGIN
        </button>

        <SocialLogin />

        <h4 className="text-gray-100 text-sm text-center py-5">
          Don't have an account?{" "}
          <Link className="underline" to="/register">
            Register here!
          </Link>
        </h4>
      </form>
    </ArtsumeModal>
  );
};

export default LoginPage;
