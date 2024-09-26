import React, { useState } from 'react'
import DashboardMenu from '../Dashboard/DashboardMenu'
import ProfileOption from '../Dashboard/ProfileOption'
import { Link, useLocation } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Reviews from '../HomePage/Reviews';

function DashboardLayout({ children }) {
	const location = useLocation();
	const currentPath = location.pathname;

	// const [ currentTab, setCurrentTab ] = useState('');
	// const tabs = [ 'Dashboard', 'My Profile', 'My Interest', 'Shortlist', 'Messaging' ];

	const renderTabContent = () => {
		switch (currentPath) {
			case '/dashboard':
				return <Dashboard />;
			case '/profile-setting':
				return <Reviews />;
			// default:
			// 	return <Dashboard />;
		}
	};

	return (
		<>
			{
				<div className=''>
					<DashboardMenu />

					<div className='container flex gap-8 my-10 '>
						<div className='min-w-[20%]'>
							<ProfileOption />
						</div>
						<div className='w-[80%]'>
							{renderTabContent()}
							{/* {children} */}
						</div>
					</div>

				</div>
			}
		</>
	)
}

export default DashboardLayout;