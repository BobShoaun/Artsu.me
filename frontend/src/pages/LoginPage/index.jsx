import { Link, useHistory } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

import SocialLogin from "../../components/SocialLogin";
import { useAuthentication } from "../../hooks/useAuthentication";

const LoginPage = () => {
  const history = useHistory();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { login: _login, isLoggedIn } = useAuthentication();

  useEffect(() => {
    // redirect to main page if logged in
    if (!isLoggedIn) return;
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

    if (!(await _login(usernameOrEmail, password))) setUsernameError("invalid credentials");
  };

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        src="/images/low poly hills.jfif"
        alt="low poly wallpaper"
        className="w-full h-full absolute inset-0 z-0 object-cover"
      />

      <div className="max-w-[100rem] px-10 flex items-center h-full mx-auto gap-20 z-10 relative">
        <section className="max-w-2xl shrink fade-up">
          <header className="mb-4 text-gray-800/90 text-center">
            <h1 to="/" className="text-5xl mb-1 font-extrabold">
              Welcome back!
            </h1>
            <p className="">The best art community awaits you</p>
          </header>
          <div className="bg-gray-800 bg-opacity-90 px-16 py-14 shadow-2xl rounded-lg backdrop-blur-md">
            <form className="">
              <label
                htmlFor="username-email"
                className="dark:text-gray-200 text-sm text-right mb-2"
              >
                Username or Email:
              </label>
              {usernameError && (
                <em className="text-rose-400 text-sm float-right">*{usernameError}</em>
              )}
              <input id="username-email" ref={usernameRef} className="px-2 py-1 mb-8" type="text" />
              <label htmlFor="password" className="dark:text-gray-200 text-sm text-right mb-3">
                Password:
              </label>
              {passwordError && (
                <em className="text-rose-400 text-sm float-right">*{passwordError}</em>
              )}
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
                <a
                  href=""
                  className="ml-auto text-gray-200 text-sm hover:underline focus:underline"
                >
                  Forgot password?
                </a>
              </div>

              <button
                onClick={login}
                className="text-white tracking-wider py-2.5 mb-10 text-sm rounded-sm shadow-lg font-semibold bg-gradient-to-r from-rose-400 to-teal-500 hover:to-teal-400 hover:from-rose-400 transition block w-full"
              >
                LOGIN
              </button>
            </form>
            <SocialLogin />

            <h4 className="text-gray-100 text-sm text-center py-5">
              Don't have an account?{" "}
              <Link className="underline" to="/register">
                Register here!
              </Link>
            </h4>
          </div>
        </section>
        <section className="grow">
          <h1 className="text-[6rem] leading-[7rem] text-gray-100 font-extrabold text-right">
            <span className="opacity-80 blurry-text">Start your</span>
            <br />
            <span className="opacity-100 text-[9rem] text-white blurry-text">Artsu.me</span>
            <br />
            <span className="opacity-80 text-[8rem] blurry-text">today.</span>
          </h1>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
