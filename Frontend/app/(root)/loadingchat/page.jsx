import React from 'react';
import Sidebar from '../../../components/Sidebar';
import ChatList from '../../../components/ChatList';

const Chatloading = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <ChatList />
    </div>
  );
};

export default Chatloading;
