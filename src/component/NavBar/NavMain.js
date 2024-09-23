import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavMain = () => {
	const location = useLocation();
	const [ path, setPath ] = useState('')

	const navOption = [
		{
			url: '/',
			name: 'Home'
		},
		// {
		// 	url: '/active-members',
		// 	name: 'Active Members'
		// },
		{
			url: '/premium-plans',
			name: 'Premium Plans'
		},
		// {
		// 	url: '/happy-stories',
		// 	name: 'Happy Stories'
		// },
		{
			url: '/contact-us',
			name: 'Contact Us'
		}
	]

	useEffect(() => {
		const pathName = location.pathname
		setPath(pathName)
		// console.log('pathName:', pathName);
	}, [ location ]);

	return (
		<header className="bg-white shadow-md lg:border-t border-gray-200 z-50">
			<div className="container mx-auto flex justify-between ">
				<Link to='/'>
					<div className='flex items-center gap-2 pt-[2px]'>
						<img src="/assets/img/logo/smallIcon.png" alt="" className='w-14 pb-1 hidden lg:block' />
						<div className='space-y-1'>
							<img src="/assets/img/logo/fistName.png" alt="" className='w-16 hidden lg:block' />
							<img src="/assets/img/logo/lastName.png" alt="" className='w-32 hidden lg:block' />
						</div>
					</div>
				</Link>
				<div className="nav-option w-full lg:w-auto flex md:justify-center lg:justify-normal overflow-x-auto">
					{navOption.map((value, inx) => (
						<Link to={value.url} key={inx} className={`text-gradient text-base font-bold px-4 pt-4 ${value.url == path && 'active'}`}>
							<p className='min-w-max'>{value.name}</p>
						</Link>
					))}
				</div>
			</div>
		</header>
	);
};

export default NavMain;
