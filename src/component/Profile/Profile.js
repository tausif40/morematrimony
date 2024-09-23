import React from 'react'
import { Outlet } from 'react-router-dom'

function Profile() {
	return (
		<>
			<div>Profile</div>
			<Outlet />
		</>
	)
}

export default Profile