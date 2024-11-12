import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PiUsers } from "react-icons/pi";
import { PiCurrencyDollarDuotone } from "react-icons/pi";
import { RiContactsLine } from "react-icons/ri";
import { TbMessage2Question } from "react-icons/tb";
import { IoIosNotificationsOutline } from "react-icons/io";

const NavMain = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [ path, setPath ] = useState('')
	const [ userRegister, setUserRegister ] = useState(true)

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
		<header className="bg-white shadow-md z-50 border-t">
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
				<div className="nav-option py-2 lg:py-0 w-full lg:w-auto flex justify-center items-center lg:justify-normal overflow-x-auto gap-2 sm:gap-3 md:gap-4  text-sm">
					{/* {navOption.map((value, inx) => ( */}
					{/* <div className={`text-gradient text-base font-bold px-4 cursor-pointer ${'plans' == path && 'active'}`}>
						<p className='min-w-max'>Matches</p>
					</div> */}

					<Link to={'/matches'}>
						<div className={`text-headingGray text-md px-4 cursor-pointer ${'Matches' == path && 'active'} flex items-center gap-1`}>
							<PiUsers size={20} /><p className='min-w-max text-sm'>Matches</p>
						</div>
					</Link>

					<div className={`text-headingGray text-base px-4 cursor-pointer ${'plans' == path && 'active'} flex items-center gap-1`}
						onClick={() => handleScroll('plans')}
					>
						<PiCurrencyDollarDuotone size={18} /><p className='min-w-max text-sm'>Plans</p>
					</div>
					<div to={'/contact-us'} className={`text-headingGray text-base px-4 cursor-pointer ${'/contact-us' == path && 'active'} flex items-center gap-1`}
						onClick={() => handleScroll('contactPage')}
					>
						<TbMessage2Question size={20} /><p className='min-w-max text-sm'>Contact</p>
					</div>
					{/* <Link to={'/matches'}> */}
					<div className={`text-headingGray text-md px-4 cursor-pointer ${'Matches' == path && 'active'} flex items-center gap-1`}>
						<IoIosNotificationsOutline size={20} /><p className='min-w-max text-sm'>Notifications</p>
					</div>
					{/* </Link> */}

					<div className='text-sm font-medium text-text'>
						{userRegister
							?
							<Link to={'/dashboard'}>
								<button className="px-4 py-[3px] w-[70px]">
									{/* <div className='w-4 h-4 bg-red-500 text-white rounded-full relative top-2 left-6 text-xs flex items-center justify-center'>2</div> */}
									<img src="/assets/img/img0.png" alt="" className='rounded-full border' />
								</button>
							</Link>
							: <Link to={'/register'}>
								<button className="gradient-btn px-4 py-[3px] rounded-md"><p>Registration</p></button>
							</Link>
						}
					</div>
					{/* ))} */}
				</div>
			</div>
		</header >
	);
};

export default NavMain;
