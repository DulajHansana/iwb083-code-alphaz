"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Sidebar from '../../../components/Sidebar';
import { useUser } from '@/contexts/UserProfile';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';

const Profile = () => {
    const { user } = useUser();
    const router = useRouter();
    const fileInputRef = useRef(null);

    
    const [displayName, setDisplayName] = useState("");
    const [tagName, setTagName] = useState("");
    const [email, setEmail] = useState("");
    const [profileImage, setProfileImage] = useState(null);

    const handlechat = () => {
        router.push('/chat'); 
    };

    const handleUpload = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (user.id) {
            setDisplayName(user.fullname);
            setTagName(user.tagname);
            setEmail(user.email);
            setProfileImage(user.avatar);
        }
    }, [user])

    const handleReset = () => {
        setDisplayName(user.fullname);
        setTagName(user.tagname);
        setEmail(user.email);
        setProfileImage(user.avatar);
    };

    return (
        <div className="flex h-screen">
            <Sidebar profile={user} />

            <div className="flex-grow flex">
                <div className="w-1/2 p-10 bg-gray-100">
                    <h1 className="text-3xl font-bold text-customPurple mb-6">Profile</h1>

                    <div className="relative w-24 h-24 mb-6">
                        {profileImage ? (
                            <Image
                                src={profileImage}
                                alt="Profile"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-full"
                            />
                        ) : (
                            <div className="bg-gray-200 w-full h-full rounded-full flex justify-center items-center text-4xl text-blue-500">
                                {displayName.charAt(0).toUpperCase()}
                            </div>
                        )}
                        {/* <button onClick={handleUpload} className="absolute flex items-center justify-center border-2 border-gray-100 right-0 bottom-0 w-8 h-8 bg-gray-100 p-1 rounded-full focus:outline-none">
                            <CameraAltOutlinedIcon sx={{ width: 20, height: 20, opacity: 0.7 }} />
                        </button> */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg text-customPurple">Tag Name</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={tagName}
                                onChange={(e) => setTagName(e.target.value)}
                                placeholder="Enter tag name here"
                                className="mt-2 w-full p-4 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-500"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg text-customPurple">Display Name</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                placeholder="Enter display name here"
                                className="mt-2 w-full p-4 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-500"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg text-customPurple">Email</label>
                        <div className="relative">
                            <input
                                type="email"
                                value={email}
                                disabled={true}
                                className="mt-2 w-full p-4 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-500"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 mt-6">
                        <button onClick={handlechat} className="bg-customPurple text-white px-6 py-2 rounded-lg">
                            Save Changes
                        </button>
                        <button onClick={handleReset} className="border border-customPurple text-customPurple px-6 py-2 rounded-lg">
                            Reset Changes
                        </button>
                        <button onClick={() => { router.push('/chat') }} className="border border-customPurple text-customPurple px-6 py-2 rounded-lg">
                            Go Back
                        </button>
                    </div>
                </div>

                <SnackbarProvider maxSnack={1} autoHideDuration={3000} anchorOrigin={{ horizontal: 'center', vertical: 'top' }} />


                <div className="w-1/2 flex flex-col justify-center items-center p-10">
                    <Image
                        src="/images/App Logo.png"
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
