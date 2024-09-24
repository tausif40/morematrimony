import React from 'react'
import LoginPage from '../Form/LoginPage';

function Hero() {
	return (
		<>
			<section className="relative">
				<img src="./assets/img/hero.jpg" alt="Trusted" className="w-full h-[88vh] object-cover" />
				<div className="absolute inset-0 flex justify-between items-center  text-white">
					<div className="text-4xl md:text-2xl font-semibold lg:font-bold max-w-3xl ml-1 px-2 py-2 lg:pl-20 pr-10 bg-[#FFD700] bg-opacity-60 outline outline-[5px] outline-white/[.60]">
						<p className='text-gray-800 md:text-5xl font-semibold md:leading-[60px]'>Every Love Story is <br /> Beautiful</p>
						<p className='text-hotRed md:text-4xl leading-[50px]'>Make Yours <br /> Special</p>
					</div>
					<div className='lg:mr-40'>
						<LoginPage />
					</div>
				</div>
			</section>
		</>
	)
}

export default Hero;