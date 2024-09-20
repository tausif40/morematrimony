import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { TiSocialGooglePlus } from "react-icons/ti";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const RegistrationForm = () => {
	const [ formData, setFormData ] = useState({
		onBehalf: "",
		firstName: "",
		lastName: "",
		gender: "Male",
		dateOfBirth: "",
		email: "",
		password: "",
		confirmPassword: "",
		agree: false,
	});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[ name ]: type === "checkbox" ? checked : value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (formData.password !== formData.confirmPassword) {
			toast.error("Passwords do not match!");
			return;
		}
		try {
			const response = await axios.post("/api/register", formData);
			toast.success("Registration successful!");
			setFormData({
				onBehalf: "",
				firstName: "",
				lastName: "",
				gender: "Male",
				dateOfBirth: "",
				email: "",
				password: "",
				confirmPassword: "",
				agree: false,
			});
		} catch (error) {
			toast.error("Registration failed.");
		}
	};

	return (
		<div className="flex justify-center items-center w-full min-h-screen py-10 px-2 md:px-4">
			<form
				onSubmit={handleSubmit}
				className="bg-white px-4 py-8 md:p-8 rounded-md shadow-md w-full max-w-xl border text-headingGray"
			>
				<h2 className="text-3xl font-medium text-center text-hotPink mb-2">
					Create Your Account
				</h2>
				<p className="text-sm text-center text-headingGray mb-6">
					Fill out the form to get started.
				</p>

				<div className="mb-4">
					<label className="block text-sm font-medium text-headingGray">
						On Behalf
					</label>
					<select
						name="onBehalf"
						value={formData.onBehalf}
						onChange={handleChange}
						className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm outline-none focus:ring-primary focus:border-primary sm:text-sm"
					>
						<option value="">Nothing selected</option>
						<option value="Myself">Myself</option>
						<option value="Someone Else">Someone Else</option>
					</select>
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
							className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm outline-none focus:ring-primary focus:border-primary sm:text-sm"
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
							className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm outline-none focus:ring-primary focus:border-primary sm:text-sm"
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
							className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm outline-none focus:ring-primary focus:border-primary sm:text-sm"
						>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
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
							className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm outline-none focus:ring-primary focus:border-primary sm:text-sm"
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
						className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm outline-none focus:ring-primary focus:border-primary sm:text-sm"
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
							className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm outline-none focus:ring-primary focus:border-primary sm:text-sm"
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
							value={formData.confirmPassword}
							onChange={handleChange}
							className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm outline-none focus:ring-primary focus:border-primary sm:text-sm"
							placeholder="********"
							required
						/>
						<p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
					</div>
				</div>

				<div className="flex items-center mb-6 mt-4">
					<input
						type="checkbox"
						name="agree"
						checked={formData.agree}
						onChange={handleChange}
						className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
						id="termAndCondition"
						required
					/>
					<label for="termAndCondition" className="ml-2 text-sm text-gray-600 cursor-pointer">
						By signing up you agree to our{" "}
						<a href="#" className="text-pink-500 hover:underline">
							terms and conditions
						</a>
						.
					</label>
				</div>

				<button
					type="submit"
					className="w-full p-3 text-white font-semibold bg-gradient-to-r from-pink-500 to-purple-600 rounded-md shadow hover:from-pink-600 hover:to-purple-700 transition-all"
				>
					Create Account
				</button>

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
				</div>

				<div className="text-center mt-8">
					<p className="text-sm text-gray-500">
						Already have an account?{" "} <br />
						<Link to='/login' className="text-hotPink hover:underline">
							Login to your Account
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default RegistrationForm;
