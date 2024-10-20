"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { WebSocketClient } from '@/server'; // Assuming this is how WebSocketClient is imported
import { useState, useEffect } from 'react';

export default function Home() {
	const [readyState, setReadyState] = useState(false);
	const router = useRouter();
	let messageClient;

	useEffect(() => {
		messageClient = new WebSocketClient();

		messageClient.onOpen(() => {
			console.log("Client connected!");
			setReadyState(true);
			
		});

		return () => {
			if (messageClient) {
				messageClient.close();
			}
		};
	}, []);

	const handleNavigate = async () => {
		if (readyState) {
			router.push('/sign-in');
		}
	};

	return (
		<div className="flex justify-center items-center h-screen bg-cover bg-center">
			<div className="flex items-center space-x-8 bg-white bg-opacity-70 p-8 rounded-lg">
				<div className="flex justify-center">
					<Image
						src="/images/App Logo.png"
						alt="SparkChat Logo"
						width={128}
						height={128}
						className="w-32 h-32"
					/>
				</div>

				<div className="text-left">
					<h1 className="text-4xl font-bold mb-2" style={{ color: '#433878' }}>
						SparkChat
					</h1>

					<p className="text-gray-600 mb-4 max-w-md">
						Ignite your conversations. Fast, simple, and seamless messaging that connects you instantly!
					</p>

					<button
						className="text-white py-2 px-6 rounded-lg transition-all duration-300 ease-in-out disabled:opacity-70"
						style={{ backgroundColor: '#433878' }}
						onClick={handleNavigate}
						disabled={!readyState} // Button is only enabled when the WebSocket is ready
					>
						Get Started
					</button>
				</div>
			</div>
		</div>
	);
}
