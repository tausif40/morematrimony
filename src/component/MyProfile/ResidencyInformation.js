import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { personalInformation } from '../../utils/data/MyProfileData';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries } from '../../store/features/profileData-slice';

const ResidencyInformation = () => {

	const dispatch = useDispatch();
	const { data: countries, loading: loading, error: countriesError } = useSelector((state) => state.profileData.countries);

	useEffect(() => {
		dispatch(fetchCountries());
	}, [ dispatch ]);

	const [ formData, setFormData ] = useState({
		birthCountry: '',
		growUpCountry: '',
		residencyCountry: '',
		residencyStatus: '',
		immigrationStatus: '',
		citizenship: '',
	});
	const [ errors, setErrors ] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();

		const validationErrors = {};
		if (!formData.birthCountry) validationErrors.birthCountry = 'Birth Country is required';
		if (!formData.growUpCountry) validationErrors.growUpCountry = 'Grow Up Country is required';
		if (!formData.residencyCountry) validationErrors.residencyCountry = 'Residency Country is required';
		if (!formData.residencyStatus) validationErrors.residencyStatus = 'Residency Status is required';
		if (!formData.immigrationStatus) validationErrors.immigrationStatus = 'Immigration Status is required';
		if (!formData.citizenship) validationErrors.citizenship = 'Citizenship is required';

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			toast.error('Please correct all highlighted errors!');
		} else {
			console.log(formData);
			try {
				const response = await axios.post('/api/residency-information', formData);
				toast.success('Residency Information uploaded');
				console.log('Form submitted:', response.data);
				setErrors({});
			} catch (error) {
				toast.error('Residency Information upload failed!');
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
			<p className="px-6 py-3 font-medium border-b text-headingGray">Residency Information</p>
			<form className="md:grid grid-cols-2 gap-4 py-4 px-6 text-sm space-y-5 md:space-y-0" onSubmit={handleSubmit}>
				{/* Birth Country */}
				<div>
					<label htmlFor="birthCountry" className="block font-medium mb-1 mt-1 text-headingGray">
						Birth Country <span className="text-red-500">*</span>
					</label>
					<select
						id="birthCountry"
						className={getInputClasses('birthCountry')}
						name="birthCountry"
						value={formData.birthCountry}
						onChange={handleChange}
					>
						<option value="" disabled>Select Birth Country</option>
						{loading && !countries.length && <option>Loading countries...</option>}
						{countries?.country?.map((country) => (
							<option key={country.id} value={country._id}>
								{country.name.charAt(0).toUpperCase() + country.name.slice(1)}
							</option>
						))}
					</select>
					{errors.birthCountry && <p className="text-red-500 text-xs">{errors.birthCountry}</p>}
				</div>
				{/* Grow Up Country */}
				<div>
					<label htmlFor="growUpCountry" className="block font-medium mb-1 mt-1 text-headingGray">
						Grow Up Country <span className="text-red-500">*</span>
					</label>
					<select
						id="growUpCountry"
						className={getInputClasses('growUpCountry')}
						name="growUpCountry"
						value={formData.growUpCountry}
						onChange={handleChange}
					>
						<option value="" disabled>Select Grow Up Country</option>
						{loading && !countries.length && <option>Loading countries...</option>}
						{countries?.country?.map((country) => (
							<option key={country.id} value={country._id}>
								{country.name.charAt(0).toUpperCase() + country.name.slice(1)}
							</option>
						))}
					</select>
					{errors.growUpCountry && <p className="text-red-500 text-xs">{errors.growUpCountry}</p>}
				</div>
				{/* Residency Country */}
				<div>
					<label htmlFor="residencyCountry" className="block font-medium mb-1 mt-1 text-headingGray">
						Residency Country <span className="text-red-500">*</span>
					</label>
					<select
						id="residencyCountry"
						className={getInputClasses('residencyCountry')}
						name="residencyCountry"
						value={formData.residencyCountry}
						onChange={handleChange}
					>
						<option value="" disabled>Select Residency Country</option>
						{loading && !countries.length && <option>Loading countries...</option>}
						{countries?.country?.map((country) => (
							<option key={country.id} value={country._id}>
								{country.name.charAt(0).toUpperCase() + country.name.slice(1)}
							</option>
						))}
					</select>
					{errors.residencyCountry && <p className="text-red-500 text-xs">{errors.residencyCountry}</p>}
				</div>
				{/* Residency Status */}
				<div>
					<label htmlFor="residencyStatus" className="block font-medium mb-1 mt-1 text-headingGray">
						Residency Status <span className="text-red-500">*</span>
					</label>
					<select
						id="residencyStatus"
						className={getInputClasses('residencyStatus')}
						name="residencyStatus"
						value={formData.residencyStatus}
						onChange={handleChange}
					>
						<option value="" disabled>Select Residency Status</option>
						{personalInformation.residencyStatus.map((status, index) => (
							<option key={index} value={status}>
								{status.charAt(0).toUpperCase() + status.slice(1)}
							</option>
						))}
					</select>
					{errors.residencyStatus && <p className="text-red-500 text-xs">{errors.residencyStatus}</p>}
				</div>
				{/* Immigration Status */}
				{/* <div>
					<label htmlFor="immigrationStatus" className="block font-medium mb-1 mt-1 text-headingGray">
						Immigration Status <span className="text-red-500">*</span>
					</label>
					<select
						id="immigrationStatus"
						className={getInputClasses('immigrationStatus')}
						name="immigrationStatus"
						value={formData.immigrationStatus}
						onChange={handleChange}
					>
						<option value="" disabled>Select Immigration Status</option>
						<option value="status1">Status 1</option>
					</select>
					{errors.immigrationStatus && <p className="text-red-500 text-xs">{errors.immigrationStatus}</p>}
				</div> */}
				{/* Citizenship */}
				<div>
					<label htmlFor="citizenship" className="block font-medium mb-1 mt-1 text-headingGray">
						Citizenship <span className="text-red-500">*</span>
					</label>
					<select
						id="citizenship"
						className={getInputClasses('citizenship')}
						name="citizenship"
						value={formData.citizenship}
						onChange={handleChange}
					>
						<option value="" disabled>Select Citizenship</option>
						{loading && !countries.length && <option>Loading countries...</option>}
						{countries?.country?.map((country) => (
							<option key={country.id} value={country._id}>
								{country.name.charAt(0).toUpperCase() + country.name.slice(1)}
							</option>
						))}
					</select>
					{errors.citizenship && <p className="text-red-500 text-xs">{errors.citizenship}</p>}
				</div>

				{/* Submit Button */}
				<div className="col-span-2 flex justify-end mt-4">
					<button type="submit" className="gradient-btn px-4 py-2 rounded-md text-sm">Update</button>
				</div>
			</form>
		</div>
	);
};

export default ResidencyInformation;
