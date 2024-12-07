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
	// const [ isOpen, setIsOpen ] = useState(false);
	const [ errors, setErrors ] = useState({});
	const [ agreement, setAgreement ] = useState(false);
	const [ confirmPassword, setConfirmPassword ] = useState('');
	const [ selectedProfile, setSelectedProfile ] = useState('');
	const [ profileError, setProfileError ] = useState('');
	// const dispatch = useDispatch();
	const BASE_URL = process.env.REACT_APP_API_URL;
	BASE_URL == undefined && console.log('Base url not found');

	// const { currentUser, loading, error } = useSelector((state) => state.registerUser);

	const profiles = [ 'mySelf', 'daughter', 'son', 'sister', 'brother', 'relative', 'friend' ];

	// const toggleDropdown = () => setIsOpen(!isOpen);

	// const handleSelect = (profile) => {
	// 	setSelectedProfile(profile);
	// 	setIsOpen(false);
	// 	setProfileError('')
	// };

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				// setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const [ formData, setFormData ] = useState({
		onBehalf: "",
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

		if (errors[ name ]) {
			setErrors((prevErrors) => ({
				...prevErrors,
				[ name ]: '',
			}));
		}

		if (formData.password.length > 7) {
			setErrors((prevErrors) => ({
				...prevErrors,
				psdLength: '',
			}));
		}
	};


	const validateDOB = (dob) => {
		const today = new Date();
		const selectedDate = new Date(dob);
		const minAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

		return selectedDate <= minAgeDate;
	};

	const validateForm = () => {
		const newErrors = {};
		if (!formData.onBehalf) newErrors.onBehalf = 'On Behalf is required';
		if (!formData.firstName) newErrors.firstName = 'FirstName is required';
		if (!formData.lastName) newErrors.lastName = 'LastName is required';
		if (!formData.gender) newErrors.gender = 'Gender is required';
		if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';
		if (!validateDOB(formData.dateOfBirth)) newErrors.dateOfBirth = 'You must be at least 18 years old.'
		if (!formData.email) newErrors.email = 'Email is required';
		if (!formData.password) newErrors.password = 'Password is required';
		// if (formData.password.length > 7) newErrors.password = 'Password min 8 characters';
		return newErrors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newErrors = validateForm();
		setErrors(newErrors);

		if (formData.password.length < 7) {
			setErrors((prevErrors) => ({
				...prevErrors,
				psdLength: "Password min 8 characters",
			}));
			return;
		} else if (formData.password !== confirmPassword) {
			setErrors((prevErrors) => ({
				...prevErrors,
				conformPsd: "Passwords does't match!",
			}));
			return;
		} else if (!agreement) {
			toast('Please accept agreement!', {
				icon: '⚠️'
			});
			return;
		}


		// const userData = { ...formData, onBehalf: selectedProfile, }
		// dispatch(registerUser(userData));
		if (Object.keys(newErrors).length == 0) {
			const loadingToast = toast.loading('Registering.....');
			setErrors({});
			console.log(formData);
			await axios.post(`${BASE_URL}/auth/signUp`, formData, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
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
		} else {
			setErrors(newErrors);
			toast.error('Please correct all highlighted errors!');
		}
	};

	const handleLoginPage = () => {
		navigate('/')
		window.scrollTo(0, 0)
	}

	const getInputClasses = (fieldName) => `cursor-pointer flex justify-between items-center mt-1 p-3  w-full rounded-md border border-gray-300 shadow-sm outline-none focus:ring-gold focus:border-gold text-sm ${errors[ fieldName ] && 'border-red-500'}`;

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
				{/* On Behalf */}
				{/* <div className="mb-4">
					<label className="block text-sm font-medium text-headingGray">
						On Behalf
					</label>
					<div className="relative inline-block w-full">
						<div className="cursor-pointer flex justify-between items-center mt-1 p-3  w-full rounded-md border border-gray-300 shadow-sm outline-none hover:ring-gold hover:border-gold text-sm"
							onClick={toggleDropdown}
						>
							<span>{selectedProfile || 'Select Profile'}</span>
							<span><IoIosArrowDown /></span>
						</div>
						{profileError && <p className="text-red-500 text-xs">{profileError}</p>}
						{isOpen && (
							<div className="absolute mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-full hover:ring-gold hover:border-gold">
								<div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4" ref={dropdownRef}>
									{profiles?.map((profile, index) => (
										<div
											key={index}
											className="cursor-pointer hover:bg-gray-100 p-2 text-center"
											onClick={() => handleSelect(profile)}
										>
											{profile.charAt(0).toUpperCase() + profile.slice(1)}
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div> */}
				{/* On Behalf */}

				<div className="mb-4">
					<label htmlFor="onBehalf" className="block text-sm font-medium text-headingGray">
						On Behalf <span className="text-red-500">*</span>
					</label>
					<select
						id="onBehalf"
						className={getInputClasses('onBehalf')}
						name="onBehalf"
						value={formData.onBehalf}
						onChange={handleChange}
					>
						<option value="" disabled>On Behalf</option>
						{profiles?.map((profile, index) => (
							<option key={index} value={profile}>
								{profile.charAt(0).toUpperCase() + profile.slice(1)}
							</option>
						))}
					</select>
					{errors.onBehalf && <p className="text-red-500 text-xs">{errors.onBehalf}</p>}
				</div>

				{/* fist name */}
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
							className={getInputClasses('firstName')}
							placeholder="First Name"
						/>

						{errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
					</div>

					{/* Last Name */}
					<div className="mb-4">
						<label className="block text-sm font-medium">
							Last Name
						</label>
						<input
							type="text"
							name="lastName"
							value={formData.lastName}
							onChange={handleChange}
							className={getInputClasses('lastName')}
							placeholder="Last Name"
						/>
						{errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
					</div>
				</div>
				{/* Gender */}
				<div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4">
					<div className="mb-4">
						<label className="block text-sm font-medium">
							Gender
						</label>
						<select
							name="gender"
							value={formData.gender}
							onChange={handleChange}
							className={getInputClasses('gender')}
						>
							<option>Select Gender</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</select>
						{errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
					</div>

					<div className="mb-4">
						<label className="block text-sm font-medium">
							Date Of Birth
						</label>
						<input
							type="date"
							id="dateOfBirth"
							className={getInputClasses('dateOfBirth')}
							name="dateOfBirth"
							value={formData.dateOfBirth}
							onChange={handleChange}
						/>
						{errors.dateOfBirth && <p className="text-red-500 text-xs">{errors.dateOfBirth}</p>}
					</div>
				</div>

				{/* Email address */}
				<div className="mb-4">
					<label className="block text-sm font-medium">
						Email address
					</label>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className={getInputClasses('email')}
						placeholder="admin@gmail.com"
					/>
					{errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
				</div>

				{/* Password */}
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
							className={getInputClasses('password')}
							placeholder="********"
						/>
						{/* <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p> */}
						{errors.psdLength && <p className="text-red-500 text-xs">{errors.psdLength}</p>}
						{errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
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
							className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm outline-none focus:ring-gold focus:border-gold text-sm"
							placeholder="********"
						/>
						{/* <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p> */}
						{errors.conformPsd && <p className="text-red-500 text-xs">{errors.conformPsd}</p>}
					</div>
				</div>

				{/* term */}
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
