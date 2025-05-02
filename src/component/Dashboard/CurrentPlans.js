import React from 'react'

function CurrentPlans() {
	return (
		<>
			<section className="w-full">
				<div className="text-center flex flex-col items-center">

					<div className="bg-white p-6 inline-block text-[#6d6e6f] rounded-b-md w-full">
						<div className='bg-gray-100'>
							<img src="/assets/img/free.png" alt="img" className='object-contain h-60 w-full' />
						</div>
						<h3 className="text-2xl font-semibold text-headingGray py-4 mb-2 border-b">Default</h3>
						<p className="mt-4 flex"> <p className='text-green-500'> ✓&nbsp;&nbsp; </p> 5 Express Interests</p>
						<p className="mt-4 flex"> <p className='text-green-500'> ✓&nbsp;&nbsp; </p> 2 Gallery Photo U load</p>
						<p className="mt-4 flex"> <p className='text-green-500'> ✓&nbsp;&nbsp; </p> O Contact Info View</p>
						<p className="mt-4 flex"> <p className='text-red-500'> ☓&nbsp;&nbsp; </p> <del className='text-text'>Contact Info View</del></p>
						<p className='font-semibold text-4xl mt-8 text-black'>Free</p>
						{/* <p className='text-primary text-sm font-medium'>10 days</p> */}
						<button className="mt-6 bg-gray-100 text-black text-sm px-6 py-3 rounded cursor-default"><del>Purchase this Package</del></button>
					</div>
				</div>
			</section>
		</>
	)
}

export default CurrentPlans;