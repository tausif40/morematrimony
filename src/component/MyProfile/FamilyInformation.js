import React, { useState } from 'react';

const FamilyInformation = () => {
	const [ formData, setFormData ] = useState({
		familyValue: '',
		familyType: '',
		familyStatus: '',
		fatherOccupation: '',
		motherOccupation: '',
		numBrothers: '',
		brothersMarried: '',
		numSisters: '',
		sistersMarried: '',
		familyLocation: 'same',
	});

	const handleSubmit = (e) => {
		e.preventDefault();
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
			<p className="px-6 py-3 font-medium border-b text-headingGray">Family Details</p>
			<form className="md:grid grid-cols-2 gap-4 py-4 px-6 text-sm space-y-5 md:space-y-0" onSubmit={handleSubmit}>

				{/* Family Value */}
				<div>
					<label htmlFor="familyValue" className="block font-medium mb-1 text-headingGray">Family Value</label>
					<select
						id="familyValue"
						className="input-field text-text"
						name="familyValue"
						value={formData.familyValue}
						onChange={handleChange}
						required
					>
						<option value="" disabled>Choose Family Value</option>
						<option value="orthodox">Orthodox</option>
						<option value="traditional">Traditional</option>
						<option value="moderate">Moderate</option>
						<option value="liberal">Liberal</option>
					</select>
				</div>

				{/* Family Type */}
				<div>
					<label htmlFor="familyType" className="block font-medium mb-1 text-headingGray">Family Type</label>
					<select
						id="familyType"
						className="input-field text-text"
						name="familyType"
						value={formData.familyType}
						onChange={handleChange}
						required
					>
						<option value="" disabled>Choose Family Type</option>
						<option value="jointFamily">Joint Family</option>
						<option value="nuclearFamily">Nuclear Family</option>
						<option value="others">Others</option>
					</select>
				</div>

				{/* Family Status */}
				<div>
					<label htmlFor="familyStatus" className="block font-medium mb-1 text-headingGray">Family Status</label>
					<select
						id="familyStatus"
						className="input-field text-text"
						name="familyStatus"
						value={formData.familyStatus}
						onChange={handleChange}
						required
					>
						<option value="" disabled>Choose Family Status</option>
						<option value="middleClass">Middle Class</option>
						<option value="upperMiddleClass">Upper Middle Class</option>
						<option value="highClass">High Class</option>
						<option value="richAffluent">Rich/Affluent</option>
					</select>
				</div>

				{/* Father's Occupation */}
				<div>
					<label htmlFor="fatherOccupation" className="block font-medium mb-1 text-headingGray">Father's Occupation</label>
					<select
						id="fatherOccupation"
						className="input-field text-text"
						name="fatherOccupation"
						value={formData.fatherOccupation}
						onChange={handleChange}
						required
					>
						<option value="" disabled>Select Father's Occupation</option>
						<option value="employed">Employed</option>
						<option value="business">Business</option>
						<option value="retired">Retired</option>
						<option value="other">Other</option>
					</select>
				</div>

				{/* Mother's Occupation */}
				<div>
					<label htmlFor="motherOccupation" className="block font-medium mb-1 text-headingGray">Mother's Occupation</label>
					<select
						id="motherOccupation"
						className="input-field text-text"
						name="motherOccupation"
						value={formData.motherOccupation}
						onChange={handleChange}
						required
					>
						<option value="" disabled>Select Mother's Occupation</option>
						<option value="employed">Employed</option>
						<option value="homemaker">Homemaker</option>
						<option value="retired">Retired</option>
						<option value="other">Other</option>
					</select>
				</div>

				{/* Number of Brothers */}
				<div>
					<label htmlFor="numBrothers" className="block font-medium mb-1 text-headingGray">No. of Brothers</label>
					<select
						id="numBrothers"
						className="input-field text-text"
						name="numBrothers"
						value={formData.numBrothers}
						onChange={handleChange}
						required
					>
						<option value="" disabled>Choose Number</option>
						<option value="0">0</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="more">More than 3</option>
					</select>
				</div>

				{/* Brothers Married */}
				<div>
					<label htmlFor="brothersMarried" className="block font-medium mb-1 text-headingGray">Brothers Married</label>
					<select
						id="brothersMarried"
						className="input-field text-text"
						name="brothersMarried"
						value={formData.brothersMarried}
						onChange={handleChange}
						required
					>
						<option value="" disabled>Select Married Brothers</option>
						<option value="none">None</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="more">More than 2</option>
					</select>
				</div>

				{/* Number of Sisters */}
				<div>
					<label htmlFor="numSisters" className="block font-medium mb-1 text-headingGray">No. of Sisters</label>
					<select
						id="numSisters"
						className="input-field text-text"
						name="numSisters"
						value={formData.numSisters}
						onChange={handleChange}
						required
					>
						<option value="" disabled>Choose Number</option>
						<option value="0">0</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="more">More than 3</option>
					</select>
				</div>

				{/* Sisters Married */}
				<div>
					<label htmlFor="sistersMarried" className="block font-medium mb-1 text-headingGray">Sisters Married</label>
					<select
						id="sistersMarried"
						className="input-field text-text"
						name="sistersMarried"
						value={formData.sistersMarried}
						onChange={handleChange}
						required
					>
						<option value="" disabled>Select Married Sisters</option>
						<option value="none">None</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="more">More than 2</option>
					</select>
				</div>

				{/* Family Location */}
				<div className="col-span-2">
					<label className="block font-medium mb-2 text-headingGray">Family Location</label>
					<div className="flex items-center space-x-4">
						<label className="flex items-center space-x-2">
							<input
								type="radio"
								name="familyLocation"
								value="same"
								checked={formData.familyLocation === 'same'}
								onChange={handleChange}
								required
							/>
							<span>Same as my Location</span>
						</label>
						<label className="flex items-center space-x-2">
							<input
								type="radio"
								name="familyLocation"
								value="different"
								checked={formData.familyLocation === 'different'}
								onChange={handleChange}
								required
							/>
							<span>Different Location</span>
						</label>
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

export default FamilyInformation;