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
		<div className="flex items-center justify-center min-h-screen my-10 px-2 md:px-4">
			<div className="bg-white px-6 md:px-8 py-4 rounded-lg shadow-md w-full max-w-md border">
				<h2 className="text-2xl md:text-3xl font-medium text-center text-hotPink">Login to your Account</h2>

				{/* Email Input */}
				<form onSubmit={handleLogin} className="space-y-6 mt-8">
					<div>
						<label className="block text-sm font-medium text-gray-700">Email</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm outline-none focus:ring-primary focus:border-primary sm:text-sm"
						/>
					</div>

					{/* Password Input */}
					<div>
						<label className="block text-sm font-medium text-gray-700">Password</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm outline-none focus:ring-primary focus:border-primary sm:text-sm"
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
						className="w-full p-3 text-white font-semibold bg-gradient-to-r from-pink-500 to-purple-600 rounded-md shadow hover:from-pink-600 hover:to-purple-700 transition-all"
					>
						Login to your Account
					</button>
				</form>

				{/* Social Media Login */}
				<div className="mt-6">
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
				</div>

				{/* Create Account Link */}
				<div className="text-center mt-8">
					<p className="text-sm text-gray-500">
						Don’t have an account?{' '} <br />
						<Link to='/register' className="text-pink-500 hover:underline">
							Create an account
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
