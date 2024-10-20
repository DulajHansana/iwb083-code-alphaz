"use client"; 

import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import ChatList from '../../../components/ChatList';
import ChatInterface from '../../../components/ChatInterface';
import SparkChatIntro from '@/components/loadinginterface';

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null); 

  return (
    <div className="flex h-screen">
      <Sidebar />
      <ChatList onSelectChat={(chat) => setSelectedChat(chat)} />  {/* Pass selected chat to ChatInterface */}
      {selectedChat ? (
        <ChatInterface selectedChat={selectedChat} />
      ) : (
            <SparkChatIntro />
      )}
    </div>
  );
};

export default Chat;
