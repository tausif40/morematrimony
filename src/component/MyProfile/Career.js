import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Career = () => {
	const [ formData, setFormData ] = useState({
		employedIn: '',
		occupation: '',
		occupationDetail: '',
		jobLocation: '',
		annualIncome: '',
	});
	const [ errors, setErrors ] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();
		let validationErrors = {};
		if (!formData.employedIn) validationErrors.employedIn = 'Employed in is required';
		if (!formData.occupation) validationErrors.occupation = 'Occupation is required';
		if (!formData.occupationDetail) validationErrors.occupationDetail = 'Occupation details are required';
		if (!formData.jobLocation) validationErrors.jobLocation = 'Job location is required';
		if (!formData.annualIncome) validationErrors.annualIncome = 'Annual income is required';

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			toast.error('Please correct all highlighted errors!');
		} else {
			console.log(formData);
			try {
				const response = await axios.post('/api/career-info', formData);
				toast.success('Career information updated successfully');
				console.log('Form submitted:', response.data);
				setErrors({});
			} catch (error) {
				toast.error('Career information updated failed!');
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
			<p className="px-6 py-3 font-medium border-b text-headingGray">Career</p>
			<form className="md:grid grid-cols-2 gap-4 py-4 px-6 text-sm space-y-5 md:space-y-0" onSubmit={handleSubmit}>

				<div className="col-span-2">
					<label htmlFor="employedIn" className="block font-medium mb-1 mt-1 text-headingGray">
						Employed in <span className="text-red-500">*</span>
					</label>
					<div className="flex flex-wrap gap-8 items-center border rounded-md p-3">
						{[ 'Government/PSU', 'Private', 'Business', 'Defence', 'Self Employed', 'Not Working' ].map((option) => (
							<label key={option} className="flex items-center gap-1">
								<input
									type="radio"
									name="employedIn"
									value={option}
									onChange={handleChange}
									checked={formData.employedIn === option}
								/>
								<p>{option}</p>
							</label>
						))}
					</div>
					{errors.employedIn && <p className="text-red-500 text-xs">{errors.employedIn}</p>}
				</div>

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

				<div>
					<label htmlFor="occupationDetail" className="block font-medium mb-1 mt-1 text-headingGray">
						Occupation in Detail <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						id="occupationDetail"
						className={getInputClasses('occupationDetail')}
						placeholder="Occupation Details"
						name="occupationDetail"
						value={formData.occupationDetail}
						onChange={handleChange}
					/>
					{errors.occupationDetail && <p className="text-red-500 text-xs">{errors.occupationDetail}</p>}
				</div>

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
						<option value="India">India</option>
						<option value="USA">USA</option>
						<option value="UK">UK</option>
					</select>
					{errors.jobLocation && <p className="text-red-500 text-xs">{errors.jobLocation}</p>}
				</div>

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

				<div className="col-span-2 flex justify-end mt-4">
					<button type="submit" className="gradient-btn px-4 py-2 rounded-md text-sm">Update</button>
				</div>
			</form>
		</div>
	);
};

export default Career;
