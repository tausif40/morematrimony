import React, { useState } from 'react';

const Career = () => {
	const [ formData, setFormData ] = useState({
		employedIn: '',
		occupation: '',
		occupationDetail: '',
		jobLocation: '',
		annualIncome: '',
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission logic here
		console.log('Form submitted:', formData);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[ name ]: value,
		}));
	};

	return (
		<div className="box-shadow bg-white border rounded-md mx-auto">
			<p className="px-6 py-3 font-medium border-b text-headingGray">Career</p>
			<form className="md:grid grid-cols-2 gap-4 py-4 px-6 text-sm space-y-5 md:space-y-0" onSubmit={handleSubmit}>

				<div className='col-span-2'>
					<label htmlFor="employedIn" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Employed in</label>
					<div className='flex gap-8 items-center border rounded-md p-3'>
						{[ 'Government/PSU', 'Private', 'Business', 'Defence', 'Self Employed', 'Not Working' ].map((option) => (
							<label key={option} className='flex items-center gap-1'>
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
				</div>

				<div>
					<label htmlFor="occupation" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Occupation </label>
					<select
						id="occupation"
						className="input-field text-text"
						name="occupation"
						value={formData.occupation}
						onChange={handleChange}
						required
					>
						<option value="">Select Occupation</option>
						<option value="Engineer">Engineer</option>
						<option value="Doctor">Doctor</option>
						<option value="Teacher">Teacher</option>
					</select>
				</div>

				<div>
					<label htmlFor="occupationDetail" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Occupation in Detail</label>
					<input
						type="text"
						id="occupationDetail"
						className="input-field"
						placeholder="Occupation Details"
						name="occupationDetail"
						value={formData.occupationDetail}
						onChange={handleChange}
						required
					/>
				</div>

				<div>
					<label htmlFor="jobLocation" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Job Location</label>
					<select
						id="jobLocation"
						className="input-field text-text"
						name="jobLocation"
						value={formData.jobLocation}
						onChange={handleChange}
						required
					>
						<option value="">Select Country</option>
						<option value="India">India</option>
						<option value="USA">USA</option>
						<option value="UK">UK</option>
					</select>
				</div>

				<div>
					<label htmlFor="annualIncome" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Annual Income</label>
					<select
						id="annualIncome"
						className="input-field text-text"
						name="annualIncome"
						value={formData.annualIncome}
						onChange={handleChange}
						required
					>
						<option value="">Select Annual Income</option>
						<option value="1 Lakh">1 Lakh</option>
						<option value="2 Lakh">2 Lakh</option>
						<option value="5 Lakh">5 Lakh</option>
					</select>
				</div>

				<div className="col-span-2 flex justify-end mt-4">
					<button type="submit" className="gradient-btn px-4 py-2 rounded-md text-sm">Update</button>
				</div>
			</form>
		</div>
	);
};

export default Career;
