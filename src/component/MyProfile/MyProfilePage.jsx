import React from 'react';

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

// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCountries, fetchStates, fetchCities } from '../../store/features/profileData-slice';


const MyProfilePage = () => {
	// const dispatch = useDispatch();
	// const { countries, states, cities, loading, error } = useSelector((state) => state.profileData);
	

	// useEffect(() => {
	// 	dispatch(fetchCountries());
	// }, [ dispatch ]);

	return (
		<div className='space-y-10'>
			<Introduction />
			<BasicInformation />
			<PresentAddress />
			<ResidencyInformation />
			<EducationInfo />
			<Career />
			<PhysicalAttributes />
			<Language />
			<Hobbies />
			<SocialBackground />
			<Lifestyle />
			<FamilyInformation />
			<PartnerExpectation />
		</div>
	);
};

export default MyProfilePage;
