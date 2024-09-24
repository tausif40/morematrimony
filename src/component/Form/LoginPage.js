import React, { useState } from 'react';
import axios from 'axios';
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { TiSocialGooglePlus } from "react-icons/ti";
import { Link } from "react-router-dom";

const LoginPage = () => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ error, setError ] = useState('');

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('https://your-api-endpoint.com/login', {
				email,
				password,
			});
			console.log(response.data);
		} catch (err) {
			setError('Login failed. Please try again.');
		}
	};

	return (
		// <div className="flex items-center justify-center min-h-screen my-10 px-2 md:px-4">
		<div className=" ">
			<div className="px-6 md:px-8 py-6 rounded-lg shadow-md w-full inset-0 bg-black/60 ">
				<h2 className="text-xl md:text-2xl font-medium text-center text-hotRed">Login to your Account</h2>

				{/* Email Input */}
				<form onSubmit={handleLogin} className="space-y-6 mt-8">
					<div>
						{/* <label className="block text-sm text-headingGray">Email</label> */}
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							placeholder='Enter Email'
							className="mt-1 px-3 py-2 block w-full border border-slate-300 outline-none focus:ring-primary focus:border-primary sm:text-sm placeholder:text-gray-700 bg-slate-300/40 rounded-md"
						/>
					</div>

					{/* Password Input */}
					<div>
						{/* <label className="block text-sm text-headingGray">Password</label> */}
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							placeholder='Enter Password'
							className="mt-1 px-3 py-2 block w-full border border-slate-300 outline-none focus:ring-primary focus:border-primary sm:text-sm placeholder:text-gray-700 bg-slate-300/50 rounded-md"
						/>
						<div className="text-right mt-2">
							<a href="#" className="text-sm text-primary hover:underline">
								Forgot Password?
							</a>
						</div>
					</div>

					{/* Error Message */}
					{error && <p className="text-red-500 text-sm">{error}</p>}

					{/* Login Button */}
					<button
						type="submit"
						className="gradient-btn opacity-70 rounded-md w-full px-3 py-2 font-medium"
					>
						Login to your Account
					</button>
				</form>

				{/* Social Media Login */}
				{/* <div className="mt-6">
					<div className="flex items-center justify-center my-5">
						<div className="flex-grow h-px bg-gray-300"></div>
						<div className="mx-3 text-sm text-gray-500">Or Login With</div>
						<div className="flex-grow h-px bg-gray-300"></div>
					</div>

					<div className="flex justify-center mt-4 space-x-4">
						<button className="text-[#3b5998] ">
							<FaFacebook size={32} />
						</button>
						<button className="text-white bg-[#e62833] rounded-full">
							<TiSocialGooglePlus size={32} />
						</button>
						<button className="text-[#1da1f2] ">
							<AiFillTwitterCircle size={32} />
						</button>
					</div>
				</div> */}

				{/* Create Account Link */}
				<div className="text-center mt-8">
					<p className="text-sm text-gray-100">
						Don’t have an account?{' '} <br />
						<Link to='/register' className="text-primary hover:underline">
							Create an account
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
