import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { career } from '../../utils/data/MyProfileData';

const Career = ({ data, onFormSubmit }) => {

	const { countries, countriesLoading, occupations } = data;

	const [ formData, setFormData ] = useState({
		employedIn: '',
		occupation: '',
		occupationDetails: '',
		organizationName: '',
		jobLocation: '',
		annualIncome: '',
	});
	const [ errors, setErrors ] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();
		let validationErrors = {};
		if (!formData.employedIn) validationErrors.employedIn = 'Employed in is required';
		if (!formData.occupation) validationErrors.occupation = 'Occupation is required';
		if (!formData.occupationDetails) validationErrors.occupationDetails = 'Occupation details are required';
		if (!formData.organizationName) validationErrors.organizationName = 'organization Name is required';
		if (!formData.jobLocation) validationErrors.jobLocation = 'Job location is required';
		if (!formData.annualIncome) validationErrors.annualIncome = 'Annual income is required';

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			toast.error('Please correct all highlighted errors!');
		} else {
			onFormSubmit({ career: formData });
		}
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

	const getInputClasses = (fieldName) => `input-field ${errors[ fieldName ] && 'border-red-500'} text-gray-700`;

	return (
		<div className="box-shadow bg-white border rounded-md mx-auto">
			<p className="px-6 py-3 font-medium border-b text-headingGray">Career</p>
			<form className="md:grid grid-cols-2 gap-4 py-4 px-6 text-sm space-y-5 md:space-y-0" onSubmit={handleSubmit}>

				{/* career */}
				<div className="col-span-2">
					<label htmlFor="employedIn" className="block font-medium mb-1 mt-1 text-headingGray">
						Employed in <span className="text-red-500">*</span>
					</label>
					<div className="flex flex-wrap gap-8 items-center border rounded-md p-3 text-gray-700">
						{career.employedIn.map((option) => (
							<label key={option} className="flex items-center gap-1">
								<input
									type="radio"
									name="employedIn"
									value={option}
									onChange={handleChange}
									checked={formData.employedIn === option}
								/>
								<p>{option.charAt(0).toUpperCase() + option.slice(1)}</p>
							</label>
						))}
					</div>
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
						{occupations?.occupation?.map((occupation,) => (
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

				{/* Occupation in Detail */}
				<div>
					<label htmlFor="occupationDetails" className="block font-medium mb-1 mt-1 text-headingGray">
						Occupation in Detail <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						id="occupationDetails"
						className={getInputClasses('occupationDetails')}
						placeholder="Occupation Details"
						name="occupationDetails"
						value={formData.occupationDetails}
						onChange={handleChange}
					/>
					{errors.occupationDetails && <p className="text-red-500 text-xs">{errors.occupationDetails}</p>}
				</div>

				{/* organization */}
				<div>
					<label htmlFor="organizationName" className="block font-medium mb-1 mt-1 text-headingGray">
						organization Name <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						id="organizationName"
						className={getInputClasses('organizationName')}
						placeholder="Occupation Details"
						name="organizationName"
						value={formData.organizationName}
						onChange={handleChange}
					/>
					{errors.organizationName && <p className="text-red-500 text-xs">{errors.organizationName}</p>}
				</div>

				{/* Job Location  */}
				<div>
					<label htmlFor="jobLocation" className="block font-medium mb-1 mt-1 text-headingGray">
						Job Location <span className="text-red-500">*</span>
					</label>
					<select
						id="jobLocation"
						className={getInputClasses('jobLocation')}
						name="jobLocation"
						value={formData.jobLocation}
						onChange={handleChange}
					>
						<option value="" disabled>Select Country</option>
						{countriesLoading && !countries.length && <option>Loading countries...</option>}
						{countries?.country?.map((country) => (
							<option key={country.id} value={country._id}>
								{country.name}
							</option>
						))}
					</select>
					{errors.jobLocation && <p className="text-red-500 text-xs">{errors.jobLocation}</p>}
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
					</select>
					{errors.annualIncome && <p className="text-red-500 text-xs">{errors.annualIncome}</p>}
				</div>

				<div className="col-span-2 flex justify-end mt-4">
					<button type="submit" className="gradient-btn px-4 py-2 rounded-md text-sm">Update</button>
				</div>
			</form>
		</div>
	);
};

export default Career;
