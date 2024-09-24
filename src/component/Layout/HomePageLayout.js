import React from 'react';
import Hero from '../HomePage/Hero';
import PremiumMembers from '../HomePage/PremiumMembers';
import NewMember from '../HomePage/NewMember';
import HappyStories from '../HomePage/HappyStories';
import Packages from '../HomePage/Packages';
import Reviews from '../HomePage/Reviews';

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

		</div>
	);
};

export default HomePageLayout;