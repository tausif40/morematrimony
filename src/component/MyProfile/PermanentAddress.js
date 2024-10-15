import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const PermanentAddress = () => {
	const [ formData, setFormData ] = useState({
		country: '',
		state: '',
		city: '',
		postalCode: '',
	});
	const [ errors, setErrors ] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();

		const validationErrors = {};
		if (!formData.country) validationErrors.country = 'Country is required';
		if (!formData.state) validationErrors.state = 'State is required';
		if (!formData.city) validationErrors.city = 'City is required';
		if (!formData.postalCode) validationErrors.postalCode = 'Postal Code is required';

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			toast.error('Please correct all highlighted errors!');
		} else {
			try {
				const response = await axios.post('/api/permanent-address', formData);
				toast.success('Parament address update successfully!');
				console.log('Form submitted:', response.data);
				setErrors({});
			} catch (error) {
				toast.error('Parament address update failed!');
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
			<p className="px-6 py-3 font-medium border-b text-headingGray">Permanent Address</p>
			<form className="md:grid grid-cols-2 gap-4 py-4 px-6 text-sm space-y-5 md:space-y-0" onSubmit={handleSubmit}>
				{/* Country */}
				<div>
					<label htmlFor="country" className="block font-medium mb-1 mt-1 text-headingGray">
						Country <span className="text-red-500">*</span>
					</label>
					<select
						id="country"
						className={getInputClasses('country')}
						name="country"
						value={formData.country}
						onChange={handleChange}
					>
						<option value="" disabled>Select Country</option>
						<option value="country1">Country 1</option>
						<option value="country2">Country 2</option>
					</select>
					{errors.country && <p className="text-red-500 text-xs">{errors.country}</p>}
				</div>
				{/* State */}
				<div>
					<label htmlFor="state" className="block font-medium mb-1 mt-1 text-headingGray">
						State <span className="text-red-500">*</span>
					</label>
					<select
						id="state"
						className={getInputClasses('state')}
						name="state"
						value={formData.state}
						onChange={handleChange}
					>
						<option value="" disabled>Select State</option>
						<option value="state1">State 1</option>
						<option value="state2">State 2</option>
					</select>
					{errors.state && <p className="text-red-500 text-xs">{errors.state}</p>}
				</div>
				{/* City */}
				<div>
					<label htmlFor="city" className="block font-medium mb-1 mt-1 text-headingGray">
						City <span className="text-red-500">*</span>
					</label>
					<select
						id="city"
						className={getInputClasses('city')}
						name="city"
						value={formData.city}
						onChange={handleChange}
					>
						<option value="" disabled>Select City</option>
						<option value="city1">City 1</option>
						<option value="city2">City 2</option>
					</select>
					{errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
				</div>
				{/* Postal Code */}
				<div>
					<label htmlFor="postalCode" className="block font-medium mb-1 mt-1 text-headingGray">
						Postal Code <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						id="postalCode"
						className={getInputClasses('postalCode')}
						placeholder="Postal Code"
						name="postalCode"
						value={formData.postalCode}
						onChange={handleChange}
					/>
					{errors.postalCode && <p className="text-red-500 text-xs">{errors.postalCode}</p>}
				</div>

				{/* Submit Button */}
				<div className="col-span-2 flex justify-end mt-4">
					<button type="submit" className="gradient-btn px-4 py-2 rounded-md text-sm">Update</button>
				</div>
			</form>
		</div>
	);
};

export default PermanentAddress;
