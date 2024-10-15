import React from 'react';
import Sidebar from '../../../components/Sidebar';
import ChatList from '../../../components/ChatList';
import ChatInterface from '../../../components/ChatInterface';

const Chat = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <ChatList />
      <ChatInterface />
    </div>
  );
};

export default Chat;
