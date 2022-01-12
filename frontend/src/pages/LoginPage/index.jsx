import { Link, useHistory } from "react-router-dom";
import { useRef, useState, useContext, useEffect } from "react";
import ArtsumeModal from "../../components/ArtsumeModal";
import { googleClientId } from "../../config";
import axios from "axios";
import { AppContext } from "../../App";

import GoogleLogin from "react-google-login";

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

  const onGoogleLoginSuccess = async response => {
    try {
      const { data } = await axios.post(
        `/auth/google`,
        {
          token: response.tokenId,
        },
        { withCredentials: true }
      );

      const accessToken = data.accessToken;
      const user = data.user;

      setAccessToken(accessToken);
      setUser(user);

      const params = new URLSearchParams(history.location.search);
      history.push(params.get("destination") ?? "/");

      // const { data: dd } = await axios.get(`${apiUrl}/auth/refresh`, { withCredentials: true });

      // const { data: ddd } = await axios.delete(`${apiUrl}/auth/logout`, { withCredentials: true });
    } catch (e) {
      setUsernameError("invalid credentials");
    }
  };

  return (
    <ArtsumeModal>
      <header className="mb-10 text-center">
        <h1 to="/" className="dark:text-gray-100 text-5xl mb-1 font-semibold">
          Welcome back!
        </h1>
        <p className="dark:text-gray-300">The best art community awaits you</p>
      </header>
      <form className="">
        <label className="dark:text-gray-200 text-sm text-right mb-2">Username or Email:</label>
        {usernameError && <em className="text-rose-400 text-sm float-right">*{usernameError}</em>}
        <input ref={usernameRef} className="px-2 py-1 mb-10" type="text" />
        <label className="dark:text-gray-200 text-sm text-right mb-3">Password:</label>
        {passwordError && <em className="text-rose-400 text-sm float-right">*{passwordError}</em>}
        <input ref={passwordRef} className="px-2 py-1 mb-8" type="password" />
        <button
          onClick={login}
          className="text-white tracking-wider py-2.5 mb-5 text-sm rounded-sm shadow-lg font-semibold bg-gradient-to-r from-rose-400 to-teal-500 hover:to-teal-400 hover:from-rose-400 transition block w-full"
        >
          LOGIN
        </button>

        {/* <hr /> */}
        <p className="text-xs text-gray-200 mb-3 text-center">Or login with</p>

        <div className="text-center text-white font-semibold">
          <GoogleLogin
            clientId={googleClientId}
            render={({ onClick, disabled }) => (
              <button
                onClick={onClick}
                disabled={disabled}
                className="font-semibold tracking-wider py-2 5 mb-2 text-sm rounded-sm shadow-lg bg-red-700 hover:bg-red-500 transition block w-full"
              >
                GOOGLE
              </button>
            )}
            onSuccess={onGoogleLoginSuccess}
            onFailure={null}
            cookiePolicy="single_host_origin"
          />

          <a
            href=""
            className="tracking-wider py-2 5 mb-5 text-sm rounded-sm shadow-lg bg-blue-700 hover:bg-blue-500 transition block w-full"
          >
            FACEBOOK
          </a>
        </div>

        <h4 className="text-gray-100 text-sm text-center">
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
