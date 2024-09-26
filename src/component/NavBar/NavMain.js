import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NavMain = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [ path, setPath ] = useState('')

	const navOption = [
		// {
		// 	url: '/',
		// 	name: 'Home'
		// },
		// {
		// 	url: '/active-members',
		// 	name: 'Active Members'
		// },
		// {
		// 	url: '/plans',
		// 	name: 'Plans'
		// },
		// {
		// 	url: '/happy-stories',
		// 	name: 'Happy Stories'
		// },
		// {
		// 	url: '/contact-us',
		// 	name: 'Contact Us'
		// }
	]

	const handleScroll = (id) => {
		// console.log(document.getElementById(id));
		if (document.getElementById(id) == null) {
			navigate('/');
			setTimeout(() => {
				document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
			}, 300);
			return;
		}
		document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
	};

	// const handleScroll = (id) => {
	// 	const element = document.getElementById(id);
	// 	const yOffset = -70; // Adjust this based on your navbar height
	// 	const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

	// 	window.scrollTo({ top: y, behavior: 'smooth' });
	// };


	useEffect(() => {
		const pathName = location.pathname
		setPath(pathName)
		// console.log('pathName: ', pathName);
	}, [ location ]);

	return (
		<header className="bg-white shadow-md  border-gray-200 z-50">
			<div className="container mx-auto flex justify-between ">
				<Link to='/'>
					<div className='flex items-center gap-2 pt-[2px]'>
						<img src="/assets/img/logo/smallIcon.png" alt="" className='w-12 hidden lg:block' />
						<div className='space-y-1 p-2'>
							<img src="/assets/img/logo/fistName.png" alt="" className='w-12 hidden lg:block' />
							<img src="/assets/img/logo/lastName.png" alt="" className='w-24 hidden lg:block' />
						</div>
					</div>
				</Link>
				<div className="nav-option w-full lg:w-auto flex md:justify-center lg:justify-normal overflow-x-auto  gap-4">
					{/* {navOption.map((value, inx) => ( */}
					<p className={`text-gradient text-base font-bold px-4 pt-4 cursor-pointer ${'plans' == path && 'active'}`}
						onClick={() => handleScroll('plans')}
					>
						<p className='min-w-max pb-2 lg:pb-0'>PLANS</p>
					</p>
					<p to={'/contact-us'} className={`text-gradient text-base font-bold px-4 pt-4 cursor-pointer ${'/contact-us' == path && 'active'}`}
						onClick={() => handleScroll('contactPage')}
					>
						<p className='min-w-max pb-2 lg:pb-0'>CONTACT</p>
					</p>
					{/* ))} */}
				</div>
			</div>
		</header>
	);
};

export default NavMain;
