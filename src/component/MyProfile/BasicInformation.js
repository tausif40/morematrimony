import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { maritalStatus } from '../../data/MyProfileData';

const BasicInformationForm = ({ data, onFormSubmit }) => {
	const [ numberOfChildren, setNumberOfChildren ] = useState();
	const { basicInfo, isLoading } = data;
	const [ formData, setFormData ] = useState({
		firstName: '',
		lastName: '',
		dateOfBirth: '',
		gender: '',
		onBehalf: '',
		maritalStatus: '',
		numberOfChildren: ''
	});

	useEffect(() => {
		if (basicInfo) {
			setFormData({
				firstName: basicInfo.firstName || '',
				lastName: basicInfo.lastName || '',
				dateOfBirth: basicInfo.dateOfBirth ? basicInfo.dateOfBirth.split('T')[ 0 ] : '',
				gender: basicInfo.gender || '',
				onBehalf: basicInfo.onBehalf || '',
				maritalStatus: basicInfo.maritalStatus || '',
				numberOfChildren: basicInfo.numberOfChildren || ''
			});
		}
	}, [ basicInfo ]);

	const validateDOB = (dob) => {
		const today = new Date();
		const selectedDate = new Date(dob);
		const minAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

		return selectedDate <= minAgeDate;
	};

	const [ errors, setErrors ] = useState({});

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		setErrors((prevErrors) => ({
			...prevErrors,
			[ name ]: '',
		}));

		if (name === 'dateOfBirth') {
			if (!validateDOB(value)) {
				setErrors((prev) => ({ ...prev, [ name ]: 'You must be at least 18 years old.' }));
			} else {
				setErrors((prev) => ({ ...prev, [ name ]: '' }));
			}
		}

		setFormData((prevFormData) => ({
			...prevFormData,
			[ name ]: value,
		}));

	};

	const validateForm = () => {
		const newErrors = {};
		if (!formData.firstName) newErrors.firstName = 'First Name is required';
		if (!formData.lastName) newErrors.lastName = 'Last Name is required';
		if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';
		if (!validateDOB(formData.dateOfBirth)) newErrors.dateOfBirth = 'You must be at least 18 years old.'
		if (!formData.gender) newErrors.gender = 'Gender is required';
		if (!formData.maritalStatus) newErrors.maritalStatus = 'Marital Status is required';
		if (!formData.onBehalf) newErrors.onBehalf = 'On Behalf is required';
		// if (formData.ProfilePhoto  === null) newErrors.ProfilePhoto = 'Profile Photo is required';
		if (formData.maritalStatus !== 'single' && !numberOfChildren) {
			newErrors.numberOfChildren = 'Number of Children is required';
		}
		return newErrors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("before submit - ", formData);
		const newErrors = validateForm();
		if (Object.keys(newErrors).length === 0) {
			setErrors({})
			if (formData.maritalStatus !== 'single') {
				setFormData((previousData) => ({
					...previousData,
					numberOfChildren: numberOfChildren
				}));
			} else {
				delete formData.numberOfChildren;
			}
			onFormSubmit({ basicInformation: formData });
		} else {
			setErrors(newErrors);
			toast.error('Please correct all highlighted errors!');
		}
	};

	const getInputClasses = (fieldName) => `input-field ${errors[ fieldName ] && 'border-red-500'} text-gray-700`;

	return (
		<div className="box-shadow bg-white border rounded-md mx-auto">
			<p className="px-6 py-3 font-medium border-b text-headingGray">Basic Information</p>
			<form
				className="md:grid grid-cols-2 gap-4 py-4 px-6 text-sm space-y-5 md:space-y-0"
				onSubmit={handleSubmit}
			>
				{/* First Name */}
				<div>
					<label htmlFor="firstName" className="block font-medium mb-1 mt-1 text-headingGray">
						First Name<span className="text-red-500"> *</span>
					</label>
					<input
						type="text"
						id="firstName"
						className={getInputClasses('firstName')}
						placeholder="First Name"
						name="firstName"
						value={formData.firstName}
						onChange={handleChange}
					/>
					{errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
				</div>

				{/* Last Name */}
				<div>
					<label htmlFor="lastName" className="block font-medium mb-1 mt-1 text-headingGray">
						Last Name<span className="text-red-500"> *</span>
					</label>
					<input
						type="text"
						id="lastName"
						className={getInputClasses('lastName')}
						placeholder="Last Name"
						name="lastName"
						value={formData.lastName}
						onChange={handleChange}
					/>
					{errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
				</div>

				{/* Date of Birth */}
				<div>
					<label htmlFor="dateOfBirth" className="block font-medium mb-1 mt-1 text-headingGray">
						Date of Birth<span className="text-red-500"> *</span>
					</label>
					<input
						type="date"
						id="dateOfBirth"
						className={getInputClasses('dateOfBirth')}
						name="dateOfBirth"
						value={formData.dateOfBirth}
						onChange={handleChange}
					/>
					{errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
				</div>

				{/* Gender */}
				<div>
					<label htmlFor="gender" className="block font-medium mb-1 mt-1 text-headingGray">
						Gender<span className="text-red-500"> *</span>
					</label>
					<select
						id="gender"
						className={`${getInputClasses('gender')}`}
						name="gender"
						value={formData.gender}
						onChange={handleChange}
					>
						<option value="" disabled>Select</option>
						<option value="male">Male</option>
						<option value="female">Female</option>
						<option value="other">Other</option>
					</select>
					{errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
				</div>

				{/* Marital Status */}
				<div>
					<label htmlFor="maritalStatus" className="block font-medium mb-1 mt-1 text-headingGray">
						Marital Status<span className="text-red-500"> *</span>
					</label>
					<select
						id="maritalStatus"
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

				{/* Number of Children */}
				{(formData.maritalStatus === 'married' || formData.maritalStatus === 'divorced' || formData.maritalStatus === 'widowed') && (
					<div>
						<label htmlFor="numberOfChildren" className="block font-medium mb-1 mt-1 text-headingGray">
							Number of Children<span className="text-red-500"> *</span>
						</label>
						<input
							type="number"
							id="numberOfChildren"
							className={getInputClasses('numberOfChildren')}
							name="numberOfChildren"
							value={numberOfChildren}
							onChange={(e) => {
								handleChange(e);
								setNumberOfChildren(e.target.value);
							}}
						/>
						{errors.numberOfChildren && (
							<p className="text-red-500 text-xs mt-1">{errors.numberOfChildren}</p>
						)}
					</div>
				)}

				{/* On Behalf */}
				<div>
					<label htmlFor="onBehalf" className="block font-medium mb-1 mt-1 text-headingGray">
						On Behalf<span className="text-red-500"> *</span>
					</label>
					<select
						id="onBehalf"
						className={getInputClasses('onBehalf')}
						name="onBehalf"
						value={formData.onBehalf}
						onChange={handleChange}
					>
						<option value="" disabled>Select</option>
						{maritalStatus?.onBehalf?.map((value, index) => (
							<option key={index} value={value}>
								{value.charAt(0).toUpperCase() + value.slice(1)}
							</option>
						))}
					</select>
					{errors.onBehalf && <p className="text-red-500 text-xs mt-1">{errors.onBehalf}</p>}
				</div>

				<div className="col-span-2 flex justify-end mt-4">
					<button type="submit" className="gradient-btn px-4 py-2 rounded-md text-sm" disabled={isLoading}>Update</button>
				</div>
			</form>
		</div>
	);
};

export default BasicInformationForm;
