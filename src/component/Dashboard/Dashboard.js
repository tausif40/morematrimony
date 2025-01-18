import React, { useEffect, useState } from 'react'
import DashboardMenu from './DashboardMenu'
import { Outlet } from 'react-router-dom'
import PremiumPlans from '../PremiumPlans/PremiumPlans'
import VerificationForm from '../Form/VerificationForm';

function Dashboard() {

	const [ verified, setVerified ] = useState(false);
	const [ showVerification, setShowVerification ] = useState(false);

	return (
		<>
			{!verified && showVerification && (
				<VerificationForm verify={setVerified} onClose={() => setShowVerification(false)} />
			)}

			<section className='bg-white py-4 px-6 border rounded-md w-full'>
				<div className='grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 text-center'>
					<div className='bg-zinc-100 text-headingGray py-10 space-y-6 rounded-md'>
						<p className='font-bold text-3xl text-gradient'>5</p>
						<p className='w-28 text-sm m-auto'>Remaining Interest</p>
					</div>
					<div className='bg-zinc-100 text-headingGray py-10 space-y-6 rounded-md'>
						<p className='font-bold text-3xl text-gradient'>0</p>
						<p className='w-28 text-sm m-auto'>Remaining Contact View</p>
					</div>
					<div className='bg-zinc-100 text-headingGray py-10 space-y-6 rounded-md'>
						<p className='font-bold text-3xl text-gradient'>3</p>
						<p className='w-36 text-sm m-auto'>Remaining Gallery Image Upload</p>
					</div>
				</div>

				<div className='py-12 flex sm:flex-row flex-col-reverse gap-6'>
					<div className='border shadow-sm rounded-md w-full sm:w-1/2'>
						<p className='px-6 py-2 border-b text-headingGray text-lg'>Current Plan</p>
						<PremiumPlans />
					</div>
					<div className='space-y-6 w-full sm:w-1/2'>
						<div className='border w-full m-auto flex flex-col items-center pb-8 rounded-md shadow-sm'>
							{
								verified ?
									<img src="/assets/img/verified.png" alt="non_verified" className='w-auto pt-8' />
									: <>
										<img src="/assets/img/non_verified.png" alt="non_verified" className='w-auto' />
										<button className='gradient-btn text-white px-4 py-2 rounded-md' onClick={() => setShowVerification(true)}>Verify Now</button>
									</>
							}
						</div>

						<div className='w-full border shadow-sm rounded-md'>
							<p className='px-6 py-2 border-b text-headingGray text-lg'>Matched profile</p>
							<div className='px-6 py-6'>
								<p className='bg-[#d1ecf1] text-[#0c5460] p-2 rounded-md'>Upgrade your package for auto match making</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default Dashboard