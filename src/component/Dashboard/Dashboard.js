import React from 'react'
import DashboardMenu from './DashboardMenu'
import { Outlet } from 'react-router-dom'

function Dashboard() {
	return (
		<>
			<section className='bg-white pt-6 border rounded-md w-full'>
				<div className='flex gap-6'>
					<div>Remaining Interest</div>
					<div>Remaining Contact View</div>
					<div>Remaining Gallery Image Upload</div>
				</div>
			</section>
		</>
	)
}

export default Dashboard