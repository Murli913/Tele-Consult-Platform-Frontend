// Chatbot.js

import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [botResponse, setBotResponse] = useState('');

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: 'text-davinci-003', // You can use a different model if needed
          prompt: userInput,
          max_tokens: 150,
          temperature: 0.7,
          n: 1,
          stop: '\n'
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_OPENAI_API_KEY' // Replace with your actual API key
          }
        }
      );

      setBotResponse(response.data.choices[0].text.trim());
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={`chatbot-popup ${isOpen ? 'open' : ''}`}>
      <button onClick={toggleChatbot}>Toggle Chatbot</button>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userInput}
            onChange={handleChange}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </form>
        <div>
          {botResponse && <p>{botResponse}</p>}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
