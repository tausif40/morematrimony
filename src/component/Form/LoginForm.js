import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { loginUser } from '../../store/auth/auth-slice';
import { useDispatch, useSelector } from 'react-redux';
import ForgotPsd from './ForgotPsd';


const LoginForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ passwordError, setPasswordError ] = useState(null);
	const [ emailError, setEmailError ] = useState(null);
	const [ error, setError ] = useState('');
	const [ isLoading, setIsLoading ] = useState(false);
	const [ showForgotPsd, setShowForgotPsd ] = useState(false);
	// const BASE_URL = process.env.REACT_APP_API_URL;
	// BASE_URL  === undefined && console.log('Base url not found');

	const handleLogin = async (e) => {
		// console.log(email, password);
		e.preventDefault();
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (!email) {
			setEmailError("Please enter email")
		} else if (!emailRegex.test(email)) {
			setEmailError("Invalid email format")
			return;
		}
		if (!password) {
			setPasswordError("Please enter Password")
			return;
		} else if (password.length < 8) {
			setPasswordError("Password at least 8 character!")
			toast.error("Password min 8 character!")
			return;
		}

		try {
			setIsLoading(true);
			const loadingToast = toast.loading('Logging...');
			dispatch(loginUser({ email, password }))
				.then((response) => {
					setIsLoading(false);
					const data = response?.payload
					console.log(response);

					if (data?.code === 403) {
						toast.error(("Incorrect email or password"), { id: loadingToast })
					}

					if (data?.user?.isVerifiedEmail === false) {
						navigate('/verify-email', { state: { email: email }, });
						toast(("Please Verify Email"), { icon: '⚠️' });
						toast.dismiss(loadingToast);
					} else if (data?.code === 401) {
						toast.error((data?.message), { id: loadingToast })
						return;
					} else if (data?.user?.isVerifiedEmail === true) {
						Cookies.set('access_token', data?.tokens?.access?.token);
						Cookies.set('refresh_token', data?.tokens?.refresh?.token);
						navigate('/dashboard');
						toast.success(("Login successful!"), { id: loadingToast })
					}
					// toast.dismiss(loadingToast);
				}).catch((error) => {
					console.log(error);
					const errorMessage = error?.response?.data?.message || error?.message || "Login failed.";
					console.log(errorMessage);
					setIsLoading(false);
					toast.error(errorMessage, { id: loadingToast })
				})
		} catch (error) {
			console.error('Login error:', error);
			toast.error('An unexpected error occurred. Please try again later.');
			setIsLoading(false)
		}
	};

	return (
		<>
			{/* {showEmailOtp && <VerifyEmail email={email} />} */}
			{showForgotPsd && <ForgotPsd onClose={setShowForgotPsd} />}
			{/* // <div className="flex items-center justify-center min-h-screen my-10 px-2 md:px-4"> */}
			<div className="px-6 w-full sm:w-auto sm:px-0 sm:min-w-[356px] md:min-w-96">
				<div className="px-6 md:px-8 py-6 rounded-lg shadow-md w-full inset-0 bg-black/60 ">
					<div className='	'>
						<h2 className="text-[1.375rem] text-center text-gold">MEMBER LOGIN</h2>
					</div>

					{/* Email Input */}
					<form onSubmit={handleLogin} className="space-y-4 sm:space-y-8 mt-8" action="">
						<div>
							<label className="block text-sm text-gold text-semibold">Email</label>
							<input
								type="text"
								name='email'
								value={email}
								onChange={(e) => {
									setEmail(e.target.value)
									setError("")
									setEmailError("")
								}}
								placeholder='Enter Email'
								className="mt-1 p-3 block w-full border border-slate-400 outline-none focus:ring-primary focus:border-primary sm:text-sm placeholder:text-slate-700 bg-gray-300/30 rounded-md"
							/>
							{emailError && <p className="text-red-400 text-sm pt-2">{emailError}</p>}
						</div>

						{/* Password Input */}
						<div>
							<label className="block text-sm text-gold text-semibold">Password</label>
							<input
								type="password"
								name='password'
								value={password}
								onChange={(e) => {
									setPassword(e.target.value)
									setError("")
									setPasswordError('')
								}}
								placeholder='Enter Password'
								className="mt-1 p-3 block w-full border border-slate-400 outline-none focus:ring-primary focus:border-primary sm:text-sm placeholder:text-slate-700 bg-gray-300/30 rounded-md"
							/>
							{passwordError && <p className="text-red-400 text-sm pt-2">{passwordError}</p>}
							<div className="text-right mt-2">
								<p className="text-sm text-gold hover:underline">
									<span className='cursor-pointer' onClick={() => setShowForgotPsd(true)}>Forgot Password?</span>
								</p>
							</div>
							{error && <p className="text-red-400 text-sm pt-2">{error}</p>}
						</div>

						{/* Error Message */}

						{/* Login Button */}
						<button
							type="submit"
							className="gradient-btn opacity-70 hover:opacity-85 transition-all rounded-md w-full p-3 font-medium"
							disabled={isLoading}
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
		</>
	);
};

export default LoginForm;
