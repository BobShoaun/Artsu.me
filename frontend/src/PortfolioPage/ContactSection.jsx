import { useState, useEffect } from "react"; // removed useEffect, useRef
import axios from "axios";
import { useAuthentication } from "../hooks/useAuthentication";

import { apiUrl } from "../config";
import { useHistory } from "react-router";

const ContactSection = ({ portfolio }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const history = useHistory();

  const { accessToken, user, isLoggedIn } = useAuthentication();

  useEffect(() => {
    const params = new URLSearchParams(history.location.search);
    setSubject(params.get("subject"));
    setBody(params.get("body"));
  }, [history]);

  const sendMessage = async () => {
    if (!isLoggedIn) {
      // need to login first
      const params = new URLSearchParams();
      if (subject) params.set("subject", subject);
      if (body) params.set("body", body);
      const params2 = new URLSearchParams();
      params2.set("destination", `/portfolio/${portfolio.user.username}?${params}`);
      history.push(`/login?${params2}`);
      return;
    }

    setErrorMessage("");

    if (!subject || !body) {
      setErrorMessage("subject and body must be filled");
      return;
    }

    try {
      await axios.post(
        `${apiUrl}/users/${user._id}/messages`,
        {
          receiverId: portfolio.userId,
          subject,
          body,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      alert("Message sent to: " + portfolio.user.name);
      setSubject("");
      setBody("");
    } catch (e) {
      alert("Oops! something went wrong.");
      console.log(e);
    }
  };

  return (
    <section id="contact" className={`pt-20 pb-32 bg-mix-gradient`}>
      <h1 className="dark:text-white text-2xl font-semibold text-center mb-10 underline">
        Contact Me
      </h1>
      <div className="bg-gray-900 bg-opacity-80 rounded-lg p-14 mx-auto max-w-3xl shadow-xl">
        <form className="grid gap-x-10 gap-y-7 mb-5 contact-form">
          <label className="dark:text-gray-200 text-sm text-right mt-2">Subject:</label>
          <input
            value={subject}
            onChange={e => setSubject(e.target.value)}
            className="px-2 py-1"
            type="text"
          />
          <label className="dark:text-gray-200 text-sm text-right mt-2">Message:</label>
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            className="px-2 py-1"
            cols="30"
            rows="5"
          ></textarea>
        </form>
        {errorMessage && <em className="text-rose-400 text-sm">*{errorMessage}</em>}
        <div className="flex items-center">
          {!isLoggedIn && (
            <em className="text-gray-300 text-sm">
              Note: You need to be logged in to send messages
            </em>
          )}
          <button
            onClick={() => sendMessage()}
            className={`ml-auto dark:text-gray-200 send-button transition-colors py-1 px-3`}
          >
            Submit
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
