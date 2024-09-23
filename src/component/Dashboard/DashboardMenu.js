import React, { useEffect, useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";
import { IoListOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineBlock } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";

function DashboardMenu() {
	const location = useLocation();
	const currentPath = location.pathname;

	const navOption = [
		{ name: 'Dashboard', path: '/dashboard', icon: AiOutlineDashboard },
		{ name: 'My Profile', path: '/profile-setting', icon: AiOutlineUser },
		{ name: 'My Interest', path: '/my-interest', icon: IoMdHeartEmpty },
		{ name: 'Shortlist', path: '/my-shortlist', icon: IoListOutline },
		{ name: 'Messaging', path: '/chat', icon: HiOutlineMail },
		{ name: 'Ignore User List', path: '/ignored-list', icon: MdOutlineBlock },
	]

	// useEffect(() => {
	// 	console.log(activeNav);
	// })


	return (
		<>
			< section className='bg-white border-t shadow-md'>
				<div className='container flex text-headingGray font-medium text-sm gap-4'>
					{navOption.map((value, index) => (
						<Link to={value.path} >
							<div className={`cursor-pointer px-4 py-4 flex items-center gap-2 ${value.path == currentPath && 'text-gradient'}`}><value.icon className={`${value.path == currentPath && 'text-[#a549a6]'}`} />{value.name}</div>
						</Link>
					))}
				</div >
			</ section>
		</>
	)
}

export default DashboardMenu