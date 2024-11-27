import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { partnerExpectations, maritalStatus, career } from '../../utils/data/MyProfileData';
import {
	fetchCountries, fetchStates, fetchCities, fetchReligions, fetchCaste, fetchDivision, fetchStars, fetchRashiSigns, fetchZodiac
} from '../../store/features/profileData-slice';

const PartnerExpectation = () => {
	const dispatch = useDispatch();
	const { data: countries, loading: countriesLoading, error: countriesError } = useSelector((state) => state.profileData.countries);
	const { data: states, loading: statesLoading, error: statesError } = useSelector((state) => state.profileData.states);
	const { data: cities, loading: citiesLoading, error: citiesError } = useSelector((state) => state.profileData.cities);
	const { data: religions, loading: religionLoading, error: religionError } = useSelector((state) => state.profileData.religions);
	const { data: casteList, loading: casteLoading, error: casteError } = useSelector((state) => state.profileData.caste);
	const { data: division, loading: divisionLoading, error: divisionError } = useSelector((state) => state.profileData.division);
	const { data: stars, loading: starsLoading, error: starsError } = useSelector((state) => state.profileData.stars);
	const { data: rashiSigns, loading: rashiSignsLoading, error: rashiSignsError } = useSelector((state) => state.profileData.rashiSigns);
	const { data: zodiac, loading: zodiacLoading, error: zodiacError } = useSelector((state) => state.profileData.zodiac);

	useEffect(() => {
		dispatch(fetchCountries());
	}, [ dispatch ]);

	const [ formData, setFormData ] = useState({
		brideAge: { minAge: '', maxAge: '' },
		height: { feet: '', inches: '' },
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

		if (!formData.brideAge.minAge || !formData.brideAge.maxAge) {
			formErrors.brideAge = 'Bride age (min and max) is required';
		} else if (parseInt(formData.brideAge.minAge) >= parseInt(formData.brideAge.maxAge)) {
			formErrors.brideAge = 'Min age should be less than max age';
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
	const isNotEmployed = () => {
		if (formData.employedIn == 'not working' || formData.employedIn == "doesn't matter") {
			delete formData.occupation;
			delete formData.annualIncome;
		}
		return (formData.employedIn !== 'not working' && formData.employedIn !== "doesn't matter" && formData.employedIn !== "")
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("isChildrenFieldsVisible - ", isChildrenFieldsVisible());
		console.log("isNotEmployed - ", isNotEmployed());
		if (!validateForm()) {
			toast.error('Please fill in all required fields');
			return;
		}
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

		if (name.includes('brideAge') || name.includes('height')) {
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

		// Remove error once the field is corrected
		setErrors((prevErrors) => ({ ...prevErrors, [ name ]: '' }));
	};

	// Get input classes for error styling
	const getInputClasses = (fieldName) => `input-field ${errors[ fieldName ] && 'border-red-500'} text-gray-700`;

	return (
		<div className="box-shadow bg-white border rounded-md mx-auto">
			<p className="px-6 py-3 font-medium border-b text-headingGray">Partner Expectation</p>
			<form className="md:grid grid-cols-2 gap-4 py-4 px-6 text-sm space-y-5 md:space-y-0" onSubmit={handleSubmit}>
				{/* {brideAge} */}
				<div>
					<label className="block font-medium mb-1 mt-1 text-headingGray">
						Partner's Age <span className="text-red-500">*</span>
					</label>
					<div className="rounded-md flex gap-4">
						<select
							className={`input-field text-gray-700 p-1 outline-none border`}
							name="brideAge.minAge"
							value={formData.brideAge.minAge}
							onChange={handleChange}
						>
							<option value="" disabled>Min</option>
							{partnerExpectations.age.map((value, index) => (
								<option key={index} value={value}>
									{value}
								</option>
							))}
						</select>
						<select
							className={`input-field text-gray-700 p-1 outline-none border`}
							name="brideAge.maxAge"
							value={formData.brideAge.maxAge}
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
					{errors.brideAge && <p className="text-red-500 text-xs">{errors.brideAge}</p>}
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
						{countriesLoading && !countries.length && <option value="" disabled>Loading countries...</option>}
						{countries?.country?.map((country, index) => (
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
						{career.employedIn.map((value, index) => (
							<option key={index} value={value}>
								{value.charAt(0).toUpperCase() + value.slice(1)}
							</option>
						))}
						<option value="doesn't matter">Doesn't matter</option>
					</select>
					{errors.employedIn && <p className="text-red-500 text-xs">{errors.employedIn}</p>}
				</div>
				{/* Occupation */}
				{isNotEmployed() &&
					<>
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
								{career.annualIncome.map((value, index) => (
									<option key={index} value={value}>
										{value.charAt(0).toUpperCase() + value.slice(1)}
									</option>
								))}
								<option value="doesn't matter">Doesn't matter</option>
							</select>
							{errors.annualIncome && <p className="text-red-500 text-xs">{errors.annualIncome}</p>}
						</div>
					</>
				}
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
