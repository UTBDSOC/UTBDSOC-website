"use client";

import React from "react";

const ContactForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    fetch("https://formspree.io/f/mvgoakrv", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Success! Your message has been sent.");
          form.reset();
        } else {
          alert("Oops! There was a problem with your submission.");
        }
      })
      .catch(() => {
        alert("Error: Unable to send your message.");
      });
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <a href="#" className="font-semibold text-2xl tracking-tighter flex items-center gap-2">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5"
            />
          </svg>
        </div>
        Rank2revenue
      </a>
      <div className="relative mt-12 w-full max-w-lg">
        <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"></div>
        <div className="mx-5 border shadow-lg rounded-lg border-white/20">
          <div className="flex flex-col p-6">
            <h3 className="text-xl font-semibold leading-6 tracking-tighter">Contact Form</h3>
            <p className="mt-1.5 text-sm font-medium text-white/50">
              Please fill in your details below.
            </p>
          </div>
          <div className="p-6 pt-0">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                <label className="text-xs font-medium text-gray-400 group-focus-within:text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  autoComplete="off"
                  className="block w-full bg-transparent border-0 p-0 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-0"
                  required
                />
              </div>

              {/* Description Input */}
              <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                <label className="text-xs font-medium text-gray-400 group-focus-within:text-white">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Your Description"
                  className="block w-full bg-transparent border-0 p-0 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-0"
                  rows={5}
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end">
                <button
                  className="bg-white text-black font-semibold rounded-md h-10 px-4 py-2 transition duration-300 hover:bg-black hover:text-white hover:ring hover:ring-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
