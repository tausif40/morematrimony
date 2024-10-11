import React, { useState } from 'react';

const ResidencyInformation = () => {
	const [ formData, setFormData ] = useState({
		birthCountry: '',
		residencyCountry: '',
		growUpCountry: '',
		immigrationStatus: '',
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission logic here
		console.log('Form submitted:', formData);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[ name ]: value,
		}));
	};

	return (
		<div className="box-shadow bg-white border rounded-md mx-auto">
			<p className="px-6 py-3 font-medium border-b text-headingGray">Residency Information</p>
			<form className="md:grid grid-cols-2 gap-4 py-4 px-6 text-sm space-y-5 md:space-y-0" onSubmit={handleSubmit}>
				{/* Birth Country */}
				<div>
					<label htmlFor="birthCountry" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Birth Country</label>
					<select
						id="birthCountry"
						className="input-field text-text"
						name="birthCountry"
						value={formData.birthCountry}
						onChange={handleChange}
						required
					>
						<option value="" disabled>Select Birth Country</option>
						<option value="country1">Country 1</option>
						<option value="country2">Country 2</option>
						<option value="country3">Country 3</option>
						{/* Add more countries as needed */}
					</select>
				</div>
				{/* Residency Country */}
				<div>
					<label htmlFor="residencyCountry" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Residency Country</label>
					<select
						id="residencyCountry"
						className="input-field text-text"
						name="residencyCountry"
						value={formData.residencyCountry}
						onChange={handleChange}
						required
					>
						<option value="" disabled>Select Residency Country</option>
						<option value="country1">Country 1</option>
						<option value="country2">Country 2</option>
						<option value="country3">Country 3</option>
						{/* Add more countries as needed */}
					</select>
				</div>
				{/* Grow Up Country */}
				<div>
					<label htmlFor="growUpCountry" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Grow Up Country</label>
					<select
						id="growUpCountry"
						className="input-field text-text"
						name="growUpCountry"
						value={formData.growUpCountry}
						onChange={handleChange}
						required
					>
						<option value="" disabled>Select Grow Up Country</option>
						<option value="country1">Country 1</option>
						<option value="country2">Country 2</option>
						<option value="country3">Country 3</option>
						{/* Add more countries as needed */}
					</select>
				</div>
				{/* Immigration Status */}
				<div>
					<label htmlFor="immigrationStatus" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Immigration Status</label>
					<select
						id="immigrationStatus"
						className="input-field text-text"
						name="immigrationStatus"
						value={formData.immigrationStatus}
						onChange={handleChange}
						required
					>
						<option value="" disabled>Immigration Status</option>
						<option value="country1">st1</option>
						{/* Add more countries as needed */}
					</select>
				</div>

				{/* Submit Button */}
				<div className="col-span-2 flex justify-end mt-4">
					<button type="submit" className="gradient-btn px-4 py-2 rounded-md text-sm">Update</button>
				</div>
			</form>
		</div>
	);
};

export default ResidencyInformation