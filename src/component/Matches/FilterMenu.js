import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getMatchedProfile } from '../../store/features/matchProfile-slice';
import { MdClear } from "react-icons/md";

function FilterMenu() {
	const dispatch = useDispatch();
	const location = useLocation();
	const [ filterKey, setFilterKey ] = useState('');

	const navOption = [
		{ name: 'Newly Joined', path: 'newly-Joined', key: 'preferredNewlyJoined' },
		{ name: 'Parent Created Matches', path: 'Parent-created-matches', key: 'parentCreatedMatches' },
		{ name: 'Preferred City, State', path: 'preferred-city', key: 'preferredStateAndCity' },
		{ name: 'Preferred Star', path: 'preferred-star', key: 'preferredStar' },
		{ name: ' Divorced, Widow', path: 'divorced', key: 'preferredDivorcedAndWidower' },
		{ name: 'Preferred Education', path: 'preferred-education', key: 'preferredEducation' },
		{ name: 'Preferred Profession', path: 'proffered-profession', key: 'preferredProfession' },
	];

	useEffect(() => {
		const filter = filterKey ? { [ filterKey ]: true } : {};
		dispatch(getMatchedProfile(filter));
	}, [ dispatch, location, filterKey ]);

	const handleFilterClick = (key) => {
		if (filterKey === key) {
			setFilterKey(''); // Deselect if same key clicked again
		} else {
			setFilterKey(key);
		}
	};

	return (
		<section className="bg-white w-full">
			<div className="flex flex-wrap justify-center items-center text-headingGray space-x-2 pb-3 border-b mt-4">
				{navOption.map((value, index) => (
					<Link to={`/matches?${value.key}`} key={index}>
						<div
							className={`min-w-max tracking-wide cursor-pointer px-4 py-1 flex items-center gap-2 font-medium text-sm 
								${value.key === filterKey ? 'text-primary border border-primary rounded-full' : 'hover:text-red-500'}`}
							onClick={() => handleFilterClick(value.key)}
						>
							{value.name}
							{value.key === filterKey && (
								<span className="text-xs text-gray-600"><MdClear /></span>
							)}
						</div>
					</Link>
				))}
			</div>
		</section>
	);
}

export default FilterMenu;
