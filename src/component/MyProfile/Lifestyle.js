import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Lifestyle = () => {
	const [ formData, setFormData ] = useState({
		diet: '',
		drink: '',
		smoke: '',
		livingWith: '',
	});
	const [ errors, setErrors ] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();

		const validationErrors = {};
		if (!formData.diet) validationErrors.diet = 'Diet is required';
		if (!formData.drink) validationErrors.drink = 'Drink preference is required';
		if (!formData.smoke) validationErrors.smoke = 'Smoking preference is required';
		if (!formData.livingWith) validationErrors.livingWith = 'Living With is required';

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			toast.error('Please correct all highlighted errors!');
		} else {
			console.log(formData);
			try {
				const response = await axios.post('/api/lifestyle-info', formData);
				toast.success('Lifestyle details update successfully!');
				console.log('Form submitted:', response.data);
				setErrors({});
			} catch (error) {
				toast.error('Lifestyle details update successfully!');
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
			<p className="px-6 py-3 font-medium border-b text-headingGray">Lifestyle</p>
			<form className="md:grid grid-cols-2 gap-4 py-4 px-6 text-sm space-y-5 md:space-y-0" onSubmit={handleSubmit}>
				{/* Diet */}
				<div>
					<label htmlFor="diet" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Diet<span className="text-red-500"> *</span></label>
					<select
						id="diet"
						className={getInputClasses('diet')}
						name="diet"
						value={formData.diet}
						onChange={handleChange}
					>
						<option value="" disabled>Select Diet</option>
						<option value="vegetarian">Vegetarian</option>
						<option value="nonVegetarian">Non-Vegetarian</option>
						<option value="vegan">Vegan</option>
					</select>
					{errors.diet && <p className="text-red-500 text-xs mt-1">{errors.diet}</p>}
				</div>

				{/* Drink */}
				<div>
					<label htmlFor="drink" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Drink<span className="text-red-500"> *</span></label>
					<select
						id="drink"
						className={getInputClasses('drink')}
						name="drink"
						value={formData.drink}
						onChange={handleChange}
					>
						<option value="" disabled>Select Drink Preference</option>
						<option value="social">Social</option>
						<option value="regular">Regular</option>
						<option value="never">Never</option>
					</select>
					{errors.drink && <p className="text-red-500 text-xs mt-1">{errors.drink}</p>}
				</div>

				{/* Smoke */}
				<div>
					<label htmlFor="smoke" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Smoke<span className="text-red-500"> *</span></label>
					<select
						id="smoke"
						className={getInputClasses('smoke')}
						name="smoke"
						value={formData.smoke}
						onChange={handleChange}
					>
						<option value="" disabled>Select Smoking Preference</option>
						<option value="smokes">Smokes</option>
						<option value="doesNotSmoke">Does Not Smoke</option>
					</select>
					{errors.smoke && <p className="text-red-500 text-xs mt-1">{errors.smoke}</p>}
				</div>

				{/* Living With */}
				<div>
					<label htmlFor="livingWith" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Living With<span className="text-red-500"> *</span></label>
					<input
						type="text"
						id="livingWith"
						className={getInputClasses('livingWith')}
						placeholder="Living With"
						name="livingWith"
						value={formData.livingWith}
						onChange={handleChange}
					/>
					{errors.livingWith && <p className="text-red-500 text-xs mt-1">{errors.livingWith}</p>}
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
