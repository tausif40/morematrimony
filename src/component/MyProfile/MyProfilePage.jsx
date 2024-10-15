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
import PermanentAddress from './PermanentAddress';
import PhysicalAttributes from './PhysicalAttributes';
import PresentAddress from './PresentAddress';
import ResidencyInformation from './ResidencyInformation';
import SocialBackground from './SocialBackground';
import UpdateEmail from './UpdateEmail';

const MyProfilePage = () => {
	return (
		<div className='space-y-10'>
			<Introduction />
			{/* <UpdateEmail /> */}
			<BasicInformation />
			<PresentAddress />
			<PermanentAddress />
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
