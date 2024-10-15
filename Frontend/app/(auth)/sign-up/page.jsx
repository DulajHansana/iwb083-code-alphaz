"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

export default function Signup() {
  const router = useRouter(); // Initialize the router

  const handleLogin = () => {
    router.push('/sign-in'); // Navigate to the login page
  };

  return (
    <div
      className="flex h-screen items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: 'url(/images/bgimage.jpg)', // Replace with your actual image path
        backgroundSize: 'cover', // Ensures the image covers the whole area
        backgroundPosition: 'center', // Centers the image
        backgroundRepeat: 'no-repeat', // Prevents repeating of the image
      }}
    >
      <div className="flex w-full max-w-4xl rounded-lg bg-white shadow-lg overflow-hidden">
        {/* Left Side: Signup Form */}
        <div className="w-1/2 p-8">
          <h1 className="text-4xl font-bold text-customPurple">Create an Account</h1>
          <p className="mt-2 text-gray-600">Join us and ignite your conversations.</p>

          {/* Form */}
          <div className="mt-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-customPurple">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter Full Name"
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-customPurple">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Email Here"
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-customPurple">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password Here"
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-customPurple">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm Password Here"
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
              />
            </div>

            <button className="mt-6 w-full rounded-md bg-customPurple py-2 text-white hover:bg-purple-700">
              Sign Up
            </button>

            <div className="mt-4 text-center">
              <span className="text-gray-600">Already have an account? </span>
              {/* Updated Login button with click handler */}
              <a className="text-purple-600 hover:underline cursor-pointer" onClick={handleLogin}>
                Login
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Brand Info with Purple Background */}
        <div className="relative w-1/2 bg-purple-100 p-8 rounded-tl-[100px] rounded-bl-[100px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Image
                src="/images/App Logo.png" // Placeholder for the logo image
                alt="SparkChat Logo"
                width={80}
                height={80}
                className="mx-auto"
              />
              <h2 className="mt-4 text-3xl font-bold text-customPurple">SparkChat</h2>
              <p className="mt-2 text-lg text-purple-600">Chat, Connect, Spark!</p>
              <p className="mt-4 text-gray-600 text-sm">
                Ignite your conversations. Fast, simple, and seamless messaging that connects you instantly!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
