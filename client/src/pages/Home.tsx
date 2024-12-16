import React from "react";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen sm:h-screen items-center justify-center p-5 gap-5 font-poppins">
      <div className="flex-1 flex flex-col items-center justify-start bg-gray-800 rounded-lg h-full p-5 relative">
        <h1 className="text-white text-2xl font-bold absolute top-5 left-5 sm:text-3xl md:text-4xl">
          Tasknimo
        </h1>
        <img
          src="home.webp"
          alt="Tasknimo"
          className="w-full sm:w-3/5 md:w-2/3 lg:w-1/2 max-w-md mt-36"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center p-5 rounded-lg h-full border-2 sm:w-1/2 md:w-3/5 lg:w-2/5">
        <div className="m-5 sm:m-10">
          <h2 className="text-2xl sm:text-4xl font-semibold mb-4">
            Productive Mind
          </h2>
          <p className="text-sm sm:text-base mb-4 text-gray-800 font-medium">
            Tasknimo is your ultimate productivity partner, designed to
            streamline task management, boost efficiency, and help you stay
            organized while reaching your goals with clarity and confidence.
          </p>

          <a href="/signup">
            <button className="bg-yellow-400 py-2 px-4 text-sm sm:text-base font-medium rounded w-full hover:bg-yellow-300 transition duration-300 ease-in-out">
              Get Started
            </button>
          </a>
          <p className="text-sm sm:text-base mt-4 text-center text-gray-800 font-medium">
            Already have an account?
            <a href="/login" className="mx-1 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
