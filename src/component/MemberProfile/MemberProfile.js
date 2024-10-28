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
				<div className="backGroundGradient bg-white md:px-4 flex gap-12">

					<div className='container flex gap-6 items-end'>

						{/* <div className='w-1/3 py-4 object-cover hidden lg:block'>
							<img src="./assets/img/avatar-place.png" alt="" className='rounded-md shadow-lg absolute w-[320px] top-40' />
						</div> */}

						<div className="w-full px-16">
							<div className='text-white flex relative'>
								<div className='w-full pt-16'>
									<p className='font-medium text-2xl md:text-3xl'>Mohd. Tausif</p>
									<div className='flex font-light text-sm py-2 border-b border-text w-full md:w-1/2 lg:w-1/2'>
										<p className='min-w-max'>Member ID : &nbsp;</p> <p className='font-medium'>2024093</p>
									</div>
									<p className='py-4'>23 yrs</p>
								</div>
								<div className='absolute object-cover right-0 top-0 pt-4'>
									<img src="./assets/img/avatar-place.png" alt="" className='rounded-full shadow-lg min-w-[80px] w-[180px] md:w-[220px]' />
								</div>
							</div>

							<div className='mt-8 md:mt-6 lg:mt-4 space-x-8 text-gray-800 flex '>
								<button
									className={`py-2 px-1 sm:px-2 md:px-3 transition-all ${activeTab === 'DetailedProfile' ? 'active text-white' : ''}`}
									onClick={() => setActiveTab('DetailedProfile')}
								>
									Detailed Profile
								</button>
								{/* <button
									className={`py-2 px-2 md:px-3 transition-all ${activeTab === 'PartnerPreference' ? 'active text-white' : ''}`}
									onClick={() => setActiveTab('PartnerPreference')}
								>
									Partner Preference
								</button> */}
								<button
									className={`py-2 px-2 md:px-3 transition-all ${activeTab === 'PhotoGallery' ? 'active text-white' : ''}`}
									onClick={() => setActiveTab('PhotoGallery')}
								>
									Photo Gallery
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="my-10 px-36 flex gap-6 justify-center">
					{activeTab === 'DetailedProfile' && <DetailedProfile />}
					{activeTab === 'PartnerPreference' && <PartnerPreference />}
					{activeTab === 'PhotoGallery' && <PhotoGallery />}
				</div>
			</div>
		</>
	);
}

export default MemberProfile;