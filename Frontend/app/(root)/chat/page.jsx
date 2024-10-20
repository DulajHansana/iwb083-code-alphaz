"use client"; 

import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import ChatList from '../../../components/ChatList';
import ChatInterface from '../../../components/ChatInterface';
import SparkChatIntro from '@/components/SparkChatIntro';
import { useWebSocket } from '@/contexts/WebSocketContext';

const Chat = () => {
  let { messageClient, readyState } = useWebSocket();
  const [selectedChat, setSelectedChat] = useState(null);
  const [userMessages, setUserMessages] = useState([]);

  useEffect(() => {
    
    if (readyState.client && readyState.server) {
      //messageClient.sendMessage("usermessage", "Hello Ballerina!");
      messageClient.syncMessages((preMessages, syncingProgress) => { // preMessages has user's old messages, syncingProgress has how much messages are retrieved
        setUserMessages(preMessages);
      })
    } else {
      window.location.href = "/";
      console.log("messageClient is null");
    }
  }, [readyState]);

/*    */

  return (
    <div className="flex h-screen">
      <Sidebar />
      <ChatList onSelectChat={(chat) => setSelectedChat(chat)} userMessages={userMessages} />
      {selectedChat ? (
        <ChatInterface selectedChat={selectedChat} />
      ) : (
            <SparkChatIntro />
      )}
    </div>
  );
};

export default Chat;
