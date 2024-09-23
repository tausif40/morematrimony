import React from 'react'

function Hero() {
	return (
		<>
			<section className="relative">
				<img src="./assets/img/hero.jpg" alt="Trusted" className="w-full h-[88vh] object-cover" />
				<div className="absolute inset-0 flex flex-col justify-center text-white">
					<p className="text-4xl md:text-2xl font-semibold lg:font-bold max-w-3xl px-4 lg:pl-28">
						<p className='text-gray-800 md:text-5xl font-semibold md:leading-[60px]' style={{ textShadow: "1px 1px 2px yellow" }}>Every Love Story is <br /> Beautiful</p>
						<p className='text-hotRed md:text-4xl leading-[50px]' style={{ textShadow: "1px 1px 2px yellow" }}>Make Yours <br /> Special</p>
					</p>
				</div>
			</section>
		</>
	)
}

export default Hero;