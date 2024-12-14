import React, { useEffect, useState } from 'react';
import DetailedProfile from './DetailedProfile/DetailedProfile';
import PhotoGallery from './PhotoGallery/PhotoGallery';
import { useDispatch, useSelector } from 'react-redux';


function MemberProfile() {
	const dispatch = useDispatch()
	const [ activeTab, setActiveTab ] = useState('DetailedProfile');
	const [ dpImage, setDpImage ] = useState()

	const userDetails = useSelector((state) => state.userDetails.userDetails);

	useEffect(() => {
		setDpImage(userDetails?.data?.user?.profileImage)
	}, [ dispatch, userDetails?.data?.user?.profileImage ])
	// console.log(userDetails?.data?.user);

	return (
		<>
			<div className="min-h-screen">
				<div className="backGroundGradient bg-white md:px-4 flex gap-12">

					<div className='container flex gap-6 items-end'>
						<div className="w-full px-4 md:px-6 lg:px-10 xl:px-12">
							<div className='text-white flex relative'>
								<div className='w-full pt-16'>
									<p className='font-medium text-2xl md:text-3xl'>Mohd. Tausif</p>
									<div className='flex font-light text-sm py-2 border-b border-text w-2/5 sm:w-1/2'>
										<p className='min-w-max'>Member ID : &nbsp;</p> <p className=''>2024093</p>
									</div>
									<p className='py-4'>Age - 23 yrs</p>
								</div>
								<div className='absolute object-cover right-0 top-0 pt-8 sm:pt-3 '>
									<img src={dpImage || `./assets/img/avatar-place.png`} alt="" className='w-40 h-40 sm:w-56 sm:h-56 object-cover rounded-full shadow-lg bg-gray-50 border-4 border-white' />
								</div>
							</div>

							<div className='mt-8 md:mt-6 lg:mt-4 space-x-8 text-gray-800 flex '>
								<button
									className={`py-2 px-1 sm:px-2 md:px-3 transition-all ${activeTab === 'DetailedProfile' ? 'active text-white' : ''}`}
									onClick={() => setActiveTab('DetailedProfile')}
								>
									Detailed Profile
								</button>
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

				<div className="my-10 px-2 sm:px-8 lg:px-16 xl:px-20 flex gap-6 justify-center">
					{activeTab === 'DetailedProfile' && <DetailedProfile userDetails={userDetails} />}
					{activeTab === 'PhotoGallery' && <PhotoGallery />}
				</div>
			</div>
		</>
	);
}

export default MemberProfile;