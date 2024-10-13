"use client"; // Mark this component as a client component

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

const Profile = () => {
  const router = useRouter(); // Initialize useRouter

  // Function to handle logout and navigate back to sign-in page
  const handleLogout = () => {
    router.push('/sign-in'); // Navigate to the sign-in page (adjust the route if needed)
  };

  // Function to handle edit action (e.g., open edit dialog)
  const handleEdit = () => {
    console.log("Edit action triggered");
  };

  // Function to handle camera/upload action (e.g., open file input)
  const handleUpload = () => {
    console.log("Upload action triggered");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-purple-700 text-white w-1/5 flex flex-col items-center py-8">
        {/* Profile Icon */}
        <div className="mb-6">
          <Image
            src="/images/App Logo.png" // Adjust this image path to your profile icon
            alt="Profile Icon"
            width={100}
            height={100}
          />
        </div>
        <div className="text-xl mb-8">Profile</div>

        {/* Logout Button */}
        <div className="mt-auto mb-6">
          <button onClick={handleLogout} className="focus:outline-none">
            <Image
              src="/images/logout.png" // Adjust this image path to your logout icon
              alt="Logout Icon"
              width={45}
              height={45}
            />
          </button>
        </div>
        <div className="text-xl">Logout</div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex">
        {/* Left Section: Profile Form */}
        <div className="w-1/2 p-10">
          <h1 className="text-3xl font-bold text-customPurple mb-6">Profile</h1>

          {/* Profile Picture */}
          <div className="relative w-24 h-24 mb-6">
            <div className="bg-gray-200 w-full h-full rounded-full flex justify-center items-center text-4xl text-blue-500">
              E
            </div>
            {/* Camera Icon for Upload as Button */}
            <button onClick={handleUpload} className="absolute right-0 bottom-0 bg-white p-1 rounded-full focus:outline-none">
              <Image
                src="/images/camera.png" // Adjust this image path to your camera icon
                alt="Upload Profile"
                width={20}
                height={20}
              />
            </button>
          </div>

          {/* Display Name Input */}
          <div className="mb-4">
            <label className="block text-lg text-customPurple">Display name</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Name Here"
                className="mt-2 w-full p-4 border border-gray-300 rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-lg text-customPurple">Email</label>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter Email Here"
                className="mt-2 w-full p-4 border border-gray-300 rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
              {/* Edit Email Icon as Button */}
              <button onClick={handleEdit} className="absolute right-4 top-1/2 transform -translate-y-1/2 focus:outline-none">
                <Image
                  src="/images/editing.png" // Adjust this image path to your edit icon
                  alt="Edit Email"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="bg-customPurple text-white px-6 py-2 rounded-full">
              Save Changes
            </button>
            <button className="border border-customPurple text-customPurple px-6 py-2 rounded-full">
              Reset Changes
            </button>
          </div>
        </div>

        {/* Right Section: SparkChat Information */}
        <div className="w-1/2 bg-gray-100 flex flex-col justify-center items-center p-10">
          <Image
            src="/images/App Logo.png" // Adjust this image path to your app logo
            alt="SparkChat Logo"
            width={200}
            height={200}
          />
          <h2 className="mt-4 text-4xl font-bold text-customPurple">SparkChat</h2>
          <p className="mt-2 text-xl text-purple-500">Chat, Connect, Spark!</p>
          <p className="mt-6 text-xl text-gray-500 text-center">
            Ignite your conversations. Fast, simple, and seamless messaging that connects you instantly!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
