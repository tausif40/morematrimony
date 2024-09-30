import React, { useState } from 'react';

const AstronomicInformation = () => {
	const [ formData, setFormData ] = useState({
		sunSign: '',
		moonSign: '',
		timeOfBirth: '',
		cityOfBirth: '',
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
			<p className="px-6 py-3 font-medium border-b text-headingGray">Astronomic Information</p>
			<form className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 px-6 text-sm" onSubmit={handleSubmit}>
				{/* Sun Sign */}
				<div>
					<label htmlFor="sunSign" className="block font-medium mb-2 mt-1 text-headingGray">Sun Sign</label>
					<input
						type="text"
						id="sunSign"
						className="input-field"
						placeholder="Sun Sign"
						name="sunSign"
						value={formData.sunSign}
						onChange={handleChange}
						required
					/>
				</div>
				{/* Moon Sign */}
				<div>
					<label htmlFor="moonSign" className="block font-medium mb-2 mt-1 text-headingGray">Moon Sign</label>
					<input
						type="text"
						id="moonSign"
						className="input-field"
						placeholder="Moon Sign"
						name="moonSign"
						value={formData.moonSign}
						onChange={handleChange}
						required
					/>
				</div>
				{/* Time Of Birth */}
				<div>
					<label htmlFor="timeOfBirth" className="block font-medium mb-2 mt-1 text-headingGray">Time Of Birth</label>
					<input
						type="time"
						id="timeOfBirth"
						className="input-field"
						name="timeOfBirth"
						value={formData.timeOfBirth}
						onChange={handleChange}
						required
					/>
				</div>
				{/* City Of Birth */}
				<div>
					<label htmlFor="cityOfBirth" className="block font-medium mb-2 mt-1 text-headingGray">City Of Birth</label>
					<input
						type="text"
						id="cityOfBirth"
						className="input-field"
						placeholder="City Of Birth"
						name="cityOfBirth"
						value={formData.cityOfBirth}
						onChange={handleChange}
						required
					/>
				</div>

				{/* Submit Button */}
				<div className="col-span-2 flex justify-end mt-4">
					<button type="submit" className="gradient-btn px-4 py-2 rounded-md text-sm">Update</button>
				</div>
			</form>
		</div>
	);
};

export default AstronomicInformation;
