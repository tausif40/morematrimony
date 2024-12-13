import React, { useEffect } from 'react'
import ShortProfile from '../ViewProfile/ShortProfile'
import UserDetails from '../ViewProfile/UserDetails'

function ViewProfileLayout() {

	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'instant'
		});
	}, []);

	return (
		<>
			<div className='px-3 sm:px-6 md:px-10 lg:px-24 xl:px-36 pt-12 pb-16'>
				<div className=''>
					<ShortProfile />
				</div>
				<div className='mt-12'>
					<UserDetails />
				</div>
			</div>
		</>
	)
}

export default ViewProfileLayout