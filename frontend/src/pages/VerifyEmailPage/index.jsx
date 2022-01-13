import { useRef, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Check, X } from "react-feather";
import { AppContext } from "../../App";
import { useAuthentication } from "../../hooks/useAuthentication";

const VerifyEmailPage = () => {
  const history = useHistory();

  const { user, setUser, api } = useContext(AppContext);
  const { isLoggedIn } = useAuthentication();

  const resendEmail = () => {};

  const contactSupport = () => {};

  if (!isLoggedIn) return null;

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
            <h1 to="/" className="text-5xl mb-1 font-extrabold">
              Verify your Email
            </h1>
            <p className="font-semibold backdrop-blur-md p-4">
              A verification email has been sent to your email address: {user?.email}
            </p>
          </header>

          <div className="bg-gray-800 bg-opacity-90 px-16 py-14 shadow-2xl rounded-lg backdrop-blur-md">
            <p className="font-semibold mb-4 text-center">
              The verification link will expire in 12 hours. If you have not received the email
              after a few minutes, check your spam folder, or "resend email". If there are further
              issues please "contact support".
            </p>

            <div className="flex items-center gap-3 text-sm">
              <button
                onClick={resendEmail}
                className="text-gray-800 grow tracking-wider py-2.5 font-semibold rounded-sm shadow-lg bg-gray-100 hover:bg-white"
              >
                Resend Email
              </button>

              <button
                onClick={contactSupport}
                className="text-gray-800 grow tracking-wider py-2.5 font-semibold rounded-sm shadow-lg bg-gray-100 hover:bg-white"
              >
                Contact Support
              </button>
            </div>

            {/* <button
              onClick={changeUsername}
              className="text-white tracking-wider py-2.5 text-sm rounded-sm shadow-lg font-semibold bg-gradient-to-r from-rose-400 to-teal-500 hover:to-teal-400 hover:from-rose-400 block w-full"
            >
              CONFIRM
            </button> */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
