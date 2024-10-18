import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const SocialBackground = () => {
	const [ formData, setFormData ] = useState({
		religion: '',
		caste: '',
		subCaste: '',
		ethnicity: '',
		star: '',
		moon: '',
		zodiac: '',
		birthTime: '',
		birthPlace: { country: '', state: '', city: '' },
		gothra: '',
		kundli: null,
		dosh: '',
		doshName: ''
	});

	const [ errors, setErrors ] = useState({});

	const handleSubmit = (e) => {
		e.preventDefault();
		const newErrors = {};

		Object.keys(formData).forEach((key) => {
			if (!formData[ key ] && key !== 'gothra' && key !== 'kundli' && key !== 'dosh' && key !== 'doshName') {
				const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
				newErrors[ key ] = `${formattedKey} is required`;
			}
		});
		if (!formData.birthPlace.country) newErrors.birthPlaceCountry = 'Country is required';
		if (!formData.birthPlace.state) newErrors.birthPlaceState = 'State is required';
		if (!formData.birthPlace.city) newErrors.birthPlaceCity = 'City is required';

		if (formData.religion === 'hindu') {
			if (!formData.gothra) newErrors.gothra = 'Gothra is required';
			if (!formData.kundli) newErrors.kundli = 'Kundli is required';
			if (!formData.dosh) newErrors.dosh = 'Dosh is required';
			if (formData.dosh === 'yes' && !formData.doshName) {
				newErrors.doshName = 'Dosh Name is required';
			}
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			toast.error('Please correct all highlighted errors!');
			return;
		}

		let cleanedFormData = { ...formData };

		if (formData.religion !== 'hindu') {
			delete cleanedFormData.gothra;
			delete cleanedFormData.kundli;
			delete cleanedFormData.dosh;
			delete cleanedFormData.doshName;
		}

		if (formData.religion === 'hindu' && formData.dosh === 'no') {
			delete cleanedFormData.doshName;
		}
		console.log('Form submitted:', cleanedFormData);
	};

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[ name ]: value,
		}));
		if (name === 'kundli') {
			setFormData((prevFormData) => ({
				...prevFormData,
				[ name ]: files[ 0 ],
			}));
		}
		setErrors((prevErrors) => ({ ...prevErrors, [ name ]: '' }));
	};

	const handleBirthPlaceChange = (e, field) => {
		const { value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			birthPlace: {
				...prevFormData.birthPlace,
				[ field ]: value
			}
		}));
		if (value) {
			setErrors((prevErrors) => ({
				...prevErrors,
				[ `birthPlace${field.charAt(0).toUpperCase() + field.slice(1)}` ]: undefined,
			}));
		}
	};

	const getInputClasses = (fieldName) => `input-field ${errors[ fieldName ] && 'border-red-500'} text-gray-700`;

	return (
		<div className="box-shadow bg-white border rounded-md mx-auto">
			<p className="px-6 py-3 font-medium border-b text-headingGray">Spiritual & Social Background</p>
			<form className="md:grid grid-cols-2 gap-4 py-4 px-6 text-sm space-y-5 md:space-y-0" onSubmit={handleSubmit}>
				{/* Religion */}
				<div>
					<label htmlFor="religion" className="block font-medium mb-1 mt-1 text-headingGray">Religion <span className="text-red-500">*</span></label>
					<select
						id="religion"
						className={getInputClasses('religion')}
						name="religion"
						value={formData.religion}
						onChange={handleChange}
					>
						<option value="" disabled>Select Religion</option>
						<option value="hindu">Hindu</option>
						<option value="muslim">Muslim</option>
						<option value="christian">Christian</option>
					</select>
					{errors.religion && <p className="text-red-500 text-xs">{errors.religion}</p>}
				</div>
				{/* Caste */}
				<div>
					<label htmlFor="caste" className="block font-medium mb-1 mt-1 text-headingGray">Caste <span className="text-red-500">*</span></label>
					<select
						id="caste"
						className={getInputClasses('caste')}
						name="caste"
						value={formData.caste}
						onChange={handleChange}
					>
						<option value="" disabled>Select Caste</option>
						<option value="caste1">Caste 1</option>
						<option value="caste2">Caste 2</option>
					</select>
					{errors.caste && <p className="text-red-500 text-xs">{errors.caste}</p>}
				</div>
				{/* Sub Caste */}
				<div>
					<label htmlFor="subCaste" className="block font-medium mb-1 mt-1 text-headingGray">Sub Caste <span className="text-red-500">*</span></label>
					<select
						id="subCaste"
						className={getInputClasses('subCaste')}
						name="subCaste"
						value={formData.subCaste}
						onChange={handleChange}

					>
						<option value="" disabled>Select Sub Caste</option>
						<option value="subCaste1">Sub Caste 1</option>
						<option value="subCaste2">Sub Caste 2</option>
					</select>
					{errors.subCaste && <p className="text-red-500 text-xs">{errors.subCaste}</p>}
				</div>
				{/* Ethnicity */}
				<div>
					<label htmlFor="ethnicity" className="block font-medium mb-1 mt-1 text-headingGray">Ethnicity <span className="text-red-500">*</span></label>
					<select
						id="ethnicity"
						className={getInputClasses('ethnicity')}
						name="ethnicity"
						value={formData.ethnicity}
						onChange={handleChange}

					>
						<option value="" disabled>Select Ethnicity</option>
						<option value="ethnicity1">Ethnicity 1</option>
						<option value="ethnicity2">Ethnicity 2</option>
					</select>
					{errors.ethnicity && <p className="text-red-500 text-xs">{errors.ethnicity}</p>}
				</div>
				{/* Star */}
				<div>
					<label htmlFor="star" className="block font-medium mb-1 mt-1 text-headingGray">Star <span className="text-red-500">*</span></label>
					<select
						id="star"
						className={getInputClasses('star')}
						name="star"
						value={formData.star}
						onChange={handleChange}

					>
						<option value="" disabled>Select Star</option>
						<option value="star1">Star 1</option>
						<option value="star2">Star 2</option>
					</select>
					{errors.star && <p className="text-red-500 text-xs">{errors.star}</p>}
				</div>
				{/* Moon */}
				<div>
					<label htmlFor="moon" className="block font-medium mb-1 mt-1 text-headingGray">Raasi / Moon Sign <span className="text-red-500">*</span></label>
					<select
						id="moon"
						className={getInputClasses('moon')}
						name="moon"
						value={formData.moon}
						onChange={handleChange}

					>
						<option value="" disabled>Select Moon</option>
						<option value="moon1">Moon 1</option>
						<option value="moon2">Moon 2</option>
					</select>
					{errors.moon && <p className="text-red-500 text-xs">{errors.moon}</p>}
				</div>
				{/* Zodiac */}
				<div>
					<label htmlFor="zodiac" className="block font-medium mb-1 mt-1 text-headingGray">Zodiac/Star Sign <span className="text-red-500">*</span></label>
					<select
						id="zodiac"
						className={getInputClasses('zodiac')}
						name="zodiac"
						value={formData.zodiac}
						onChange={handleChange}

					>
						<option value="" disabled>Select Zodiac</option>
						<option value="zodiac1">Zodiac 1</option>
						<option value="zodiac2">Zodiac 2</option>
					</select>
					{errors.zodiac && <p className="text-red-500 text-xs">{errors.zodiac}</p>}
				</div>
				{/* Birth Time */}
				<div>
					<label htmlFor="birthTime" className="block font-medium mb-1 mt-1 text-headingGray">Time Of Birth</label>
					<input
						type="time"
						id="birthTime"
						className={getInputClasses('birthTime')}
						name="birthTime"
						value={formData.birthTime}
						onChange={handleChange}
						placeholder="Time of birth"

					/>
					{errors.birthTime && <p className="text-red-500 text-xs">{errors.birthTime}</p>}
				</div>

				{/* Place Of Birth */}
				<div className="col-span-2">
					<label htmlFor="birthPlace" className="block font-medium mb-1 mt-1 text-headingGray">Place Of Birth <span className="text-red-500">*</span></label>
					<div className="p-2 border rounded-md flex gap-4">
						<div className='w-full'>
							<select
								id="birthCountry"
								className={getInputClasses('birthPlace')}
								name="birthCountry"
								value={formData.birthPlace.country}
								onChange={(e) => handleBirthPlaceChange(e, 'country')}
							>
								<option value="" disabled>Country</option>
								<option value="Country 1">Country 1</option>
								<option value="Country 2">Country 2</option>
							</select>
							{errors.birthPlaceCountry && <p className="text-red-500 text-xs">{errors.birthPlaceCountry}</p>}
						</div>

						{/* State */}
						<div className='w-full'>
							<select
								id="birthState"
								className={getInputClasses('state')}
								name="birthState"
								value={formData.birthPlace.state}
								onChange={(e) => handleBirthPlaceChange(e, 'state')}
							>
								<option value="" disabled>State</option>
								<option value="State 1">State 1</option>
								<option value="State 2">State 2</option>
							</select>
							{errors.birthPlaceState && <p className="text-red-500 text-xs">{errors.birthPlaceState}</p>}
						</div>

						{/* City */}
						<div className='w-full'>
							<select
								id="birthCity"
								className={getInputClasses('city')}
								name="birthCity"
								value={formData.birthPlace.city}
								onChange={(e) => handleBirthPlaceChange(e, 'city')}
							>
								<option value="" disabled>City</option>
								<option value="City 1">City 1</option>
								<option value="City 2">City 2</option>
							</select>
							{errors.birthPlaceCity && <p className="text-red-500 text-xs">{errors.birthPlaceCity}</p>}
						</div>
					</div>
					{errors.birthPlace && <p className="text-red-500 text-xs">{errors.birthPlace}</p>}
				</div>

				{formData.religion === 'hindu' && (
					<>
						<div>
							<label htmlFor="gothra" className="block font-medium mb-1 mt-1 text-headingGray">
								Gothra <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								id="gothra"
								className={getInputClasses('gothra')}
								placeholder="Enter Gothra"
								name="gothra"
								value={formData.gothra}
								onChange={handleChange}
							/>
							{errors.gothra && <p className="text-red-500 text-xs">{errors.gothra}</p>}
						</div>

						<div>
							<label htmlFor="kundli" className="block font-medium mb-1 mt-1 text-headingGray">
								Upload Kundli <span className="text-red-500">*</span>
							</label>
							<input
								type="file"
								id="kundli"
								className={getInputClasses('kundli')}
								name="kundli"
								onChange={handleChange}
							/>
							{errors.kundli && <p className="text-red-500 text-xs">{errors.kundli}</p>}
						</div>

						<div>
							<label htmlFor="dosh" className="block font-medium mb-1 mt-1 text-headingGray">
								Have Dosh? <span className="text-red-500">*</span>
							</label>
							<select
								id="dosh"
								className={getInputClasses('dosh')}
								name="dosh"
								value={formData.dosh}
								onChange={handleChange}
							>
								<option value="" disabled>Select</option>
								<option value="yes">Yes</option>
								<option value="no">No</option>
							</select>
							{errors.dosh && <p className="text-red-500 text-xs">{errors.dosh}</p>}
						</div>

						{formData.dosh === 'yes' && (
							<div>
								<label htmlFor="doshName" className="block font-medium mb-1 mt-1 text-headingGray">
									Dosh Name <span className="text-red-500">*</span>
								</label>
								<select
									id="doshName"
									className={getInputClasses('doshName')}
									name="doshName"
									value={formData.doshName}
									onChange={handleChange}
								>
									<option value="" disabled>Select Dosh Name</option>
									<option value="doshName1">Dosh Name 1</option>
									<option value="doshName2">Dosh Name 2</option>
								</select>
								{errors.doshName && <p className="text-red-500 text-xs">{errors.doshName}</p>}
							</div>
						)}
					</>
				)}

				{/* Submit Button */}
				<div className="col-span-2 flex justify-end mt-4">
					<button type="submit" className="gradient-btn px-4 py-2 rounded-md text-sm">Update</button>
				</div>
			</form>
		</div>
	);
};

export default SocialBackground;
