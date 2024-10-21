"use client";
import { createContext, useContext, useState } from 'react';

const MessageContext = createContext();

export const useMessages = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
	const [messages, setMessages] = useState([]);

	const syncMessages = (newMessages) => {
		setMessages(newMessages);
	};

	return (
		<MessageContext.Provider value={{ messages, syncMessages }}>
			{children}
		</MessageContext.Provider>
	);
};
