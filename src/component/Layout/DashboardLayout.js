import React, { useState, useEffect } from 'react';
import DashboardMenu from '../Dashboard/DashboardMenu';
import ProfileOption from '../Dashboard/ProfileOption';
import { useLocation } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import BottomMenu from '../Dashboard/BottomMenu';
import SideMenu from '../Dashboard/SideMenu';
import MyProfilePage from '../MyProfile/MyProfilePage';
import PageNotFound2 from '../PageNotFound/PageNotFound2';
import SendInterest from '../Dashboard/SendInterest/SendInterest';
import ShortList from '../Dashboard/ShortList/ShortList';
import VerificationForm from '../Form/VerificationForm';
import ChangePassword from '../Form/ChangePassword';
import Gallery from '../Gallery/Gallery';
import Viewed from '../Dashboard/Viewed/Viewed';
import { getProfileImages, getUserDetails } from '../../store/features/userDetails-slice';
import { useDispatch } from 'react-redux';
import ViewedYou from '../Dashboard/ViewedYou/ViewedYou';
import ReceivedInterest from '../Dashboard/ReceivedInterest/ReceivedInterest';
import AcceptedInterest from '../Dashboard/AcceptedInterest/AcceptedInterest';
import Skip from '../Skip/Skip';

function DashboardLayout() {
	const location = useLocation();
	const dispatch = useDispatch()
	const currentPath = location.pathname;
	const [ menuOpen, setMenuOpen ] = useState(false);
	const [ verified, setVerified ] = useState(true);
	const [ showVerification, setShowVerification ] = useState(false);

	useEffect(() => {
		if (!verified && currentPath !== '/dashboard') {
			setShowVerification(true);
		} else {
			setShowVerification(false);
		}
	}, [ currentPath, verified ]);

	useEffect(() => {
		dispatch(getUserDetails());
		dispatch(getProfileImages());
		// dispatch(getMatchedProfile());
	}, [ dispatch ]);

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (menuOpen && !document.getElementById('sideMenu').contains(event.target)) {
				setMenuOpen(false);
			}
		};
		document.addEventListener('mousedown', handleOutsideClick);
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [ menuOpen ]);

	const renderTabContent = () => {
		if (!verified && currentPath !== '/dashboard') {
			return <Dashboard />;
		}
		switch (currentPath) {
			case '/dashboard':
				return <Dashboard />;
			case '/dashboard/gallery':
				return <Gallery />;
			case '/dashboard/profile-setting':
				return <MyProfilePage />;
			case '/dashboard/accept-interest':
				return <AcceptedInterest />;
			case '/dashboard/send-interest':
				return <SendInterest />;
			case '/dashboard/shortlist':
				return <ShortList />;
			case '/dashboard/viewed':
				return <Viewed />;
			case '/dashboard/received-interest':
				return <ReceivedInterest />;
			case '/dashboard/viewed-you':
				return <ViewedYou />;
			case '/dashboard/skip':
				return <Skip />;
			case '/dashboard/change-password':
				return <ChangePassword />;
			default:
				return <PageNotFound2 />;
		}
	};

	return (
		<>
			{!verified && showVerification && (
				<VerificationForm verify={setVerified} onClose={() => setShowVerification(false)} />
			)}

			<div className="app-container relative ">
				<div className="hidden lg:block">
					<DashboardMenu />
				</div>

				<div className="container flex justify-between gap-8 py-10 ">
					<div className="min-w-64 hidden lg:block border rounded-md overflow-hidden h-[832px]">
						<ProfileOption />
					</div>

					<div className="w-full">
						{renderTabContent()}
					</div>
				</div>

				<div className="block lg:hidden fixed bottom-0 w-full">
					<BottomMenu onMenuClick={() => setMenuOpen(true)} />
				</div>
				<div className="z-50">
					<SideMenu isOpen={menuOpen} closeMenu={() => setMenuOpen(false)} />
				</div>
			</div>
		</>
	);
}

export default DashboardLayout;
