import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { familyInformation } from '../../data/MyProfileData';

const FamilyInformation = ({ onFormSubmit, loading }) => {

	const [ formData, setFormData ] = useState({
		familyValue: '',
		familyType: '',
		familyStatus: '',
		fatherOccupation: '',
		motherOccupation: '',
		brothers: '',
		brothersMarried: '',
		sisters: '',
		sistersMarried: '',
	});

	const [ errors, setErrors ] = useState({});

	const validateForm = () => {
		let formErrors = {};
		if (!formData.familyValue) formErrors.familyValue = 'Family value is required';
		if (!formData.familyType) formErrors.familyType = 'Family type is required';
		if (!formData.familyStatus) formErrors.familyStatus = 'Family status is required';
		if (!formData.fatherOccupation) formErrors.fatherOccupation = "Father's occupation is required";
		if (!formData.motherOccupation) formErrors.motherOccupation = "Mother's occupation is required";
		if (!formData.brothers) formErrors.brothers = 'Number of brothers is required';
		if (formData.brothers > 1 && !formData.brothersMarried) {
			formErrors.brothersMarried = 'Please specify number of married brothers';
		}
		if (!formData.sisters) formErrors.sisters = 'Number of sisters is required';
		if (formData.sisters > 1 && !formData.sistersMarried) {
			formErrors.sistersMarried = 'Please specify number of married sisters';
		}

		if (formData.brothers == 0) delete formData.brothersMarried
		if (formData.sisters == 0) delete formData.sistersMarried

		setErrors(formErrors);
		return Object.keys(formErrors).length === 0;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name == 'brothers') {
			formData.brothersMarried = ''
		} else if (name === 'sisters') {
			formData.sistersMarried = ''
		}

		setFormData((prevData) => ({
			...prevData,
			[ name ]: value,
		}));

		if (errors[ name ]) {
			setErrors((prevErrors) => ({
				...prevErrors,
				[ name ]: '',
			}));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validateForm()) {
			onFormSubmit({ familyDetails: formData });
		} else {
			toast.error('Please correct all highlighted errors!');
		}
	};

	const getInputClasses = (fieldName) =>
		`input-field ${errors[ fieldName ] && 'border-red-500'} text-gray-700`;

	return (
		<div className="box-shadow bg-white border rounded-md mx-auto">
			<p className="px-6 py-3 font-medium border-b text-headingGray">Family Details</p>
			<form className="md:grid grid-cols-2 gap-4 py-4 px-6 text-sm space-y-5 md:space-y-0" onSubmit={handleSubmit}>
				{/* Family Value */}
				<div>
					<label htmlFor="familyValue" className="block font-medium mb-1 text-headingGray">
						Family Value <span className="text-red-500">*</span>
					</label>
					<select
						id="familyValue"
						className={getInputClasses('familyValue')}
						name="familyValue"
						value={formData.familyValue}
						onChange={handleChange}

					>
						<option value="" disabled>
							Choose Family Value
						</option>
						{familyInformation.familyValue.map((value, index) => (
							<option key={index} value={value}>
								{value.charAt(0).toUpperCase() + value.slice(1)}
							</option>
						))}
					</select>
					{errors.familyValue && <p className="text-red-500 text-xs">{errors.familyValue}</p>}
				</div>

				{/* Family Type */}
				<div>
					<label htmlFor="familyType" className="block font-medium mb-1 text-headingGray">
						Family Type <span className="text-red-500">*</span>
					</label>
					<select
						id="familyType"
						className={getInputClasses('familyType')}
						name="familyType"
						value={formData.familyType}
						onChange={handleChange}

					>
						<option value="" disabled>
							Choose Family Type
						</option>
						{familyInformation.familyType.map((value, index) => (
							<option key={index} value={value}>
								{value.charAt(0).toUpperCase() + value.slice(1)}
							</option>
						))}
					</select>
					{errors.familyType && <p className="text-red-500 text-xs">{errors.familyType}</p>}
				</div>

				{/* Family Status */}
				<div>
					<label htmlFor="familyStatus" className="block font-medium mb-1 text-headingGray">
						Family Status <span className="text-red-500">*</span>
					</label>
					<select
						id="familyStatus"
						className={getInputClasses('familyStatus')}
						name="familyStatus"
						value={formData.familyStatus}
						onChange={handleChange}

					>
						<option value="" disabled>
							Choose Family Status
						</option>
						{familyInformation.familyStatus.map((value, index) => (
							<option key={index} value={value}>
								{value.charAt(0).toUpperCase() + value.slice(1)}
							</option>
						))}
					</select>
					{errors.familyStatus && <p className="text-red-500 text-xs">{errors.familyStatus}</p>}
				</div>

				{/* Father's Occupation */}
				<div>
					<label htmlFor="fatherOccupation" className="block font-medium mb-1 text-headingGray">
						Father's Occupation <span className="text-red-500">*</span>
					</label>
					<select
						id="fatherOccupation"
						className={getInputClasses('fatherOccupation')}
						name="fatherOccupation"
						value={formData.fatherOccupation}
						onChange={handleChange}

					>
						<option value="" disabled>
							Select Father's Occupation
						</option>
						<option value="employed">Employed</option>
						<option value="business">Business</option>
						<option value="retired">Retired</option>
						<option value="passed away">Passed Away</option>
					</select>
					{errors.fatherOccupation && <p className="text-red-500 text-xs">{errors.fatherOccupation}</p>}
				</div>

				{/* Mother's Occupation */}
				<div>
					<label htmlFor="motherOccupation" className="block font-medium mb-1 text-headingGray">
						Mother's Occupation <span className="text-red-500">*</span>
					</label>
					<select
						id="motherOccupation"
						className={getInputClasses('motherOccupation')}
						name="motherOccupation"
						value={formData.motherOccupation}
						onChange={handleChange}
					>
						<option value="" disabled>
							Select Mother's Occupation
						</option>
						<option value="employed">Employed</option>
						<option value="business">Business</option>
						<option value="home maker">Homemaker</option>
						<option value="retired">Retired</option>
						<option value="passed away">Passed Away</option>
					</select>
					{errors.motherOccupation && <p className="text-red-500 text-xs">{errors.motherOccupation}</p>}
				</div>

				{/* Number of Brothers */}
				<div>
					<label htmlFor="brothers" className="block font-medium mb-1 text-headingGray">
						No. of Brothers <span className="text-red-500">*</span>
					</label>
					<select
						id="brothers"
						className={getInputClasses('brothers')}
						name="brothers"
						value={formData.brothers}
						onChange={handleChange}
					>
						<option value="" disabled>
							Choose Number
						</option>
						{Array.from({ length: 11 }, (_, i) => (
							<option key={i} value={i}>
								{i}
							</option>
						))}
					</select>
					{errors.brothers && <p className="text-red-500 text-xs">{errors.brothers}</p>}
				</div>

				{/* Brothers Married */}
				{formData.brothers > 0 && (
					<div>
						<label htmlFor="brothersMarried" className="block font-medium mb-1 text-headingGray">
							Brothers Married <span className="text-red-500">*</span>
						</label>
						<select
							id="brothersMarried"
							className={getInputClasses('brothersMarried')}
							name="brothersMarried"
							value={formData.brothersMarried}
							onChange={handleChange}
						>
							<option value="" disabled>Select Married </option>
							<option value={0}>0</option>
							{Array.from({ length: formData.brothers }, (_, i) => (
								<option key={i + 1} value={i + 1}>
									{i + 1}
								</option>
							))}
						</select>
						{errors.brothersMarried && <p className="text-red-500 text-xs">{errors.brothersMarried}</p>}
					</div>
				)}

				{/* Number of Sisters */}
				<div>
					<label htmlFor="sisters" className="block font-medium mb-1 text-headingGray">
						No. of Sisters <span className="text-red-500">*</span>
					</label>
					<select
						id="sisters"
						className={getInputClasses('sisters')}
						name="sisters"
						value={formData.sisters}
						onChange={handleChange}
					>
						<option value="" disabled>
							Choose Number
						</option>
						{Array.from({ length: 11 }, (_, i) => (
							<option key={i} value={i}>
								{i}
							</option>
						))}
					</select>
					{errors.sisters && <p className="text-red-500 text-xs">{errors.sisters}</p>}
				</div>

				{/* Sisters Married */}
				{formData.sisters > 0 && (
					<div>
						<label htmlFor="sistersMarried" className="block font-medium mb-1 text-headingGray">
							Sisters Married <span className="text-red-500">*</span>
						</label>
						<select
							id="sistersMarried"
							className={getInputClasses('sistersMarried')}
							name="sistersMarried"
							value={formData.sistersMarried}
							onChange={handleChange}
						>
							<option value="" disabled>Select Married Sisters</option>
							<option value={0}>0</option>
							{Array.from({ length: formData.sisters }, (_, i) => (
								<option key={i + 1} value={i + 1}>
									{i + 1}
								</option>
							))}
						</select>
						{errors.sistersMarried && <p className="text-red-500 text-xs">{errors.sistersMarried}</p>}
					</div>
				)}

				{/* Submit Button */}
				<div className="col-span-2 flex justify-end mt-4">
					<button type="submit" className="gradient-btn px-4 py-2 rounded-md text-sm" disabled={loading}>Update</button>
				</div>
			</form>
		</div>
	);
};

export default FamilyInformation;
