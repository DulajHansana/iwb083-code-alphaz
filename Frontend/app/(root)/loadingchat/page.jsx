import React from 'react';
import Sidebar from '../../../components/Sidebar';
import ChatList from '../../../components/ChatList';
import SparkChatIntro from '../../../components/loadinginterface';


const Chatloading = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <ChatList />
      <SparkChatIntro />
    </div>
  );
};

export default Chatloading;
