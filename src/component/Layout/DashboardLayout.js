import React, { useState, useEffect } from 'react'
import DashboardMenu from '../Dashboard/DashboardMenu'
import ProfileOption from '../Dashboard/ProfileOption'
import { Link, useLocation } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import BottomMenu from '../Dashboard/BottomMenu';
import SideMenu from '../Dashboard/SideMenu'
import MyProfilePage from '../MyProfile/MyProfilePage';
import PageNotFound2 from '../PageNotFound/PageNotFound2';
import MyInterest from '../MyInterest/MyInterest';
import ShortList from '../ShortList/ShortList';
import Chat from '../Chat/Chat';
import IgnoreList from '../IgnoreList/IgnoreList';

function DashboardLayout({ children }) {
	const location = useLocation();
	const currentPath = location.pathname;

	const [ menuOpen, setMenuOpen ] = useState(false);

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
		switch (currentPath) {
			case '/dashboard':
				return <Dashboard />;
			case '/profile-setting':
				return <MyProfilePage />;
			case '/my-interest':
				return <MyInterest />;
			case '/shortlist':
				return <ShortList />;
			case '/message':
				return <Chat />;
			case '/ignored-list':
				return <IgnoreList />;
			default:
				return <>
					<PageNotFound2 />
				</>;
		}
	};

	return (
		<>
			{
				<div className='app-container relative'>
					<div className='hidden lg:block'>
						<DashboardMenu />
					</div>

					<div className='container flex gap-8 my-10 '>
						<div className='min-w-64 hidden lg:block border rounded-md overflow-hidden h-[810px] sticky top-0'>
							<ProfileOption />
						</div>
						<div className='w-full'>
							{renderTabContent()}
							{/* {children} */}
						</div>
					</div>

					<div className='block lg:hidden fixed bottom-0 w-full'>
						<BottomMenu onMenuClick={() => setMenuOpen(true)} />
					</div>
					<div className=''>
						<SideMenu isOpen={menuOpen} closeMenu={() => setMenuOpen(false)} />
					</div>
				</div>
			}
		</>
	)
}

export default DashboardLayout;