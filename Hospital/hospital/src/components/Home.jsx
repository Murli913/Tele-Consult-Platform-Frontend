import React, { useState } from "react";
import Button from "../layouts/Button";
import ChatBot from "./ChatBot/ChatBot";



const Home = () => {
  const [showChatBot, setShowChatBot] = useState(false); // State to control the visibility of the chatbot
  const [isHovered, setIsHovered] = useState(false);
  const [iconSize, setIconSize] = useState(12); // Initial size

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIconSize(1000000); // Increase size when hovered
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIconSize(12); // Restore size when not hovered
  };
  const handleChatBotToggle = () => {
    setShowChatBot(!showChatBot); // Toggle the visibility of the chatbot
  };

  return (
    <div className="min-h-screen flex flex-col justify-center lg:px-32 px-5 text-white bg-[url('assets/img/home.png')] bg-no-repeat bg-cover opacity-90">
      <div className="w-full lg:w-4/5 space-y-5 mt-10">
        <h1 className="text-5xl font-bold leading-tight">
          Empowering Health Choices for a Vibrant Life Your Trusted..
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam magnam
          omnis natus accusantium quos. Reprehenderit incidunt expedita
          molestiae impedit at sequi dolorem iste sit culpa, optio voluptates
          fugiat vero consequatur?
        </p>
        <Button title="See Services" onClick={handleChatBotToggle} />
      </div>
      <div className="fixed bottom-6 right-5 z-50">
      <div
        className={`w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center border border-gray-300 ${isHovered ? 'shadow-md' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button onClick={handleChatBotToggle} className="bg-transparent">
          <img
            src="https://fcit.usf.edu/matrix/wp-content/uploads/Radio-Bot-Animated-Sm.gif"
            alt="Robot"
            className={`w-${iconSize} h-${iconSize}`}
          />
        </button>
      </div>
    </div>


      {showChatBot && <ChatBot />} {/* Render the chatbot component conditionally */}
  
    </div>
  );
};

export default Home;
