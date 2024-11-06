import React, { useEffect, useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";
import { IoListOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineBlock } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaPeopleArrows } from "react-icons/fa6";


function FilterMenu() {
	const location = useLocation();
	const currentPath = location.pathname;

	const navOption = [
		{ name: 'All Matches', path: 'all-matches' },
		{ name: 'Newly Joined', path: 'newly-Joined' },
		{ name: 'Viewed You', path: 'viewed-you' },
		{ name: 'My Interest', path: 'my-interest' },
		{ name: 'Mutual Matches', path: 'mutual-matches' },
		{ name: 'Horoscope Matches', path: 'horoscope-matches' },
		{ name: 'Preferred City, State', path: 'preferred-city' },
		{ name: 'Proffered Profession', path: 'proffered-profession' },
		{ name: 'Preferred Education', path: 'preferred-education' },
		{ name: 'Preferred Star', path: 'preferred-star' },
		{ name: 'Hobby Matches', path: 'hobby-matches' },
		{ name: 'Self Created Matches', path: 'self-created-matches' },
		{ name: 'Parent Created Matches', path: 'Parent-created-matches' },
		{ name: 'Others Created Matches', path: 'others-created-matches' },
		// { name: 'Matches that have photos', path: 'matches-that-have-photos' },
	]

	// useEffect(() => {
	// 	console.log(activeNav);
	// })

	return (
		<>
			< section className='container bg-white'>
				<div className='flex text-headingGray gap-4 border-b'>
					{navOption.map((value, index) => (
						// <Link to={value.path} >
						<div className={`min-w-max tracking-wide cursor-pointer px-4 py-4 flex items-center gap-2 font-medium text-sm ${value.path == currentPath && 'text-gradient'}`}>{value.name}</div>
						// </Link>
					))}
				</div >
			</ section>
		</>
	)
}

export default FilterMenu;