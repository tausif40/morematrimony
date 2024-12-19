import React, { useEffect, useState } from 'react';
import BasicInformation from './BasicInformation';
import Career from './Career';
import EducationInfo from './EducationInfo';
import FamilyInformation from './FamilyInformation';
import Hobbies from './Hobbies';
import Introduction from './Introduction';
import Language from './Language';
import Lifestyle from './Lifestyle';
import PartnerExpectation from './PartnerExpectation';
import PhysicalAttributes from './PhysicalAttributes';
import PresentAddress from './PresentAddress';
import ResidencyInformation from './ResidencyInformation';
import SocialBackground from './SocialBackground';

import { useDispatch, useSelector } from 'react-redux';
import {
	uploadFileData, fetchCountries, fetchEducation, fetchReligions, fetchStars, fetchZodiac,
	fetchOccupations, fetchLanguages, fetchHobbies, fetchDivision, fetchCountriesWithDoesNotMatter
} from '../../store/features/profileData-slice';
import apiClient from '../../api/apiClient';
import { encryptData, decryptData } from "../../utils/encryption";

const MyProfilePage = () => {
	const dispatch = useDispatch({});

	const { data: userDetails, loading: userDetailsLoading, error: userDetailsError } = useSelector((state) => state.userDetails.userDetails);
	const { data: countries, loading: countriesLoading, error: countriesError } = useSelector((state) => state.profileData.countries);
	const { data: education, loading: educationLoading, error: educationError } = useSelector((state) => state.profileData.education);
	const { data: occupations, loading: occupationLoading, error: occupationError } = useSelector((state) => state.profileData.occupations);
	const { data: languages, loading: languageLoading, error: languagesError } = useSelector((state) => state.profileData.languages);
	const { data: hobbies, loading: hobbiesLoading, error: hobbiesError } = useSelector((state) => state.profileData.hobbies);
	const { data: religions, loading: religionLoading, error: religionError } = useSelector((state) => state.profileData.religions);
	const { data: stars, loading: starsLoading, error: starsError } = useSelector((state) => state.profileData.stars);
	const { data: zodiac, loading: zodiacLoading, error: zodiacError } = useSelector((state) => state.profileData.zodiac);
	const { data: countriesWithDoesNotMatter, loading: countriesWithDoesNotMatterLoading } = useSelector((state) => state.profileData.countriesWithDoesNotMatter);


	useEffect(() => {
		dispatch(fetchCountries());
		dispatch(fetchEducation());
		dispatch(fetchOccupations());
		dispatch(fetchLanguages());
		dispatch(fetchHobbies());
		dispatch(fetchReligions());
		dispatch(fetchStars());
		dispatch(fetchZodiac());
		dispatch(fetchDivision());
		dispatch(fetchCountriesWithDoesNotMatter('yes'));
	}, [ dispatch ]);

	const [ divisions, setDivisions ] = useState([])

	useEffect(() => {
		const DivisionData = async () => {
			try {
				const response = await apiClient.get('/division');
				// setDivisions(response.data);
			} catch (error) {
				console.error(error);
			};
		}
		DivisionData()
	}, [])



	const userData = userDetails?.user
	const introduction = userData?.introduction;
	const basicInfo = userData?.basicInformation;
	const presentAddress = userData?.presentAddress;
	const residency = userData?.residencyInformation;
	const educationInfo = userData?.educationalDetails;
	const careerData = userData?.career;
	const physicalAttributes = userData?.physicalAttributes;
	const languageData = userData?.language;

	const handleFormSubmit = (data) => {
		console.log("data before submit -", data);
		// const encryptedData = encryptData(data);
		// console.log("encryptedData - ", encryptedData);
		// const dData = decryptData(encryptedData);
		// console.log("decryptData - ", dData)

		dispatch(uploadFileData(data));
	};

	// console.log(userData);
	return (
		<div className='space-y-10'>
			<Introduction onFormSubmit={handleFormSubmit} data={introduction} />
			<BasicInformation onFormSubmit={handleFormSubmit} data={basicInfo} />
			<PresentAddress onFormSubmit={handleFormSubmit} data={{ countries, countriesLoading, presentAddress }} />
			<ResidencyInformation onFormSubmit={handleFormSubmit} data={{ countries, countriesLoading, residency }} />
			<EducationInfo onFormSubmit={handleFormSubmit} data={{ education, educationInfo }} />
			<Career onFormSubmit={handleFormSubmit} data={{ countries, countriesLoading, occupations, careerData }} />
			<PhysicalAttributes onFormSubmit={handleFormSubmit} data={physicalAttributes} />
			<Language onFormSubmit={handleFormSubmit} data={{ languages, languageLoading, languageData }} />
			<Hobbies onFormSubmit={handleFormSubmit} data={{ hobbies, hobbiesError }} />
			<SocialBackground onFormSubmit={handleFormSubmit} data={{ religions, divisions, stars, zodiac, languages, countries }} />
			<Lifestyle onFormSubmit={handleFormSubmit} />
			<FamilyInformation onFormSubmit={handleFormSubmit} />
			<PartnerExpectation onFormSubmit={handleFormSubmit} data={{ countriesWithDoesNotMatter, religions, occupations, education, languages }} />
		</div>
	);
};

export default MyProfilePage;
