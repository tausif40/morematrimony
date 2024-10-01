import React, { useState } from 'react';
import DetailedProfile from './DetailedProfile/DetailedProfile';
import PartnerPreference from './PartnerPreference/PartnerPreference';
import PhotoGallery from './PhotoGallery/PhotoGallery';
import DashboardMenu from '../Dashboard/DashboardMenu';

function MemberProfile() {
	const [ activeTab, setActiveTab ] = useState('DetailedProfile');

	return (
		<>
			<div className="min-h-screen">
				<div className="backGroundGradient bg-white px-4 flex gap-12">

					<div className='container flex gap-6 items-end pt-14'>
							
						<div className='w-1/3 py-4 object-cover'>
							<img src="./assets/img/avatar-place.png" alt="" className='rounded-md shadow-lg absolute w-[320px] bottom-56' />
						</div>

						<div className=" w-8/12">
							<div className='text-white'>
								<p className='font-medium text-3xl'>Mohd. Tausif</p>
								<div className='flex font-light text-sm py-2 border-b border-text w-4/6'>
									<p className=''>Member ID : &nbsp;</p> <p className='font-medium'>2024093</p>
								</div>
								<p className='py-4'>23 yrs</p>
							</div>

							<div className='mt-4 space-x-8 text-gray-800 '>
								<button
									className={`py-2 px-3 ${activeTab === 'DetailedProfile' ? 'active text-white' : ''}`}
									onClick={() => setActiveTab('DetailedProfile')}
								>
									Detailed Profile
								</button>
								<button
									className={`py-2 px-3 ${activeTab === 'PartnerPreference' ? 'active text-white' : ''}`}
									onClick={() => setActiveTab('PartnerPreference')}
								>
									Partner Preference
								</button>
								<button
									className={`py-2 px-3 ${activeTab === 'PhotoGallery' ? 'active text-white' : ''}`}
									onClick={() => setActiveTab('PhotoGallery')}
								>
									Photo Gallery
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="container mt-10 flex gap-6">
					<div className='w-1/3'>
						{/* <p className='font-light text-sm pb-2'>Member ID: 2024093</p>
						<p className='font-semibold text-2xl'>Mohd. Tausif</p> */}
					</div>
					<div className='w-8/12'>
						{activeTab === 'DetailedProfile' && <DetailedProfile />}
						{activeTab === 'PartnerPreference' && <PartnerPreference />}
						{activeTab === 'PhotoGallery' && <PhotoGallery />}
					</div>
				</div>

			</div>
		</>
	);
}

export default MemberProfile;