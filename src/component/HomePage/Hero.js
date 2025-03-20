import React, { useEffect, useState } from 'react'
import LoginForm from '../Form/LoginForm';
import Cookies from 'js-cookie';

function Hero() {
	const [ isUserLogin, setIsUserLogin ] = useState(false)
	const token = Cookies.get('access_token') || sessionStorage.getItem('AT');

	useEffect(() => {
		token && setIsUserLogin(true)
	}, [ token ])

	return (
		<>
			<section className="relative border-t-[6px] border-gold">
				<img src="/assets/img/hero.jpg" alt="Trusted" className="w-full h-[90vh] lg:h-[91vh] object-cover" />
				<div className="absolute inset-0 flex justify-center md:justify-end items-center py-4 sm:pt-0 text-white">
					{/* <div className="custom-shadow text-4xl md:text-2xl font-semibold lg:font-bold max-w-3xl px-2 py-2 lg:pl-20 pr-10 lg:pr-20 bg-[#FFD700] bg-opacity-60">
						<p className='text-gray-800 text-3xl md:text-4xl lg:text-5xl font-semibold md:leading-[60px] lg:leading-[60px]'>Every Love Story is <br /> Beautiful</p>
						<p className='text-hotRed text-3xl md:text-4xl sm:leading-[50px]'>Make Yours <br /> Special</p>
					</div> */}
					<div className='w-full sm:w-auto mr-0 md:mr-12 lg:mr-28'>
						{!isUserLogin && <LoginForm />}
					</div>
				</div>
			</section>
		</>
	)
}

export default Hero;