import React from 'react'

function PageNotFound2() {

	return (
		<>
			<div className='w-full h-screen flex flex-col items-center pt-10'>
				<img src="/assets/img/maintainance.svg" alt="Page Not Found" className='h-[50%] ' />
				<p className='mt-6 px-4 py-1 rounded-md font-light cursor-pointer text-xl text-primary gradient-btn'
					onClick={() => window.history.back()}>back...</p>
			</div >
		</>
	)
}

export default PageNotFound2;