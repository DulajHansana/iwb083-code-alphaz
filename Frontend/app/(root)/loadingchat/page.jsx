"use client";  // This is necessary because we're using React hooks and events

import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import ChatList from '../../../components/ChatList';
import SparkChatIntro from '../../../components/loadinginterface';
import ChatInterface from '../../../components/ChatInterface';

const Chatloading = () => {
  const [selectedChat, setSelectedChat] = useState(null);  // To track the selected chat

  // When no chat is selected, show the loading interface
  return (
    <div className="flex h-screen">
      <Sidebar />
      <ChatList onSelectChat={setSelectedChat} />  {/* Pass setSelectedChat as onSelectChat */}
      {!selectedChat ? (
        <SparkChatIntro />  // Show loading interface when no chat is selected
      ) : (
        <ChatInterface selectedChat={selectedChat} />  // Show chat interface when a chat is selected
      )}
    </div>
  );
};

export default Chatloading;
