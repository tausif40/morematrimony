import React, { useState } from 'react'
import DashboardMenu from '../Dashboard/DashboardMenu'
import ProfileOption from '../Dashboard/ProfileOption'
import { Link, useLocation } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';

function DashboardLayout() {
	const location = useLocation();
	const currentPath = location.pathname;

	const [ currentTab, setCurrentTab ] = useState('');
	const tabs = [ 'Dashboard', 'My Profile', 'My Interest', 'Shortlist', 'Messaging' ];

	const renderTabContent = () => {
		switch (currentPath) {
			case '/dashboard':
				return <Dashboard />;
			default:
				return <Dashboard />;
		}
	};

	return (
		<>
			{
				<div className=''>
					<DashboardMenu />

					<div className='container flex'>
						<div className='min-w-[20%]'>
							<ProfileOption />
						</div>
						<div>
							{renderTabContent()}
						</div>
					</div>

				</div>
			}
		</>
	)
}

export default DashboardLayout;