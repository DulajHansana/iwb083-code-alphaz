import Image from 'next/image';

export default function Home() {
  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url(/Images/banner.jpg)' }} // Path to your background image
    >
      <div className="text-center">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="/Images/App Logo.png"
            alt="SparkChat Logo"
            className="w-24 h-24"
          />
        </div>

        {/* Title with Custom Color */}
        <h1
          className="text-4xl font-bold mb-2"
          style={{ color: '#433878' }} // Custom color for SparkChat text
        >
          SparkChat
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Ignite your conversations. Fast, simple, and seamless messaging that connects you instantly!
        </p>

        {/* Button with Custom Color */}
        <button
          className="text-white py-3 px-8 rounded-lg transition-all duration-300 ease-in-out"
          style={{ backgroundColor: '#433878' }} // Custom background color
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
