import React from 'react'
import LoginPage from '../Form/LoginPage';

function Hero() {
	return (
		<>
			<section className="relative">
				<img src="./assets/img/hero.jpg" alt="Trusted" className="w-full h-[100vh] lg:h-[91vh] object-cover" />
				<div className="absolute inset-0 flex justify-center md:justify-end items-center py-4 sm:pt-0 text-white">
					{/* <div className="custom-shadow text-4xl md:text-2xl font-semibold lg:font-bold max-w-3xl px-2 py-2 lg:pl-20 pr-10 lg:pr-20 bg-[#FFD700] bg-opacity-60">
						<p className='text-gray-800 text-3xl md:text-4xl lg:text-5xl font-semibold md:leading-[60px] lg:leading-[60px]'>Every Love Story is <br /> Beautiful</p>
						<p className='text-hotRed text-3xl md:text-4xl sm:leading-[50px]'>Make Yours <br /> Special</p>
					</div> */}
					<div className='mr-0 md:mr-12 lg:mr-28'>
						<LoginPage />
					</div>
				</div>
			</section>
		</>
	)
}

export default Hero;