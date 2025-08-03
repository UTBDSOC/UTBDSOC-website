import React, { useState } from "react";

const ChatButtonWithForm: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("message", message);

    fetch("https://formspree.io/f/mvgoakrv", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setResponseMessage("Success! Your message has been sent.");
          setName("");
          setPhone("");
          setMessage("");
        } else {
          setResponseMessage("Oops! There was a problem with your submission.");
        }
      })
      .catch(() => {
        setResponseMessage("Error: Unable to send your message.");
      });
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Chat Button */}
      <button
        onClick={toggleFormVisibility}
        className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 10h.01M12 10h.01M16 10h.01M21 16.5A2.5 2.5 0 0118.5 19h-13A2.5 2.5 0 013 16.5v-7A2.5 2.5 0 015.5 7h13A2.5 2.5 0 0121 9.5v7z"
          />
        </svg>
      </button>

      {/* Contact Form */}
      {isFormVisible && (
        <div className="absolute bottom-16 right-0 bg-gray-800 text-white rounded-lg shadow-2xl p-6 w-80">
          <div className="bg-blue-500 rounded-t-lg p-4 text-center text-white">
            <h3 className="text-lg font-semibold">
              We are here to help. One of our admin team will text you back!
            </h3>
          </div>
          <form className="p-4 space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full border rounded p-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Mobile Phone"
              className="w-full border rounded p-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              className="w-full border rounded p-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600 focus:outline-none"
            >
              Text Us
            </button>
          </form>
          {responseMessage && (
            <p className="text-sm text-center mt-2">{responseMessage}</p>
          )}
          <p className="text-xs text-gray-400 text-center mt-2">
            By submitting this form, you consent to receive marketing text
            messages. Message and data rates may apply. Message frequency
            varies.
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatButtonWithForm;
