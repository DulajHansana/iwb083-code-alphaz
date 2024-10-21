"use client";
import { useUser } from '@/contexts/UserProfile';
import { handleServerSignup } from '@/server';
import { CircularProgress, Stack } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Signup() {
	const { setLoginUser } = useUser();
	const router = useRouter();
	const [formData, setFormData] = useState({
		fullname: '',
		email: '',
		password: '',
		confirmPassword: ''
	});
	const [errors, setErrors] = useState({});
	const [isHandlingSignup, setIsHandlingSignup] = useState(false);


	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	};

	const validate = () => {
		const newErrors = {};
		if (!formData.fullname) newErrors.fullname = 'Full name is required';
		if (!formData.email) newErrors.email = 'Email is required';
		if (!formData.password) newErrors.password = 'Password is required';
		if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
		return newErrors;
	};

	const handleSignup = () => {
		setIsHandlingSignup(true);
		const validationErrors = validate();
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			setIsHandlingSignup(false);
			return;
		}

		handleServerSignup({
			fullname: formData.fullname,
			email: formData.email,
			password: formData.password
		}).then(res => {
			if (res.code === 202) {
				setLoginUser(res.user);
				router.push('/chat');
				setIsHandlingSignup(false);
			} else if (res.code === 403) {
				router.push('/');
			} else {
				setIsHandlingSignup(false);
				alert(res.message);
			}
		}).catch(err => {
			setIsHandlingSignup(false);
			console.error(err);
		});
	};

	const handleLogin = () => {
		router.push('/sign-in');
	};

	return (
		<div
			className="flex h-screen items-center justify-center bg-cover bg-center"
			style={{
				backgroundImage: 'url(https://img.freepik.com/free-vector/black-white-halftone-pattern-texture-background_84443-21906.jpg?w=740&t=st=1729453875~exp=1729454475~hmac=9fc8b45da11b65d3c844fba99dadbcd78bb6e67aae2289a981ec9bc652113af0)',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
			}}
		>
			<div className="flex w-full max-w-4xl rounded-lg bg-white shadow-lg overflow-hidden">

				<div className="w-1/2 p-8">
					<h1 className="text-4xl font-bold text-customPurple">Create an Account</h1>
					<p className="mt-2 text-gray-600">Join us and ignite your conversations.</p>

					<div className="mt-8 space-y-4">
						<div>
							<label className="block text-sm font-medium text-customPurple">
								Full Name
							</label>
							<input
								type="text"
								name="fullname"
								placeholder="Enter Full Name"
								value={formData.fullname}
								onChange={handleChange}
								className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 outline-none py-2 px-2 w-ful border "
							/>
							{errors.fullname && <p className="text-red-500 text-sm">{errors.fullname}</p>}
						</div>

						<div>
							<label className="block text-sm font-medium text-customPurple">
								Email
							</label>
							<input
								type="email"
								name="email"
								placeholder="Enter Email Here"
								value={formData.email}
								onChange={handleChange}
								className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50  py-2 px-2 w-ful border outline-none"
							/>
							{errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
						</div>

						<div>
							<label className="block text-sm font-medium text-customPurple">
								Password
							</label>
							<input
								type="password"
								name="password"
								value={formData.password}
								onChange={handleChange}
								className="mt-1 w-full tracking-widest rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50  py-2 px-2 w-ful border outline-none"
							/>
							{errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
						</div>

						<div>
							<label className="block text-sm font-medium text-customPurple">
								Confirm Password
							</label>
							<input
								type="password"
								name="confirmPassword"
								value={formData.confirmPassword}
								onChange={handleChange}
								className="mt-1 w-full tracking-widest rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50  py-2 px-2 w-ful border outline-none"
							/>
							{errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
						</div>

						<button className="mt-6 min-h-10 w-full rounded-md bg-customPurple py-2 text-white hover:bg-customPurple/90" onClick={handleSignup}>
							<Stack direction="row" alignItems="center" justifyContent="center" sx={{ minWidth: 100 }}>
								{isHandlingSignup ? <CircularProgress sx={{ ml: 1 }} size={18} color='white' /> : <span>Sign up</span>}
							</Stack>
						</button>

						<div className="mt-4 text-center">
							<span className="text-gray-600">Already have an account? </span>
							<a className="text-purple-600 hover:underline cursor-pointer" onClick={handleLogin}>
								Login
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
