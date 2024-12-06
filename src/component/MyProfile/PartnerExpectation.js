import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { indiaId } from '../../utils/data/config';
import { partnerExpectations, maritalStatus, career, PhysicalAttributesData, lifestyle } from '../../utils/data/MyProfileData';
import apiClient from '../../api/apiClient';
import MultiSelectDropdown from '../../utils/ui/MultiSelectDropdown';

const PartnerExpectation = ({ data, onFormSubmit }) => {
	const { countriesWithDoesNotMatter, religions, occupations, education, languages } = data

	const [ stateList, setStateList ] = useState([])
	const [ casteList, setCasteList ] = useState([])
	const [ loading, setLoading ] = useState({ state: false, caste: false });

	const fetchData = async (url, setData, type) => {
		setLoading((prev) => ({ ...prev, [ type ]: true }));
		try {
			const response = await apiClient.get(url);
			setData(response.data);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading((prev) => ({ ...prev, [ type ]: false }));
		}
	};
	useEffect(() => { fetchData(`/state?countryId=${indiaId}`, setStateList, 'state'); }, [ indiaId ])
	const fetchCaste = (religionId) => fetchData(`/caste?religionId=${religionId}`, setCasteList, 'caste');

	const [ formData, setFormData ] = useState({
		age: { min: '', max: '' },
		height: { feet: '', inches: '' },
		maritalStatus: '',
		numberOfChildren: '',
		childrenAcceptable: '',
		motherTongue: '',
		residencyCountry: '',
		religion: '',
		caste: '',
		// subCaste: '',
		highestEducation: '',
		employedIn: '',
		occupation: '',
		annualIncome: '',
		dietingAcceptable: '',
		drinkingAcceptable: '',
		smokingAcceptable: '',
		bodyType: '',
		preferredCountry: '',
		preferredState: '',
		complexion: '',
		lookingFor: ''
	});

	const [ errors, setErrors ] = useState({});

	const validateForm = () => {
		let formErrors = {};

		Object.keys(formData).forEach((field) => {
			if (!formData[ field ] && field !== 'numberOfChildren' && field !== 'childrenAcceptable' && field !== 'lookingFor') {
				const formattedKey = field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
				formErrors[ field ] = `${formattedKey} is required`;
			}
		});

		if (!formData.age.min || !formData.age.max) {
			formErrors[ 'age.min' ] = 'Age (min and max) is required';
			formErrors[ 'age.max' ] = 'Age (min and max) is required';
		} else if (parseInt(formData.age.min) >= parseInt(formData.age.max)) {
			formErrors.age = 'Min age should be less than max age';
		}

		if (!formData.height.feet) {
			formErrors[ 'height.feet' ] = 'Height is required';
		}

		if (isChildrenFieldsVisible()) {
			if (!formData.numberOfChildren) {
				formErrors.numberOfChildren = 'Number of children is required';
			}
			if (!formData.childrenAcceptable) {
				formErrors.childrenAcceptable = 'Children acceptable is required';
			}
		}

		setErrors(formErrors);
		return Object.keys(formErrors).length === 0;
	};

	const isChildrenFieldsVisible = () => {
		if (formData.maritalStatus == 'single') {
			delete formData.numberOfChildren;
			delete formData.childrenAcceptable;
		} else if (formData.lookingFor == "") delete formData.lookingFor;

		return (formData.maritalStatus !== 'single' && formData.maritalStatus !== '')
	};
	// const isNotEmployed = () => {
	// 	if (formData.employedIn == 'not working' || formData.employedIn == "doesn't matter") {
	// 		delete formData.occupation;
	// 		delete formData.annualIncome;
	// 	}
	// 	return (formData.employedIn !== 'not working' && formData.employedIn !== "doesn't matter" && formData.employedIn !== "")
	// };

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.height.inches) delete formData.height.inches;
		// console.log(formData);
		// console.log("isChildrenFieldsVisible - ", isChildrenFieldsVisible());
		// console.log("isNotEmployed - ", isNotEmployed());
		if (!validateForm()) {
			toast.error('Please fill in all required fields');
			return;
		}
		onFormSubmit({ partnerExpectation: formData });
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData((prevFormData) => ({
			...prevFormData,
			[ name ]: value,
		}));
		if (name.includes('age') || name.includes('height')) {
			const [ group, field ] = name.split('.');
			setFormData((prevFormData) => ({
				...prevFormData,
				[ group ]: { ...prevFormData[ group ], [ field ]: value }
			}));
		} else {
			setFormData((prevFormData) => ({
				...prevFormData,
				[ name ]: value
			}));
		}

		// if (name === 'preferredCountry') {
		// 	dispatch(fetchStates(value));
		// 	formData.preferredState = ''
		// }


		if (name === 'religion') {
			setCasteList('')
			fetchCaste(value);
		}


		setErrors((prevErrors) => ({ ...prevErrors, [ name ]: '' }));
	};

	// Get input classes for error styling
	const getInputClasses = (fieldName) => `input-field ${errors[ fieldName ] && 'border-red-500'} text-gray-700`;

	return (
		<div className="box-shadow bg-white border rounded-md mx-auto">
			<p className="px-6 py-3 font-medium border-b text-headingGray">Partner Expectation</p>
			<form className="md:grid grid-cols-2 gap-4 py-4 px-6 text-sm space-y-5 md:space-y-0" onSubmit={handleSubmit}>
				{/* {age} */}
				<div>
					<label className="block font-medium mb-1 mt-1 text-headingGray">
						Partner's Age <span className="text-red-500">*</span>
					</label>
					<div className="rounded-md flex gap-4">
						<select
							className={`input-field text-gray-700 p-1 outline-none border`}
							name="age.min"
							value={formData.age.min}
							onChange={handleChange}
						>
							<option value="" disabled>Min</option>
							{partnerExpectations?.age.map((value, index) => (
								<option key={index} value={value}>
									{value}
								</option>
							))}
							{/* <option value="123123">Doesn't matter</option> */}
						</select>
						<select
							className={`input-field text-gray-700 p-1 outline-none border`}
							name="age.max"
							value={formData.age.max}
							onChange={handleChange}
						>
							<option value="" disabled>Max</option>
							{partnerExpectations.age.map((value, index) => (
								<option key={index} value={value}>
									{value}
								</option>
							))}
						</select>
					</div>
					{errors[ 'age.min' ] && <p className="text-red-500 text-xs">{errors[ 'age.min' ]}</p> || errors[ 'age.max' ] && <p className="text-red-500 text-xs">{errors[ 'age.max' ]}</p>}
					{errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
				</div>

				{/* height */}
				<div>
					<label className="block font-medium mb-1 mt-1 text-headingGray">Height <span className="text-red-500">*</span></label>
					<div className="rounded-md flex gap-4">
						<select
							className={`input-field text-gray-700 p-1 outline-none border`}
							name="height.feet"
							value={formData.height.feet}
							onChange={handleChange}
						>
							<option value="" disabled>Feet</option>
							{partnerExpectations.height.map((value, index) => (
								<option key={index} value={value}>
									{value}
								</option>
							))}
						</select>

						<select
							className={`input-field text-gray-700 p-1 outline-none border`}
							name="height.inches"
							value={formData.height.inches}
							onChange={handleChange}
						>
							<option value="" disabled>Inches</option>
							<option value="0">0</option>
							{partnerExpectations.height.map((value, index) => (
								<option key={index} value={value}>
									{value}
								</option>
							))}
						</select>
					</div>
					{errors[ 'height.feet' ] && <p className="text-red-500 text-xs">{errors[ 'height.feet' ]}</p>}
				</div>

				{/* Marital Status */}
				<div>
					<label className="block font-medium mb-1 mt-1 text-headingGray">
						Marital Status <span className="text-red-500"> *</span>
					</label>
					<select
						className={getInputClasses('maritalStatus')}
						name="maritalStatus"
						value={formData.maritalStatus}
						onChange={handleChange}
					>
						<option value="" disabled>Select</option>
						{maritalStatus.status.map((value, index) => (
							<option key={index} value={value}>
								{value.charAt(0).toUpperCase() + value.slice(1)}
							</option>
						))}
					</select>
					{errors.maritalStatus && <p className="text-red-500 text-xs mt-1">{errors.maritalStatus}</p>}
				</div>

				{/* Number of Children & Children Acceptable */}
				{isChildrenFieldsVisible() && (
					<>
						<div>
							<label className="block font-medium mb-1 mt-1 text-headingGray">
								Number of Children <span className="text-red-500">*</span>
							</label>
							<input
								type="number"
								className={getInputClasses('numberOfChildren')}
								name="numberOfChildren"
								value={formData.numberOfChildren}
								onChange={handleChange}
							/>
							{errors.numberOfChildren && <p className="text-red-500 text-xs mt-1">{errors.numberOfChildren}</p>}
						</div>
						<div>
							<label className="block font-medium mb-1 mt-1 text-headingGray">
								Children Acceptable <span className="text-red-500">*</span>
							</label>
							<select
								className={getInputClasses('childrenAcceptable')}
								name="childrenAcceptable"
								value={formData.childrenAcceptable}
								onChange={handleChange}
							>
								<option value="" disabled>Select</option>
								<option value="yes">Yes</option>
								<option value="no">No</option>
							</select>
							{errors.childrenAcceptable && <p className="text-red-500 text-xs mt-1">{errors.childrenAcceptable}</p>}
						</div>
					</>
				)}

				{/* Residence Country */}
				<div>
					<label className="block font-medium mb-1 mt-1 text-headingGray">
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
						{/* {countriesLoading && !countries.length && <option value="" disabled>Loading countries...</option>} */}
						{countriesWithDoesNotMatter?.country?.map((country, index) => (
							<option key={country._id} value={country._id}>
								{country.name.charAt(0).toUpperCase() + country.name.slice(1)}
							</option>
						))}
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
						{/* {religionLoading && !religions?.length && <option value="" disabled> Loading religion...</option>} */}
						{religions?.religion?.map((religion) => (
							<option key={religion._id} value={religion._id}>
								{religion.name}
							</option>
						))}
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
						{formData.religion == '' && <option value="" disabled>Fist Select religion</option>}
						{loading.caste && !casteList?.length && <option value="" disabled>Loading cast...</option>}
						{casteList?.caste?.map((caste) => (
							<option key={caste._id} value={caste._id}>
								{caste.name}
							</option>
						))}
					</select>
					{errors.caste && <p className="text-red-500 text-xs">{errors.caste}</p>}
				</div>

				{/* Sub Caste */}
				{/* <div>
					<label className="block font-medium mb-1 mt-1 text-headingGray">Sub Caste <span className="text-red-500">*</span></label>
					<input
						type="text"
						id="subCaste"
						className={getInputClasses('subCaste')}
						placeholder="SubCast"
						name="subCaste"
						value={formData.subCaste}
						onChange={handleChange}
					/>
					{errors.subCaste && <p className="text-red-500 text-xs">{errors.subCaste}</p>}
				</div> */}

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
						{/* {langLoading && !languages.length && <option>Loading languages...</option>} */}
						{languages?.language?.map((language) => (
							<option key={language._id} value={language._id}>
								{language.name}
							</option>
						))}
					</select>
					{errors.motherTongue && <p className="text-red-500 text-xs">{errors.motherTongue}</p>}
				</div>

				{/* Highest Education */}
				<div>
					<label className="block font-medium mb-1 mt-1 text-headingGray">
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
						{education?.education?.map((country) => (
							<option key={country._id} value={country._id} disabled={country.id == 1} className={`${country.id == 1 && 'bg-[#a6a6a6] text-white'}`}>
								{country.name.charAt(0).toUpperCase() + country.name.slice(1)}
							</option>
						))}
					</select>
					{errors.highestEducation && <p className="text-red-500 text-xs">{errors.highestEducation}</p>}
				</div>

				{/* Employed In */}
				<div>
					<label className="block font-medium mb-1 mt-1 text-headingGray">
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
						<option value="doesn't matter">Doesn't matter</option>
						{career.employedIn.map((value, index) => (
							<option key={index} value={value}>
								{value.charAt(0).toUpperCase() + value.slice(1)}
							</option>
						))}
					</select>
					{errors.employedIn && <p className="text-red-500 text-xs">{errors.employedIn}</p>}
				</div>
				{/* Occupation */}
				{/* {isNotEmployed() &&
					<> */}
				<div>
					<label className="block font-medium mb-1 mt-1 text-headingGray">
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
						{occupations?.occupation?.map((occupation) => (
							<optgroup
								label={occupation.occupationName}
								key={occupation.occupationName}
							>
								{occupation.roles.map((role) => (
									<option key={role.id} value={role.id}>
										{role.role}
									</option>
								))}
							</optgroup>
						))}
					</select>
					{errors.occupation && <p className="text-red-500 text-xs">{errors.occupation}</p>}
				</div>
				{/* Annual Income */}
				<div>
					<label className="block font-medium mb-1 mt-1 text-headingGray">
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
						<option value="doesn't matter">Doesn't matter</option>
						{career.annualIncome.map((value, index) => (
							<option key={index} value={value}>
								{value.charAt(0).toUpperCase() + value.slice(1)}
							</option>
						))}
					</select>
					{errors.annualIncome && <p className="text-red-500 text-xs">{errors.annualIncome}</p>}
				</div>
				{/* </>
				} */}
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
						<option value="doesn't matter">Doesn't matter</option>
						{lifestyle.smoke.map((value, index) => (
							<option key={index} value={value}>
								{value.charAt(0).toUpperCase() + value.slice(1)}
							</option>
						))}
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
						<option value="doesn't matter">Doesn't matter</option>
						{lifestyle.drink.map((value, index) => (
							<option key={index} value={value}>
								{value.charAt(0).toUpperCase() + value.slice(1)}
							</option>
						))}
					</select>
					{errors.drinkingAcceptable && <p className="text-red-500 text-xs">{errors.drinkingAcceptable}</p>}
				</div>

				{/* Dieting Acceptable */}
				<div>
					<label className="block font-medium mb-1 mt-1 text-headingGray">Diet <span className="text-red-500">*</span></label>
					<select
						id="dietingAcceptable"
						className={getInputClasses('dietingAcceptable')}
						name="dietingAcceptable"
						value={formData.dietingAcceptable}
						onChange={handleChange}
					>
						<option value="" disabled>Select</option>
						<option value="doesn't matter">Doesn't matter</option>
						{lifestyle.diet.map((value, index) => (
							<option key={index} value={value}>
								{value.charAt(0).toUpperCase() + value.slice(1)}
							</option>
						))}
					</select>
					{errors.dietingAcceptable && <p className="text-red-500 text-xs">{errors.dietingAcceptable}</p>}
				</div>

				{/* Body Type */}
				<div>
					<label className="block font-medium mb-1 mt-1 text-headingGray">
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
						<option value="doesn't matter">Doesn't matter</option>
						{PhysicalAttributesData.bodyType.map((value, index) => (
							<option key={index} value={value}>
								{value.charAt(0).toUpperCase() + value.slice(1)}
							</option>
						))}
					</select>
					{errors.bodyType && <p className="text-red-500 text-xs">{errors.bodyType}</p>}
				</div>

				{/* {preferredCountry} */}
				<div>
					<label className="block font-medium mb-1 mt-1 text-headingGray">
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
						{/* {countriesLoading && !countries.length && <option value="" disabled>Loading countries...</option>} */}
						{countriesWithDoesNotMatter?.country?.map((country, index) => (
							<option key={country._id} value={country._id}>
								{country.name.charAt(0).toUpperCase() + country.name.slice(1)}
							</option>
						))}
					</select>
					{errors.preferredCountry && <p className="text-red-500 text-xs">{errors.preferredCountry}</p>}
				</div>
				{/* State */}
				<div>
					<label className="block font-medium mb-1 mt-1 text-headingGray">
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
						{formData.country == '' && <option value="" disabled>Please Select country</option>}
						{/* {statesLoading && !states?.length && <option value="" disabled>Loading states...</option>} */}
						{stateList?.state?.map((state) => (
							<option key={state._id} value={state._id}>
								{state.name.charAt(0).toUpperCase() + state.name.slice(1)}
							</option>
						))}
					</select>
					{errors.preferredState && <p className="text-red-500 text-xs">{errors.preferredState}</p>}
				</div>

				{/* Complexion */}
				<div>
					<label className="block font-medium mb-1 mt-1 text-headingGray">
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
						<option value="doesn't matter">Doesn't matter</option>
						{PhysicalAttributesData.complexion.map((value, index) => (
							<option key={index} value={value}>
								{value.charAt(0).toUpperCase() + value.slice(1)}
							</option>
						))}
					</select>
					{errors.complexion && <p className="text-red-500 text-xs">{errors.complexion}</p>}
				</div>

				{/* {What we are looking for} */}
				<div className='col-span-2'>
					<label className="block font-medium mb-1 mt-1 text-headingGray">What we are looking for</label>
					<textarea
						type="text"
						rows="3"
						placeholder="General Requirement"
						name="lookingFor"
						className={getInputClasses('lookingFor')}
						value={formData.lookingFor}
						onChange={handleChange}
					></textarea>
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
