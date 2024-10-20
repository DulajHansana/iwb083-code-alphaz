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
		const checkServerAuthorization = async () => {
			let authorized = false;
			let attempts = 0;
			const maxAttempts = 5;
			while (!authorized && attempts < maxAttempts) {
				const res = await serverAuthorization();
				authorized = res.accepted;
				setReadyState(prevState => ({
					...prevState,
					server: authorized
				}));
				if (!authorized) {
					attempts++;
					await new Promise(resolve => setTimeout(resolve, 3000));
				}
			}
		};

		checkServerAuthorization();
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
