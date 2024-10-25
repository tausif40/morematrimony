import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';

const LoginPage = () => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ error, setError ] = useState('');

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('', {
				email,
				password,
			});
			console.log(response.data);
		} catch (err) {
			setError("Email password does't match");
			toast.error("Email password does't match");
		}
	};

	return (
		// <div className="flex items-center justify-center min-h-screen my-10 px-2 md:px-4">
		<div className="w-80 sm:min-w-[356px] md:min-w-96">
			<div className="px-6 md:px-8 py-6 rounded-lg shadow-md w-full inset-0 bg-black/60 ">
				<div className='	'>
					<h2 className="text-[1.375rem] text-center text-gold">MEMBER LOGIN</h2>
				</div>

				{/* Email Input */}
				<form onSubmit={handleLogin} className="space-y-4 sm:space-y-8 mt-8" action="">
					<div>
						<label className="block text-sm text-gold text-semibold">Email</label>
						<input	
							type="email"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value)
								setError("")
							}}
							required
							placeholder='Enter Email'
							className="mt-1 p-3 block w-full border border-slate-400 outline-none focus:ring-primary focus:border-primary sm:text-sm placeholder:text-slate-700 bg-gray-300/30 rounded-md"
						/>
					</div>

					{/* Password Input */}
					<div>
						<label className="block text-sm text-gold text-semibold">Password</label>
						<input
							type="password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value)
								setError("")
							}}
							required
							placeholder='Enter Password'
							className="mt-1 p-3 block w-full border border-slate-400 outline-none focus:ring-primary focus:border-primary sm:text-sm placeholder:text-slate-700 bg-gray-300/30 rounded-md"
						/>
						<div className="text-right mt-2">
							<a href="#" className="text-sm text-gold hover:underline">
								Forgot Password?
							</a>
						</div>
						{error && <p className="text-red-500 text-sm pt-2">{error}</p>}
					</div>

					{/* Error Message */}

					{/* Login Button */}
					<button
						type="submit"
						className="gradient-btn opacity-70 hover:opacity-85 transition-all rounded-md w-full p-3 font-medium"
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
						<Link to='/register' className="text-gold hover:underline">
							Create an account
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
