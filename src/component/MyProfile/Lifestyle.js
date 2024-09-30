import React, { useState } from 'react';

const Lifestyle = () => {
	const [ formData, setFormData ] = useState({
		diet: '',
		drink: '',
		smoke: '',
		livingWith: '',
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
			<p className="px-6 py-3 font-medium border-b text-headingGray">Lifestyle</p>
			<form className="md:grid grid-cols-2 gap-4 py-4 px-6 text-sm space-y-5 md:space-y-0" onSubmit={handleSubmit}>
				{/* Diet */}
				<div>
					<label htmlFor="diet" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Diet</label>
					<select
						id="diet"
						className="input-field text-text"
						name="diet"
						value={formData.diet}
						onChange={handleChange}
						required
					>
						<option value="">Select Diet</option>
						<option value="vegetarian">Vegetarian</option>
						<option value="nonVegetarian">Non-Vegetarian</option>
						<option value="vegan">Vegan</option>
						{/* Add more diet options as needed */}
					</select>
				</div>
				{/* Drink */}
				<div>
					<label htmlFor="drink" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Drink</label>
					<select
						id="drink"
						className="input-field text-text"
						name="drink"
						value={formData.drink}
						onChange={handleChange}
						required
					>
						<option value="">Select Drink Preference</option>
						<option value="social">Social</option>
						<option value="regular">Regular</option>
						<option value="never">Never</option>
						{/* Add more drink options as needed */}
					</select>
				</div>
				{/* Smoke */}
				<div>
					<label htmlFor="smoke" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Smoke</label>
					<select
						id="smoke"
						className="input-field text-text"
						name="smoke"
						value={formData.smoke}
						onChange={handleChange}
						required
					>
						<option value="">Select Smoking Preference</option>
						<option value="smokes">Smokes</option>
						<option value="doesNotSmoke">Does Not Smoke</option>
						{/* Add more smoking options as needed */}
					</select>
				</div>
				{/* Living With */}
				<div>
					<label htmlFor="livingWith" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Living With</label>
					<input
						type="text"
						id="livingWith"
						className="input-field"
						placeholder="Living With"
						name="livingWith"
						value={formData.livingWith}
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

export default Lifestyle;
