import React from 'react'

function Footer() {
	return (
		<>
			<footer className=" bg-gray-800 pb-20 pt-10 lg:py-10 text-center text-white flex justify-center">
				<div className='container'>

					{/* <div className='flex justify-center items-center gap-2'>
						<img src="/assets/img/logo/smallIcon.png" alt="" className='w-14 pb-1 hidden lg:block' />
						<div className='space-y-1'>
							<img src="/assets/img/logo/fistName.png" alt="" className='w-16 hidden lg:block' />
							<img src="/assets/img/logo/lastName.png" alt="" className='w-32 hidden lg:block' />
						</div>
					</div> */}

					<div className='flex items-center justify-center gap-2 pt-2'>
						<img src="/assets/img/logo/icon.png" alt="" className='w-8 md:w-10 pb-1' />
						<div className='flex items-center space-x-1'>
							<img src="/assets/img/logo/fistName.png" alt="" className='max-w-14 md:max-w-20' />
							<img src="/assets/img/logo/lastName.png" alt="" className='max-w-28 md:max-w-40' />
						</div>
					</div>

					<div className='bg-primary mt-4 h-[1px]'></div>

					<div>

					</div>
				</div >
			</footer>
		</>
	)
}

export default Footer