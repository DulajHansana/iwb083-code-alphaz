"use client";
import React, { useEffect, useState } from 'react';

import Image from 'next/image';

export default function ChatList({ onSelectChat, userMessages }) {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [chats, setChats] = useState([]);

/*   const chats = [
    { name: 'SparkChat 0', message: 'How are you doing?', avatar: '/images/avatar1.png', id: 0 },
    { name: 'SparkChat 1', message: 'How are you doing?', avatar: '/images/avatar2.png', id: 1 },
    { name: 'SparkChat 2', message: 'How are you doing?', avatar: '/images/avatar3.png', id: 2 },
    { name: 'SparkChat 3', message: 'How are you doing?', avatar: '/images/avatar4.png', id: 3 }
  ]; */

  useEffect(() => {
    Object.entries(userMessages).forEach(([key, value]) => {
      value.name = key;
      setChats((prevChats) => [...prevChats, value]); 
    })
  }, [userMessages]);

  const handleChatSelect = (chat) => {
    setSelectedChatId(chat.id);
    onSelectChat(chat);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredChats = chats.filter(chat =>
    chat.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 bg-gray-100 h-screen p-4 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-customPurple">Chat</h2>
        <button className="p-2">
          <Image src="/images/editing.png" alt="Edit" width={20} height={20} />
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 bg-gray-200 rounded-lg"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {filteredChats.length > 0 ? (
        <ul className="space-y-2">
          {filteredChats.map((chat) => (
            <button
              key={chat.id}
              className={`w-full flex items-center p-4 rounded-2xl focus:outline-none 
                          ${selectedChatId === chat.id
                  ? 'bg-purple-700 text-white'
                  : 'bg-purple-300 hover:bg-purple-400'} 
                          space-x-4 transition-colors duration-200`}
              onClick={() => handleChatSelect(chat)}
            >
              <Image
                src={chat.avatar}
                alt={`${chat.name} avatar`}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="text-left">
                <p className={`font-semibold ${selectedChatId === chat.id ? 'text-white' : 'text-customPurple'}`}>
                  {chat.name}
                </p>
                <p className={`text-sm ${selectedChatId === chat.id ? 'text-purple-200' : 'text-gray-600'}`}>
                  {chat.message}
                </p>
              </div>
            </button>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600">No chats found yet</p>
      )}
    </div>
  );
}
