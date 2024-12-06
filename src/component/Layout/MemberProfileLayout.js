import React, { useState } from 'react';
// import DetailedProfile from '../MemberProfile/DetailedProfile/DetailedProfile';
// import PartnerPreference from '../MemberProfile/PartnerPreference/PartnerPreference';
// import PhotoGallery from '../MemberProfile/PhotoGallery/PhotoGallery';
import DashboardMenu from '../Dashboard/DashboardMenu';
import MemberProfile from '../MemberProfile/MemberProfile';

function MemberProfileLayout() {

	const [ activeTab, setActiveTab ] = useState('DetailedProfile');


	return (
		<>
			<div>
				<div className='hidden lg:block'>
					<DashboardMenu />
				</div>
				<MemberProfile />	
			</div>	
		</>
	);
}

export default MemberProfileLayout;