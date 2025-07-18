

import React from "react";
import { Link } from 'react-router-dom';


const features = [
  {
    title: "Automated Matching",
    description:
      "Effortlessly find compatible drivers or riders based on your travel preferences and real-time location.",
    icon: (
      <svg
        className="w-6 h-6 stroke-blue-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 10h1l1 2h13l1-2h1M5 14v5a2 2 0 002 2h10a2 2 0 002-2v-5m-9-4v6m4-6v6"
        ></path>
      </svg>
    ),
  },
  {
    title: "Real-time Tracking",
    description:
      "Monitor your ride's progress live on the map, with estimated arrival times and route visualization.",
    icon: (
      <svg
        className="w-6 h-6 stroke-blue-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17v-4h6v4m-3-9h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    ),
  },
  {
    title: "Community Driven",
    description:
      "Connect with fellow JSSSTU students, building a reliable and friendly carpooling network.",
    icon: (
      <svg
        className="w-6 h-6 stroke-blue-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a4 4 0 00-4-4h-1M7 20h5v-2a4 4 0 00-4-4H7m3-12a4 4 0 110 8 4 4 0 010-8z"
        ></path>
      </svg>
    ),
  },
  {
    title: "Time Saver",
    description:
      "Reduce travel time by optimizing routes and minimizing waiting periods, getting you to class faster.",
    icon: (
      <svg
        className="w-6 h-6 stroke-blue-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    ),
  },
  {
    title: "Cost-Effective",
    description:
      "Split fuel costs and save money compared to traditional commuting options.",
    icon: (
      <svg
        className="w-6 h-6 stroke-blue-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 9V7a2 2 0 00-2-2H9a2 2 0 00-2 2v2H5v4h14v-4h-2z"
        ></path>
      </svg>
    ),
  },
  {
    title: "Secure & Safe",
    description:
      "Prioritizing your safety with verified student profiles and secure ride confirmations.",
    icon: (
      <svg
        className="w-6 h-6 stroke-blue-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 11c1.38 0 2.5-1.12 2.5-2.5S13.38 6 12 6s-2.5 1.12-2.5 2.5S10.62 11 12 11z"
        ></path>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 17c-3.33 0-6-2-6-4.5V9a6 6 0 0112 0v3.5c0 2.5-2.67 4.5-6 4.5z"
        ></path>
      </svg>
    ),
  },
];

const benefits = [
  {
    key: "save",
    title: "Save Money on Commute",
    description:
      "Carpooling with GroupGo significantly reduces your daily travel expenses, putting more money back in your pocket for student life. Share the ride, share the cost!",
    imgAlt:
      "Two students inside a car, studying together with books and digital devices, smiling and enjoying a carpool ride.",
    imgSrc: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0f227f12-e16a-45d6-9c0e-896e465638ca.png",
  },
  {
    key: "carbon",
    title: "Reduce Your Carbon Footprint",
    description:
      "Join the movement towards a greener campus. By carpooling, you contribute to fewer vehicles on the road, leading to reduced emissions and a healthier environment.",
    imgAlt:
      "A black car driving on a sunlit road surrounded by greenery with a potted plant on the side symbolizing eco-friendly transport.",
    imgSrc:
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9ee03d28-1b7d-47e0-a943-27a9397ab215.png",
  },
  {
    key: "connect",
    title: "Connect with Peers",
    description:
      "GroupGo isn't just about rides; it's about building connections. Meet new friends, network, and strengthen the JSSSTU community on your daily commute.",
    imgAlt:
      "Group of diverse students happily chatting and looking at smartphones standing outside on a bright day.",
    imgSrc:
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0f91d8af-c350-44a7-8e5f-3ad4e45193e2.png",
  },
];

const howItWorks = [
  {
    step: 1,
    title: "Create or Request",
    description:
      "Drivers post available rides with details; riders request rides specifying their needs.",
  },
  {
    step: 2,
    title: "Get Matched",
    description:
      "Our smart algorithm instantly matches compatible drivers and riders based on proximity and preferences.",
  },
  {
    step: 3,
    title: "Confirm & Ride",
    description:
      "Review matched rides, confirm your choice, and enjoy a seamless journey to JSSSTU.",
  },
];



function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Hero Section */}
      <section
        className="relative pt-24 pb-20 text-center bg-indigo-900 bg-blend-multiply bg-opacity-75"
        style={{
          backgroundImage:
            "url('https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ef039c01-e0f1-4f19-a816-65b710aa089e.png')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        aria-label="Students smiling and carpooling inside a car, happy and engaged"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
            Your Smart Carpooling Solution for JSSSTU
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-indigo-200 text-lg md:text-xl leading-relaxed drop-shadow-md">
            Optimize your commute, save money, and connect with fellow students on
            campus
          </p>
          <button
          >
 <a
            href="#how-it-works"
            className="mt-8 inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold text-lg px-8 py-3 rounded-full shadow-lg transition-colors duration-300"
            aria-label="Get started with GroupGo carpooling"
          >
            Get Started Now
          </a>
          </button>
          
        </div>
        <div className="absolute inset-0 bg-indigo-900 bg-opacity-60"></div>
      </section>

      {/* Why choose section */}
      <section className="max-w-7xl mx-auto px-6 py-16 sm:py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose GroupGo?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map(({ title, description, icon }) => (
            <div
              key={title}
              className="p-6 border border-gray-200 rounded-lg text-center hover:shadow-lg transition-shadow duration-300"
              role="region"
              aria-label={title}
            >
              <div className="inline-flex p-3 rounded-full bg-indigo-50 mb-4">
                {icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
              <p className="text-gray-600 text-sm">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits for students */}
      <section className="bg-gray-50 py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-16 max-w-3xl mx-auto">
          Benefits for JSSSTU Students
        </h2>
        <div className="max-w-6xl mx-auto space-y-16">
          {benefits.map(({ key, title, description, imgSrc, imgAlt }, index) => {
            const isEven = index % 2 === 1;
            return (
              <div
                key={key}
                className={`flex flex-col ${
                  isEven ? "md:flex-row-reverse" : "md:flex-row"
                } items-center gap-8 md:gap-12`}
              >
                <div className="md:w-1/2">
                  <img
                    src={imgSrc}
                    alt={imgAlt}
                    className="rounded-lg shadow-lg w-full max-h-80 object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/97ec0be8-c704-4ccd-926e-3dc82d4241fb.png";
                    }}
                  />
                </div>
                <div className="md:w-1/2 text-center md:text-left max-w-md">
                  <h3 className="text-xl font-semibold mb-3">{title}</h3>
                  <p className="text-gray-700">{description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it works section */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-16 sm:py-20">
        <h2 className="text-3xl font-bold text-center mb-12">How GroupGo Works</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {howItWorks.map(({ step, title, description }) => (
            <div
              key={step}
              className="border border-gray-200 rounded-lg p-8 hover:shadow-xl transition-shadow duration-300"
              aria-label={`Step ${step}: ${title}`}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 text-white bg-pink-600 rounded-full mb-4 font-semibold text-lg select-none">
                {step}
              </div>
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{description}</p>
            </div>
          ))}
        </div>
      </section>

    

      {/* Call to action */}
      <section className="bg-indigo-700 py-20 px-6 text-center text-white">
        <h2 className="text-4xl font-bold mb-4 max-w-3xl mx-auto leading-tight">
          Ready to Simplify Your Commute?
        </h2>
        <p className="mb-8 max-w-xl mx-auto text-lg font-light">
          Join GroupGo today and experience the future of student carpooling at JSSSTU.
        </p>
        <Link to="/login">
  <button
    type="button"
    className="bg-pink-600 hover:bg-pink-700 px-8 py-4 rounded-full font-semibold text-white shadow-lg transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-pink-500 focus:ring-opacity-50"
    aria-label="Login or Signup to GroupGo"
  >
    Login / Signup
  </button>
</Link>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 px-6 border-t border-gray-200 text-gray-700">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className="text-gray-900 font-bold mb-2 select-none">GroupGo</h3>
            <p>Stay updated with GroupGo</p>
            <form
              className="mt-3 flex justify-center md:justify-start"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Subscribe form for GroupGo updates"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="rounded-l-md border border-gray-300 px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Email address input"
                required
              />
            

            </form>
          </div>

          <div className="text-center md:text-right text-xs text-gray-500 select-none mb-6 md:mb-0">
            © 2023 GroupGo.
          </div>

          <div className="flex space-x-6 justify-center md:justify-end text-gray-400">
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-indigo-600 transition-colors duration-300"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8 19c7.5 0 11.6-6.2 11.6-11.6v-.5A8.3 8.3 0 0 0 21 4.5a8.1 8.1 0 0 1-2.3.6A4.1 4.1 0 0 0 20.3 3a8.2 8.2 0 0 1-2.6 1 4.1 4.1 0 0 0-7 3.7 11.7 11.7 0 0 1-8.5-4.3 4 4 0 0 0 1.3 5.4A4.1 4.1 0 0 1 3 7.9v.1a4 4 0 0 0 3.3 3.9 4.2 4.2 0 0 1-1.1.1 4.2 4.2 0 0 1-.8-.1 4.1 4.1 0 0 0 3.7 2.8A8.2 8.2 0 0 1 3 17.5a11.6 11.6 0 0 0 6 1.7" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-indigo-600 transition-colors duration-300"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M22 12a10 10 0 1 0-11 9.9v-7h-3v-3h3v-2c0-3 1.8-5 4.5-5a18 18 0 0 1 2.5.2v2.7h-1.7c-1.3 0-1.5.7-1.5 1.4v1.8h3l-.5 3h-2.5v7A10 10 0 0 0 22 12" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-indigo-600 transition-colors duration-300"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M7 2C4.8 2 3 3.8 3 6v12c0 2.2 1.8 4 4 4h10c2.2 0 4-1.8 4-4V6c0-2.2-1.8-4-4-4H7zm6 1a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm4.5.75a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0zM12 7a5 5 0 0 0-3 8.84V15h6v.84A5 5 0 0 0 12 7z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;

