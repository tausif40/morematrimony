import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


function FilterMenu() {
	const location = useLocation();
	const currentPath = location.pathname;

	const navOption = [
		// { name: 'All Matches', path: 'all-matches' },
		{ name: 'Newly Joined', path: 'newly-Joined' },
		{ name: 'Viewed You', path: 'viewed-you' },
		{ name: 'My Interest', path: 'my-interest' },
		// { name: 'Mutual Matches', path: 'mutual-matches' },
		{ name: 'Horoscope Matches', path: 'horoscope-matches' },
		{ name: 'Preferred City, State', path: 'preferred-city' },
		{ name: 'Proffered Profession', path: 'proffered-profession' },
		{ name: 'Preferred Education', path: 'preferred-education' },
		{ name: 'Preferred Star', path: 'preferred-star' },
		{ name: 'Hobby Matches', path: 'hobby-matches' },
		// { name: 'Self Created Matches', path: 'self-created-matches' },
		{ name: 'Parent Created Matches', path: 'Parent-created-matches' },
		{ name: 'Others Created Matches', path: 'others-created-matches' },
		{ name: ' Divorced, Widow', path: ' divorced' },
		{ name: 'Paid Members Matches', path: 'paid-members-matches' },
		{ name: 'Free Members Matches', path: 'free-members-matches' },
	]

	return (
		<>
			< section className='bg-white'>
				<div className='flex flex-wrap justify-center text-headingGray space-x-2 pt-4 pb-2 border-b'>
					{navOption.map((value, index) => (
						// <Link to={value.path} >
						<div className={`min-w-max tracking-wide cursor-pointer px-4 py-2 flex items-center gap-2 font-medium text-sm hover:text-primary ${value.path == currentPath && 'text-gradient'}`}>{value.name}</div>
						// </Link>
					))}
				</div >
			</ section>
		</>
	)
}

export default FilterMenu;