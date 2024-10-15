"use client";
import { useState } from "react";
import Image from 'next/image';

export default function ChatInterface() {
	const [messages, setMessages] = useState([
		{ text: 'Hi, Welcome!', sender: 'other', time: new Date().toLocaleTimeString() },
		{ text: 'How are you? All OK??', sender: 'other', time: new Date().toLocaleTimeString() },
		{ text: 'Hi, All OK!!!!!!!', sender: 'self', time: new Date().toLocaleTimeString() }
	]);
	const [input, setInput] = useState('');
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleSendMessage = () => {
		if (input.trim() !== '') {
			const currentTime = new Date().toLocaleTimeString();
			setMessages([...messages, { text: input, sender: 'self', time: currentTime }]);
			setInput('');
		}
	};

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<div className="w-3/4 p-4 bg-white h-screen flex flex-col">
			<div className="flex items-center justify-between p-4 bg-white shadow-sm relative">
				<div className="flex items-center space-x-2">
					<Image src="/images/avatar4.png" alt="Avatar" className="w-8 h-8 rounded-full" width={32} height={32} />
					<h2 className="text-purple-700 font-bold">SparkChat 3</h2>
				</div>
				<div className="relative">
					<button onClick={toggleMenu} className="p-2">
						<Image src="/images/menu-icon.png" alt="Menu" className="w-5 h-5" width={20} height={20} />
					</button>

					{isMenuOpen && (
						<div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-10">
							<ul className="py-2">
								<li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
									<Image src="/images/archive.png" alt="Archive" className="w-4 h-4 mr-2" width={16} height={16} />
									<span className="text-customPurple">Archive</span>
								</li>
								<li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
									<Image src="/images/delete.png" alt="Delete" className="w-4 h-4 mr-2" width={16} height={16} />
									<span className="text-gray-700">Delete</span>
								</li>
							</ul>
						</div>
					)}
				</div>
			</div>

			<div className="flex-1 overflow-y-auto p-4">
				<div className="flex flex-col space-y-2">
					{messages.map((message, index) => (
						<div
							key={index}
							className={`p-4 rounded-lg w-max ${message.sender === 'self' ? 'bg-purple-400 text-white self-end' : 'bg-purple-100'}`}
						>
							{message.text}
							<p className="text-xs text-gray-500 mt-1 text-right">
								{message.time}
							</p>
						</div>
					))}
				</div>
			</div>

			<div className="p-4 bg-gray-100 flex items-center rounded-lg shadow-md">
				<input
					className="flex-1 p-3 rounded-full bg-white border border-gray-300 placeholder-gray-500"
					type="text"
					placeholder="Type your message here..."
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<button className="ml-2 p-2 bg-purple-600 text-white rounded-full" onClick={handleSendMessage}>
					<Image src="/images/send.png" alt="Send" className="w-6 h-6" width={24} height={24} />
				</button>
			</div>
		</div>
	);
}
