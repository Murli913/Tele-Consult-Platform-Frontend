import React, { useState, useEffect, useRef } from "react";
import { FaUser } from 'react-icons/fa';
import { IoMdPerson } from "react-icons/io";
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineRecordVoiceOver, MdVoiceOverOff } from "react-icons/md";

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [initialMessageSent, setInitialMessageSent] = useState(false);
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const recognitionInstance = new window.webkitSpeechRecognition();
    setRecognition(recognitionInstance);

    return () => {
      if (recognitionInstance) {
        recognitionInstance.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!initialMessageSent) {
      setMessages([
        { text: "What kind of Symptoms you are feeling", sender: "bot" },
        { text: "1. Fever", sender: "bot" },
        { text: "2. Cough", sender: "bot" },
        { text: "3. Sore throat", sender: "bot" },
        { text: "4. Fatigue", sender: "bot" },
        { text: "5. Body aches", sender: "bot" },
        { text: "6. Headache", sender: "bot" },
        // { text: "7. Shortness of breath", sender: "bot" },
        // { text: "8. Loss of taste or smell", sender: "bot" },
        // { text: "9. Congestion or runny nose", sender: "bot" },
        // { text: "10. Nausea or vomiting", sender: "bot" },
        // { text: "11. Diarrhea", sender: "bot" }
      ]);
      setInitialMessageSent(true);
    }
  }, [initialMessageSent]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const handleBotResponse = (userMessage) => {
    const userMessages = userMessage.toLowerCase();
    if (userMessages.toLowerCase().includes("fever")) {
      const precautions = "Here are some precautions you can take for fever: rest, drink plenty of fluids, and take over-the-counter fever reducers like acetaminophen or ibuprofen.";
      const words = precautions.split(" ");
      const maxLength = 5;
      let response = "";
      for (let i = 0; i < words.length; i++) {
        response += words[i] + " ";
        if ((i + 1) % maxLength === 0 && i !== words.length - 1) {
          response += "<br />";
        }
      }
      return response.trim();
    } 
    else if (userMessages.toLowerCase().includes("cough")) {
      const precautions = "Here are some precautions 1. Stay hydrated by drinking warm fluids. 2. Use cough drops or lozenges to soothe throat irritation. 3. Avoid exposure to smoke and other respiratory irritants";
      const words = precautions.split(" ");
      const maxLength = 5;
      let response = "";
      for (let i = 0; i < words.length; i++) {
        response += words[i] + " ";
        if ((i + 1) % maxLength === 0 && i !== words.length - 1) {
          response += "<br />";
        }
      }
      return response.trim();
    }

    else if (userMessages.toLowerCase().includes("sore throat")) {
      const precautions = "Here are some precautions 1. Gargle with warm salt water. 2. Stay hydrated by drinking warm liquids. 3. Avoid irritants like tobacco smoke.";
      const words = precautions.split(" ");
      const maxLength = 5;
      let response = "";
      for (let i = 0; i < words.length; i++) {
        response += words[i] + " ";
        if ((i + 1) % maxLength === 0 && i !== words.length - 1) {
          response += "<br />";
        }
      }
      return response.trim();
    }

    else if (userMessages.toLowerCase().includes("fatigue")) {
      const precautions = "Here are some precautions 1. Get plenty of rest and sleep. 2.  Maintain a balanced diet to ensure proper nutrition. 3.  Avoid excessive caffeine intake, especially before bedtime.";
      const words = precautions.split(" ");
      const maxLength = 5;
      let response = "";
      for (let i = 0; i < words.length; i++) {
        response += words[i] + " ";
        if ((i + 1) % maxLength === 0 && i !== words.length - 1) {
          response += "<br />";
        }
      }
      return response.trim();
    }
    else if (userMessages.toLowerCase().includes("body aches")) {
      const precautions = "Here are some precautions 1. Take over-the-counter pain relievers like acetaminophen or ibuprofen. 2.  Apply heat packs or take warm baths to soothe muscles.";
      const words = precautions.split(" ");
      const maxLength = 5;
      let response = "";
      for (let i = 0; i < words.length; i++) {
        response += words[i] + " ";
        if ((i + 1) % maxLength === 0 && i !== words.length - 1) {
          response += "<br />";
        }
      }
      return response.trim();
    }
    else if (userMessages.toLowerCase().includes("headache")) {
      const precautions = "Here are some precautions 1. Stay hydrated by drinking warm fluids. 2. Use cough drops or lozenges to soothe throat irritation. 3. Avoid exposure to smoke and other respiratory irritants";
      const words = precautions.split(" ");
      const maxLength = 5;
      let response = "";
      for (let i = 0; i < words.length; i++) {
        response += words[i] + " ";
        if ((i + 1) % maxLength === 0 && i !== words.length - 1) {
          response += "<br />";
        }
      }
      return response.trim();
    }
    else if (userMessages.toLowerCase().includes("shortness of breath:")) {
      const precautions = "Here are some precautions 1. Sit upright and practice deep breathing exercises. 2.Use a fan or open a window to increase airflow. 3. Seek medical attention if severe or persistent";
      const words = precautions.split(" ");
      const maxLength = 5;
      let response = "";
      for (let i = 0; i < words.length; i++) {
        response += words[i] + " ";
        if ((i + 1) % maxLength === 0 && i !== words.length - 1) {
          response += "<br />";
        }
      }
      return response.trim();
    }
    else if (userMessages.toLowerCase().includes("loss of taste or smell")) {
      const precautions = "Here are some precautions 1. Stay hydrated and consume flavorful foods. 2. Use spices and seasonings to enhance taste. 3. Practice good oral hygiene.";
      const words = precautions.split(" ");
      const maxLength = 5;
      let response = "";
      for (let i = 0; i < words.length; i++) {
        response += words[i] + " ";
        if ((i + 1) % maxLength === 0 && i !== words.length - 1) {
          response += "<br />";
        }
      }
      return response.trim();
    }
    else if (userMessages.toLowerCase().includes("congestion or runny nose")) {
      const precautions = "Here are some precautions 1.Use saline nasal sprays or irrigation to clear nasal passages. 2. Use a humidifier to add moisture to the air. 3. Avoid irritants like smoke and strong odors.";
      const words = precautions.split(" ");
      const maxLength = 5;
      let response = "";
      for (let i = 0; i < words.length; i++) {
        response += words[i] + " ";
        if ((i + 1) % maxLength === 0 && i !== words.length - 1) {
          response += "<br />";
        }
      }
      return response.trim();
    }
    else if (userMessages.toLowerCase().includes("nausea or vomiting")) {
      const precautions = "Here are some precautions 1.Stay hydrated by sipping clear fluids. 2. Eat small, bland meals like crackers or toast. 3. Avoid spicy, greasy, or heavy foods.";
      const words = precautions.split(" ");
      const maxLength = 5;
      let response = "";
      for (let i = 0; i < words.length; i++) {
        response += words[i] + " ";
        if ((i + 1) % maxLength === 0 && i !== words.length - 1) {
          response += "<br />";
        }
      }
      return response.trim();
    }

    else if (userMessages.toLowerCase().includes("diarrhea")) {
      const precautions = "Here are some precautions 1.Stay hydrated by drinking water, clear broths, or oral rehydration solutions. 2.Eat bland, easy-to-digest foods like rice, bananas, or boiled potatoes. 3. Avoid caffeine, alcohol, and dairy products until symptoms improve."
      const words = precautions.split(" ");
      const maxLength = 5;
      let response = "";
      for (let i = 0; i < words.length; i++) {
        response += words[i] + " ";
        if ((i + 1) % maxLength === 0 && i !== words.length - 1) {
          response += "<br />";
        }
      }
      return response.trim();
    }

    
    else {
      const precautions = "Hye You can consult with our doctors on toll free number for any query Toll-Free-9131487737";
      const words = precautions.split(" ");
      const maxLength = 5;
      let response = "";
      for (let i = 0; i < words.length; i++) {
        response += words[i] + " ";
        if ((i + 1) % maxLength === 0 && i !== words.length - 1) {
          response += "<br />";
        }
      }
      return response.trim();
      
    }
  };

  const handleUserMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, { text: message, sender: "user" }]);
    setTimeout(() => {
      const botResponse = handleBotResponse(message);
      setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: "bot" }]);
    }, 500);
  };

  const startListening = () => {
    if (recognition) {
      recognition.onstart = () => {
        setListening(true);
      };

      recognition.onresult = (event) => {
        const message = event.results[0][0].transcript;
        handleUserMessage(message);
      };

      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setListening(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-20 right-20 w-400 h-500 bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md">
      <div className="h-100 overflow-y-auto p-2">
        <h1 className="text-black font-semibold ">Tele-Consult</h1>
        <br/>
        {messages.map((message, index) => (
          <div key={index} className={`flex items-center ${message.sender === "user" ? "justify-end" : "justify-start"} mb-2`}>
            {message.sender === "user" ? null : <FaUserDoctor className="w-8 h-8 mr-2 text-blue-500" />}
            <span className={`bg-${message.sender === "user" ? "yellow" : "blue"}-100 border border-${message.sender === "user" ? "yellow" : "blue"}-300 rounded-lg px-4 py-2 max-w-2/3 break-words text-${message.sender === "user" ? "gray" : "gray"}-800`} dangerouslySetInnerHTML={{ __html: message.text }}></span>
            {message.sender === "user" ? <IoMdPerson className="w-6 h-6 ml-2 text-blue-500" /> : null}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          {listening ? (
            <MdOutlineRecordVoiceOver onClick={stopListening} className="text-red-500 cursor-pointer w-8 h-8" />
          ) : (
            <MdVoiceOverOff onClick={startListening} className="text-green-500 cursor-pointer w-8 h-8" />
          )}
          <input
            type="text"
            placeholder="Type your message..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value.trim() !== "") {
                handleUserMessage(e.target.value);
                e.target.value = "";
              }
            }}
            className="w-full p-1 ml-0 rounded-lg border border-gray-300 bg-gray-100 text-gray-800"
          />
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
