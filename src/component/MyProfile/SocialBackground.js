import React, { useState } from 'react';

const SocialBackground = () => {
	const [ formData, setFormData ] = useState({
		religion: '',
		caste: '',
		subCaste: '',
		ethnicity: '',
		personalValue: '',
		familyValue: '',
		communityValue: '',
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
			<p className="px-6 py-3 font-medium border-b text-headingGray">Spiritual & Social Background</p>
			<form className="md:grid grid-cols-2 gap-4 py-4 px-6 text-sm space-y-5 md:space-y-0" onSubmit={handleSubmit}>
				{/* Religion */}
				<div>
					<label htmlFor="religion" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Religion</label>
					<select
						id="religion"
						className="input-field text-text"
						name="religion"
						value={formData.religion}
						onChange={handleChange}
						required
					>
						<option value="">Select Religion</option>
						<option value="hindu">Hindu</option>
						<option value="muslim">Muslim</option>
						<option value="christian">Christian</option>
						{/* Add more religions as needed */}
					</select>
				</div>
				{/* Caste */}
				<div>
					<label htmlFor="caste" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Caste</label>
					<select
						id="caste"
						className="input-field text-text"
						name="caste"
						value={formData.caste}
						onChange={handleChange}
						required
					>
						<option value="">Select Caste</option>
						<option value="caste1">Caste 1</option>
						<option value="caste2">Caste 2</option>
						{/* Add more castes as needed */}
					</select>
				</div>
				{/* Sub Caste */}
				<div>
					<label htmlFor="subCaste" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Sub Caste</label>
					<select
						id="subCaste"
						className="input-field text-text"
						name="subCaste"
						value={formData.subCaste}
						onChange={handleChange}
						required
					>
						<option value="">Select Sub Caste</option>
						<option value="subCaste1">Sub Caste 1</option>
						<option value="subCaste2">Sub Caste 2</option>
						{/* Add more sub castes as needed */}
					</select>
				</div>
				{/* Ethnicity */}
				<div>
					<label htmlFor="ethnicity" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Ethnicity</label>
					<select
						id="ethnicity"
						className="input-field text-text"
						name="ethnicity"
						value={formData.ethnicity}
						onChange={handleChange}
						required
					>
						<option value="">Select Ethnicity</option>
						<option value="ethnicity1">Ethnicity 1</option>
						<option value="ethnicity2">Ethnicity 2</option>
						{/* Add more ethnicities as needed */}
					</select>
				</div>
				{/* Personal Value */}
				<div>
					<label htmlFor="personalValue" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Personal Value</label>
					<input
						type="text"
						id="personalValue"
						className="input-field"
						placeholder="Personal Value"
						name="personalValue"
						value={formData.personalValue}
						onChange={handleChange}
						required
					/>
				</div>
				{/* Family Value */}
				<div>
					<label htmlFor="familyValue" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Family Value</label>
					<input
						type="text"
						id="familyValue"
						className="input-field"
						placeholder="Family Value"
						name="familyValue"
						value={formData.familyValue}
						onChange={handleChange}
						required
					/>
				</div>
				{/* Community Value */}
				<div>
					<label htmlFor="communityValue" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Community Value</label>
					<input
						type="text"
						id="communityValue"
						className="input-field"
						placeholder="Community Value"
						name="communityValue"
						value={formData.communityValue}
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

export default SocialBackground;
