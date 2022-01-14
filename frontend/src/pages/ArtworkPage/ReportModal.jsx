import { useRef } from "react";
import axios from "axios";
import { apiUrl } from "../../config";
import { useAuthentication } from "../../hooks/useAuthentication";

const ReportModal = ({ onClose, artwork }) => {
  const reasonInput = useRef(null);
  const { accessToken } = useAuthentication();

  const report = async e => {
    e.preventDefault();
    if (!accessToken) return;

    const message = reasonInput.current.value;
    if (!message) return;

    try {
      await axios.post(
        `${apiUrl}/artworks/${artwork._id}/reports`,
        {
          message,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      onClose();
      alert("Report sent! Thank you for your contribution.");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main
      onClick={onClose}
      className="fixed cursor-pointer inset-0 z-30 overflow-auto bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-sm flex"
    >
      <form
        onClick={e => e.stopPropagation()}
        onSubmit={report}
        className="bg-gray-700 p-8 m-auto w-1/2 shadow-lg rounded-md cursor-auto"
      >
        <h2 className="text-gray-100 text-lg font-semibold mb-5 text-center">
          Report this artwork:
        </h2>

        <label className="dark:text-gray-200 text-sm mb-2">Reason:</label>
        <textarea className="px-2 py-1 mb-8 w-full" ref={reasonInput} rows="5"></textarea>

        <button
          type="submit"
          className="text-white tracking-wider py-2.5 text-sm rounded-sm shadow-lg font-semibold bg-gradient-to-r from-rose-400 to-teal-500 hover:to-teal-400 hover:from-rose-400 block w-full"
        >
          Submit Report
        </button>
      </form>
    </main>
  );
};

export default ReportModal;
