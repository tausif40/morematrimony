import React from 'react';

import AstronomicInformation from './AstronomicInformation';
import BasicInformation from './BasicInformation';
import Career from './Career';
import EducationInfo from './EducationInfo';
import FamilyInformation from './FamilyInformation';
import HobbiesInterest from './HobbiesInterest';
import Introduction from './Introduction';
import Language from './Language';
import Lifestyle from './Lifestyle';
import PartnerExpectation from './PartnerExpectation';
import PermanentAddress from './PermanentAddress';
import PersonalAttitude from './PersonalAttitude';
import PhysicalAttributes from './PhysicalAttributes';
import PresentAddress from './PresentAddress';
import ResidencyInformation from './ResidencyInformation';
import SocialBackground from './SocialBackground';
import UpdateEmail from './UpdateEmail';

const MyProfilePage = () => {
	return (
		<div>
			<Introduction />
			<UpdateEmail />
			<BasicInformation />
			<PresentAddress />
			<EducationInfo />
			<Career />
			<PhysicalAttributes />
			<Language />
			<HobbiesInterest />
			<PersonalAttitude />
			<ResidencyInformation />
			<SocialBackground />
			<Lifestyle />
			<AstronomicInformation />
			<PermanentAddress />
			<FamilyInformation />
			<PartnerExpectation />
		</div>
	);
};

export default MyProfilePage;
