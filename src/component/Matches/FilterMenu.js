import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getMatchedProfile } from '../../store/features/matchProfile-slice';


function FilterMenu() {
	const dispatch = useDispatch()
	const location = useLocation();
	const currentPath = location.pathname;
	const { matches } = useParams()
	const [ filterKey, setFilterKey ] = useState('')

	const navOption = [
		{ name: 'Newly Joined', path: 'newly-Joined', key: 'preferredNewlyJoined' },
		{ name: 'Parent Created Matches', path: 'Parent-created-matches', key: 'parentCreatedMatches' },
		{ name: 'Preferred City, State', path: 'preferred-city', key: 'preferredStateAndCity' },
		{ name: 'Preferred Star', path: 'preferred-star', key: 'preferredStar' },
		{ name: ' Divorced, Widow', path: ' divorced', key: 'preferredDivorcedAndWidower' },
		{ name: 'Preferred Education', path: 'preferred-education', key: 'preferredEducation' },
		{ name: 'Preferred Profession', path: 'proffered-profession', key: 'preferredProfession' },
		{ name: 'Viewed You', path: 'viewed-you', key: 'c' },
		{ name: 'My Interest', path: 'my-interest', key: 'e' },
		// { name: 'Hobby Matches', path: 'hobby-matches', key:'' },
		// { name: 'Others Created Matches', path: 'others-created-matches', key:'' },
	]

	useEffect(() => {
		// dispatch(setFilterApplied(selectedFilters));
		const filter = { [ filterKey ]: true }
		console.log(filter);
		dispatch(getMatchedProfile(filter));
		// console.log("params - ", location.search);
	}, [ dispatch, location ])

	return (
		<>
			< section className='bg-white w-full'>
				<div className='flex flex-wrap justify-center text-headingGray space-x-2 pt-4 pb-2 border-b mt-4 '>
					{navOption.map((value, index) => (
						<Link Link to={`/matches?${value.key}`} key={index} >
							{console.log(value.key, "==", filterKey)}
							<div className={`min-w-max tracking-wide cursor-pointer px-4 py-2 flex items-center gap-2 font-medium text-sm ${value.key == filterKey ? 'text-primary' : 'hover:text-red-500'}`} onClick={() => setFilterKey(value.key)}>{value.name}</div>
						</Link >
					))}
				</div >
			</ section >
		</>
	)
}

export default FilterMenu;