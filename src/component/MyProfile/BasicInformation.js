import React, { useState } from 'react';

const BasicInformationForm = () => {
	const [ formData, setFormData ] = useState({
		firstName: '',
		lastName: '',
		dateOfBirth: '',
		gender: '',
		phoneNumber: '',
		onBehalf: '',
		maritalStatus: '',
		numberOfChildren: '',
		photo: null,
		country: '',
		state: '',
		city: '',
		postalCode: '',
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission logic here
		console.log('Form submitted:', formData);
	};

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		if (name === "photo") {
			setFormData((prevFormData) => ({
				...prevFormData,
				[ name ]: files[ 0 ],
			}));
		} else {
			setFormData((prevFormData) => ({
				...prevFormData,
				[ name ]: value,
			}));
		}
	};

	return (
		<div className="box-shadow bg-white border rounded-md mx-auto">
			<p className="px-6 py-3 font-medium border-b text-headingGray">Basic Information</p>
			<form className="md:grid grid-cols-2 gap-4 py-4 px-6 text-sm space-y-5 md:space-y-0" onSubmit={handleSubmit}>
				{/* First Name */}
				<div>
					<label htmlFor="firstName" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">First Name</label>
					<input
						type="text"
						id="firstName"
						className="input-field"
						placeholder="First Name"
						name="firstName"
						value={formData.firstName}
						onChange={handleChange}
						required
					/>
				</div>
				{/* Last Name */}
				<div>
					<label htmlFor="lastName" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Last Name</label>
					<input
						type="text"
						id="lastName"
						className="input-field"
						placeholder="Last Name"
						name="lastName"
						value={formData.lastName}
						onChange={handleChange}
						required
					/>
				</div>
				{/* Date of Birth */}
				<div>
					<label htmlFor="dateOfBirth" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Date of Birth</label>
					<input
						type="date"
						id="dateOfBirth"
						className="input-field text-text"
						name="dateOfBirth"
						value={formData.dateOfBirth}
						onChange={handleChange}
						required
					/>
				</div>
				{/* Gender */}
				<div>
					<label htmlFor="gender" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Gender</label>
					<select
						id="gender"
						className="input-field text-text"
						name="gender"
						value={formData.gender}
						onChange={handleChange}
						required
					>
						<option value="">Select</option>
						<option value="male">Male</option>
						<option value="female">Female</option>
						<option value="other">Other</option>
					</select>
				</div>
				{/* Phone Number */}
				<div>
					<label htmlFor="phoneNumber" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Phone Number</label>
					<input
						type="tel"
						id="phoneNumber"
						className="input-field"
						placeholder="Phone Number"
						name="phoneNumber"
						value={formData.phoneNumber}
						onChange={handleChange}
						required
					/>
				</div>
				{/* On Behalf */}
				<div>
					<label htmlFor="onBehalf" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">On Behalf</label>
					<select
						id="onBehalf"
						className="input-field text-text"
						name="onBehalf"
						value={formData.onBehalf}
						onChange={handleChange}
						required
					>
						<option value="">Select</option>
						<option value="myself">Myself</option>
						<option value="someoneElse">Someone Else</option>
					</select>
				</div>
				{/* Marital Status */}
				<div>
					<label htmlFor="maritalStatus" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Marital Status</label>
					<select
						id="maritalStatus"
						className="input-field text-headingGray"
						name="maritalStatus"
						value={formData.maritalStatus}
						onChange={handleChange}
						required
					>
						<option value="" disabled>Select</option>
						<option value="single">Single</option>
						<option value="married">Married</option>
						<option value="divorced">Divorced</option>
						<option value="widowed">Widowed</option>
					</select>
				</div>
				{/* Number of Children */}
				<div>
					<label htmlFor="numberOfChildren" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Number of Children</label>
					<input
						type="number"
						id="numberOfChildren"
						className="input-field"
						name="numberOfChildren"
						value={formData.numberOfChildren}
						onChange={handleChange}
						required
					/>
				</div>
				{/* Photo */}
				<div className="col-span-2">
					<label htmlFor="photo" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Photo</label>
					<input
						type="file"
						id="photo"
						className="input-field"
						accept="image/*"
						name="photo"
						onChange={handleChange}
					/>
				</div>

				{/* Submit Button */}
				<div className="col-span-2 flex justify-end mt-4">
					<button type="submit" className="gradient-btn px-4 py-2 rounded-md text-sm">Update</button>
				</div>
			</form>
		</div>
	);
};

export default BasicInformationForm;
