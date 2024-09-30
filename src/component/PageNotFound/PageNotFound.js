import React from 'react'

function PageNotFound() {

	const handleBackClick = () => {
		window.history.back();
	};

	return (
		<>
			<div className='w-full h-screen flex flex-col items-center border-t'>
				<img src="./assets/img/404.svg" alt="Page Not Found" className='px-4 md:h-[75%]' />
				<p className='mt-6 px-4 py-1 rounded-md font-light cursor-pointer text-xl text-primary gradient-btn' onClick={handleBackClick}>back...</p>
			</div>
		</>
	)
}

export default PageNotFound;