import { Link, useHistory } from "react-router-dom";
import { useRef, useState, useEffect, useContext, useCallback } from "react";

import { AppContext } from "../../App";
import SocialLogin from "../../components/SocialLogin";
import { useAuthentication } from "../../hooks/useAuthentication";

const RegisterPage = () => {
  const history = useHistory();
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const emailRef = useRef(null);

  const [fullName, setFullName] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const { setAccessToken, setUser, api } = useContext(AppContext);

  const { isLoggedIn, register: _register } = useAuthentication();

  useEffect(() => {
    // redirect to main page if logged in
    if (!isLoggedIn) return;
    history.push("/");
  }, [isLoggedIn]);

  const register = async e => {
    e.preventDefault();
    setErrorMessage("");

    const form = new FormData(e.target);
    const givenName = form.get("given-name");
    const familyName = form.get("family-name");
    const email = form.get("email");
    const password = form.get("password");
    const confirmPassword = form.get("confirm-password");

    if (givenName.length === 0) return setErrorMessage("given name cannot be empty");
    if (familyName.length === 0) return setErrorMessage("family name cannot be empty");
    if (email.length === 0) return setErrorMessage("email cannot be empty");
    if (password.length < 8) return setErrorMessage("password too short (min 8 chars)");
    if (password !== confirmPassword) return setErrorMessage("passwords do not match");

    if (!(await _register(email, givenName, familyName, password)))
      setErrorMessage("something went wrong");
  };

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        src="/images/low poly hills.jfif"
        alt="low poly wallpaper"
        className="w-full h-full absolute inset-0 z-0 object-cover"
      />
      {/* <div className="h-full absolute inset-0 moving-gradient bg-gradient-to-br from-rose-300 to-teal-500 opacity-10"></div> */}

      <div className="max-w-[100rem] px-10 flex items-center h-full mx-auto gap-20 z-10 relative">
        <section className="max-w-2xl shrink fade-up">
          <header className="text-center text-gray-800/90 mb-4">
            <h1 to="/" className="text-5xl mb-1 font-extrabold">
              Create Account
            </h1>
            <p className="">The best art community awaits you</p>
          </header>
          <div className="bg-gray-800 bg-opacity-90 px-16 py-14 shadow-2xl rounded-lg backdrop-blur-md">
            <form onSubmit={register}>
              <div className="flex items-center gap-6 mb-8">
                <div className="flex-grow-0">
                  <label
                    htmlFor="given-name"
                    className="dark:text-gray-200 text-sm text-right mb-2"
                  >
                    Given name:
                  </label>
                  <input id="given-name" className="px-2 py-1" type="text" name="given-name" />
                </div>
                <div className="flex-grow-0">
                  <label
                    htmlFor="family-name"
                    className="dark:text-gray-200 text-sm text-right mb-2"
                  >
                    Family name:
                  </label>
                  <input id="family-name" className="px-2 py-1" type="text" name="family-name" />
                </div>
              </div>

              <label htmlFor="email" className="dark:text-gray-200 text-sm text-right mb-3">
                Email:
              </label>
              <input id="email" name="email" className="px-2 py-1 mb-8" type="email" />

              <label htmlFor="password" className="dark:text-gray-200 text-sm text-right mb-3">
                Password:
              </label>
              <input id="password" name="password" className="px-2 py-1 mb-8" type="password" />

              <label
                htmlFor="confirm-password"
                className="dark:text-gray-200 text-sm text-right mb-3"
              >
                Confirm password:
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                className="px-2 py-1 mb-4"
                type="password"
              />

              <div className="mb-4 text-center">
                {errorMessage && <em className="text-rose-400 text-sm">*{errorMessage}</em>}
              </div>

              <button
                type="submit"
                className="text-white tracking-wider py-2.5 mb-10 text-sm rounded-sm shadow-lg font-semibold bg-gradient-to-r from-rose-400 to-teal-500 hover:to-teal-400 hover:from-rose-400 block w-full"
              >
                SIGN UP
              </button>
            </form>
            <SocialLogin></SocialLogin>

            <h4 className="text-gray-100 text-sm text-center py-5">
              Already have an account?{" "}
              <Link className="underline" to="/login">
                Login instead!
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

export default RegisterPage;
