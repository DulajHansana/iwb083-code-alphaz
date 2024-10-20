"use client";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect } from 'react';
import { useWebSocket } from '@/contexts/WebSocketContext';

export default function Home() {
	let { messageClient, readyState } = useWebSocket();
	const router = useRouter();

	useEffect(() => {
		console.log(readyState);
		if (messageClient) {
		}
	}, [messageClient, readyState]);

	const handleNavigate = async () => {
		if (readyState.client && readyState.server) {
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
						disabled={!(readyState.client && readyState.server)} // Button is only enabled when the WebSocket is ready
					>
						{
							readyState.client && readyState.server ? 'Get Started' : 'Connecting...' 
						}
					</button>
				</div>
			</div>
		</div>
	);
}
