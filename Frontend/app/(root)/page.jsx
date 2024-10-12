"use client"; // Add this at the top to make this a Client Component

import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Use useRouter from next/navigation in the app directory

export default function Home() {
<<<<<<< HEAD
  const router = useRouter(); // Initialize useRouter hook

  const handleNavigate = () => {
    router.push('/sign-in'); // Navigate to the /sign-in route
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url(/Images/banner.jpg)' }} // Path to your background image
    >
      <div className="flex items-center space-x-8 bg-white bg-opacity-70 p-8 rounded-lg">
        {/* Left Section - Logo */}
        <div className="flex justify-center">
          <img
            src="/Images/App Logo.png"
            alt="SparkChat Logo"
            className="w-32 h-32"
          />
        </div>
=======
	return (
		<div
			className="flex justify-center items-center h-screen bg-cover bg-center"
			style={{ backgroundImage: 'url(/Images/banner.jpg)' }} // Path to your background image
		>
			<div className="flex items-center space-x-8 bg-white bg-opacity-70 p-8 rounded-lg">
				{/* Left Section - Logo */}
				<div className="flex justify-center">
					<img
						src="/Images/App Logo.png"
						alt="SparkChat Logo"
						className="w-32 h-32"
					/>
				</div>
>>>>>>> b4b3478965f8d5d98d11bbb8c7507e90dd436752

				{/* Right Section - Title, Description, and Button */}
				<div className="text-left">
					{/* Title */}
					<h1
						className="text-4xl font-bold mb-2"
						style={{ color: '#433878' }} // Custom color for SparkChat text
					>
						SparkChat
					</h1>

					{/* Description */}
					<p className="text-gray-600 mb-4 max-w-md">
						Lorem ipsum dolor sit amet. Eos similique alias est voluptas galisum in eligendi
					</p>

<<<<<<< HEAD
          {/* Button with Custom Color */}
          <button
            className="text-white py-2 px-6 rounded-lg transition-all duration-300 ease-in-out"
            style={{ backgroundColor: '#433878' }} // Custom background color
            onClick={handleNavigate} // Handle button click
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
=======
					{/* Button with Custom Color */}
					<button
						className="text-white py-2 px-6 rounded-lg transition-all duration-300 ease-in-out"
						style={{ backgroundColor: '#433878' }} // Custom background color
					>
						Get Started
					</button>
				</div>
			</div>
		</div>
	);
>>>>>>> b4b3478965f8d5d98d11bbb8c7507e90dd436752
}
