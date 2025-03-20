import React, { useEffect } from 'react';
import Hero from '../HomePage/Hero';
import PremiumMembers from '../HomePage/PremiumMembers';
import ContactUs from '../Form/ContactUs'
import GetInTouch from '../HomePage/GetInTouch';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AllPlans from '../Plans/AllPlans';

const HomePageLayout = () => {
	const navigate = useNavigate()
	const [ searchParams ] = useSearchParams();
	const token = searchParams.get('token');
	// console.log("param-", token);

	useEffect(() => {
		if (token !== null && token.length >= 24) {
			sessionStorage.setItem('AT', token);
			navigate('/dashboard')
		}
	}, [ token ])

	return (
		<div className="">
			<Hero />
			<PremiumMembers />
			<AllPlans />
			<div className='mt-8'>
			</div>
			<div className='bg-[#f6f6f6] grid grid-cols-1 md:grid-cols-2'>
				<div className='p-24'>
					<GetInTouch />
				</div>
				<div className='px-4 md:px-0 w-full lg:w-[80%] xl:w-[70%] m-auto'>
					<ContactUs />
				</div>
			</div>
		</div>
	);
};

export default HomePageLayout;