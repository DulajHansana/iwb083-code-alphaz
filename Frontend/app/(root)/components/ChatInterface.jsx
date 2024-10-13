"use client";
import { useState } from 'react';

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    { text: 'Hi, Welcome!', sender: 'other' },
    { text: 'How are you? All OK??', sender: 'other' },
    { text: 'Hi, All OK!!!!!!!', sender: 'self' }
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() !== '') {
      // Add new message to the messages array
      setMessages([...messages, { text: input, sender: 'self' }]);
      // Clear the input field after sending
      setInput('');
    }
  };

  return (
    <div className="w-3/4 p-4 bg-white h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white shadow-sm">
        <div className="flex items-center space-x-2">
          <img src="/Images/avatar4.png" alt="Avatar" className="w-8 h-8 rounded-full" />
          <h2 className="text-purple-700 font-bold">SparkChat 3</h2>
        </div>
        <div>
          <button className="p-2">
            <img src="/Images/menu-icon.png" alt="Menu" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col space-y-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg w-max ${message.sender === 'self' ? 'bg-purple-400 text-white self-end' : 'bg-purple-100'}`}
            >
              {message.text}
              {message.sender === 'self' && (
                <p className="text-xs text-gray-300 mt-1 text-right">sent a few seconds ago</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Input Field */}
      <div className="p-4 bg-gray-100 flex items-center rounded-lg shadow-md">
        <input
          className="flex-1 p-3 rounded-full bg-white border border-gray-300 placeholder-gray-500"
          type="text"
          placeholder="Type your message here..."
          value={input}
          onChange={(e) => setInput(e.target.value)} // Update input state
        />
        <button className="ml-2 p-2 bg-purple-600 text-white rounded-full" onClick={handleSendMessage}>
          <img src="/Images/send.png" alt="Send" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
