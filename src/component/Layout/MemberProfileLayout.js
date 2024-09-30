import React, { useState } from 'react';
import DetailedProfile from '../MemberProfile/DetailedProfile/DetailedProfile';
import PartnerPreference from '../MemberProfile/PartnerPreference/PartnerPreference';
import PhotoGallery from '../MemberProfile/PhotoGallery/PhotoGallery';
import DashboardMenu from '../Dashboard/DashboardMenu';

function MemberProfileLayout() {
	const [ activeTab, setActiveTab ] = useState('DetailedProfile');

	return (
		<>
			<div>
				<div className='hidden lg:block'>
					<DashboardMenu />
				</div>
				<div className="min-h-screen">
					
					<div className="backGroundGradient bg-white p-4 flex gap-12">
						<div className='w-[22%] relative'>
							<img src="./assets/img/avatar-place.png" alt="" className='absolute' />
						</div>

						<div className="flex space-x-4">
							<button
								className={`px-4 py-2 ${activeTab === 'DetailedProfile' ? 'border-b-2 border-red-500' : ''}`}
								onClick={() => setActiveTab('DetailedProfile')}
							>
								Detailed Profile
							</button>
							<button
								className={`px-4 py-2 ${activeTab === 'PartnerPreference' ? 'border-b-2 border-red-500' : ''}`}
								onClick={() => setActiveTab('PartnerPreference')}
							>
								Partner Preference
							</button>
							<button
								className={`px-4 py-2 ${activeTab === 'PhotoGallery' ? 'border-b-2 border-red-500' : ''}`}
								onClick={() => setActiveTab('PhotoGallery')}
							>
								Photo Gallery
							</button>
						</div>
					</div>

					<div className="mt-10">
						{activeTab === 'DetailedProfile' && <DetailedProfile />}
						{activeTab === 'PartnerPreference' && <PartnerPreference />}
						{activeTab === 'PhotoGallery' && <PhotoGallery />}
					</div>
				</div>
			</div>
		</>
	);
}

export default MemberProfileLayout;