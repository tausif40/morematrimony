import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from "../../store/auth/auth-slice";
import { maritalStatus } from "../../utils/data/MyProfileData";

const RegistrationForm = () => {
	const dropdownRef = useRef(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [ errors, setErrors ] = useState({});
	const [ agreement, setAgreement ] = useState(false);
	const [ confirmPassword, setConfirmPassword ] = useState();
	const secretKey = process.env.REACT_APP_ENCRYPTION_KEY;
	const { isLoading, error } = useSelector((state) => state.auth);

	// const profiles = [ 'mySelf', 'daughter', 'son', 'sister', 'brother', 'relative', 'friend' ];

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
	}


	const validateDOB = (dob) => {
		const today = new Date();
		const selectedDate = new Date(dob);
		const minAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
		return selectedDate <= minAgeDate;
	};

	const validateForm = () => {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		const newErrors = {};
		if (!formData.onBehalf) newErrors.onBehalf = 'On Behalf is required';
		if (!formData.firstName) newErrors.firstName = 'FirstName is required';
		if (!formData.lastName) newErrors.lastName = 'LastName is required';
		if (!formData.gender) newErrors.gender = 'Gender is required';
		if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';
		if (formData.onBehalf == 'mySelf' && !validateDOB(formData.dateOfBirth)) newErrors.dateOfBirth = 'You must be at least 18 years old.'
		if (!formData.email) newErrors.email = 'Email is required';
		if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format";
		if (!formData.password) newErrors.password = 'Password is required';
		return newErrors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validate form fields
		const newErrors = validateForm();
		setErrors(newErrors);

		if (formData.password.length < 8) {
			setErrors((prevErrors) => ({
				...prevErrors,
				psdLength: 'Password must be at least 8 characters',
			}));
			return;
		}
		if (formData.password !== confirmPassword) {
			setErrors((prevErrors) => ({
				...prevErrors,
				conformPsd: "Passwords don't match!",
			}));
			return;
		}
		if (!agreement) {
			toast('Please accept the agreement!', { icon: '⚠️' });
			return;
		}
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			toast.error('Please correct all highlighted errors!');
			return;
		}
		setErrors({});

		try {

			const result = await dispatch(registerUser(formData));

			if (registerUser.fulfilled.match(result)) {
				const tokens = result?.payload?.tokens;
				console.log(tokens);
				Cookies.set('access_token', tokens.access.token);
				Cookies.set('refresh_token', tokens.refresh.token);

				// toast.success('Registration successful! Redirecting to dashboard...');
				navigate('/dashboard');
			} else {
				console.log(error);
			}
		} catch (error) {
			toast.error('An unexpected error occurred. Please try again later.');
			console.error('Registration error:', error);
		}
	};

	const handelConformPassword = (e) => {
		setConfirmPassword(e.target.value)
		if (formData.password === e.target.value) {
			setErrors((prevErrors) => ({
				...prevErrors,
				conformPsd: '',
			}));
		}
	}

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
						{maritalStatus?.onBehalf?.map((profile, index) => (
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
						type="text"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className={getInputClasses('email')}
						placeholder="example@gmail.com"
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
							onChange={handelConformPassword}
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
						checked={agreement}
						onChange={() => setAgreement(!agreement)}
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
					disabled={isLoading}
				>
					Create Account
				</button>

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
