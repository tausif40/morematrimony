import React from 'react'
import './homePage.css';

function PremiumMembers() {
	return (
		<>
			{/* Premium Members */}
			<section className="bg-white py-28">
				<div className='container'>
					<div className="max-w-7xl mx-auto text-center">
						{/* <h3 className="text-3xl font-semibold text-gray-900">PREMIUM MEMBER</h3> */}
						<div className="flex items-center w-96 m-auto my-4">
							<div className="flex-grow border-t-4 border-primary"></div>
							<span className="text-3xl px-2 font-semibold text-gray-900">PREMIUM MEMBER</span>
							<div className="flex-grow border-t-4 border-primary"></div>
						</div>

						<p className="mt-4 text-text max-w-2xl mx-auto">
							Every Premium member on Active Matrimonial is privileged by our policy & rules so you don’t have to worry about your privacy or security.
						</p>
					</div>
					<div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-16 gap-4 w-full'>
						<div className="h-72 overflow-hidden relative">
							<img src="./assets/img/find.jpg" alt="" className="w-full" />
							<div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
							<div className="absolute inset-0 flex flex-col justify-end pl-4 pb-4">
								<p className="font-semibold text-white text-3xl pb-2">Search Your Life Partner </p>
								<p className='text-gold cursor-pointer'>View Real Life Stories →</p>
							</div>
						</div>
						<div className="h-72 overflow-hidden relative">
							<img src="./assets/img/destination.jpg" alt="" className="w-full" />
							<div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
							<div className="absolute inset-0 flex flex-col justify-end pl-4 pb-4">
								<p className="font-semibold text-white text-3xl pb-2">Reach Your Destiny Quickly</p>
								<p className='text-gold cursor-pointer'>Offer for new Premium Member Only →</p>
							</div>
						</div>
						<div className="h-72 overflow-hidden relative">
							<img src="./assets/img/memory.jpg" alt="" className="w-full" />
							<div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
							<div className="absolute inset-0 flex flex-col justify-end pl-4 pb-4">
								<p className="font-semibold text-white text-3xl pb-2">Save Your Memory</p>
								<p className='text-gold cursor-pointer'>Click here to get Amazing Discount →</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* How It Works */}
			<section className="bg-white pb-24">
				<div className='container'>
					<div className="max-w-7xl mx-auto text-center">
						<div className="flex items-center w-[350px] m-auto my-4">
							<div className="flex-grow border-t-4 border-gold"></div>
							<h2 className="text-3xl font-semibold px-2 text-text">HOW IT WORKS</h2>
							<div className="flex-grow border-t-4 border-gold"></div>
						</div>

						<p className="mt-4 text-text max-w-2xl mx-auto">
							When you realize you want to spend the rest of your life with somebody, you want the rest of your life to start as soon as possible.
						</p>
					</div>
					<div className='grid grid-cols-1 lg:grid-cols-3 md:px-20 lg:px-0 mt-14 gap-4 justify-items-center w-full'>

						<div className='responsive border p-4 flex justify-between items-center gap-16 w-full'>
							<div className='textCenter flex flex-col gap-3'>
								<p className='text-hotRed font-semibold text-5xl'>1</p>
								<p className='text-gradient font-medium text-xl'>Sign up</p>
								<p className='text-text font-medium'>Register for free & put up your Profile</p>
							</div>
							<img src="./assets/img/login.png" alt="" className='w-20' />
						</div>

						<div className='responsive border p-4 flex justify-between items-center gap-16 w-full'>
							<div className='textCenter flex flex-col gap-3'>
								<p className='text-hotRed font-semibold text-5xl'>2</p>
								<p className='text-gradient font-medium text-xl'>Connect</p>
								<p className='text-text font-medium'>Select & Connect with Matches you like</p>
							</div>
							<img src="./assets/img/network.png" alt="" className='w-20' />
						</div>

						<div className='responsive border p-4 flex justify-between items-center gap-16 w-full'>
							<div className='textCenter flex flex-col gap-3'>
								<p className='text-hotRed font-semibold text-5xl'>3</p>
								<p className='text-gradient font-medium text-xl'>Interact</p>
								<p className='text-text font-medium'>Become a Premium Member & Start a Conversation</p>
							</div>
							<img src="./assets/img/conversation.png" alt="" className='w-24' />
						</div>
					</div>
				</div>
			</section>

			{/* Trusted by Millions */}
			<section className='trusted-img w-full lg:h-screen relative mb-6'>
				{/* Transparent overlay */}
				<div className="absolute inset-0 bg-black opacity-60"></div>

				<div className='container h-full flex flex-col justify-between relative z-20'>
					<div className='text-center pt-20 w-full flex flex-col items-center text-white'>
						<h2 className='font-semibold'>TRUSTED BY MILLIONS</h2>
						<p className='pt-6 max-w-4xl'>
							"Love doesn't make the world go around. Love is what makes the ride worthwhile." Millions of Active Matrimonial users around the world find their true love and partners from this site. We are always there to help and find you the suitable match for yourself.
						</p>
					</div>
					<div className='pb-20 grid grid-cols-1 lg:grid-cols-3 md:px-20 lg:px-0 mt-48 lg:mt-0 gap-4 justify-items-center w-full'>
						<div className='text-white border flex items-center gap-2 justify-center py-12 w-full bg-black opacity-60'>
							<img src="./assets/img/img9.png" alt="" className='size-5' />
							<p> Best Matches</p>
						</div>
						<div className='text-white border flex items-center gap-2 justify-center py-12 w-full bg-black opacity-60'>
							<img src="./assets/img/img10.png" alt="" className='size-6' />
							<p> Verified Profiles</p>
						</div>
						<div className='text-white border flex items-center gap-2 justify-center py-12 w-full bg-black opacity-60'>
							<img src="./assets/img/img11.png" alt="" className='size-5' />
							<p> 100% Privacy</p>
						</div>
					</div>
				</div>
			</section>

		</>
	)
}

export default PremiumMembers

