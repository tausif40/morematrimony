import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import Cookies from 'js-cookie';
// import { useDispatch } from "react-redux";
// import { registerUser } from "../../store/auth/userRegister-slicer2";
// import { useSelector } from "react-redux";

const RegistrationForm = () => {
	const dropdownRef = useRef(null);
	const navigate = useNavigate();
	const [ isOpen, setIsOpen ] = useState(false);
	const [ agreement, setAgreement ] = useState(false);
	const [ confirmPassword, setConfirmPassword ] = useState('');
	const [ selectedProfile, setSelectedProfile ] = useState('');
	// const dispatch = useDispatch();
	const URL = process.env.REACT_APP_BASE_URL || "https://morematrimony.onrender.com";

	// const { currentUser, loading, error } = useSelector((state) => state.registerUser);

	const profiles = [ 'mySelf', 'daughter', 'son', 'sister', 'brother', 'relative', 'friend' ];

	const toggleDropdown = () => setIsOpen(!isOpen);

	const handleSelect = (profile) => {
		setSelectedProfile(profile);
		setIsOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const [ formData, setFormData ] = useState({
		firstName: "",
		lastName: "",
		gender: "",
		dateOfBirth: "",
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[ name ]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (formData.password !== confirmPassword) {
			toast.error("Passwords do not match!");
			return;
		} else if (!agreement) {
			toast('Please accept agreement!', {
				icon: '⚠️'
			});
			return;
		}

		const userData = { ...formData, onBehalf: selectedProfile, }
		// console.log(userData);
		const loadingToast = toast.loading('Logging.....');

		// dispatch(registerUser(userData));
		await axios.post(`${URL}/auth/signUp`, userData)
			.then((response) => {
				console.log(response);
				Cookies.set('access_token', response.data.tokens.access.token);
				Cookies.set('refresh_token', response.data.tokens.refresh.token);
				navigate('/dashboard')
				new Promise((resolve) => setTimeout(resolve, 2000));
				toast.success(("Registration successful!"), { id: loadingToast })

				setFormData({
					firstName: "",
					lastName: "",
					gender: "",
					dateOfBirth: "",
					email: "",
					password: "",
					confirmPassword: "",
				});

			}).catch((error) => {
				console.log(error);
				new Promise((resolve) => setTimeout(resolve, 2000));
				toast.error((error.response.data.message || error.message || "Registration failed."), { id: loadingToast })
			})
	};

	const handleLoginPage = () => {
		navigate('/')
		window.scrollTo(0, 0)
	}

	return (
		<div className="flex justify-center items-center w-full min-h-screen py-10 px-2 md:px-4">
			<form
				onSubmit={handleSubmit}
				className="bg-white px-4 py-8 md:p-8 rounded-md shadow-md w-full max-w-xl border text-headingGray"
			>
				<h2 className="text-3xl font-medium text-center text-primary mb-2">
					Create Your Account
				</h2>
				<p className="text-sm text-center text-headingGray mb-6">
					Fill out the form to get started.
				</p>

				<div className="mb-4">
					<label className="block text-sm font-medium text-headingGray">
						On Behalf
					</label>
					<div className="relative inline-block w-full">
						<div className="cursor-pointer flex justify-between items-center mt-1 p-3  w-full rounded-md border border-gray-300 shadow-sm outline-none hover:ring-primary hover:border-primary text-sm"
							onClick={toggleDropdown}
						>
							<span>{selectedProfile || 'Select Profile'}</span>
							<span><IoIosArrowDown /></span>
						</div>

						{isOpen && (
							<div className="absolute mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-full hover:ring-primary hover:border-primary">
								<div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4" ref={dropdownRef}>
									{profiles.map((profile, index) => (
										<div
											key={index}
											className="cursor-pointer hover:bg-gray-100 p-2 text-center"
											onClick={() => handleSelect(profile)}
										>
											{profile}
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
					<div className="mb-4">
						<label className="block text-sm font-medium">
							First Name
						</label>
						<input
							type="text"
							name="firstName"
							value={formData.firstName}
							onChange={handleChange}
							className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm outline-none focus:ring-primary focus:border-primary text-sm"
							placeholder="First Name"
							required
						/>
					</div>

					<div className="mb-4">
						<label className="block text-sm font-medium">
							Last Name
						</label>
						<input
							type="text"
							name="lastName"
							value={formData.lastName}
							onChange={handleChange}
							className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm outline-none focus:ring-primary focus:border-primary text-sm"
							placeholder="Last Name"
							required
						/>
					</div>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4">
					<div className="mb-4">
						<label className="block text-sm font-medium">
							Gender
						</label>
						<select
							name="gender"
							value={formData.gender}
							onChange={handleChange}
							className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm outline-none focus:ring-primary focus:border-primary text-sm"
						>
							<option>Select Gender</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</select>
					</div>

					<div className="mb-4">
						<label className="block text-sm font-medium">
							Date Of Birth
						</label>
						<input
							type="date"
							name="dateOfBirth"
							value={formData.dateOfBirth}
							onChange={handleChange}
							className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm outline-none focus:ring-primary focus:border-primary text-sm"
							required
						/>
					</div>
				</div>

				<div className="mb-4">
					<label className="block text-sm font-medium">
						Email address
					</label>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm outline-none focus:ring-primary focus:border-primary text-sm"
						placeholder="admin@gmail.com"
						required
					/>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4">
					<div className="mb-4">
						<label className="block text-sm font-medium">
							Password
						</label>
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm outline-none focus:ring-primary focus:border-primary text-sm"
							placeholder="********"
							required
						/>
						<p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
					</div>

					<div className="mb-4">
						<label className="block text-sm font-medium">
							Confirm password
						</label>
						<input
							type="password"
							name="confirmPassword"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm outline-none focus:ring-primary focus:border-primary text-sm"
							placeholder="********"
							required
						/>
						<p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
					</div>
				</div>

				<div className="flex items-center mb-6 mt-4">
					<input
						type="checkbox"
						onChange={() => setAgreement(true)}
						className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
						id="termAndCondition"
					/>
					<label htmlFor="termAndCondition" className="ml-2 text-sm text-gray-600 cursor-pointer">
						By signing up you agree to our{" "}
						<a href="#" className="text-primary hover:underline">
							terms and conditions
						</a>
						.
					</label>
				</div>

				<button
					type="submit"
					className="gradient-btn w-full p-3 text-white font-semibold rounded-md"
				>
					Create Account
				</button>
				{/* 
				<div className="flex items-center justify-center my-5">
					<div className="flex-grow h-px bg-gray-300"></div>
					<div className="mx-3 text-sm text-gray-500">Or Join With</div>
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
				</div> */}

				<div className="text-center mt-8">
					<p className="text-sm text-gray-500">
						Already have an account?{" "} <br />
						<p className="text-primary hover:underline cursor-pointer" onClick={handleLoginPage}>
							Login to your Account
						</p>
					</p>
				</div>
			</form>
		</div>
	);
};

export default RegistrationForm;
