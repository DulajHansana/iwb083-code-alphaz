"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { WebSocketClient } from '@/server';
import { serverAuthorization } from '@/server/actions';

const WebSocketContext = createContext(null);

export const useWebSocket = () => {
	return useContext(WebSocketContext);
};

export const WebSocketProvider = ({ children }) => {
	const [messageClient, setMessageClient] = useState(null);
	const [readyState, setReadyState] = useState({
		client: false,
		server: false,
	});

	useEffect(() => {
		serverAuthorization().then(res => {
			setReadyState(prevState => ({
				...prevState,
				server: res.accepted
			}))
		})
		const client = new WebSocketClient();

		client.onOpen(() => {
			console.log("Client connected!");
			setReadyState(prevState => ({
				...prevState,
				client: true
			}))
		});

		setMessageClient(client);

		return () => {
			if (client) {
				client.close();
			}
		};
	}, []);

	return (
		<WebSocketContext.Provider value={{ messageClient, readyState }}>
			{children}
		</WebSocketContext.Provider>
	);
};
