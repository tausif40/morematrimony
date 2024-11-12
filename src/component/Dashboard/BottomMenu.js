import React from 'react'
import { RiHome4Line } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RiMessage2Line } from "react-icons/ri";
import { Link, useLocation } from 'react-router-dom';
import { IoMdHeartEmpty } from "react-icons/io";

const BottomMenu = ({ onMenuClick }) => {
	const location = useLocation();
	const currentPath = location.pathname;
	return (
		<>
			<section className='w-ful z-50'>
				<div className='custom-shadow2 flex justify-around items-end py-2 bg-white text-xs text-text font-light'>
					<Link to='/dashboard'>
						<div className='flex flex-col items-center gap-1'>
							<RiHome4Line size={18} className={`${currentPath == '/dashboard' && 'text-[#f45d2c]'}`} />
							<p className={`${currentPath == '/dashboard' && 'text-gradient'}`}>Home</p>
						</div>
					</Link>

					<Link to='/my-interest'>
						<div className='flex flex-col items-center gap-1'>
							<IoMdHeartEmpty size={18} className={`${currentPath == '/my-interest' && 'text-[#f45d2c]'}`} />
							<p className={`${currentPath == '/my-interest' && 'text-gradient'}`}>My Interest</p>
						</div>
					</Link>

					<Link to='/notification'>
						<div className='flex flex-col items-center gap-1'>
							<IoIosNotificationsOutline size={20} className={`${currentPath == '/notification' && 'text-[#f45d2c]'}`} />
							<p className={`${currentPath == '/notification' && 'text-gradient'}`}>Notification</p>
						</div>
					</Link>
					{/* <Link to='/profile'> */}
					<div className='flex flex-col items-center gap-1 cursor-pointer' onClick={onMenuClick}>
						<img src="./assets/img/avatar-place.png" alt="" className='rounded-full w-5' />
						<p>Account</p>
					</div>
					{/* </Link> */}
				</div>
			</section >
		</>
	)
}

export default BottomMenu;