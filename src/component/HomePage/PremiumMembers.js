import React from 'react'
import './homePage.css';

function PremiumMembers() {
	return (
		<>
			{/* Premium Members */}
			<section className="bg-white py-20">
				<div className='container'>
					<div className="max-w-7xl mx-auto text-center">
						<h3 className="text-3xl font-semibold text-gray-900">Premium Members</h3>
						<p className="mt-4 text-text max-w-2xl mx-auto">
							Every Premium member on Active Matrimonial is privileged by our policy & rules so you don’t have to worry about your privacy or security.
						</p>
					</div>
					<div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-28 gap-4 w-full'>
						<div><img src="./assets/img/img3.png" alt="" className='w-full' /></div>
						<div><img src="./assets/img/img4.png" alt="" className='w-full' /></div>
						<div><img src="./assets/img/img5.png" alt="" className='w-full' /></div>
					</div>
				</div>
			</section>

			{/* How It Works */}
			<section className="bg-white pb-24">
				<div className='container'>
					<div className="max-w-7xl mx-auto text-center">
						<h2 className="text-3xl font-semibold text-text">How It Works</h2>
						<p className="mt-4 text-text max-w-2xl mx-auto">
							When you realize you want to spend the rest of your life with somebody, you want the rest of your life to start as soon as possible.
						</p>
					</div>
					<div className='grid grid-cols-1 lg:grid-cols-3 md:px-20 lg:px-0 mt-14 gap-4 justify-items-center w-full'>

						<div className='responsive border p-4 flex justify-between items-center gap-16 w-full'>
							<div className='textCenter flex flex-col gap-3'>
								<p className='text-hotPink font-semibold text-5xl'>1</p>
								<p className='text-primary font-medium text-xl'>Sign up</p>
								<p className='text-text font-medium'>Register for free & put up your Profile</p>
							</div>
							<img src="./assets/img/img6.png" alt="" className='w-20' />
						</div>

						<div className='responsive border p-4 flex justify-between items-center gap-16 w-full'>
							<div className='textCenter flex flex-col gap-3'>
								<p className='text-hotPink font-semibold text-5xl'>2</p>
								<p className='text-primary font-medium text-xl'>Connect</p>
								<p className='text-text font-medium'>Select & Connect with Matches you like</p>
							</div>
							<img src="./assets/img/img7.png" alt="" className='w-20' />
						</div>

						<div className='responsive border p-4 flex justify-between items-center gap-16 w-full'>
							<div className='textCenter flex flex-col gap-3'>
								<p className='text-hotPink font-semibold text-5xl'>3</p>
								<p className='text-primary font-medium text-xl'>Interact</p>
								<p className='text-text font-medium'>Become a Premium Member & Start a Conversation</p>
							</div>
							<img src="./assets/img/img8.png" alt="" className='w-20' />
						</div>
					</div>
				</div>
			</section>

			{/* Trusted by Millions */}
			<section className='trusted-img w-full lg:h-screen'>
				{/* <img src="./assets/img/img13.png" alt="" className='fixed' /> */}
				<div className='container h-full flex flex-col justify-between'>
					<div className='text-center pt-20 w-full flex flex-col items-center text-white'>
						<h2 className='font-semibold'>Trusted by Millions</h2>
						<p className='pt-6 max-w-4xl'>"Love doesn't make the world go around. Love is what makes the ride worthwhile." Millions of Active Matrimonial users around the world find their true love and partners from this site. We are always there to help and find you the suitable match for yourself.</p>
					</div>
					<div className='pb-20 grid grid-cols-1 lg:grid-cols-3 md:px-20 lg:px-0 mt-48 lg:mt-0 gap-4 justify-items-center w-full'>
						<div className='text-white border flex item-center gap-2 justify-center py-12 w-full bg-black opacity-50'>
							<img src="./assets/img/img9.png" alt="" className='size-5' /><p> Best Matches</p>
						</div>
						<div className='text-white border flex item-center gap-2 justify-center py-12 w-full bg-black opacity-50'>
							<img src="./assets/img/img10.png" alt="" className='size-6' /> <p>Verified Profiles</p>
						</div>
						<div className='text-white border flex item-center gap-2 justify-center py-12 w-full bg-black opacity-50'>
							<img src="./assets/img/img11.png" alt="" className='size-5' /> <p>100% Privacy</p>
						</div>
					</div>
				</div>
			</section>


		</>
	)
}

export default PremiumMembers

