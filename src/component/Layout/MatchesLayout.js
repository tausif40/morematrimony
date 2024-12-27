import React from 'react'
import ProfileList from '../Matches/ProfileList'
import FilterProfileList from '../Matches/FilterProfileList'
import FilterMenu from '../Matches/FilterMenu'

function MatchesLayout() {
	return (
		<>
			<div className="app-container relative lg:px-8 xl:px-20">
				<div className="mt-4 mx-6 z-40">
					<FilterMenu />
				</div>
				<div className="container flex lg:gap-6 xl:gap-8 mb-10 mt-8">
					<div className="h-[95vh] border lg:min-w-[28%] xl:min-w-[25%] hidden lg:block rounded-md overflow-hidden overflow-y-auto customScroll-bar mt-4 transition-all duration-300 shadow-sm">
						<FilterProfileList />
					</div>

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