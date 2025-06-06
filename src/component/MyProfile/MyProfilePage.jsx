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
	uploadFileData, fetchStars, fetchZodiac, fetchLanguages, fetchHobbies, fetchDivision, fetchCountriesWithDoesNotMatter
} from '../../store/features/profileData-slice';
import apiClient from '../../lib/apiClient';
import { encryptData, decryptData } from "../../lib/encryption";
import { socialBackground } from '../../data/MyProfileData';

const MyProfilePage = () => {
	const dispatch = useDispatch({});
	const [ isLoading, setIsLoading ] = useState(false);

	const { data: userDetails, } = useSelector((state) => state.userDetails.userDetails);
	const { data: countries, loading: countriesLoading, error: countriesError } = useSelector((state) => state.profileData.countries);
	const { data: education, loading: educationLoading, error: educationError } = useSelector((state) => state.profileData.education);
	const { data: occupations, loading: occupationLoading, error: occupationError } = useSelector((state) => state.profileData.occupations);
	const { data: languages, loading: languageLoading, error: languagesError } = useSelector((state) => state.profileData.languages);
	const { data: hobbies, loading: hobbiesLoading, error: hobbiesError } = useSelector((state) => state.profileData.hobbies);
	const { data: religions, loading: religionLoading, error: religionError } = useSelector((state) => state.profileData.religions);
	const { data: divisions, loading: divisionsLoading, error: divisionsError } = useSelector((state) => state.profileData.divisions);
	const { data: stars, loading: starsLoading, error: starsError } = useSelector((state) => state.profileData.stars);
	const { data: zodiac, loading: zodiacLoading, error: zodiacError } = useSelector((state) => state.profileData.zodiac);
	const { data: countriesWithDoesNotMatter, loading: countriesWithDoesNotMatterLoading } = useSelector((state) => state.profileData.countriesWithDoesNotMatter);

	const formData = useSelector((state) => state.profileData.formData);

	useEffect(() => {
		// dispatch(fetchCountries());
		// dispatch(fetchEducation());
		// dispatch(fetchOccupations());
		dispatch(fetchLanguages());
		dispatch(fetchHobbies());
		dispatch(fetchStars());
		dispatch(fetchZodiac());
		dispatch(fetchDivision());
		dispatch(fetchCountriesWithDoesNotMatter('yes'));
	}, [ dispatch ]);

	const userData = userDetails?.user
	const agent = userData?.agentId
	const introductionData = userData?.introduction;
	const basicInfo = userData?.basicInformation;
	const presentAddress = userData?.presentAddress;
	const residency = userData?.residencyInformation;
	const educationInfo = userData?.educationalDetails;
	const careerData = userData?.career;
	const physicalAttributes = userData?.physicalAttributes;
	const languageData = userData?.language;
	const bobbie = userData?.hobbies;
	const socialBackgroundData = userData?.spiritualAndSocialBackground;
	const lifestyle = userData?.lifestyle;
	const familyDetails = userData?.familyDetails;
	const partnerExpectation = userData?.partnerExpectation;

	useEffect(() => {
		setIsLoading(formData?.loading)
	}, [ formData?.loading ])

	console.log("formData - ", userData)
	const handleFormSubmit = (data) => {
		// console.log("formData Before submit - ", data)
		// console.log(data);
		// const encryptedData = encryptData(data);
		// console.log("encryptedData - ", encryptedData);
		// const dData = decryptData(encryptedData);
		// console.log("decryptData - ", dData)

		dispatch(uploadFileData(data));
	};

	return (
		<div className='space-y-10 mb-36 z-50 overflow-visible'>
			<Introduction onFormSubmit={handleFormSubmit} data={{ introductionData, isLoading }} />
			<BasicInformation onFormSubmit={handleFormSubmit} data={{ agent, basicInfo, isLoading }} />
			<PresentAddress onFormSubmit={handleFormSubmit} data={{ countries, countriesLoading, presentAddress, isLoading }} />
			<ResidencyInformation onFormSubmit={handleFormSubmit} data={{ countries, countriesLoading, residency, isLoading }} />
			<EducationInfo onFormSubmit={handleFormSubmit} data={{ education, educationInfo, isLoading }} />
			<Career onFormSubmit={handleFormSubmit} data={{ countries, countriesLoading, occupations, careerData, isLoading }} />
			<PhysicalAttributes onFormSubmit={handleFormSubmit} data={{ physicalAttributes, isLoading }} />
			<Language onFormSubmit={handleFormSubmit} data={{ languages, languageLoading, languageData, isLoading }} />
			<Hobbies onFormSubmit={handleFormSubmit} data={{ bobbie, hobbies, hobbiesError, isLoading }} />
			<SocialBackground onFormSubmit={handleFormSubmit} data={{ religions, divisions, stars, zodiac, languages, countries, socialBackgroundData, isLoading }} />
			<Lifestyle onFormSubmit={handleFormSubmit} loading={isLoading} data={lifestyle} />
			<FamilyInformation onFormSubmit={handleFormSubmit} loading={isLoading} data={familyDetails} />
			<PartnerExpectation data={{ countriesWithDoesNotMatter, religions, occupations, education, languages, isLoading, partnerExpectation }} />
		</div>
	);
};

export default MyProfilePage;