"use client";
import { handleServerLogin } from '@/server';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import LoadingScreen from '/components/LoadingScreen';  // Import the LoadingScreen component

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // Add state to control loading screen

  const handleSignup = () => {
    router.push('/sign-up');
  };

  const handleLogin = () => {
    // Show the loading screen during login processing
    setIsLoading(true);

    handleServerLogin({ username: "Admin", email: "ladmin@localhost", password: "admin" })
      .then(res => {
        if (res.user) {
          // Simulate some delay before navigating to the chat list
          setTimeout(() => {
            router.push('/chat'); // Navigate to chat list after successful login
          }, 2000); // Adjust delay if needed
        } else {
          setIsLoading(false); // Hide the loading screen if login fails
          if (res.code === 403) {
            router.push('/');
          } else {
            alert(res.message);
          }
        }
      })
      .catch(() => {
        setIsLoading(false); // Hide loading screen on error
        alert('Login failed. Please try again.');
      });
  };

  // Show LoadingScreen when isLoading is true
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div
      className="flex h-screen items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: 'url(/images/bgimage.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex w-full max-w-4xl rounded-lg bg-white shadow-lg overflow-hidden">
        <div className="w-1/2 p-8">
          <h1 className="text-4xl font-bold text-customPurple">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Ignite your conversations.</p>

          <div className="mt-8 space-y-4">
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

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-gray-700">Remember me?</span>
              </label>
            </div>

            <button
              className="mt-6 w-full rounded-md bg-customPurple py-2 text-white hover:bg-purple-700"
              onClick={handleLogin}
            >
              Login
            </button>

            <div className="mt-4 text-center">
              <span className="text-gray-600">Don’t have an account? </span>
              <a className="text-purple-600 hover:underline cursor-pointer" onClick={handleSignup}>
                Signup
              </a>
            </div>
          </div>
        </div>

        <div className="relative w-1/2 bg-purple-100 p-8 rounded-tl-[100px] rounded-bl-[100px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Image
                src="/images/App Logo.png"
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
