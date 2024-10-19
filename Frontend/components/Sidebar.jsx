"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation'; 

const Sidebar = () => {
	const router = useRouter(); 

	const handleLogout = () => {
		router.push('/sign-in'); 
	};

	return (
		<div className="w-24 bg-purple-600 h-screen flex flex-col items-center p-4">
			<Image src="/images/App Logo.png" alt="App Logo" width={40} height={40} className="object-contain" />

			<div className="bg-purple-400 p-4 rounded-full mt-4 flex items-center justify-center w-10 h-10">
				<span className="text-white text-xl font-bold">E</span>
			</div>

			<div className="mt-auto flex flex-col items-center">
				<div className="bg-blue-500 p-2 rounded-lg cursor-pointer" onClick={handleLogout}>
					<Image src="/images/logout.png" alt="Logout" width={24} height={24} className="object-contain" />
				</div>
				<span className="text-white mt-2">Logout</span>
			</div>
		</div>
	);
};

export default Sidebar;
