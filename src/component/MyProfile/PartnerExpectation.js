import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { indiaId } from '../../data/config';
import { partnerExpectations, maritalStatus, career, lifestyle } from '../../data/MyProfileData';
import apiClient from '../../lib/apiClient';
import MultiSelectDropdown from '../../utils/ui/MultiSelectDropdown';
import MultiDropdown from '../../utils/ui/MultiDropdown';
import OptgroupOptionSelect from '../../utils/ui/OptgroupOptionSelect';
import { getUserDetails } from '../../store/features/userDetails-slice';
import { useDispatch } from 'react-redux';
import { IoCheckmarkDoneOutline } from "react-icons/io5";

const PartnerExpectation = ({ data }) => {
	const dispatch = useDispatch();
	const { partnerExpectation, countriesWithDoesNotMatter, religions, occupations, education, languages } = data
	const [ stateList, setStateList ] = useState([])
	const [ casteList, setCasteList ] = useState([])
	const [ selectedCastBackup, setSelectedCastBackup ] = useState([]);
	const [ selectedCast, setSelectedCast ] = useState([]);
	const [ motherTongue, setMotherTongue ] = useState([]);
	const [ educationIds, setEducationIds ] = useState([]);
	const [ employedIn, setEmployedIn ] = useState([]);
	const [ occupation, setOccupation ] = useState([]);
	const [ preferredCountry, setPreferredCountry ] = useState([]);
	const [ preferState, setPreferState ] = useState([]);
	const [ bodyType, setBodyType ] = useState([]);
	const [ complexion, setComplexion ] = useState([]);
	const [ loading, setLoading ] = useState({ state: false, caste: false });


	useEffect(() => { fetchData(`/state?countryId=${indiaId}`, setStateList, 'state'); }, [])

	const [ formData, setFormData ] = useState({
		age: { min: '', max: '' },
		height: { feet: '', inches: '' },
		maritalStatus: '',
		// residencyCountry: [],
		// numberOfChildren: '',
		childrenAcceptable: '',
		motherTongue: [],
		religion: '',
		caste: [],
		highestEducation: [],
		employedIn: [],
		occupation: [],
		annualIncome: '',
		dietingAcceptable: '',
		drinkingAcceptable: '',
		smokingAcceptable: '',
		bodyType: [],
		preferredCountry: [],
		preferState: [],
		complexion: [],
		lookingFor: ''
	});

	useEffect(() => {
		setFormData((prev) => ({
			...prev,
			// residencyCountry: residencyCountryIds,
			caste: selectedCast,
			motherTongue: motherTongue,
			highestEducation: educationIds,
			employedIn: employedIn,
			occupation: occupation,
			preferredCountry: preferredCountry,
			preferState: preferState,
			bodyType: bodyType,
			complexion: complexion
		}));
	}, [ selectedCast, motherTongue, educationIds, employedIn, occupation, preferState, preferredCountry, bodyType, complexion ]);


	useEffect(() => {
		// console.log("partnerExpectation-", partnerExpectation);
		if (partnerExpectation) {
			setFormData({
				age: { min: partnerExpectation?.age?.min, max: partnerExpectation?.age?.max },
				height: { feet: partnerExpectation?.height?.feet, inches: partnerExpectation?.height?.inches },
				maritalStatus: partnerExpectation?.maritalStatus,
				childrenAcceptable: partnerExpectation?.childrenAcceptable,
				religion: partnerExpectation?.religion?._id || '',
				caste: partnerExpectation?.caste?.map(item => item._id) || [],
				motherTongue: partnerExpectation?.motherTongue?.map(item => item._id) || [],
				highestEducation: partnerExpectation?.highestEducation?.map(item => item._id) || [],
				employedIn: partnerExpectation?.employedIn || [],
				occupation: partnerExpectation?.occupation?.map(item => item._id) || [],
				annualIncome: partnerExpectation?.annualIncome || '',
				dietingAcceptable: partnerExpectation?.dietingAcceptable || '',
				drinkingAcceptable: partnerExpectation?.drinkingAcceptable || '',
				smokingAcceptable: partnerExpectation?.smokingAcceptable || '',
				bodyType: partnerExpectation?.bodyType || [],
				preferredCountry: partnerExpectation?.preferredCountry?.map(item => item._id) || [],
				preferState: partnerExpectation?.preferState?.map(item => item._id) || [],
				complexion: partnerExpectation?.complexion || [],
				lookingFor: partnerExpectation?.lookingFor || ''
			});
			setSelectedCast(partnerExpectation?.caste || [])
			setSelectedCastBackup(partnerExpectation?.caste || [])
			setMotherTongue(partnerExpectation?.motherTongue || [])
			setEducationIds(partnerExpectation?.highestEducation || [])
			setEmployedIn(partnerExpectation?.employedIn || [])
			setOccupation(partnerExpectation?.occupation || [])
			setPreferredCountry(partnerExpectation?.preferredCountry || [])
			setPreferState(partnerExpectation?.preferState || [])
			setBodyType(partnerExpectation?.bodyType || [])
			setComplexion(partnerExpectation?.complexion || [])
		}
		if (partnerExpectation?.religion?._id) {
			fetchCaste(partnerExpectation?.religion._id);
		}
	}, [ partnerExpectation ])
	// console.log(formData);

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

	const fetchCaste = (religionId) => fetchData(`/caste?religionId=${religionId}`, setCasteList, 'caste');
	// const fetchState = (countryId) => fetchData(`/state?countryId=${countryId}`, setStateList, 'state');
	// const fetchCity = (stateId) => fetchData(`/city?stateId=${stateId}`, setCityList, 'city');
	// const fetchRashi = (starId) => fetchData(`/rashiSign?starId=${starId}`, setRashiSignsList, 'rashi');


	const [ errors, setErrors ] = useState({});


	const validateForm = () => {
		let formErrors = {};

		// Validate required fields
		Object.keys(formData).forEach((field) => {
			if (!formData[ field ] && ![ 'childrenAcceptable', 'lookingFor' ].includes(field)) {
				const formattedKey = field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
				formErrors[ field ] = `${formattedKey} is required`;
			}

			// Validate nested fields
			if (field === 'age') {
				if (!formData.age.min) {
					formErrors[ 'age.min' ] = 'Min age is required';
				} else if (!formData.age.max) {
					formErrors[ 'age.max' ] = 'Max age is required';
				} else if (parseInt(formData.age.min) >= parseInt(formData.age.max)) {
					formErrors.age = 'Min age should be less than max age';
				}
			}

			if (field === 'height') {
				if (!formData.height.feet || isNaN(parseInt(formData.height.feet))) {
					formErrors[ 'height.feet' ] = 'Height (feet) is required and must be numeric';
				}
				if (formData.height.inches && isNaN(parseInt(formData.height.inches))) {
					formErrors[ 'height.inches' ] = 'Height (inches) must be numeric';
				}
			}

			// Validate array fields
			if (Array.isArray(formData[ field ]) && formData[ field ].length === 0) {
				const formattedKey = field
					.replace(/([A-Z])/g, ' $1')
					.replace(/^./, (str) => str.toUpperCase());
				formErrors[ field ] = `${formattedKey} must have at least one selection`;
			}
		});

		// Additional validations for children fields
		if (isChildrenFieldsVisible()) {
			// if (!formData.numberOfChildren) {
			// 	formErrors.numberOfChildren = 'Number of children is required';
			// }
			if (!formData.childrenAcceptable) {
				formErrors.childrenAcceptable = 'Children acceptable is required';
			}
		}
		if (!formData.lookingFor) {
			formErrors.lookingFor = 'What we are looking for description is required';
		}

		setErrors(formErrors);
		return Object.keys(formErrors).length === 0;
	};

	const validateFormData = (data) => {
		const cleanedData = {
			age: data.age, // Always include age
			height: data.height // Always include height
		};

		Object.keys(data).forEach((key) => {
			if (key === "age" || key === "height") return;

			const value = data[ key ];

			// Allow only primitive values (string, number) and arrays of primitives
			if (Array.isArray(value)) {
				if (value.every(item => typeof item !== 'object' || item === null)) {
					cleanedData[ key ] = value.filter(item => item !== null);
				}
			} else if (typeof value !== 'object' || value === null) {
				cleanedData[ key ] = value;
			}
		});

		return cleanedData;
	};

	const isChildrenFieldsVisible = () => {
		if (formData.maritalStatus === 'single') {
			// delete formData.numberOfChildren;
			delete formData.childrenAcceptable;
		} else if (formData.lookingFor === "") delete formData.lookingFor;

		return (formData.maritalStatus !== 'single' && formData.maritalStatus !== '')
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const validatedData = validateFormData(formData);
		// console.log("Final FormData to Submit:", validatedData);
		if (!formData.height.inches) delete formData.height.inches;
		if (!validateForm()) {
			toast.error('Please fill in all required fields');
			return;
		}

		const loadingToast = toast.loading('Updating.....');
		try {
			const response = await apiClient.patch('/user/update-partnerExpectation', { partnerExpectation: validatedData });
			console.log(response);
			if (response?.status === 200) {
				toast.success('Update successful!', { id: loadingToast });
				dispatch(getUserDetails());
			}
		} catch (error) {
			console.log(error)
			toast.error(error?.response?.data?.message || 'Upload failed', { id: loadingToast });
		} finally {
			setTimeout(() => {
				toast.dismiss(loadingToast);
			}, 3000);
			// toast.dismiss(loadingToast);
		}

		// console.log("formData=", formData);
		// onFormSubmit({ partnerExpectation: validatedData });
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

		if (name === 'religion') {
			if (partnerExpectation?.religion?._id === value) {
				setSelectedCast(selectedCastBackup)
			} else {
				setSelectedCast([])
			}
			setCasteList('')
			fetchCaste(value);
		}

		setErrors((prevErrors) => ({ ...prevErrors, [ name ]: '' }));
	};

	const handleMultiSelectChange = (name, selectedItems) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			[ name ]: selectedItems
		}));

		setErrors((prevErrors) => ({
			...prevErrors, [ name ]: ''
		}));
	};

	const getInputClasses = (fieldName) => `input-field ${errors[ fieldName ] && 'border-red-500'} text-gray-700`;

	return (
		<div className="box-shadow bg-white border rounded-md mx-auto overflow-visible">
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
							value={formData?.age?.min}
							onChange={handleChange}
						>
							<option value="" disabled>Min</option>
							{partnerExpectations?.age?.map((value, index) => (
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
								Children Acceptable <span className="text-red-500">*</span>
							</label>
							<select
								className={getInputClasses('childrenAcceptable')}
								name="childrenAcceptable"
								value={formData.childrenAcceptable}
								onChange={handleChange}
							>
								<option value="">Select</option>
								<option value="yes">Yes</option>
								<option value="no">No</option>
							</select>
							{errors.childrenAcceptable && <p className="text-red-500 text-xs mt-1">{errors.childrenAcceptable}</p>}
						</div>
					</>
				)}

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
				<div className=''>
					<label className="block font-medium mb-1 mt-1 text-headingGray">Caste <span className="text-red-500">*</span></label>
					<MultiSelectDropdown
						dataList={casteList?.caste}
						savedItems={selectedCast}
						onSelectionChange={(selectedItems) => handleMultiSelectChange('caste', selectedItems)}
						fieldName={'Select Caste'} />
					{errors.caste && <p className="text-red-500 text-xs">{errors.caste}</p>}
				</div>

				{/* Mother Tongue */}
				<div>
					<label className="block font-medium mb-1 mt-1 text-headingGray">Language<span className="text-red-500"> *</span></label>
					<MultiSelectDropdown
						dataList={languages?.language}
						savedItems={motherTongue}
						onSelectionChange={(selectedItems) => handleMultiSelectChange('motherTongue', selectedItems)}
						fieldName={'Select Mother Tongue'} />
					{errors.motherTongue && <p className="text-red-500 text-xs">{errors.motherTongue}</p>}
				</div>

				{/* Highest Education */}
				<div>
					<label className="block font-medium mb-1 mt-1 text-headingGray">
						Education <span className="text-red-500">*</span>
					</label>
					<OptgroupOptionSelect
						dataList={education?.education}
						savedItems={educationIds}
						onSelectionChange={(selectedItems) => handleMultiSelectChange('highestEducation', selectedItems)}
						fieldName={'Select Education'} />
					{errors.highestEducation && <p className="text-red-500 text-xs">{errors.highestEducation}</p>}
				</div>

				{/* Employed In */}
				<div>
					<label className="block font-medium mb-1 mt-1 text-headingGray">
						Employed In <span className="text-red-500">*</span>
					</label>
					<MultiDropdown
						dataList={career.employedIn}
						savedItems={employedIn}
						onSelectionChange={(selectedItems) => handleMultiSelectChange('employedIn', selectedItems)}
						fieldName={'Select Employed in'} />
					{/* <select
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
					</select> */}
					{errors.employedIn && <p className="text-red-500 text-xs">{errors.employedIn}</p>}
				</div>

				{/* Occupation */}
				<div>
					<label className="block font-medium mb-1 mt-1 text-headingGray">
						Occupation <span className="text-red-500">*</span>
					</label>
					<OptgroupOptionSelect
						dataList={occupations?.occupation}
						savedItems={occupation}
						onSelectionChange={(selectedItems) => handleMultiSelectChange('occupation', selectedItems)}
						fieldName={'Select Occupation'} />
					{/* <select
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
					</select> */}
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
					<MultiDropdown
						dataList={partnerExpectations.bodyType}
						savedItems={bodyType}
						onSelectionChange={(selectedItems) => handleMultiSelectChange('bodyType', selectedItems)}
						fieldName={'Select Body Type'} />
					{/* <select
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
					</select> */}
					{errors.bodyType && <p className="text-red-500 text-xs">{errors.bodyType}</p>}
				</div>

				{/* {preferredCountry} */}
				<div>
					<label className="block font-medium mb-1 mt-1 text-headingGray">
						Preferred Country <span className="text-red-500">*</span>
					</label>
					<MultiSelectDropdown
						dataList={countriesWithDoesNotMatter?.country}
						savedItems={preferredCountry}
						onSelectionChange={(selectedItems) => handleMultiSelectChange('preferredCountry', selectedItems)}
						fieldName={'Select Country'} />
					{/* <select
						id="preferredCountry"
						className={getInputClasses('preferredCountry')}
						name="preferredCountry"
						value={formData.preferredCountry}
						onChange={handleChange}
					>
						<option value="" disabled>Select preferred country</option>
						{countriesWithDoesNotMatter?.country?.map((country, index) => (
							<option key={country._id} value={country._id}>
								{country.name.charAt(0).toUpperCase() + country.name.slice(1)}
							</option>
						))}
					</select> */}
					{errors.preferredCountry && <p className="text-red-500 text-xs">{errors.preferredCountry}</p>}
				</div>
				{/* State */}
				<div>
					<label className="block font-medium mb-1 mt-1 text-headingGray">
						Prefer State <span className="text-red-500">*</span>
					</label>
					<MultiSelectDropdown
						dataList={stateList?.state}
						savedItems={preferState}
						onSelectionChange={(selectedItems) => handleMultiSelectChange('preferState', selectedItems)}
						fieldName={'Select Country'} />
					{/* <select
						id="preferState"
						className={getInputClasses('preferState')}
						name="preferState"
						value={formData.preferState}
						onChange={handleChange}
					>
						<option value="" disabled>Select preferred state</option>
						{formData.country  === '' && <option value="" disabled>Please Select country</option>}
						{stateList?.state?.map((state) => (
							<option key={state._id} value={state._id}>
								{state.name.charAt(0).toUpperCase() + state.name.slice(1)}
							</option>
						))}
					</select> */}
					{errors.preferState && <p className="text-red-500 text-xs">{errors.preferState}</p>}
				</div>

				{/* Complexion */}
				<div>
					<label className="block font-medium mb-1 mt-1 text-headingGray">
						Complexion <span className="text-red-500">*</span>
					</label>
					<MultiDropdown
						dataList={partnerExpectations.complexion}
						savedItems={complexion}
						onSelectionChange={(selectedItems) => handleMultiSelectChange('complexion', selectedItems)}
						fieldName={'Select Body Type'} />
					{errors.complexion && <p className="text-red-500 text-xs">{errors.complexion}</p>}
				</div>

				{/* {What we are looking for} */}
				<div className='col-span-2'>
					<label className="block font-medium mb-1 mt-1 text-headingGray">What we are looking for <span className='text-red-500'>*</span></label>
					<textarea
						type="text"
						rows="4"
						placeholder="General Requirement"
						name="lookingFor"
						className={getInputClasses('lookingFor')}
						value={formData.lookingFor}
						onChange={handleChange}
					></textarea>
					{errors.lookingFor && <p className="text-red-500 text-xs">{errors.lookingFor}</p>}
				</div>

				{/* Submit Button */}
				<div className="col-span-2 flex justify-between items-center mt-4">
					<p className="text-green-500 text-xs font-semibold mt-1">{partnerExpectation !== undefined && <p className='flex items-center gap-1'>Completed <IoCheckmarkDoneOutline size={16} /></p>}</p>
					<button type="submit" className="gradient-btn px-4 py-2 rounded-md text-sm">Update</button>
				</div>

			</form>
		</div>
	);
};

export default PartnerExpectation;
