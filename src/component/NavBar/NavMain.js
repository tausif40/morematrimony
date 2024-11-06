import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NavMain = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [ path, setPath ] = useState('')

	// const navOption = [
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
	// ]

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

	useEffect(() => {
		const pathName = location.pathname
		setPath(pathName)
		// console.log('pathName: ', pathName);
	}, [ location ]);

	return (
		<header className="bg-white shadow-md z-50 ">
			<div className="container mx-auto flex justify-between ">
				<Link to='/' className='hidden lg:block'>
					<div className='flex items-center gap-2 p-2'>
						<img src="/assets/img/logo/smallIcon.png" alt="" className='w-12' />
						<div className='space-y-1 p-2'>
							<img src="/assets/img/logo/fistName.png" alt="" className='w-12 ' />
							<img src="/assets/img/logo/lastName.png" alt="" className='w-24' />
						</div>
					</div>
				</Link>
				<div className="nav-option py-2 lg:py-0 w-full lg:w-auto flex justify-center items-center lg:justify-normal overflow-x-auto gap-4">
					{/* {navOption.map((value, inx) => ( */}
					{/* <div className={`text-gradient text-base font-bold px-4 cursor-pointer ${'plans' == path && 'active'}`}>
						<p className='min-w-max'>Matches</p>
					</div> */}

					<Link to={'/matches'}>
						<div className={`text-gradient font-bold text-md px-4 cursor-pointer ${'Matches' == path && 'active'}`}>
							<p className='min-w-max'>MATCHES</p>
						</div>
					</Link>

					<div className={`text-gradient text-base font-bold px-4 cursor-pointer ${'plans' == path && 'active'}`}
						onClick={() => handleScroll('plans')}
					>
						<p className='min-w-max'>PLANS</p>
					</div>
					<div to={'/contact-us'} className={`text-gradient text-base font-bold px-4 cursor-pointer ${'/contact-us' == path && 'active'}`}
						onClick={() => handleScroll('contactPage')}
					>
						<p className='min-w-max'>CONTACT</p>
					</div>
					<div className='text-sm font-medium text-text'>
						<Link to={'/register'}>
							<button className="gradient-btn px-4 py-[3px] rounded-md"><p>Registration</p></button>
						</Link>
					</div>
					{/* ))} */}
				</div>
			</div>
		</header>
	);
};

export default NavMain;
