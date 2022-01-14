import { useRef, useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Check, X } from "react-feather";
import { AppContext } from "../../App";
import { useAuthentication } from "../../hooks/useAuthentication";

const EmailVerificationSuccessPage = () => {
  const history = useHistory();

  const { user, setUser, api } = useContext(AppContext);
  const { isLoggedIn } = useAuthentication();

  // useEffect(() => {
  //   if (!isLoggedIn) return;
  //   sendEmail();
  // }, [isLoggedIn]);

  // if (!isLoggedIn) return null;

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        src="/images/low poly hills.jfif"
        alt="low poly wallpaper"
        className="w-full h-full absolute inset-0 z-0 object-cover"
      />

      <div className="max-w-[100rem] px-10 flex items-center h-full mx-auto gap-20 z-10 relative">
        <section className="max-w-2xl m-auto fade-up">
          <header className="text-center text-gray-800/90 mb-4">
            <h1 className="text-5xl mb-1 font-extrabold">Email Verified</h1>
            {/* <p className="font-semibold backdrop-blur-md p-4">Email Verified Successfully</p> */}
          </header>

          <div className="bg-gray-800 bg-opacity-90 px-16 py-14 shadow-2xl rounded-lg backdrop-blur-md">
            <p className="mb-8 text-center">Email Verified Successfully</p>

            <Link
              to="/"
              className="text-center text-white tracking-wider py-2.5 text-sm rounded-sm shadow-lg font-semibold bg-gradient-to-r from-rose-400 to-teal-500 hover:to-teal-400 hover:from-rose-400 block w-full"
            >
              CONTINUE
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EmailVerificationSuccessPage;
