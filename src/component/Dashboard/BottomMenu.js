import React from 'react'
import { RiHome4Line } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RiMessage2Line } from "react-icons/ri";
import { Link } from 'react-router-dom';

const BottomMenu = ({ onMenuClick }) => {
	return (
		<>
			<section className='w-ful'>
				<div className='custom-shadow2 flex justify-around items-end py-2 bg-white text-xs text-text font-light'>
					<Link to='/dashboard'>
						<div className='flex flex-col items-center gap-1'>
							<RiHome4Line size={18} />
							<p>Home</p>
						</div>
					</Link>
					<Link to='/notification'>
						<div className='flex flex-col items-center gap-1'>
							<IoIosNotificationsOutline size={20} />
							<p>Notification</p>
						</div>
					</Link>
					<Link to='/message'>
						<div className='flex flex-col items-center gap-1'>
							<RiMessage2Line size={18} />
							<p>Messages</p>
						</div>
					</Link>
					{/* <Link to='/profile'> */}
					<div className='flex flex-col items-center gap-1'onClick={onMenuClick}>
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