import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { lifestyle } from '../../data/MyProfileData'
import { IoCheckmarkDoneOutline } from "react-icons/io5";

const Lifestyle = ({ onFormSubmit, loading, data }) => {

	const [ formData, setFormData ] = useState({
		diet: '',
		drink: '',
		smoke: '',
	});

	useEffect(() => {
		if (data) {
			setFormData({
				diet: data?.diet,
				drink: data?.drink,
				smoke: data?.smoke
			});
		}
	}, [ data ]);

	const [ errors, setErrors ] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(formData);
		const validationErrors = {};
		if (!formData.diet) validationErrors.diet = 'Diet is required';
		if (!formData.drink) validationErrors.drink = 'Drink preference is required';
		if (!formData.smoke) validationErrors.smoke = 'Smoking preference is required';

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			toast.error('Please correct all highlighted errors!');
		} else {
			// const loadingToast = toast.loading('Uploading.....');

			onFormSubmit({ lifestyle: formData });

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
						{lifestyle.diet.map((value, index) => (
							<option key={index} value={value}>
								{value.charAt(0).toUpperCase() + value.slice(1)}
							</option>
						))}
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
						{lifestyle.drink.map((value, index) => (
							<option key={index} value={value}>
								{value.charAt(0).toUpperCase() + value.slice(1)}
							</option>
						))}
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
						{lifestyle.smoke.map((value, index) => (
							<option key={index} value={value}>
								{value.charAt(0).toUpperCase() + value.slice(1)}
							</option>
						))}
					</select>
					{errors.smoke && <p className="text-red-500 text-xs mt-1">{errors.smoke}</p>}
				</div>

				{/* Submit Button */}
				<div className="col-span-2 flex justify-between items-center mt-4">
					<p className="text-green-500 text-xs font-semibold mt-1">{data !== undefined && <p className='flex items-center gap-1'>Completed <IoCheckmarkDoneOutline size={16} /></p>}</p>
					<button type="submit" className="gradient-btn px-4 py-2 rounded-md text-sm" disabled={loading}>Update</button>
				</div>
			</form>
		</div>
	);
};

export default Lifestyle;
