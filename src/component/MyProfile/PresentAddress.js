import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries, fetchStates, fetchCities, uploadFileData } from '../../store/features/profileData-slice';

const PresentAddress = () => {
	const dispatch = useDispatch();
	// const { countries, states, cities, loading, error } = useSelector((state) => state.profileData);

	const { data: countries, loading: countriesLoading, error: countriesError } = useSelector((state) => state.profileData.countries);
	const { data: states, loading: statesLoading, error: statesError } = useSelector((state) => state.profileData.states);
	const { data: cities, loading: citiesLoading, error: citiesError } = useSelector((state) => state.profileData.cities);

	useEffect(() => {
		dispatch(fetchCountries());
	}, [ dispatch ]);

	const [ formData, setFormData ] = useState({
		country: '', state: '', city: '', postalCode: '',
	});
	const [ errors, setErrors ] = useState({});

	// Function to handle form submission 
	const handleSubmit = async (e) => {
		e.preventDefault();

		const newErrors = validateForm();

		if (Object.keys(newErrors).length === 0) {
			dispatch(uploadFileData({ presentAddress: formData }));
		} else {
			setErrors(newErrors);
			toast.error('Please correct all highlighted errors!');
		}
	};

	// Function to handle input changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[ name ]: value,
		}));

		if (name === 'country') {
			dispatch(fetchStates(value));
			formData.state = ''
			formData.city = ''
		}
		if (name === 'state') {
			dispatch(fetchCities(value));
			formData.city = ''
		}

		if (errors[ name ]) {
			setErrors((prevErrors) => ({
				...prevErrors,
				[ name ]: '',
			}));
		}
	};

	// Validation function
	const validateForm = () => {
		const newErrors = {};
		if (!formData.country) newErrors.country = 'Country is required';
		if (!formData.state) newErrors.state = 'State is required';
		if (!formData.city) newErrors.city = 'City is required';
		if (!formData.postalCode) newErrors.postalCode = 'Postal Code is required';
		return newErrors;
	};

	const getInputClasses = (fieldName) => `input-field ${errors[ fieldName ] && 'border-red-500'} text-gray-700`;

	// loading && console.log('loading start', loading);
	// !loading && console.log('loading start', loading);
	// console.log('countries - ', countries);

	return (
		<div className="box-shadow bg-white border rounded-md mx-auto">
			<p className="px-6 py-3 font-medium border-b text-headingGray">Present Address</p>
			<form
				className="md:grid grid-cols-2 gap-4 py-4 px-6 text-sm space-y-5 md:space-y-0"
				onSubmit={handleSubmit}
			>
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
						{countriesLoading && !countries.length && <option value="" disabled>Loading countries...</option>}
						{countries?.country?.map((country, index) => (
							<option key={country._id} value={country._id}>
								{country.name.charAt(0).toUpperCase() + country.name.slice(1)}
							</option>
						))}
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
						{formData.country == '' && <option value="" disabled>Please Select country</option>}
						{statesLoading && !states?.length && <option value="" disabled>Loading states...</option>}
						{states?.state?.map((state) => (
							<option key={state._id} value={state._id}>
								{state.name.charAt(0).toUpperCase() + state.name.slice(1)}
							</option>
						))}
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
						<option value="" disabled>Select State</option>
						{formData.state == '' && <option value="" disabled>Please Select state</option>}
						{citiesLoading && !cities?.length && <option value="" disabled> Loading cities...</option>}
						{cities?.city?.map((city) => (
							<option key={city._id} value={city._id}>
								{city.name.charAt(0).toUpperCase() + city.name.slice(1)}
							</option>
						))}
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

export default PresentAddress;
