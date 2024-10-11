import React, { useState } from 'react';

const PresentAddress = () => {
	const [ formData, setFormData ] = useState({
		country: '',
		state: '',
		city: '',
		postalCode: '',
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
			<p className="px-6 py-3 font-medium border-b text-headingGray">Present Address</p>
			<form className="md:grid grid-cols-2 gap-4 py-4 px-6 text-sm space-y-5 md:space-y-0" onSubmit={handleSubmit}>
				{/* Country */}
				<div>
					<label htmlFor="country" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Country</label>
					<select
						id="country"
						className="input-field text-text"
						name="country"
						value={formData.country}
						onChange={handleChange}
						required
					>
						<option value="">Select Country</option>
						<option value="country1">Country 1</option>
						<option value="country2">Country 2</option>
						<option value="country3">Country 3</option>
						<option value="country4">Country 4</option>
					</select>
				</div>
				{/* State */}
				<div>
					<label htmlFor="state" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">State</label>
					<select
						id="state"
						className="input-field text-text"
						name="state"
						value={formData.state}
						onChange={handleChange}
						required
					>
						<option value="">Select State</option>
						<option value="state1">State 1</option>
						<option value="state2">State 2</option>
						<option value="state3">State 3</option>
						<option value="state4">State 4</option>
					</select>
				</div>
				{/* City */}
				<div>
					<label htmlFor="city" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">City</label>
					<input
						type="text"
						id="city"
						className="input-field"
						placeholder="City"
						name="city"
						value={formData.city}
						onChange={handleChange}
						required
					/>
				</div>
				{/* Postal Code */}
				<div>
					<label htmlFor="postalCode" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Postal Code</label>
					<input
						type="text"
						id="postalCode"
						className="input-field"
						placeholder="Postal Code"
						name="postalCode"
						value={formData.postalCode}
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

export default PresentAddress;
