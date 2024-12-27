import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import apiClient from '../../api/apiClient';

const PresentAddress = ({ onFormSubmit, data }) => {
	const [ stateList, setStateList ] = useState([]);
	const [ cityList, setCityList ] = useState([]);
	const [ stateLoading, setStateLoading ] = useState(false)
	const [ cityLoading, setCityLoading ] = useState(false)
	const { countries, presentAddress, isLoading } = data;

	const [ formData, setFormData ] = useState({
		country: '',
		state: '',
		city: '',
		postalCode: '',
	});

	useEffect(() => {
		if (presentAddress) {
			setFormData({
				country: presentAddress.country._id || '',
				state: presentAddress.state._id || '',
				city: presentAddress.city._id || '',
				postalCode: presentAddress.postalCode || '',
			});

			if (presentAddress.country._id) {
				fetchState(presentAddress.country._id);
			}
			if (presentAddress.state._id) {
				fetchCity(presentAddress.state._id);
			}
		}
	}, [ presentAddress ]);

	const fetchState = async (countryId) => {
		setStateLoading(true)
		try {
			const response = await apiClient.get(`/state?countryId=${countryId}`);
			setStateList(response.data)
		} catch (error) {
			console.log(error);
		} finally {
			setStateLoading(false)
		}
	}

	const fetchCity = async (stateId) => {
		setCityLoading(true)
		try {
			const response = await apiClient.get(`/city?stateId=${stateId}`);
			setCityList(response.data)
		} catch (error) {
			console.log(error);
		} finally {
			setCityLoading(false)
		}
	}


	const [ errors, setErrors ] = useState({});
	// Function to handle form submission 
	const handleSubmit = async (e) => {
		e.preventDefault();

		const newErrors = validateForm();

		if (Object.keys(newErrors).length === 0) {
			onFormSubmit({ presentAddress: formData });
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
			fetchState(value)
			setStateList('');
			setCityList('');
		} else if (name === 'state') {
			fetchCity(value);
			setCityList('')
		}

		setErrors((prevErrors) => ({ ...prevErrors, [ name ]: '' }));
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
						{/* {countriesLoading && !countries.length && <option value="" disabled>Loading countries...</option>} */}
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
						{stateLoading && !stateList?.length && <option value="" disabled>Loading states...</option>}
						{stateList?.state?.map((state) => (
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
						{cityLoading && !cityList?.length && <option value="" disabled> Loading cities...</option>}
						{cityList?.city?.map((city) => (
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
					<button type="submit" className="gradient-btn px-4 py-2 rounded-md text-sm" disabled={isLoading}>Update</button>
				</div>
			</form>
		</div>
	);
};

export default PresentAddress;
