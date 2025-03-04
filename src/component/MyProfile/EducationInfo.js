import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const EducationInfo = ({ onFormSubmit, data }) => {

	const { education, educationInfo, isLoading } = data;

	const [ formData, setFormData ] = useState({
		highestEducation: '',
		educationDetail: '',
		institution: '',
	});


	useEffect(() => {
		if (educationInfo) {
			setFormData({
				highestEducation: educationInfo?.highestEducation?._id || '',
				educationDetail: educationInfo?.educationDetail || '',
				institution: educationInfo?.institution || '',
			});
		}
	}, [ educationInfo ]);


	const [ errors, setErrors ] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();

		const validationErrors = {};
		if (!formData.highestEducation) validationErrors.highestEducation = 'Highest Education is required';
		if (!formData.educationDetail) validationErrors.educationDetail = 'Education Details are required';
		if (!formData.institution) validationErrors.institution = 'College / Institution is required';

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			toast.error('Please correct all highlighted errors!');
		} else {
			onFormSubmit({ educationalDetails: formData });
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
			<p className="px-6 py-3 font-medium border-b text-headingGray">Education Details</p>
			<form className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 px-6" onSubmit={handleSubmit}>
				{/* Highest Education */}
				{/* <div>
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
						{education?.education?.map((country) => (
							<option key={country._id} value={country._id} disabled={country.id  === 1} className={`${country.id  === 1 && 'bg-[#a6a6a6] text-white'}`}>
								{country.name.charAt(0).toUpperCase() + country.name.slice(1)}
							</option>
						))}
					</select>
					{errors.highestEducation && <p className="text-red-500 text-xs">{errors.highestEducation}</p>}
				</div> */}

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
						<option value="" disabled>Select highestEducation</option>
						{education?.education?.map((education,) => (
							<optgroup
								label={education.name}
								key={education.name}
							>
								{education.roles.map((role) => (
									<option key={role._id} value={role._id}>
										{role.role}
									</option>
								))}
							</optgroup>
						))}
					</select>
					{errors.highestEducation && <p className="text-red-500 text-xs">{errors.highestEducation}</p>}
				</div>

				{/* Education in Detail */}
				<div>
					<label htmlFor="educationDetail" className="block font-medium mb-1 mt-1 text-headingGray">
						Education in Detail <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						id="educationDetail"
						className={getInputClasses('educationDetail')}
						placeholder="Education in Detail"
						name="educationDetail"
						value={formData.educationDetail}
						onChange={handleChange}
					/>
					{errors.educationDetail && <p className="text-red-500 text-xs">{errors.educationDetail}</p>}
				</div>

				{/* College / Institution */}
				<div className="col-span-2">
					<label htmlFor="institution" className="block font-medium mb-1 mt-1 text-headingGray">
						College / Institution <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						id="institution"
						className={getInputClasses('institution')}
						placeholder="College / Institution"
						name="institution"
						value={formData.institution}
						onChange={handleChange}
					/>
					{errors.institution && <p className="text-red-500 text-xs">{errors.institution}</p>}
				</div>

				{/* Submit Button */}
				<div className="col-span-2 flex justify-end mt-4">
					<button type="submit" className="gradient-btn px-4 py-2 rounded-md text-sm" disabled={isLoading}>Update</button>
				</div>
			</form >
		</div >
	);
};

export default EducationInfo;
