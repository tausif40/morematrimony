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

// import React, { useState, useEffect } from 'react';
// import DashboardMenu from '../Dashboard/DashboardMenu';
// import ProfileOption from '../Dashboard/ProfileOption';
// import { useLocation } from 'react-router-dom';
// import BottomMenu from '../Dashboard/BottomMenu';
// import SideMenu from '../Dashboard/SideMenu';
// import ProfileList from '../ProfileList/ProfileList'
// import FilterProfileList from '../ProfileList/FilterProfileList'
// import VerificationForm from '../Form/VerificationForm';

// function MatchesLayout() {
// 	const location = useLocation();
// 	const currentPath = location.pathname;
// 	const [ menuOpen, setMenuOpen ] = useState(false);
// 	const [ verified, setVerified ] = useState(true);
// 	const [ showVerification, setShowVerification ] = useState(false);

// 	useEffect(() => {
// 		if (!verified && currentPath !== '/dashboard') {
// 			setShowVerification(true);
// 		} else {
// 			setShowVerification(false);
// 		}
// 	}, [ currentPath, verified ]);

// 	useEffect(() => {
// 		const handleOutsideClick = (event) => {
// 			if (menuOpen && !document.getElementById('sideMenu').contains(event.target)) {
// 				setMenuOpen(false);
// 			}
// 		};
// 		document.addEventListener('mousedown', handleOutsideClick);
// 		return () => {
// 			document.removeEventListener('mousedown', handleOutsideClick);
// 		};
// 	}, [ menuOpen ]);


// 	return (
// 		<>
// 			{!verified && showVerification && (
// 				<VerificationForm verify={setVerified} onClose={() => setShowVerification(false)} />
// 			)}

// 			<div className="app-container relative">
// 				<div className="hidden lg:block">
// 					<DashboardMenu />
// 				</div>

// 				<div className="container flex gap-8 my-10 ">
// 					<div className="min-w-64 hidden lg:block border rounded-md overflow-hidden h-[690px]">
// 						<FilterProfileList />
// 					</div>

// 					<div className="w-full">
// 						<ProfileList />
// 					</div>
// 				</div>

// 				<div className="block lg:hidden fixed bottom-0 w-full">
// 					<BottomMenu onMenuClick={() => setMenuOpen(true)} />
// 				</div>
// 				<div className="z-50">
// 					<SideMenu isOpen={menuOpen} closeMenu={() => setMenuOpen(false)} />
// 				</div>
// 			</div>
// 		</>
// 	);
// }

// export default MatchesLayout;
