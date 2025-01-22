import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { PiUsers } from "react-icons/pi";
import { PiCurrencyDollarDuotone } from "react-icons/pi";
import { TbMessage2Question } from "react-icons/tb";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import DeviceDetector from '../../utils/device/DeviceDetector';
import { FaRegUser } from "react-icons/fa";
import Cookies from 'js-cookie';
import useLogout from '../Logout/Logout';
import { useDispatch, useSelector } from 'react-redux';

const NavMain = () => {
	const location = useLocation();
	const [ currentPath, setCurrentPath ] = useState('')
	const [ isUserRegister, setIsUserRegister ] = useState(false)
	const [ activeNav, seActiveNav ] = useState(false)
	const [ isOpen, setIsOpen ] = useState(false)
	const [ showNotification, setShowNotification ] = useState(false)
	const dropdownRef = useRef(null);
	const deviceType = DeviceDetector();
	const token = Cookies.get('access_token');
	const handleLogout = useLogout();

	const dpImage = useSelector((state) => state.userDetails.dpImage.img); 

	const handelLogOut = () => {
		const res = handleLogout();
		setIsOpen(false);
	}
	// console.log(dpImage);
	// console.log(handleLogout);
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

	const VisitorNav = [
		{ path: '/contact-us', name: 'Contact', icon: TbMessage2Question },
	]
	const navOption = [
		{ path: '/dashboard', name: 'Dashboard', icon: AiOutlineDashboard },
		{ path: '/matches', name: 'Matches', icon: PiUsers },
		{ path: '/plans', name: 'Plans', icon: PiCurrencyDollarDuotone },
		{ path: '/contact-us', name: 'Contact', icon: TbMessage2Question },
		{ path: '/notifications', name: 'Notification', icon: IoIosNotificationsOutline },
	]
	const ProfileOption = [

		{ path: '/my-profile', name: 'My Profile', icon: FaRegUser },
		{ path: '/help', name: 'Help', icon: IoIosHelpCircleOutline },
	]
	const MobileProfileOption = [
		{ path: '/dashboard', name: 'Dashboard', icon: AiOutlineDashboard },
		{ path: '/my-profile', name: 'My Profile', icon: FaRegUser },
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
		setCurrentPath(pathName)
		// console.log('pathName: ', pathName.startsWith('/dashboard'));
		token ? setIsUserRegister(true) : setIsUserRegister(false)

	}, [ location, token ]);

	// console.log("activeNav-", activeNav);

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
							<div className='flex items-center gap-2 sm:gap-4 md:gap-3 min-[900px]:gap-6 lg:gap-10 text-sm'>
								{isUserRegister
									? navOption.map((value, inx) => (
										<NavLink to={value.path} key={inx} className={({ isActive }) => `${isActive ? `text-gradient` : `text-headingGray`}`}>
											<div className={`text-md px-2 cursor-pointer flex items-center gap-1`}>
												<value.icon className={`${value.path == currentPath && 'text-[#f45d2c]'}`} /><p className='min-w-max'>{value.name}</p>
											</div>
										</NavLink>
									))
									: VisitorNav.map((value, inx) => (
										<NavLink to={value.path} key={inx} className={({ isActive }) => `${isActive ? `text-gradient` : `text-headingGray`}`}>
											<div className={`text-md px-2 cursor-pointer flex items-center gap-1`}>
												<value.icon className={`${value.path == currentPath && 'text-[#f45d2c]'}`} /><p className='min-w-max'>{value.name}</p>
											</div>
										</NavLink>
									))
								}
							</div>
						</div>

						<div className='text-sm font-medium text-text flex items-center gap-4 md:gap-0'>
							{isUserRegister
								? <>
									<div className='block md:hidden'><IoNotificationsCircleSharp size={44} /></div>
									<div className="relative" >
										<button className=""
											onClick={() => setIsOpen(!isOpen)}
											aria-haspopup="true"
											aria-expanded={isOpen}
										>
											{/* <img src={dpImage || "/assets/img/img0.png"} alt="" className='w-16 h-16 object-contain rounded-full border' /> */}
											<img src={dpImage || `/assets/img/avatar-place.png`} alt="" className='min-w-8 h-8 ring-1 ring-offset-2 ring-gray-400 object-cover rounded-full bg-gray-200' style={{ objectPosition: 'center 10%' }} />
										</button>

									</div>
								</>
								: <>
									{currentPath == '/register'
										? <Link to={'/'}>
											<button className="gradient-btn px-4 py-[3px] rounded-md"><p>Login</p></button>
										</Link>
										: <Link to={'/register'}>
											<button className="gradient-btn px-4 py-[3px] rounded-md"><p>Registration</p></button>
										</Link>
									}
								</>
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
									<NavLink to={value.path} key={ind} className={({ isActive }) => `${isActive ? `text-gradient` : `text-headingGray`} text-headingGray hover:bg-gray-200 px-3 py-2 rounded-md text-sm flex gap-2 items-center`}
										onClick={() => setIsOpen(false)}>
										<value.icon className={`${value.path == currentPath && 'text-[#f45d2c]'}`} /><p className='min-w-max'>{value.name}</p>
									</NavLink>
								))
								: ProfileOption.map((value, ind) => (
									<NavLink to={value.path} key={ind} className={({ isActive }) => `${isActive ? `text-gradient` : `text-headingGray`} text-headingGray hover:bg-gray-200 px-3 py-2 rounded-md text-sm flex gap-2 items-center`}
										onClick={() => setIsOpen(false)}>
										<value.icon className={`${value.path == currentPath && 'text-[#f45d2c]'}`} /><p className='min-w-max'>{value.name}</p>
									</NavLink>
								))}
							<p className="text-headingGray hover:bg-gray-200 px-3 py-2 rounded-md text-sm flex gap-2 items-center cursor-pointer"
								onClick={handelLogOut}>
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
