import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PiUsers } from "react-icons/pi";
import { PiCurrencyDollarDuotone } from "react-icons/pi";
import { TbMessage2Question } from "react-icons/tb";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import DeviceDetector from '../../utils/device/DeviceDetector';

const NavMain = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [ path, setPath ] = useState('')
	const [ userRegister, setUserRegister ] = useState(true)
	const [ mobileScreen, setMobileScreen ] = useState(false)
	const [ isOpen, setIsOpen ] = useState(false)
	const [ showNotification, setShowNotification ] = useState(false)
	const dropdownRef = useRef(null);
	const deviceType = DeviceDetector();

	// const [ isVisible, setIsVisible ] = useState(true)
	// const [ lastScrollY, setLastScrollY ] = useState(0)
	// const [ isMobileMenuOpen, setIsMobileMenuOpen ] = useState(false)

	// useEffect(() => {
	// 	const handleScroll = () => {
	// 		const currentScrollY = window.scrollY

	// 		if (currentScrollY > 500 && currentScrollY > lastScrollY) {
	// 			setIsVisible(false)
	// 		} else if (currentScrollY <= 500 || currentScrollY < lastScrollY) {
	// 			setIsVisible(true)
	// 		}
	// 		setLastScrollY(currentScrollY)
	// 	}

	// 	window.addEventListener('scroll', handleScroll, { passive: true })

	// 	return () => {
	// 		window.removeEventListener('scroll', handleScroll)
	// 	}
	// }, [ lastScrollY ])

	const navOption = [
		{ path: '/matches', name: 'Matches', icon: PiUsers },
		{ path: '/plans', name: 'Plans', icon: PiCurrencyDollarDuotone },
		{ path: '/contact-us', name: 'Contact', icon: TbMessage2Question },
	]
	const ProfileOption = [
		{ path: '/dashboard', name: 'Dashboard', icon: AiOutlineDashboard },
		{ path: '/help', name: 'Help', icon: IoIosHelpCircleOutline },
	]
	const MobileProfileOption = [
		{ path: '/dashboard', name: 'Dashboard', icon: AiOutlineDashboard },
		{ path: '/matches', name: 'Matches', icon: PiUsers },
		{ path: '/plans', name: 'Plans', icon: PiCurrencyDollarDuotone },
		{ path: '/contact-us', name: 'Contact', icon: TbMessage2Question },
		{ path: '/help', name: 'Help', icon: IoIosHelpCircleOutline },
	]

	// const handleScroll = (id) => {
	// 	if (document.getElementById(id) == null) {
	// 		navigate('/');
	// 		setTimeout(() => {
	// 			document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
	// 		}, 300);
	// 		return;
	// 	}
	// 	document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
	// };
	useEffect(() => {
		function handleClickOutside(event) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	useEffect(() => {
		const pathName = location.pathname
		setPath(pathName)
		// console.log('pathName: ', pathName);
	}, [ location ]);

	return (
		<>
			{/* <header className={`fixed w-full transition-transform duration-300 ease-in-out z-50 ${isVisible ? 'translate-y-0' : '-translate-y-full'} bg-white shadow-md z-10`}> */}
			<header className="bg-white shadow-md z-50">
				<div className="container mx-auto flex justify-between ">
					<Link to='/' className=''>
						<div className='flex items-center gap-2 p-2'>
							<img src="/assets/img/logo/smallIcon.png" alt="" className='w-12' />
							<div className='space-y-1 p-2'>
								<img src="/assets/img/logo/fistName.png" alt="" className='w-12 ' />
								<img src="/assets/img/logo/lastName.png" alt="" className='w-24' />
							</div>
						</div>
					</Link>
					<div className="nav-option py-2 lg:py-0 w-auto flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-10 text-sm">

						<div className='hidden md:block'>
							<div className='flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-10 text-sm'>
								{navOption.map((value, inx) => (
									<Link to={value.path}>
										<div className={`text-md px-2 cursor-pointer ${path == value.path ? 'text-gradient' : 'text-headingGray'} flex items-center gap-1`}>
											<value.icon className={`${value.path == path && 'text-[#f45d2c]'}`} /><p className='min-w-max'>{value.name}</p>
										</div>
									</Link>
								))}

								{/* <Link to={'/matches'}>
							<div className={`text-gradient text-md px-4 cursor-pointer ${path == '/matches' && 'activeBtn'} flex items-center gap-1`}>
								<PiUsers size={20} color='#f45d2c' /><p className='min-w-max text-sm'>Matches</p>
							</div>
						</Link>

						<div className={`text-gradient text-base px-4 cursor-pointer ${'plans' == path && 'active'} flex items-center gap-1`}
							onClick={() => handleScroll('plans')}>
							<PiCurrencyDollarDuotone size={18} color='#f45d2c' /><p className='min-w-max text-sm'>Plans</p>
						</div>

						<div to={'/contact-us'} className={`text-gradient text-base px-4 cursor-pointer ${path == '/contact-us' && 'active'} flex items-center gap-1`}
							onClick={() => handleScroll('contactPage')}
						>
							<TbMessage2Question size={20} color='#f45d2c' /><p className='min-w-max text-sm'>Contact</p>
						</div>
						 */}
								{/* <Link to={'/notifications'}> */}
								<div div className={`text-headingGray text-md px-2 cursor-pointer flex items-center gap-1`} onClick={() => setShowNotification(!showNotification)}>
									<IoIosNotificationsOutline size={20} color='#6d6e6f' /><p className='min-w-max text-sm'>Notifications</p>
								</div>
							</div>
							{/* </Link> */}
						</div>

						<div className='text-sm font-medium text-text flex items-center gap-4 md:gap-0'>
							{userRegister
								? <>
									<div className='block md:hidden'><IoNotificationsCircleSharp size={44} /></div>
									<div className="relative" >
										<button className="px-2 py-[3px] w-14 "
											onClick={() => setIsOpen(!isOpen)}
											aria-haspopup="true"
											aria-expanded={isOpen}
										>
											<img src="/assets/img/img0.png" alt="" className='rounded-full border' />
										</button>

									</div>
								</>
								: <Link to={'/register'}>
									<button className="gradient-btn px-4 py-[3px] rounded-md"><p>Registration</p></button>
								</Link>
							}
						</div>

						{/* ))} */}
					</div>
				</div>
				{isOpen &&
					<div className='shadow-md border absolute right-[6%] -mt-2 w-48 bg-white rounded-lg py-1 z-20' ref={dropdownRef}>
						<div className="px-2 pt-2 pb-3 space-y-1 sm:px-2">

							{deviceType === 'Mobile'
								? MobileProfileOption.map((value, ind) => (
									<Link to={value.path} className="text-headingGray hover:bg-gray-200 px-3 py-2 rounded-md text-sm flex gap-2 items-center "
										onClick={() => setIsOpen(false)}>
										<value.icon className={`${value.path == path && 'text-[#6d6e6f]'}`} /><p className='min-w-max'>{value.name}</p>
									</Link>
								))
								: ProfileOption.map((value, ind) => (
									<Link to={value.path} className="text-headingGray hover:bg-gray-200 px-3 py-2 rounded-md text-sm flex gap-2 items-center "
										onClick={() => setIsOpen(false)}>
										<value.icon className={`${value.path == path && 'text-[#6d6e6f]'}`} /><p className='min-w-max'>{value.name}</p>
									</Link>
								))}
							<p className="text-headingGray hover:bg-gray-200 px-3 py-2 rounded-md text-sm flex gap-2 items-center cursor-pointer"
								onClick={() => setIsOpen(false)}>
								<IoIosLogOut /><p className='min-w-max'>Logout</p>
							</p>
						</div>
					</div>
				}
			</header >
			{/* <div className='h-[66px]'></div> */}
		</>
	);
};

export default NavMain;
