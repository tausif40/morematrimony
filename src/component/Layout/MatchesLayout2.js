import React from 'react'
import ProfileList from '../Matches/MatchesList'
import FilterMenu from '../Matches/FilterMenu'
import FilterInterface from '../Matches/Filter/FilterInterface'

function MatchesLayout() {
	return (
		<>
			<div className=" bg-gray-50 pb-12">
				<div className="z-40">
					<FilterMenu />
				</div>
				<div className="container flex lg:gap-6 xl:gap-8 mt-8">
					{/* <div className="bg-white rounded-md mt-4 transition-all duration-300 shadow-md">
						<FilterInterface />
					</div> */}

					<div className="w-full">
						<ProfileList />
					</div>
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