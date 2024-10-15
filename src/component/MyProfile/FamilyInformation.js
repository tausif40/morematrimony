import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

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
	});

	const [ errors, setErrors ] = useState({});

	const validateForm = () => {
		let formErrors = {};

		if (!formData.familyValue) formErrors.familyValue = 'Family value is ';
		if (!formData.familyType) formErrors.familyType = 'Family type is ';
		if (!formData.familyStatus) formErrors.familyStatus = 'Family status is ';
		if (!formData.fatherOccupation) formErrors.fatherOccupation = "Father's occupation is ";
		if (!formData.motherOccupation) formErrors.motherOccupation = "Mother's occupation is ";
		if (!formData.numBrothers) formErrors.numBrothers = 'Number of brothers is ';
		if (!formData.brothersMarried) formErrors.brothersMarried = 'Please specify married brothers';
		if (!formData.numSisters) formErrors.numSisters = 'Number of sisters is ';
		if (!formData.sistersMarried) formErrors.sistersMarried = 'Please specify married sisters';

		setErrors(formErrors);
		return Object.keys(formErrors).length === 0;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
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
			console.log(formData);
			try {
				await axios.post('/api/family-information', formData);
				toast.success('Family information updated successfully');
			} catch (error) {
				toast.error('Error updating family information');
			}
		} else {
			toast.error('Please correct all highlighted errors!');
		}
	};

	const getInputClasses = (fieldName) => `input-field ${errors[ fieldName ] && 'border-red-500'} text-gray-700`;

	return (
		<div className="box-shadow bg-white border rounded-md mx-auto">
			<p className="px-6 py-3 font-medium border-b text-headingGray">Family Details</p>
			<form className="md:grid grid-cols-2 gap-4 py-4 px-6 text-sm space-y-5 md:space-y-0" onSubmit={handleSubmit}>
				{/* Family Value */}
				<div>
					<label htmlFor="familyValue" className="block font-medium mb-1 text-headingGray">
						Family Value
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
						<option value="orthodox">Orthodox</option>
						<option value="traditional">Traditional</option>
						<option value="moderate">Moderate</option>
						<option value="liberal">Liberal</option>
					</select>
					{errors.familyValue && <p className="text-red-500 text-xs">{errors.familyValue}</p>}
				</div>

				{/* Family Type */}
				<div>
					<label htmlFor="familyType" className="block font-medium mb-1 text-headingGray">
						Family Type
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
						<option value="jointFamily">Joint Family</option>
						<option value="nuclearFamily">Nuclear Family</option>
						<option value="others">Others</option>
					</select>
					{errors.familyType && <p className="text-red-500 text-xs">{errors.familyType}</p>}
				</div>

				{/* Family Status */}
				<div>
					<label htmlFor="familyStatus" className="block font-medium mb-1 text-headingGray">
						Family Status
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
						<option value="middleClass">Middle Class</option>
						<option value="upperMiddleClass">Upper Middle Class</option>
						<option value="highClass">High Class</option>
						<option value="richAffluent">Rich/Affluent</option>
					</select>
					{errors.familyStatus && <p className="text-red-500 text-xs">{errors.familyStatus}</p>}
				</div>

				{/* Father's Occupation */}
				<div>
					<label htmlFor="fatherOccupation" className="block font-medium mb-1 text-headingGray">
						Father's Occupation
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
						<option value="other">Passed Away</option>
					</select>
					{errors.fatherOccupation && <p className="text-red-500 text-xs">{errors.fatherOccupation}</p>}
				</div>

				{/* Mother's Occupation */}
				<div>
					<label htmlFor="motherOccupation" className="block font-medium mb-1 text-headingGray">
						Mother's Occupation
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
						<option value="homemaker">Homemaker</option>
						<option value="retired">Retired</option>
						<option value="other">Passed Away</option>
					</select>
					{errors.motherOccupation && <p className="text-red-500 text-xs">{errors.motherOccupation}</p>}
				</div>

				{/* Number of Brothers */}
				<div>
					<label htmlFor="numBrothers" className="block font-medium mb-1 text-headingGray">
						No. of Brothers
					</label>
					<select
						id="numBrothers"
						className={getInputClasses('numBrothers')}
						name="numBrothers"
						value={formData.numBrothers}
						onChange={handleChange}

					>
						<option value="" disabled>
							Choose Number
						</option>
						<option value="0">0</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="more">More than 3</option>
					</select>
					{errors.numBrothers && <p className="text-red-500 text-xs">{errors.numBrothers}</p>}
				</div>

				{/* Brothers Married */}
				<div>
					<label htmlFor="brothersMarried" className="block font-medium mb-1 text-headingGray">
						Brothers Married
					</label>
					<select
						id="brothersMarried"
						className={getInputClasses('brothersMarried')}
						name="brothersMarried"
						value={formData.brothersMarried}
						onChange={handleChange}

					>
						<option value="" disabled>
							Select Married Brothers
						</option>
						<option value="none">None</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="more">More than 2</option>
					</select>
					{errors.brothersMarried && <p className="text-red-500 text-xs">{errors.brothersMarried}</p>}
				</div>

				{/* Number of Sisters */}
				<div>
					<label htmlFor="numSisters" className="block font-medium mb-1 text-headingGray">
						No. of Sisters
					</label>
					<select
						id="numSisters"
						className={getInputClasses('numSisters')}
						name="numSisters"
						value={formData.numSisters}
						onChange={handleChange}

					>
						<option value="" disabled>
							Choose Number
						</option>
						<option value="0">0</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="more">More than 3</option>
					</select>
					{errors.numSisters && <p className="text-red-500 text-xs">{errors.numSisters}</p>}
				</div>

				{/* Sisters Married */}
				<div>
					<label htmlFor="sistersMarried" className="block font-medium mb-1 text-headingGray">
						Sisters Married
					</label>
					<select
						id="sistersMarried"
						className={getInputClasses('sistersMarried')}
						name="sistersMarried"
						value={formData.sistersMarried}
						onChange={handleChange}

					>
						<option value="" disabled>
							Select Married Sisters
						</option>
						<option value="none">None</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="more">More than 2</option>
					</select>
					{errors.sistersMarried && <p className="text-red-500 text-xs">{errors.sistersMarried}</p>}
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
