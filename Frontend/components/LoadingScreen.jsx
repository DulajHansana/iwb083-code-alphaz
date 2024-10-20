"use client";

import React, { useEffect, useState } from 'react';

// Loading Spinner Component
const LoadingSpinner = () => {
  return (
    <div className="animate-spin mt-8">
      <svg className="w-12 h-12 text-purple-500" fill="none" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        ></path>
      </svg>
    </div>
  );
};

// Main LoadingScreen Component
export default function LoadingScreen({ progressProp }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      if (progress >= 100) {
        setProgress(100);
      } else if (progress == undefined || progress < 0) {
        setProgress(0);
      } else {
        setProgress(progressProp);
      }
      
    }, 500); // Update every 500ms

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <div className="w-full h-screen bg-white flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <img
          src="/images/App Logo.png"
          alt="SparkChat Logo"
          className="w-40 h-40"
        />
        <h2 className="mt-4 text-4xl font-bold text-customPurple">SparkChat</h2>
        <p className="mt-2 text-xl text-purple-500">Loading Chats... {progress}%</p>
      </div>

      {/* Loading Spinner */}
      <LoadingSpinner progress={progress} />
    </div>
  );
}
