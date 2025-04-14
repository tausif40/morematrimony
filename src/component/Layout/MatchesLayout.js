import React, { useEffect, useState } from 'react'
import MatchesList from '../Matches/MatchesList'
import FilterMenu from '../Matches/FilterMenu'
import FilterInterface from '../Matches/Filter/FilterInterface'
import SideMenu from '../Dashboard/SideMenu';

function MatchesLayout() {
	const [ filterToggle, setFilterToggle ] = useState(false);

	useEffect(() => {
		console.log('filterToggle state:', filterToggle);
		const handleOutsideClick = (event) => {
			if (filterToggle && !document.getElementById('sideMenu')?.contains(event.target)) {
				setFilterToggle(false);
			}
		};
		document.addEventListener('mousedown', handleOutsideClick);
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [ filterToggle ]);

	return (
		<>
			<div className=" bg-gray-100 pb-12">
				<div className="z-40">
					<FilterMenu />
				</div>
				<div className="container flex lg:gap-6 xl:gap-8 mt-8">
					<div className="bg-white rounded-md mt-4 transition-all duration-300 shadow-md">
						{/* <FilterProfileList /> */}
						<FilterInterface />
					</div>

					<div className="w-full">
						<MatchesList onFilterClick={() => {
							console.log('Filters button clicked'); // Debugging log
							setFilterToggle(true);
						}} />
					</div>
				</div>

				<div className="z-50">
					<SideMenu id="sideMenu" isOpen={filterToggle} closeMenu={() => setFilterToggle(false)} />
				</div>

				{/* <div className="block lg:hidden fixed bottom-0 w-full z-50">
					<BottomMenu onMenuClick={() => setMenuOpen(true)} />
				</div>
				<div className="">
					<SideMenu isOpen={menuOpen} closeMenu={() => setMenuOpen(false)} />
				</div> */}
			</div>
		</>
	)
}

export default MatchesLayout;