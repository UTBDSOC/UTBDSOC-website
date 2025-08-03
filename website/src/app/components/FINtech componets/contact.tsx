import React from "react";

const Contact: React.FC = () => {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          {/* Left Section: Contact Details */}
          <div className="lg:col-span-2 lg:py-12">
            <p className="max-w-xl text-lg text-gray-700">
              We're here to help! Fill out the form, and our team will get back
              to you as soon as possible. Alternatively, reach out directly
              using the contact details below.
            </p>

            <div className="mt-8">
              <a
                href="tel:01514754450"
                className="text-2xl font-bold text-blue-600 hover:underline"
              >
                0151 475 4450
              </a>

              <address className="mt-2 not-italic text-gray-600">
                282 Kevin Brook, Imogeneborough, CA 58517
              </address>
            </div>
          </div>

          {/* Right Section: Contact Form */}
          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <form action="#" className="space-y-6">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  className="w-full rounded-lg border border-gray-300 p-4 text-sm focus:ring focus:ring-blue-200 focus:outline-none"
                  placeholder="Your Name"
                  type="text"
                  id="name"
                  required
                />
              </div>

              {/* Email and Phone Inputs */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-300 p-4 text-sm focus:ring focus:ring-blue-200 focus:outline-none"
                    placeholder="Your Email"
                    type="email"
                    id="email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="sr-only">
                    Phone
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-300 p-4 text-sm focus:ring focus:ring-blue-200 focus:outline-none"
                    placeholder="Your Phone Number"
                    type="tel"
                    id="phone"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div className="grid grid-cols-1 gap-6 text-center sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="option1"
                    className="block w-full cursor-pointer rounded-lg border border-gray-300 p-4 text-gray-600 hover:border-blue-500 hover:bg-blue-50"
                  >
                    <input
                      type="radio"
                      id="option1"
                      name="service"
                      className="sr-only"
                    />
                    <span className="text-sm">Service 1</span>
                  </label>
                </div>

                <div>
                  <label
                    htmlFor="option2"
                    className="block w-full cursor-pointer rounded-lg border border-gray-300 p-4 text-gray-600 hover:border-blue-500 hover:bg-blue-50"
                  >
                    <input
                      type="radio"
                      id="option2"
                      name="service"
                      className="sr-only"
                    />
                    <span className="text-sm">Service 2</span>
                  </label>
                </div>

                <div>
                  <label
                    htmlFor="option3"
                    className="block w-full cursor-pointer rounded-lg border border-gray-300 p-4 text-gray-600 hover:border-blue-500 hover:bg-blue-50"
                  >
                    <input
                      type="radio"
                      id="option3"
                      name="service"
                      className="sr-only"
                    />
                    <span className="text-sm">Service 3</span>
                  </label>
                </div>
              </div>

              {/* Message Input */}
              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  className="w-full rounded-lg border border-gray-300 p-4 text-sm focus:ring focus:ring-blue-200 focus:outline-none"
                  placeholder="Your Message"
                  rows={6}
                  id="message"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="inline-block w-full rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 sm:w-auto"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
