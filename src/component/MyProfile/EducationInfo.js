import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const EducationInfo = () => {
	const [ formData, setFormData ] = useState({
		highestEducation: '',
		highestDetails: '',
		college: '',
	});
	const [ errors, setErrors ] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();

		const validationErrors = {};
		if (!formData.highestEducation) validationErrors.highestEducation = 'Highest Education is required';
		if (!formData.highestDetails) validationErrors.highestDetails = 'Education Details are required';
		if (!formData.college) validationErrors.college = 'College / Institution is required';

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			toast.error('Please correct all highlighted errors!');
		} else {
			try {
				const response = await axios.post('/api/education-info', formData);
				toast.success('Education Info submitted successfully!');
				console.log('Form submitted:', response.data);
				setErrors({});
			} catch (error) {
				toast.error('Failed to submit Education Info!');
				console.error('Error submitting form:', error);
			}
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

				{/* Education in Detail */}
				<div>
					<label htmlFor="highestDetails" className="block font-medium mb-1 mt-1 text-headingGray">
						Education in Detail <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						id="highestDetails"
						className={getInputClasses('highestDetails')}
						placeholder="Education in Detail"
						name="highestDetails"
						value={formData.highestDetails}
						onChange={handleChange}
					/>
					{errors.highestDetails && <p className="text-red-500 text-xs">{errors.highestDetails}</p>}
				</div>

				{/* College / Institution */}
				<div className="col-span-2">
					<label htmlFor="college" className="block font-medium mb-1 mt-1 text-headingGray">
						College / Institution <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						id="college"
						className={getInputClasses('college')}
						placeholder="College / Institution"
						name="college"
						value={formData.college}
						onChange={handleChange}
					/>
					{errors.college && <p className="text-red-500 text-xs">{errors.college}</p>}
				</div>

				{/* Submit Button */}
				<div className="col-span-2 flex justify-end mt-4">
					<button type="submit" className="gradient-btn px-4 py-2 rounded-md text-sm">Update</button>
				</div>
			</form>
		</div>
	);
};

export default EducationInfo;
