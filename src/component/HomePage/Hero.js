import React from 'react'

function Hero() {
	return (
		<>
			<section className="relative">
				<img src="./assets/img/img2.jpeg" alt="Trusted" className="w-full h-[88vh] object-cover" />
				<div className="absolute inset-0 flex flex-col justify-center text-white">
					<p className="text-4xl md:text-2xl font-semibold lg:font-bold max-w-3xl px-4 lg:pl-28">
						<p className='text-gray-900 md:text-5xl font-semibold md:leading-[60px]'>Every Love Story is <br /> Beautiful</p>
						<p className='text-hotPink md:text-4xl leading-[50px]'>Make Yours <br /> Special</p>
					</p>
				</div>
			</section>
		</>
	)
}

export default Hero;