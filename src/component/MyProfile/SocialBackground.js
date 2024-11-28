import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { socialBackground } from '../../utils/data/MyProfileData';
import {
	fetchCountries, fetchStates, fetchCities, fetchReligions, fetchCaste, fetchDivision, fetchStars, fetchRashiSigns, fetchZodiac,
	uploadFileData
} from '../../store/features/profileData-slice';

const SocialBackground = () => {

	const dispatch = useDispatch();
	const [ isChristian, setIsChristian ] = useState(false)
	const [ isHindu, setIsHindu ] = useState(false)

	const { data: countries, loading: countriesLoading, error: countriesError } = useSelector((state) => state.profileData.countries);
	const { data: states, loading: statesLoading, error: statesError } = useSelector((state) => state.profileData.states);
	const { data: cities, loading: citiesLoading, error: citiesError } = useSelector((state) => state.profileData.cities);
	const { data: religions, loading: religionLoading, error: religionError } = useSelector((state) => state.profileData.religions);
	const { data: casteList, loading: casteLoading, error: casteError } = useSelector((state) => state.profileData.caste);
	const { data: division, loading: divisionLoading, error: divisionError } = useSelector((state) => state.profileData.division);
	const { data: stars, loading: starsLoading, error: starsError } = useSelector((state) => state.profileData.stars);
	const { data: rashiSigns, loading: rashiSignsLoading, error: rashiSignsError } = useSelector((state) => state.profileData.rashiSigns);
	const { data: zodiac, loading: zodiacLoading, error: zodiacError } = useSelector((state) => state.profileData.zodiac);


	useEffect(() => {
		dispatch(fetchCountries());
		dispatch(fetchReligions());
		dispatch(fetchDivision());
		dispatch(fetchStars());
		dispatch(fetchZodiac());
	}, [ dispatch ]);

	const [ formData, setFormData ] = useState({
		religion: '',
		caste: '',
		division: '',
		subCaste: '',
		ethnicity: '',
		star: '',
		rashi: '',
		zodiac: '',
		timeOfBirth: '',
		birthPlace: { country: '', state: '', city: '' },
		gothra: '',
		kundli: null,
		dosh: '',
		doshName: ''
	});

	const [ errors, setErrors ] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(formData);
		const newErrors = {};

		Object.keys(formData).forEach((key) => {
			if (!formData[ key ] && key !== 'gothra' && key !== 'kundli' && key !== 'dosh' && key !== 'doshName' && key !== 'division') {
				const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
				newErrors[ key ] = `${formattedKey} is required`;
			}
		});
		if (!formData.birthPlace.country) newErrors.birthPlaceCountry = 'Country is required';
		if (!formData.birthPlace.state) newErrors.birthPlaceState = 'State is required';
		if (!formData.birthPlace.city) newErrors.birthPlaceCity = 'City is required';

		if (isHindu) {
			if (!formData.gothra) newErrors.gothra = 'Gothra is required';
			if (!formData.kundli) newErrors.kundli = 'Kundli is required';
			if (!formData.dosh) newErrors.dosh = 'Dosh is required';
			if (formData.dosh === 'yes' && !formData.doshName) {
				newErrors.doshName = 'Dosh Name is required';
			}
		} else if (isChristian) {
			if (!formData.division) newErrors.division = 'division is required';
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			toast.error('Please correct all highlighted errors!');
			return;
		}

		let cleanedFormData = { ...formData };

		if (!isHindu) {
			delete cleanedFormData.gothra;
			delete cleanedFormData.kundli;
			delete cleanedFormData.dosh;
			delete cleanedFormData.doshName;
		}
		if (!isChristian) {
			delete cleanedFormData.division;
			console.log("isChristian - ", isChristian);
		}

		if (isHindu && formData.dosh === 'no') {
			delete cleanedFormData.doshName;
		}
		// console.log('Form submitted:', cleanedFormData);

		const loadingToast = toast.loading('Uploading.....');
		try {
			const resultAction = await dispatch(uploadFileData({ spiritualAndSocialBackground: cleanedFormData }));

			if (uploadFileData.fulfilled.match(resultAction)) {
				toast.success('Upload successful!', { id: loadingToast });
			} else if (uploadFileData.rejected.match(resultAction)) {
				toast.error(`${resultAction.payload || 'Upload failed:'}  `, { id: loadingToast });
			}
		} catch (error) {
			toast.error('Upload failed.', { id: loadingToast });
			console.log('Error submitting form:', error);
		}
	};

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[ name ]: value,
		}));
		if (name === 'religion') {
			dispatch(fetchCaste(value));
			formData.caste = ''
			formData.division = ''
			value == '674033b756c5bb792ea58b6b' ? setIsChristian(true) : setIsChristian(false)
			value == '674033b756c5bb792ea58b6d' ? setIsHindu(true) : setIsHindu(false)
		} else if (name == 'star') {
			dispatch(fetchRashiSigns(value));
			formData.rashi = ''
		} else if (name === 'kundli') {
			setFormData((prevFormData) => ({
				...prevFormData,
				[ name ]: files[ 0 ],
			}));
		}
		setErrors((prevErrors) => ({ ...prevErrors, [ name ]: '' }));
	};


	const handleBirthPlaceChange = (e, field) => {
		const { value } = e.target;

		setFormData((prevFormData) => {
			let updatedBirthPlace = { ...prevFormData.birthPlace, [ field ]: value };

			if (field === 'country') {
				updatedBirthPlace = { ...updatedBirthPlace, state: '', city: '' };
				dispatch(fetchStates(value));
			}
			if (field === 'state') {
				updatedBirthPlace = { ...updatedBirthPlace, city: '' };
				dispatch(fetchCities(value));
			}

			return {
				...prevFormData,
				birthPlace: updatedBirthPlace,
			};
		});

		setErrors((prevErrors) => ({
			...prevErrors,
			[ `birthPlace${field.charAt(0).toUpperCase() + field.slice(1)}` ]: '',
		}));
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
						{religionLoading && !religions.length && <option value="" disabled> Loading religion...</option>}
						{religions?.religion?.map((religion) => (
							<option key={religion._id} value={religion._id}>
								{religion.name}
							</option>
						))}
					</select>
					{errors.religion && <p className="text-red-500 text-xs">{errors.religion}</p>}
				</div>
				{/* division */}
				{isChristian &&
					(<div>
						<label htmlFor="division" className="block font-medium mb-1 mt-1 text-headingGray">Division <span className="text-red-500">*</span></label>
						<select
							id="division"
							className={getInputClasses('division')}
							name="division"
							value={formData.division}
							onChange={handleChange}
						>
							<option value="" disabled>Select Caste</option>
							{formData.religion == '' && <option value="" disabled>Fist Select religion</option>}
							{divisionLoading && !division?.length && <option value="" disabled> Loading division...</option>}
							{division?.division?.map((division) => (
								<option key={division._id} value={division._id}>
									{division.name}
								</option>
							))}
						</select>
						{errors.division && <p className="text-red-500 text-xs">{errors.division}</p>}
					</div>
					)}
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
						{formData.religion == '' && <option value="" disabled>Fist Select religion</option>}
						{casteLoading && !casteList?.length && <option value="" disabled>Loading cast...</option>}
						{casteList?.cast?.map((caste) => (
							<option key={caste._id} value={caste._id}>
								{caste.name}
							</option>
						))}
					</select>
					{errors.caste && <p className="text-red-500 text-xs">{errors.caste}</p>}
				</div>
				{/* Sub Caste */}
				<div>
					<label htmlFor="subCaste" className="block font-medium mb-1 mt-1 text-headingGray">Sub Caste <span className="text-red-500">*</span></label>
					<input
						type="text"
						id="subCaste"
						className={getInputClasses('subCaste')}
						placeholder="SubCast"
						name="subCaste"
						value={formData.subCaste}
						onChange={handleChange}
					/>
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
						{starsLoading && !stars.length && <option value="" disabled> Loading stars...</option>}
						{stars?.star?.map((stars) => (
							<option key={stars._id} value={stars._id}>
								{stars.name}
							</option>
						))}
					</select>
					{errors.star && <p className="text-red-500 text-xs">{errors.star}</p>}
				</div>
				{/* Moon */}
				<div>
					<label htmlFor="rashi" className="block font-medium mb-1 mt-1 text-headingGray">rashi  / Moon Sign <span className="text-red-500">*</span></label>
					<select
						id="rashi"
						className={getInputClasses('rashi')}
						name="rashi"
						value={formData.rashi}
						onChange={handleChange}
					>
						<option value="" disabled>Select Rashi</option>
						{formData.star == '' && <option value="" disabled>Select star fist</option>}
						{rashiSignsLoading && !rashiSigns?.length && <option value="" disabled> Loading rashi...</option>}
						{rashiSigns?.rashiSign?.map((rashi) => (
							<option key={rashi._id} value={rashi._id}>
								{rashi.name}
							</option>
						))}
					</select>
					{errors.rashi && <p className="text-red-500 text-xs">{errors.rashi}</p>}
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
						{zodiacLoading && !zodiac?.length && <option value="" disabled> Loading zodiac...</option>}
						{zodiac?.zodiac?.map((zodiac) => (
							<option key={zodiac._id} value={zodiac._id}>
								{zodiac.name}
							</option>
						))}
					</select>
					{errors.zodiac && <p className="text-red-500 text-xs">{errors.zodiac}</p>}
				</div>
				{/* Birth Time */}
				<div>
					<label htmlFor="timeOfBirth" className="block font-medium mb-1 mt-1 text-headingGray">Time Of Birth <span className="text-red-500">*</span></label>
					<input
						type="time"
						id="timeOfBirth"
						className={getInputClasses('timeOfBirth')}
						name="timeOfBirth"
						value={formData.timeOfBirth}
						onChange={handleChange}
						placeholder="Time of birth"

					/>
					{errors.timeOfBirth && <p className="text-red-500 text-xs">{errors.timeOfBirth}</p>}
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
								{countriesLoading && !countries.length && <option value="" disabled>Loading countries...</option>}
								{countries?.country?.map((country, index) => (
									<option key={country._id} value={country._id}>
										{country.name.charAt(0).toUpperCase() + country.name.slice(1)}
									</option>
								))}
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
								{formData.country == '' && <option value="" disabled>Please Select country</option>}
								{statesLoading && !states?.length && <option value="" disabled>Loading states...</option>}
								{states?.state?.map((state) => (
									<option key={state._id} value={state._id}>
										{state.name.charAt(0).toUpperCase() + state.name.slice(1)}
									</option>
								))}
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
								{formData.state == '' && <option value="" disabled>Please Select state</option>}
								{citiesLoading && !cities?.length && <option value="" disabled> Loading cities...</option>}
								{cities?.city?.map((city) => (
									<option key={city._id} value={city._id}>
										{city.name.charAt(0).toUpperCase() + city.name.slice(1)}
									</option>
								))}
							</select>
							{errors.birthPlaceCity && <p className="text-red-500 text-xs">{errors.birthPlaceCity}</p>}
						</div>
					</div>
					{errors.birthPlace && <p className="text-red-500 text-xs">{errors.birthPlace}</p>}
				</div>

				{isHindu && (
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
								<option value="Don't Know">Don't Know</option>
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
									{socialBackground?.doshName?.map((doshName, index) => (
										<option key={index} value={doshName}>
											{doshName.charAt(0).toUpperCase() + doshName.slice(1)}
										</option>
									))}
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
