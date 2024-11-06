import React from 'react'
import Matches from '../Matches/Matches'
import FilterMatches from '../Matches/FilterMatches'

function MatchesLayout() {
	return (
		<>
			<div className="app-container relative">

				<div className="container flex gap-8 my-10 ">
					<div className="sticky top-24 h-fit min-w-72 hidden lg:block border rounded-md overflow-hidden ">
						<FilterMatches />
					</div>

					<div className="w-full">
						<Matches />
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