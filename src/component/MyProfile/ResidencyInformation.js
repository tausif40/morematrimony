import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { personalInformation } from '../../utils/data/MyProfileData';
import apiClient from '../../api/apiClient';
import { indiaId } from '../../utils/data/config';

const ResidencyInformation = ({ data, onFormSubmit }) => {
	const [ stateList, setStateList ] = useState([]);

	const { countries, countriesLoading } = data;

	useEffect(() => {
		const fetchStates = async () => {
			try {
				const response = await apiClient.get(`/state?countryId=${indiaId}`);
				setStateList(response.data);
			} catch (error) {
				console.error('Error fetching states:', error);
			}
		};
		fetchStates();
	}, [ indiaId ]);


	const [ formData, setFormData ] = useState({
		birthCountry: '',
		growUpCountry: '',
		residencyCountry: '',
		residencyStatus: '',
		citizenship: '',
		ancestralOrigin: {
			state: ''
		},
	});
	const [ errors, setErrors ] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();

		const validationErrors = {};
		if (!formData.birthCountry) validationErrors.birthCountry = 'Birth Country is required';
		if (!formData.growUpCountry) validationErrors.growUpCountry = 'Grow Up Country is required';
		if (!formData.residencyCountry) validationErrors.residencyCountry = 'Residency Country is required';
		if (!formData.residencyStatus) validationErrors.residencyStatus = 'Residency Status is required';
		if (!formData.ancestralOrigin.state) validationErrors.ancestralOrigin = 'Ancestral Origin is required';
		if (!formData.citizenship) validationErrors.citizenship = 'Citizenship is required';

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			console.log(formData);
			toast.error('Please correct all highlighted errors!');
		} else {
			onFormSubmit({ residencyInformation: formData });
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData((prevFormData) => {
			if (name === 'ancestralOrigin') {
				return {
					...prevFormData,
					ancestralOrigin: {
						...prevFormData.ancestralOrigin,
						state: value,
					},
				};
			}

			return {
				...prevFormData,
				[ name ]: value,
			};
		});

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
						{countriesLoading && !countries.length && <option>Loading countries...</option>}
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
						{countriesLoading && !countries.length && <option>Loading countries...</option>}
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
						{countriesLoading && !countries.length && <option>Loading countries...</option>}
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

				{/* Ancestral Origin */}
				<div>
					<label htmlFor="ancestralOrigin" className="block font-medium mb-1 mt-1 text-headingGray">
						Ancestral Origin (Only India) <span className="text-red-500">*</span>
					</label>
					<select
						id="ancestralOrigin"
						className={getInputClasses('ancestralOrigin')}
						name="ancestralOrigin"
						value={formData.ancestralOrigin.state}
						onChange={handleChange}
					>
						<option value="" disabled>Select Ancestral Origin</option>
						{/* {!stateList?.length && <option value="" disabled>Loading states...</option>} */}
						{stateList?.state?.map((state) => (
							<option key={state.id} value={state._id}>
								{state.name.charAt(0).toUpperCase() + state.name.slice(1)}
							</option>
						))}
					</select>
					{errors.ancestralOrigin && <p className="text-red-500 text-xs">{errors.ancestralOrigin}</p>}
				</div>
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
						{countriesLoading && !countries.length && <option>Loading countries...</option>}
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
