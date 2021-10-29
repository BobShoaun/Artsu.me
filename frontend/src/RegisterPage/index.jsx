import { Link, useHistory } from "react-router-dom";
import { useRef, useState } from "react";
import { users } from "../users.json";

import ArtsumeModal from "../components/ArtsumeModal";

const RegisterPage = () => {
  const history = useHistory();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const register = e => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    setUsernameError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (username.length === 0) {
      setUsernameError("invalid username");
      return;
    }

    if (users.find(user => user.username === username.toLocaleLowerCase())) {
      setUsernameError("username already taken");
      return;
    }

    if (password.length < 8) {
      setPasswordError("too short (min 8 chars)");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("password does not match");
      return;
    }

    // register and authenticate
    history.push("/");
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
        <label className="dark:text-gray-200 text-sm text-right mb-2">
          Username:
        </label>
        {usernameError && (
          <em className="text-rose-400 text-sm float-right">
            *{usernameError}
          </em>
        )}
        <input ref={usernameRef} className="px-2 py-1 mb-10" type="text" />

        <label className="dark:text-gray-200 text-sm text-right mb-3">
          Password:
        </label>
        {passwordError && (
          <em className="text-rose-400 text-sm float-right">
            *{passwordError}
          </em>
        )}
        <input ref={passwordRef} className="px-2 py-1 mb-10" type="password" />

        <label className="dark:text-gray-200 text-sm text-right mb-3">
          Confirm password:
        </label>
        {confirmPasswordError && (
          <em className="text-rose-400 text-sm float-right">
            *{confirmPasswordError}
          </em>
        )}
        <input
          ref={confirmPasswordRef}
          className="px-2 py-1 mb-8"
          type="password"
        />
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
