import React, { useState } from 'react';

const PartnerExpectation = () => {
	const [ formData, setFormData ] = useState({
		generalRequirement: '',
		residenceCountry: '',
		minHeight: '',
		height: '',
		maxWeight: '',
		weight: '',
		maritalStatus: '',
		childrenAcceptable: '',
		religion: '',
		caste: '',
		subCaste: '',
		language: '',
		education: '',
		profession: '',
		smokingAcceptable: '',
		drinkingAcceptable: '',
		dietingAcceptable: '',
		bodyType: '',
		personalValue: '',
		manglik: '',
		preferredCountry: '',
		preferredState: '',
		familyValue: '',
		complexion: '',
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
			<p className="px-6 py-3 font-medium border-b text-headingGray">Partner Expectation</p>
			<form className="md:grid grid-cols-2 gap-4 py-4 px-6 text-sm space-y-5 md:space-y-0" onSubmit={handleSubmit}>
				{/* General Requirement */}
				<div>
					<label htmlFor="generalRequirement" className="block font-medium mb-1 mt-1 text-headingGray">General Requirement</label>
					<input
						type="text"
						id="generalRequirement"
						className="input-field"
						placeholder="General Requirement"
						name="generalRequirement"
						value={formData.generalRequirement}
						onChange={handleChange}
						required
					/>
				</div>
				{/* Residence Country */}
				<div>
					<label htmlFor="residenceCountry" className="block font-medium mb-1 mt-1 text-headingGray">Residence Country</label>
					<input
						type="text"
						id="residenceCountry"
						className="input-field"
						placeholder="Residence Country"
						name="residenceCountry"
						value={formData.residenceCountry}
						onChange={handleChange}
						required
					/>
				</div>
				{/* Min Height */}
				<div>
					<label htmlFor="minHeight" className="block font-medium mb-1 mt-1 text-headingGray">Min Height (In Feet)</label>
					<input
						type="text"
						id="minHeight"
						className="input-field"
						placeholder="Min Height"
						name="minHeight"
						value={formData.minHeight}
						onChange={handleChange}
						required
					/>
				</div>
				{/* Max Weight */}
				<div>
					<label htmlFor="maxWeight" className="block font-medium mb-1 mt-1 text-headingGray">Max Weight (In Kg)</label>
					<input
						type="text"
						id="maxWeight"
						className="input-field"
						placeholder="Max Weight"
						name="maxWeight"
						value={formData.maxWeight}
						onChange={handleChange}
						required
					/>
				</div>
				{/* Height */}
				<div>
					<label htmlFor="height" className="block font-medium mb-1 mt-1 text-headingGray">Height</label>
					<input
						type="text"
						id="height"
						className="input-field"
						placeholder="Height"
						name="height"
						value={formData.height}
						onChange={handleChange}
						required
					/>
				</div>
				{/* Weight */}
				<div>
					<label htmlFor="weight" className="block font-medium mb-1 mt-1 text-headingGray">Weight</label>
					<input
						type="text"
						id="weight"
						className="input-field"
						placeholder="Weight"
						name="weight"
						value={formData.weight}
						onChange={handleChange}
						required
					/>
				</div>
				{/* Marital Status */}
				<div>
					<label htmlFor="maritalStatus" className="block font-medium mb-1 mt-1 text-headingGray">Marital Status</label>
					<select
						id="maritalStatus"
						className="input-field text-text"
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
				{/* Children Acceptable */}
				<div>
					<label htmlFor="childrenAcceptable" className="block font-medium mb-1 mt-1 text-headingGray">Children Acceptable</label>
					<input
						type="text"
						id="childrenAcceptable"
						className="input-field"
						placeholder="Children Acceptable"
						name="childrenAcceptable"
						value={formData.childrenAcceptable}
						onChange={handleChange}
						required
					/>
				</div>
				{/* Religion */}
				<div>
					<label htmlFor="religion" className="block font-medium mb-1 mt-1 text-headingGray">Religion</label>
					<select
						id="religion"
						className="input-field text-text"
						name="religion"
						value={formData.religion}
						onChange={handleChange}
						required
					>
						<option value="" disabled>Select</option>
						{/* Add religion options as needed */}
						<option value="hindu">Hindu</option>
						<option value="muslim">Muslim</option>
						<option value="christian">Christian</option>
					</select>
				</div>
				{/* Caste */}
				<div>
					<label htmlFor="caste" className="block font-medium mb-1 mt-1 text-headingGray">Caste</label>
					<select
						id="caste"
						className="input-field text-text"
						name="caste"
						value={formData.caste}
						onChange={handleChange}
						required
					>
						<option value="" disabled>Select</option>
						{/* Add caste options as needed */}
					</select>
				</div>
				{/* Sub Caste */}
				<div>
					<label htmlFor="subCaste" className="block font-medium mb-1 mt-1 text-headingGray">Sub Caste</label>
					<select
						id="subCaste"
						className="input-field text-text"
						name="subCaste"
						value={formData.subCaste}
						onChange={handleChange}
						required
					>
						<option value="" disabled>Select</option>
						{/* Add sub caste options as needed */}
					</select>
				</div>
				{/* Language */}
				<div>
					<label htmlFor="language" className="block font-medium mb-1 mt-1 text-headingGray">Language</label>
					<select
						id="language"
						className="input-field text-text"
						name="language"
						value={formData.language}
						onChange={handleChange}
						required
					>
						<option value="" disabled>Select</option>
						{/* Add language options as needed */}
					</select>
				</div>
				{/* Education */}
				<div>
					<label htmlFor="education" className="block font-medium mb-1 mt-1 text-headingGray">Education</label>
					<input
						type="text"
						id="education"
						className="input-field"
						placeholder="Education"
						name="education"
						value={formData.education}
						onChange={handleChange}
						required
					/>
				</div>
				{/* Profession */}
				<div>
					<label htmlFor="profession" className="block font-medium mb-1 mt-1 text-headingGray">Profession</label>
					<input
						type="text"
						id="profession"
						className="input-field"
						placeholder="Profession"
						name="profession"
						value={formData.profession}
						onChange={handleChange}
						required
					/>
				</div>
				{/* Smoking Acceptable */}
				<div>
					<label htmlFor="smokingAcceptable" className="block font-medium mb-1 mt-1 text-headingGray">Smoking Acceptable</label>
					<input
						type="text"
						id="smokingAcceptable"
						className="input-field"
						placeholder="Smoking Acceptable"
						name="smokingAcceptable"
						value={formData.smokingAcceptable}
						onChange={handleChange}
						required
					/>
				</div>
				{/* Drinking Acceptable */}
				<div>
					<label htmlFor="drinkingAcceptable" className="block font-medium mb-1 mt-1 text-headingGray">Drinking Acceptable</label>
					<input
						type="text"
						id="drinkingAcceptable"
						className="input-field"
						placeholder="Drinking Acceptable"
						name="drinkingAcceptable"
						value={formData.drinkingAcceptable}
						onChange={handleChange}
						required
					/>
				</div>
				{/* Dieting Acceptable */}
				<div>
					<label htmlFor="dietingAcceptable" className="block font-medium mb-1 mt-1 text-headingGray">Dieting Acceptable</label>
					<input
						type="text"
						id="dietingAcceptable"
						className="input-field"
						placeholder="Dieting Acceptable"
						name="dietingAcceptable"
						value={formData.dietingAcceptable}
						onChange={handleChange}
						required
					/>
				</div>
				{/* Body Type */}
				<div>
					<label htmlFor="bodyType" className="block font-medium mb-1 mt-1 text-headingGray">Body Type</label>
					<input
						type="text"
						id="bodyType"
						className="input-field"
						placeholder="Body Type"
						name="bodyType"
						value={formData.bodyType}
						onChange={handleChange}
						required
					/>
				</div>
				{/* Personal Value */}
				<div>
					<label htmlFor="personalValue" className="block font-medium mb-1 mt-1 text-headingGray">Personal Value</label>
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
				{/* Manglik */}
				<div>
					<label htmlFor="manglik" className="block font-medium mb-1 mt-1 text-headingGray">Manglik</label>
					<input
						type="text"
						id="manglik"
						className="input-field"
						placeholder="Manglik"
						name="manglik"
						value={formData.manglik}
						onChange={handleChange}
						required
					/>
				</div>
				{/* Preferred Country */}
				<div>
					<label htmlFor="preferredCountry" className="block font-medium mb-1 mt-1 text-headingGray">Preferred Country</label>
					<input
						type="text"
						id="preferredCountry"
						className="input-field"
						placeholder="Preferred Country"
						name="preferredCountry"
						value={formData.preferredCountry}
						onChange={handleChange}
						required
					/>
				</div>
				{/* Preferred State */}
				<div>
					<label htmlFor="preferredState" className="block font-medium mb-1 mt-1 text-headingGray">Preferred State</label>
					<input
						type="text"
						id="preferredState"
						className="input-field"
						placeholder="Preferred State"
						name="preferredState"
						value={formData.preferredState}
						onChange={handleChange}
						required
					/>
				</div>
				{/* Family Value */}
				<div>
					<label htmlFor="familyValue" className="block font-medium mb-1 mt-1 text-headingGray">Family Value</label>
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
				{/* Complexion */}
				<div>
					<label htmlFor="complexion" className="block font-medium mb-1 mt-1 text-headingGray">Complexion</label>
					<input
						type="text"
						id="complexion"
						className="input-field"
						placeholder="Complexion"
						name="complexion"
						value={formData.complexion}
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

export default PartnerExpectation;
