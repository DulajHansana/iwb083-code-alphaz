"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react'; // For managing profile dropdown or modal

const Sidebar = ({ myDetails }) => {
  console.log(myDetails);
  const router = useRouter();
  const [user, setUser] = useState({ // Example user data, replace with actual data fetching logic
    name: "Emma",
    profilePicture: "", // If a profile picture is available
    initials: "E" // Fallback to initials if no picture
  });

  const handleLogout = () => {
    router.push('/sign-in');
  };

  const handleProfileClick = () => {
    router.push('/profile'); // Navigate to the profile page when the profile button is clicked
  };

  return (
    <div className="w-24 bg-purple-600 h-screen flex flex-col items-center p-4">
      <Image src="/images/App Logo.png" alt="App Logo" width={40} height={40} className="object-contain" />

      {/* Profile Section */}
      <button
        onClick={handleProfileClick} 
        className="bg-purple-400 p-4 rounded-full mt-4 flex items-center justify-center w-10 h-10"
        aria-label="Profile"
      >
        {user.profilePicture ? (
          <Image 
            src={user.profilePicture}
            alt="User Profile"
            width={40}
            height={40}
            className="object-cover rounded-full"
          />
        ) : (
          <span className="text-white text-xl font-bold">{user.initials}</span> // Show initials if no profile picture
        )}
      </button>

      {/* Logout Section */}
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
