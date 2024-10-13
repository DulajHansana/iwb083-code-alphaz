import React from 'react';
import Sidebar from './components/Sidebar';
import ChatList from './components/ChatList';
import ChatInterface from './components/ChatInterface';

const Chat = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar section */}
      <Sidebar />
      
      {/* Chat list section */}
      <ChatList />
      
      {/* Chat interface section */}
      <ChatInterface />
    </div>
  );
};

export default Chat;
