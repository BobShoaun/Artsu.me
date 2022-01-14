import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../App";
import { useAuthentication } from "../../hooks/useAuthentication";

const EmailVerificationPage = () => {
  const history = useHistory();

  const [verificationStatus, setVerificationStatus] = useState("");
  const { user, api } = useContext(AppContext);
  const { isLoggedIn } = useAuthentication();

  const sendEmail = async () => {
    const { data } = await api.protected.post(`/users/${user._id}/email/verification/send`, {
      redirectUrl: `${window.location.origin}/email-verification/success`,
    });
    console.log("Email sent", data);
  };

  const contactSupport = () => {};

  const checkVerificationStatus = async () => {
    setVerificationStatus("");
    try {
      const { data } = await api.public.get(`/users/${user._id}`);
      if (!data.isVerified) {
        setVerificationStatus("Email is still not verified.");
        return;
      }
      history.push("/email-verification/success");
    } catch {
      setVerificationStatus("Something went wrong.");
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    sendEmail();
  }, [isLoggedIn]);

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
              A verification email has been sent to your email address:{" "}
              <strong>{user?.email}</strong>
            </p>
          </header>

          <div className="bg-gray-800 bg-opacity-90 px-16 py-14 shadow-2xl rounded-lg backdrop-blur-md">
            <p className="mb-6 text-center">
              The verification link will expire in 12 hours. Make sure the sender is{" "}
              <strong>artsu.me18@gmail.com</strong>. If you have not received the email after a few
              minutes, check your spam folder, or <strong>resend email</strong>. For any questions
              or issues please <strong>contact support</strong>.
            </p>

            <p className="mb-4 text-center">
              Upon verification, this page does not update automatically. Therefore click{" "}
              <strong>Check Verification Status</strong> to check if your email is verified.
            </p>

            <div className="text-center mb-3">
              <p className="text-red-400">{verificationStatus || <>&nbsp;</>}</p>
            </div>

            <div className="flex items-center gap-3 text-sm mb-3">
              <button
                onClick={sendEmail}
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

            <button
              onClick={checkVerificationStatus}
              className="text-white tracking-wider py-2.5 text-sm rounded-sm shadow-lg font-semibold bg-gradient-to-r from-rose-400 to-teal-500 hover:to-teal-400 hover:from-rose-400 block w-full"
            >
              CHECK VERIFICATION STATUS
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
