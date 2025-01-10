import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';


function FilterMenu() {
	const dispatch = useDispatch()
	const location = useLocation();
	const currentPath = location.pathname;

	const navOption = [
		{ name: 'Newly Joined', path: 'newly-Joined', key: 'preferredNewlyJoined' },
		{ name: 'Parent Created Matches', path: 'Parent-created-matches', key: 'parentCreatedMatches' },
		{ name: 'Preferred Star', path: 'preferred-star', key: 'preferredStar' },
		{ name: 'Preferred Education', path: 'preferred-education', key: 'preferredEducation' },
		{ name: 'Preferred City, State', path: 'preferred-city', key: 'preferredStateAndCity' },
		{ name: ' Divorced, Widow', path: ' divorced', key: 'preferredDivorcedAndWidower' },
		{ name: 'Viewed You', path: 'viewed-you', key: '' },
		{ name: 'My Interest', path: 'my-interest', key: '' },
		{ name: 'Preferred Profession', path: 'proffered-profession', key: '' },
		// { name: 'Hobby Matches', path: 'hobby-matches', key:'' },
		// { name: 'Others Created Matches', path: 'others-created-matches', key:'' },
	]

	// useEffect(() => {
	// 	dispatch(matchPreferredProfile(selectedFilters));
	// }, [ selectedFilters ])

	const matchPreferredProfile = useSelector((state) => state.matchProfile.matchPreferredProfile);

	return (
		<>
			< section className='bg-white w-full'>
				<div className='flex flex-wrap justify-center text-headingGray space-x-2 pt-4 pb-2 border-b mt-4 '>
					{navOption.map((value, index) => (
						<Link to={`/matches/${value.path}`} >
							<div className={`min-w-max tracking-wide cursor-pointer px-4 py-2 flex items-center gap-2 font-medium text-sm hover:text-primary ${value.path == currentPath && 'text-gradient'}`}>{value.name}</div>
						</Link>
					))}
				</div >
			</ section>
		</>
	)
}

export default FilterMenu;