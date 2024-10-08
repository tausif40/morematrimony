import React from 'react';
import Hero from '../HomePage/Hero';
import PremiumMembers from '../HomePage/PremiumMembers';
import NewMember from '../HomePage/NewMember';
import HappyStories from '../HomePage/HappyStories';
import Packages from '../HomePage/Packages';
import Reviews from '../HomePage/Reviews';
import ContactUs from '../Form/ContactUs'
import GetInTouch from '../HomePage/GetInTouch';

const HomePageLayout = () => {
	return (
		<div className="">
			<Hero />
			<PremiumMembers />
			{/* <NewMember /> */}
			{/* <HappyStories /> */}
			<Packages />
			<div className='mt-8'>
				{/* <Reviews /> */}
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