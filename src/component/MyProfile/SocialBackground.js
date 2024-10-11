import React, { useState } from 'react';

const SocialBackground = () => {
	const [ formData, setFormData ] = useState({
		religion: '',
		caste: '',
		subCaste: '',
		ethnicity: '',
		star: '',
		moon: '',
		zodiac: '',
		birthTime: '',
		birthPlace: [ '', '', '' ],
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
					<label htmlFor="star" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Star</label>
					<select
						id="star"
						className="input-field text-text"
						name="star"
						value={formData.star}
						onChange={handleChange}
						required
					>
						<option value="">Select star</option>
						<option value="ethnicity1">star 1</option>
						<option value="ethnicity2">star 2</option>
						{/* Add more ethnicities as needed */}
					</select>
				</div>
				{/* Family Value */}
				<div>
					<label htmlFor="moon" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Raasi / Moon Sign</label>
					<select
						id="moon"
						className="input-field text-text"
						name="moon"
						value={formData.moon}
						onChange={handleChange}
						required
					>
						<option value="">Select moon</option>
						<option value="ethnicity1">moon 1</option>
						<option value="ethnicity2">moon 2</option>
						{/* Add more ethnicities as needed */}
					</select>
				</div>
				{/* Community Value */}
				<div>
					<label htmlFor="zodiac" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Zodiac/star sign</label>
					<select
						id="zodiac"
						className="input-field text-text"
						name="zodiac"
						value={formData.zodiac}
						onChange={handleChange}
						required
					>
						<option value="">Select zodiac</option>
						<option value="ethnicity1">zodiac 1</option>
						<option value="ethnicity2">zodiac 2</option>
						{/* Add more ethnicities as needed */}
					</select>
				</div>

				<div>
					<label htmlFor="birthTime" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Time Of Birth</label>
					<input
						type="time"
						id="birthTime"
						className="input-field"
						name="birthTime"
						value={formData.birthTime}
						onChange={handleChange}
						placeholder="Time of birth"
					/>
				</div>

				<div className='col-span-2'>
					<label htmlFor="birthPlace" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Place Of Birth</label>
					<div className='p-2 border rounded-md flex gap-4'>
						<select
							id="birthCountry"
							className="input-field text-text"
							name="birthPlace"
							value={formData.birthPlace[ 0 ]}  // Use index 0 for Country
							onChange={(e) => handleChange(e, 0)}  // Pass index 0
							required
						>
							<option value="">Country</option>
							<option value="Country 1">Country 1</option>
							<option value="Country 2">Country 2</option>
						</select>
						{/* State */}
						<select
							id="birthState"
							className="input-field text-text"
							name="birthPlace"
							value={formData.birthPlace[ 1 ]}  // Use index 1 for State
							onChange={(e) => handleChange(e, 1)}  // Pass index 1
							required
						>
							<option value="">State</option>
							<option value="State 1">State 1</option>
							<option value="State 2">State 2</option>
						</select>
						{/* City */}
						<select
							id="birthCity"
							className="input-field text-text"
							name="birthPlace"
							value={formData.birthPlace[ 2 ]}  // Use index 2 for City
							onChange={(e) => handleChange(e, 2)}  // Pass index 2
							required
						>
							<option value="">City</option>
							<option value="City 1">City 1</option>
							<option value="City 2">City 2</option>
						</select>
					</div>
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
