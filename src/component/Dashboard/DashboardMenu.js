import React, { useEffect, useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";
import { IoListOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineBlock } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaPeopleArrows } from "react-icons/fa6";
import { IoIosNotificationsOutline } from "react-icons/io";
import { LuView } from "react-icons/lu";
import { FaUsersViewfinder } from "react-icons/fa6";
import { PiClockUser } from "react-icons/pi";


function DashboardMenu() {
	const location = useLocation();
	const currentPath = location.pathname;

	const navOption = [
		{ name: 'Dashboard', path: '/dashboard', icon: AiOutlineDashboard },
		// { name: 'Matches', path: '/matches', icon: FaPeopleArrows },
		{ name: 'My Profile', path: '/dashboard/profile-setting', icon: AiOutlineUser },
		{ name: 'My Interest', path: '/dashboard/my-interest', icon: IoMdHeartEmpty },
		{ name: 'Shortlist', path: '/dashboard/shortlist', icon: IoListOutline },
		{ name: 'Request', path: '/dashboard/request', icon: PiClockUser },
		{ name: 'Viewed', path: '/dashboard/viewed', icon: LuView },
		{ name: 'Viewed You', path: '/dashboard/viewed-you', icon: FaUsersViewfinder },
		// { name: 'Messaging', path: '/message', icon: HiOutlineMail },
	]

	// useEffect(() => {
	// 	console.log(activeNav);
	// })


	return (
		<>
			< section className='bg-white border-t shadow-md'>
				<div className='container flex text-headingGray font-medium text-sm gap-4'>
					{navOption.map((value, index) => (
						<Link to={value.path} key={index}>
							<div className={`cursor-pointer px-4 py-4 flex items-center gap-2 ${value.path == currentPath && 'text-gradient'}`}><value.icon className={`${value.path == currentPath && 'text-[#f45d2c]'}`} />{value.name}</div>
						</Link>
					))}
				</div >
			</ section>
		</>
	)
}

export default DashboardMenu