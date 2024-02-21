import { useHistory } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication";

const EmailVerificationSuccessPage = () => {
  const history = useHistory();
  const { user, gotoDestination } = useAuthentication();

  const _continue = () => {
    if (!user.username) {
      // no username, have user set it
      history.push("/username");
      return;
    }
    gotoDestination();
    history.push("/");
  };

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
            <h1 className="text-5xl mb-1 font-extrabold">Verification Success!</h1>
            <p className="font-semibold backdrop-blur-md p-4">
              Your email has been verified successfully!
            </p>
          </header>

          <div className="bg-gray-800 bg-opacity-90 px-16 py-14 shadow-2xl rounded-lg backdrop-blur-md">
            <p className="mb-8 text-center">
              Thank you for taking the time to verify your email, you can now start using Artsu.me
              as a fully verified user.
            </p>

            <button
              onClick={_continue}
              className="text-center text-white tracking-wider py-2.5 text-sm rounded-sm shadow-lg font-semibold bg-gradient-to-r from-rose-400 to-teal-500 hover:to-teal-400 hover:from-rose-400 block w-full"
            >
              CONTINUE
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EmailVerificationSuccessPage;
