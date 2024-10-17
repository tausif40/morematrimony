import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const PartnerExpectation = () => {
	const [ lookingFor, setLookingFor ] = useState('')
	const [ formData, setFormData ] = useState({
		brideAge: '',
		height: '',
		maritalStatus: '',
		numberOfChildren: '',
		childrenAcceptable: '',
		motherTongue: '',
		residencyCountry: '',
		religion: '',
		caste: '',
		subCaste: '',
		highestEducation: '',
		employedIn: '',
		occupation: '',
		annualIncome: '',
		dietingAcceptable: '',
		drinkingAcceptable: '',
		smokingAcceptable: '',
		bodyType: '',
		manglik: '',
		preferredCountry: '',
		preferredState: '',
		complexion: '',
	});

	const [ errors, setErrors ] = useState({});

	const validateForm = () => {
		let formErrors = {};
		Object.keys(formData).forEach((field) => {
			if (!formData[ field ]) {
				const formattedKey = field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
				formErrors[ field ] = `${formattedKey} is required`;
			}
		});
		setErrors(formErrors);
		return Object.keys(formErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) {
			toast.error('Please fill in all  fields');
			console.log("half Data", formData);
			return;
		}
		setFormData((previousData) => ({
			...previousData, lookingFor: lookingFor
		}))
		console.log(formData);

		try {
			const response = await axios.post('/api/partner-expectation', formData);
			if (response.status === 200) {
				toast.success('Partner Expectation updated successfully');
			}
		} catch (error) {
			toast.error('Something went wrong, please try again');
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[ name ]: value,
		}));
		setErrors((prevErrors) => ({ ...prevErrors, [ name ]: '' }));
	};

	const getInputClasses = (fieldName) => `input-field ${errors[ fieldName ] && 'border-red-500'} text-gray-700`;

	return (
		<div className="box-shadow bg-white border rounded-md mx-auto">
			<p className="px-6 py-3 font-medium border-b text-headingGray">Partner Expectation</p>
			<form className="md:grid grid-cols-2 gap-4 py-4 px-6 text-sm space-y-5 md:space-y-0" onSubmit={handleSubmit}>
				{/* age */}
				<div>
					<label className="block font-medium mb-1 mt-1 text-headingGray">Bride's Age <span className="text-red-500">*</span></label>
					<div className="rounded-md flex gap-4">
						<select
							id="brideAge"
							className={`input-field text-gray-700 p-1 outline-none border`}
							name="brideAge"
							value={formData.brideAge}
							onChange={handleChange}
						>
							<option value="" disabled>From</option>
							<option value="18">18</option>
							<option value="19">19</option>
						</select>
						{/* State */}
						<select
							id="brideAge"
							className={`input-field text-gray-700 p-1 outline-none border`}
							name="brideAge"
							value={formData.brideAge}
							onChange={handleChange}
						>
							<option value="" disabled>To</option>
							<option value="18">18</option>
							<option value="19">19</option>
						</select>
					</div>
					{errors.brideAge && <p className="text-red-500 text-xs">{errors.brideAge}</p>}
				</div>

				{/* height */}
				<div>
					<label className="block font-medium mb-1 mt-1 text-headingGray">Height <span className="text-red-500">*</span></label>
					<div className="rounded-md flex gap-4">
						<select
							id="height"
							className={`input-field text-gray-700 p-1 outline-none border`}
							name="height"
							value={formData.height}
							onChange={handleChange}
						>
							<option value="" disabled>Foot</option>
							<option value="2">2</option>
							<option value="3">3</option>
						</select>
						{/* State */}
						<select
							id="height"
							className={`input-field text-gray-700 p-1 outline-none border`}
							name="height"
							value={formData.height}
							onChange={handleChange}
						>
							<option value="" disabled>Inch</option>
							<option value="1">1</option>
							<option value="2">2</option>
						</select>
					</div>
					{errors.height && <p className="text-red-500 text-xs">{errors.height}</p>}
				</div>

				{/* Marital Status */}
				<div>
					<label className="block font-medium mb-1 mt-1 text-headingGray">
						Marital Status<span className="text-red-500"> *</span>
					</label>
					<select
						id="maritalStatus"
						className={getInputClasses('maritalStatus')}
						name="maritalStatus"
						value={formData.maritalStatus}
						onChange={handleChange}
					>
						<option value='' disabled>Select</option>
						<option value="single">Single</option>
						<option value="married">Married</option>
						<option value="divorced">Divorced</option>
						<option value="widowed">Widowed</option>
					</select>
					{errors.maritalStatus && <p className="text-red-500 text-xs mt-1">{errors.maritalStatus}</p>}
				</div>

				{/* Number of Children */}
				{(formData.maritalStatus == 'married' || formData.maritalStatus == 'divorced' || formData.maritalStatus == 'widowed') &&
					<>
						<div>
							<label className="block font-medium mb-1 mt-1 text-headingGray">
								Number of Children<span className="text-red-500"> *</span>
							</label>
							<input
								type="number"
								id="numberOfChildren"
								className={getInputClasses('numberOfChildren')}
								name="numberOfChildren"
								value={formData.numberOfChildren}
								onChange={handleChange}
							/>
							{errors.numberOfChildren && (
								<p className="text-red-500 text-xs mt-1">{errors.numberOfChildren}</p>
							)}
						</div>

						{/* // Children Acceptable */}
						<div>
							<label className="block font-medium mb-1 mt-1 text-headingGray">Children Acceptable <span className="text-red-500">*</span></label>
							<select
								id="childrenAcceptable"
								className={getInputClasses('childrenAcceptable')}
								name="childrenAcceptable"
								value={formData.childrenAcceptable}
								onChange={handleChange}
							>
								<option value="" disabled>Select</option>
								<option value="yes">Yes</option>
								<option value="no">No</option>
								<option value="maybe">Maybe</option>
							</select>
							{errors.childrenAcceptable && <p className="text-red-500 text-xs">{errors.childrenAcceptable}</p>}
						</div>
					</>
				}

				{/* Mother Tongue */}
				<div>
					<label className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Mother Tongue<span className="text-red-500"> *</span></label>
					<select
						id="motherTongue"
						className="input-field text-gray-700"
						name="motherTongue"
						value={formData.motherTongue}
						onChange={handleChange}
					>
						<option value="" disabled>Select Mother Tongue</option>
						<option value="Hindi">Hindi</option>
						<option value="Gujarati">Gujarati</option>
						<option value="Gujarati">Gujarati</option>
					</select>
					{errors.generalRequirement && <p className="text-red-500 text-xs">{errors.generalRequirement}</p>}
				</div>

				{/* Residence Country */}
				<div>
					<label htmlFor="residencyCountry" className="block font-medium mb-1 mt-1 text-headingGray">
						Residency Country <span className="text-red-500">*</span>
					</label>
					<select
						id="residencyCountry"
						className={getInputClasses('residencyCountry')}
						name="residencyCountry"
						value={formData.residencyCountry}
						onChange={handleChange}
					>
						<option value="" disabled>Select Residency Country</option>
						<option value="country1">Country 1</option>
						<option value="country2">Country 2</option>
						<option value="country3">Country 3</option>
					</select>
					{errors.residencyCountry && <p className="text-red-500 text-xs">{errors.residencyCountry}</p>}
				</div>

				{/* Religion */}
				<div>
					<label className="block font-medium mb-1 mt-1 text-headingGray">Religion <span className="text-red-500">*</span></label>
					<select
						id="religion"
						className={getInputClasses('religion')}
						name="religion"
						value={formData.religion}
						onChange={handleChange}
					>
						<option value="" disabled>Select Religion</option>
						<option value="hindu">Hindu</option>
						<option value="muslim">Muslim</option>
						<option value="christian">Christian</option>
					</select>
					{errors.religion && <p className="text-red-500 text-xs">{errors.religion}</p>}
				</div>
				{/* Caste */}
				<div>
					<label className="block font-medium mb-1 mt-1 text-headingGray">Caste <span className="text-red-500">*</span></label>
					<select
						id="caste"
						className={getInputClasses('caste')}
						name="caste"
						value={formData.caste}
						onChange={handleChange}
					>
						<option value="" disabled>Select Caste</option>
						<option value="caste1">Caste 1</option>
						<option value="caste2">Caste 2</option>
					</select>
					{errors.caste && <p className="text-red-500 text-xs">{errors.caste}</p>}
				</div>

				{/* Sub Caste */}
				<div>
					<label className="block font-medium mb-1 mt-1 text-headingGray">Sub Caste <span className="text-red-500">*</span></label>
					<select
						id="subCaste"
						className={getInputClasses('subCaste')}
						name="subCaste"
						value={formData.subCaste}
						onChange={handleChange}

					>
						<option value="" disabled>Select Sub Caste</option>
						<option value="subCaste1">Sub Caste 1</option>
						<option value="subCaste2">Sub Caste 2</option>
					</select>
					{errors.subCaste && <p className="text-red-500 text-xs">{errors.subCaste}</p>}
				</div>

				{/* Mother Tongue */}
				<div>
					<label className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Mother Tongue<span className="text-red-500"> *</span></label>
					<select
						id="motherTongue"
						className="input-field text-gray-700"
						name="motherTongue"
						value={formData.motherTongue}
						onChange={handleChange}
					>
						<option value="" disabled>Select Mother Tongue</option>
						<option value="Hindi">Hindi</option>
						<option value="Gujarati">Gujarati</option>
						<option value="Gujarati">Gujarati</option>
					</select>
					{errors.motherTongue && <p className="text-red-500 text-xs">{errors.motherTongue}</p>}
				</div>

				{/* Highest Education */}
				<div>
					<label htmlFor="highestEducation" className="block font-medium mb-1 mt-1 text-headingGray">
						Highest Education <span className="text-red-500">*</span>
					</label>
					<select
						id="highestEducation"
						className={getInputClasses('highestEducation')}
						name="highestEducation"
						value={formData.highestEducation}
						onChange={handleChange}
					>
						<option value="" disabled>Select Education</option>
						<option value="course1">Course 1</option>
						<option value="course2">Course 2</option>
						<option value="other">Other</option>
					</select>
					{errors.highestEducation && <p className="text-red-500 text-xs">{errors.highestEducation}</p>}
				</div>

				{/* Employed In */}
				<div>
					<label htmlFor="EmployedIn" className="block font-medium mb-1 mt-1 text-headingGray">
						Employed In <span className="text-red-500">*</span>
					</label>
					<select
						id="EmployedIn"
						className={getInputClasses('employedIn')}
						name="employedIn"
						value={formData.employedIn}
						onChange={handleChange}
					>
						<option value="" disabled>Select Education</option>
						<option value="course1">employed 1</option>
						<option value="course2">employed 2</option>
						<option value="other">Not Working</option>
					</select>
					{errors.employedIn && <p className="text-red-500 text-xs">{errors.employedIn}</p>}
				</div>
				{/* Occupation */}
				<div>
					<label htmlFor="occupation" className="block font-medium mb-1 mt-1 text-headingGray">
						Occupation <span className="text-red-500">*</span>
					</label>
					<select
						id="occupation"
						className={getInputClasses('occupation')}
						name="occupation"
						value={formData.occupation}
						onChange={handleChange}
					>
						<option value="" disabled>Select Occupation</option>
						<option value="Engineer">Engineer</option>
						<option value="Doctor">Doctor</option>
						<option value="Teacher">Teacher</option>
					</select>
					{errors.occupation && <p className="text-red-500 text-xs">{errors.occupation}</p>}
				</div>
				{/* Annual Income */}
				<div>
					<label htmlFor="annualIncome" className="block font-medium mb-1 mt-1 text-headingGray">
						Annual Income <span className="text-red-500">*</span>
					</label>
					<select
						id="annualIncome"
						className={getInputClasses('annualIncome')}
						name="annualIncome"
						value={formData.annualIncome}
						onChange={handleChange}
					>
						<option value="" disabled>Select Annual Income</option>
						<option value="1 Lakh">1 Lakh</option>
						<option value="2 Lakh">2 Lakh</option>
						<option value="5 Lakh">5 Lakh</option>
					</select>
					{errors.annualIncome && <p className="text-red-500 text-xs">{errors.annualIncome}</p>}
				</div>

				{/* Smoking Acceptable */}
				<div>
					<label className="block font-medium mb-1 mt-1 text-headingGray">Smoking Acceptable <span className="text-red-500">*</span></label>
					<select
						id="smokingAcceptable"
						className={getInputClasses('smokingAcceptable')}
						name="smokingAcceptable"
						value={formData.smokingAcceptable}
						onChange={handleChange}

					>
						<option value="" disabled>Select</option>
						<option value="yes">Yes</option>
						<option value="no">No</option>
						<option value="maybe">Maybe</option>
					</select>
					{errors.smokingAcceptable && <p className="text-red-500 text-xs">{errors.smokingAcceptable}</p>}
				</div>

				{/* Drinking Acceptable */}
				<div>
					<label className="block font-medium mb-1 mt-1 text-headingGray">Drinking Acceptable <span className="text-red-500">*</span></label>
					<select
						id="drinkingAcceptable"
						className={getInputClasses('drinkingAcceptable')}
						name="drinkingAcceptable"
						value={formData.drinkingAcceptable}
						onChange={handleChange}

					>
						<option value="" disabled>Select</option>
						<option value="yes">Yes</option>
						<option value="no">No</option>
						<option value="maybe">Maybe</option>
					</select>
					{errors.drinkingAcceptable && <p className="text-red-500 text-xs">{errors.drinkingAcceptable}</p>}
				</div>

				{/* Dieting Acceptable */}
				<div>
					<label className="block font-medium mb-1 mt-1 text-headingGray">Dieting Acceptable <span className="text-red-500">*</span></label>
					<select
						id="dietingAcceptable"
						className={getInputClasses('dietingAcceptable')}
						name="dietingAcceptable"
						value={formData.dietingAcceptable}
						onChange={handleChange}

					>
						<option value="" disabled>Select</option>
						<option value="yes">Yes</option>
						<option value="no">No</option>
						<option value="maybe">Maybe</option>
					</select>
					{errors.dietingAcceptable && <p className="text-red-500 text-xs">{errors.dietingAcceptable}</p>}
				</div>

				{/* Body Type */}
				<div>
					<label htmlFor="bodyType" className="block font-medium mb-1 mt-1 text-headingGray">
						Body Type <span className="text-red-500">*</span>
					</label>
					<select
						id="bodyType"
						className={getInputClasses('bodyType')}
						name="bodyType"
						value={formData.bodyType}
						onChange={handleChange}
					>
						<option value="" disabled>Select Body Type</option>
						<option value="Slim">Slim</option>
						<option value="Fat">Fat</option>
						<option value="Average">Average</option>
					</select>
					{errors.bodyType && <p className="text-red-500 text-xs">{errors.bodyType}</p>}
				</div>

				{/* Manglik */}
				<div>
					<label className="block font-medium mb-1 mt-1 text-headingGray">Manglik <span className="text-red-500">*</span></label>
					<select
						id="manglik"
						className={getInputClasses('manglik')}
						name="manglik"
						value={formData.manglik}
						onChange={handleChange}

					>
						<option value="" disabled>Select</option>
						<option value="yes">Yes</option>
						<option value="no">No</option>
						<option value="unknown">Unknown</option>
					</select>
					{errors.manglik && <p className="text-red-500 text-xs">{errors.manglik}</p>}
				</div>

				{/* {preferredCountry} */}
				<div>
					<label htmlFor="preferredCountry" className="block font-medium mb-1 mt-1 text-headingGray">
						Preferred Country <span className="text-red-500">*</span>
					</label>
					<select
						id="preferredCountry"
						className={getInputClasses('preferredCountry')}
						name="preferredCountry"
						value={formData.preferredCountry}
						onChange={handleChange}
					>
						<option value="" disabled>Select preferred country</option>
						<option value="country1">Country 1</option>
						<option value="country2">Country 2</option>
						<option value="country3">Country 3</option>
						<option value="country4">Country 4</option>
					</select>
					{errors.preferredCountry && <p className="text-red-500 text-xs">{errors.preferredCountry}</p>}
				</div>
				{/* State */}
				<div>
					<label htmlFor="preferredState" className="block font-medium mb-1 mt-1 text-headingGray">
						Prefer redState <span className="text-red-500">*</span>
					</label>
					<select
						id="preferredState"
						className={getInputClasses('preferredState')}
						name="preferredState"
						value={formData.preferredState}
						onChange={handleChange}
					>
						<option value="" disabled>Select preferred state</option>
						<option value="state1">State 1</option>
						<option value="state2">State 2</option>
						<option value="state3">State 3</option>
						<option value="state4">State 4</option>
					</select>
					{errors.preferredState && <p className="text-red-500 text-xs">{errors.preferredState}</p>}
				</div>

				{/* Complexion */}
				<div>
					<label htmlFor="complexion" className="block font-medium mb-1 mt-1 text-headingGray">
						Complexion <span className="text-red-500">*</span>
					</label>
					<select
						id="complexion"
						className={getInputClasses('complexion')}
						name="complexion"
						value={formData.complexion}
						onChange={handleChange}
					>
						<option value="" disabled>Select Complexion</option>
						<option value="Fair Skin">Fair Skin</option>
						<option value="Medium Skin">Medium Skin</option>
						<option value="Black Skin">Black Skin</option>
					</select>
					{errors.complexion && <p className="text-red-500 text-xs">{errors.complexion}</p>}
				</div>

				{/* {What we are looking for} */}
				<div>
					<label className="block font-medium mb-1 mt-1 text-headingGray">What we are looking for</label>
					<input
						type="text"
						className={`input-field`}
						placeholder="General Requirement"
						name="generalRequirement"
						value={lookingFor}
						onChange={(e) => setLookingFor(e.target.value)}
					/>
					{errors.lookingFor && <p className="text-red-500 text-xs">{errors.lookingFor}</p>}
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
