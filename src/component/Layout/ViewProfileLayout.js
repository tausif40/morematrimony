import React from 'react'
import ShortProfile from '../ViewProfile/ShortProfile'
import UserDetails from '../ViewProfile/UserDetails'

function ViewProfileLayout() {
	return (
		<>
			<div className='lg:px-28 py-16'>
				<div className=''>
					<ShortProfile />
				</div>
				<div className='mt-16'>
					<UserDetails />
				</div>
			</div>
		</>
	)
}

export default ViewProfileLayout