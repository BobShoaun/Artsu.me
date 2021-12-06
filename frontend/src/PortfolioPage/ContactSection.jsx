import { useEffect, useRef, useState } from "react";

const ContactSection = ({ portfolio, primary, secondary }) => {
  const contactNameRef = useRef();
  const contactEmailRef = useRef();
  const contactMessageRef = useRef();

  return (
    <section id="contact" className={`pt-20 pb-32 bg-mix-gradient`}>
      <h1 className="dark:text-white text-2xl font-semibold text-center mb-10 underline">
        Contact Me
      </h1>
      <div className="bg-gray-900 bg-opacity-80 rounded-lg p-14 mx-auto max-w-3xl shadow-xl">
        <form className="grid gap-x-10 gap-y-7 mb-5 contact-form">
          <label className="dark:text-gray-200 text-sm text-right mt-2">Name:</label>
          <input ref={contactNameRef} className="px-2 py-1" type="text" />
          <label className="dark:text-gray-200 text-sm text-right mt-2">Email:</label>
          <input ref={contactEmailRef} className="px-2 py-1" type="email" />
          <label className="dark:text-gray-200 text-sm text-right mt-2">Message:</label>
          <textarea ref={contactMessageRef} className="px-2 py-1" cols="30" rows="5"></textarea>
        </form>
        <div className="text-right">
          <button
            onClick={() =>
              alert(
                `Submitting message: ${contactMessageRef.current.value} from name: ${contactNameRef.current.value}, email: ${contactEmailRef.current.value}`
              )
            }
            className={`dark:text-gray-200 send-button transition-colors py-1 px-3`}
          >
            Submit
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
