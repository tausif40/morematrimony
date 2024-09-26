import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ContactUs = () => {
	const [ formData, setFormData ] = useState({
		name: "",
		email: "",
		subject: "",
		description: "",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [ e.target.name ]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("/api/contact", formData);
			toast.success("Form submitted successfully!");
			setFormData({
				name: "",
				email: "",
				subject: "",
				description: "",
			});
		} catch (error) {
			toast.error("There was an error submitting the form.");
		}
	};

	return (
		<div id="contactPage" className="flex flex-col justify-center items-center min-h-screen py-10 px-2 md:px-4">

			<h2 className="text-headingGray text-3xl font-medium text-center mb-6">
				Can we help you?
			</h2>

			<form
				onSubmit={handleSubmit}
				className="bg-white p-8 rounded-md shadow-md w-full max-w-2xl border"
			>
				<div className="mb-4">
					<label className=" block text-sm font-medium text-gray-700 ">
						Name <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm outline-none focus:ring-primary focus:border-primary  sm:text-sm"
						placeholder="Enter your full name"
						required
					/>
				</div>
				<div className="mb-4">
					<label className=" block text-sm font-medium text-gray-700">
						Email <span className="text-red-500">*</span>
					</label>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm outline-none focus:ring-primary focus:border-primary  sm:text-sm"
						placeholder="Enter your email"
						required
					/>
					<p className="text-xs text-gray-500 mt-1">
						Please enter the email address where you wish to receive our answer.
					</p>
				</div>
				<div className="mb-4">
					<label className=" block text-sm font-medium text-gray-700">
						Subject <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						name="subject"
						value={formData.subject}
						onChange={handleChange}
						className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm outline-none focus:ring-primary focus:border-primary  sm:text-sm"
						placeholder="Write the subject here"
						required
					/>
				</div>
				<div className="mb-6">
					<label className=" block text-sm font-medium text-gray-700">
						Description <span className="text-red-500">*</span>
					</label>
					<textarea
						name="description"
						value={formData.description}
						onChange={handleChange}
						className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm outline-none focus:ring-primary focus:border-primary  sm:text-sm"
						rows="6"
						placeholder="Write your description here"
						required
					></textarea>
				</div>
				<button
					type="submit"
					className="gradient-btn w-full p-3 text-white font-semibold rounded-md"
				>
					Send
				</button>
			</form>
		</div>
	);
};

export default ContactUs;
