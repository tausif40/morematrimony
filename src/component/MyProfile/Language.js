import React, { useState } from 'react';

const Language = () => {
	const [formData, setFormData] = useState({
		motherTongue: '',
		knownLanguages: '',
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
			[name]: value,
		}));
	};

	return (
		<div className="box-shadow bg-white border rounded-md mx-auto">
			<p className="px-6 py-3 font-medium border-b text-headingGray">Language</p>
			<form className="md:grid grid-cols-2 gap-4 py-4 px-6 text-sm space-y-5 md:space-y-0" onSubmit={handleSubmit}>
				{/* Mother Tongue */}
				<div>
					<label htmlFor="motherTongue" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Mother Tongue</label>
					<input
						type="text"
						id="motherTongue"
						className="input-field"
						placeholder="Mother Tongue"
						name="motherTongue"
						value={formData.motherTongue}
						onChange={handleChange}
						required
					/>
				</div>
				{/* Known Languages */}
				<div>
					<label htmlFor="knownLanguages" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Known Languages</label>
					<select
						id="knownLanguages"
						className="input-field text-text"
						name="knownLanguages"
						value={formData.knownLanguages}
						onChange={handleChange}
						required
					>
						<option value="">Select</option>
						<option value="english">English</option>
						<option value="hindi">Hindi</option>
						<option value="spanish">Spanish</option>
						<option value="french">French</option>
						<option value="other">Other</option>
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

export default Language;
