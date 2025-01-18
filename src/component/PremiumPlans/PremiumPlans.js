import React from 'react'

function PremiumPlans() {
	return (
		<>
			<section className="w-full">
				<div className="text-center flex flex-col items-center">

					<div className="bg-white p-6 inline-block text-[#6d6e6f] rounded-md w-full">
						<div>
							<img src="/assets/img/searchingPartner.jpg" alt="img" className='m-auto' />
						</div>
						<h3 className="text-2xl font-semibold text-headingGray mt-6 ">Default</h3>
						<p className="mt-4 flex"> <p className='text-green-500'> ✓&nbsp;&nbsp; </p> 5 Express Interests</p>
						<p className="mt-4 flex"> <p className='text-green-500'> ✓&nbsp;&nbsp; </p> 2 Gallery Photo U load</p>
						<p className="mt-4 flex"> <p className='text-green-500'> ✓&nbsp;&nbsp; </p> O Contact Info View</p>
						<p className="mt-4 flex"> <p className='text-red-500'> ☓&nbsp;&nbsp; </p> <del className='text-text'>Contact Info View</del></p>
						<p className='font-semibold text-6xl mt-14 text-black'>Free</p>
						<p className='text-primary text-sm font-medium'>10 days</p>
						<button className="mt-6 bg-gray-100 text-black text-sm px-6 py-3 rounded"><del>Purchase this Package</del></button>
					</div>
				</div>
			</section>
		</>
	)
}

export default PremiumPlans