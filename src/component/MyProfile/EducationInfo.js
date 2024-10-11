import React, { useState } from 'react';

const EducationInfo = () => {
	const [ formData, setFormData ] = useState({
		highestEducation: '',
		highestDetails: '',
		college: '',
		other: '',
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
			<p className="px-6 py-3 font-medium border-b text-headingGray">Education Details</p>
			<form className="md:grid grid-cols-2 gap-4 py-4 px-6 text-sm space-y-5 md:space-y-0" onSubmit={handleSubmit}>
				{/* Country */}
				<div>
					<label htmlFor="highestEducation" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Highest Education</label>
					<select
						id="highestEducation"
						className="input-field text-text"
						name="highestEducation"
						value={formData.highestEducation}
						onChange={handleChange}
						required
					>
						<option value="course1">course1</option>
						<option value="course2">course2</option>
					</select>
				</div>
				{/* State */}
				<div>
					<label htmlFor="highestDetails" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Education in Detail</label>
					<input
						type="text"
						id="highestDetails"
						className="input-field"
						placeholder="Education in Detail"
						name="state"
						value={formData.highestDetails}
						onChange={handleChange}
						required
					/>
				</div>
				{/* City */}
				<div>
					<label htmlFor="college" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">College / Institution</label>
					<input
						type="text"
						id="college"
						className="input-field"
						placeholder="College / Institution"
						name="city"
						value={formData.college}
						onChange={handleChange}
						required
					/>
				</div>
				{/* Postal Code */}
				<div>
					<label htmlFor="other" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Other</label>
					<input
						type="text"
						id="other"
						className="input-field"
						placeholder="Other"
						name="postalCode"
						value={formData.other}
						onChange={handleChange}
						required
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

export default EducationInfo