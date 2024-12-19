import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlinePhotograph, HiOutlineMail, HiOutlineLockClosed, HiOutlineTrash } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";
import { IoListOutline } from "react-icons/io5";
import { MdOutlineBlock } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { LuKeyRound } from "react-icons/lu";
import { RiHome4Line } from "react-icons/ri";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { BiMaleFemale } from "react-icons/bi";
import { LuView } from "react-icons/lu";
import { FaUsersViewfinder } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import '../../CSS/dashboard.css'

function ProfileOption() {
	const location = useLocation();

	const currentPath = location.pathname;
	const [ profileCompletion, setProfileCompletion ] = useState()
	const [ color, setColor ] = useState('ten')

	const userDetails = useSelector((state) => state.userDetails.userDetails);
	const percent = userDetails?.data?.user?.profileCompletion;

	useEffect(() => {
		setProfileCompletion(percent)
		percent && setColor(percentColor(percent))
	}, [ userDetails, userDetails?.data?.user?.profileCompletion ])

	const percentColor = (presence) => {
		const colors = [ 'ten', 'twenty', 'forty', 'sixty', 'eighty', 'hundred' ];
		const index = Math.min(Math.floor(presence / 20));
		return colors[ index ];
	};

	// console.log(color);
	// console.log(percent);

	const navOption = [
		{ name: 'Dashboard', path: '/dashboard', icon: RiHome4Line },
		{ name: 'Gallery', path: '/gallery', icon: HiOutlinePhotograph },
		// { name: 'Packages', path: '/packages', icon: PiGiftLight },
		// { name: 'Message', path: '/message', icon: HiOutlineMail },
		{ name: 'My Interest', path: '/my-interest', icon: IoMdHeartEmpty },
		{ name: 'Shortlist', path: '/shortlist', icon: IoListOutline },
		{ name: 'Viewed', path: '/viewed', icon: LuView },
		{ name: 'Viewed By You', path: '/viewed-by-you', icon: FaUsersViewfinder },
		{ name: 'Manage Profile', path: '/profile-setting', icon: AiOutlineUser },
		{ name: 'Ignored User List', path: '/ignored-list', icon: MdOutlineBlock },
		{ name: 'Change Password', path: '/change-password', icon: LuKeyRound },
		{ name: 'Deactivate Account', path: '/deactivate-account', icon: HiOutlineLockClosed },
		{ name: 'Delete Account', path: '/delete-account', icon: HiOutlineTrash },
	];

	// console.log("pre - ", userDetails?.data?.user?.profileCompletion);
	// console.log("color - ", color);

	return (
		<>
			< section className='bg-white pt-6 min-h-screen'>
				<div className='px-4 flex flex-col items-center'>
					<img src="/assets/img/img0.png" alt="" className='size-24 rounded-full border mb-4' />
					<p className='font-bold text-2xl text-headingGray'>Mohd. Tausif</p>
					<div className={`${color} flex text-xs my-1 border px-2 rounded-full`} >
						<p className='text-[12px]'>Profile completion: </p>
						<p>&nbsp;{profileCompletion || 0}&nbsp;</p>
						<p className='text-[10px]'>%</p>
					</div>
					<Link to='/member-profile'>
						<p className='bg-[#fbcbcfd4] cursor-pointer text-hotRed py-2 px-8 rounded-md w-full flex justify-center border border-[#fbcbcfd4] hover:border-hotRed transition-all mt-4'>Public Profile</p>
					</Link>
				</div>

				<div className='flex flex-col text-headingGray text-sm mt-6'>
					{navOption.map((value, index) => (
						<Link to={value.path} key={index}>
							<p className={`cursor-pointer px-8 py-[10px] flex items-center gap-2 border-l-[3px] hover:bg-[#fbcbcfd4] hover:border-l-[3px] hover:border-hotRed ${value.path == currentPath ? 'bg-[#fbcbcfd4] border-hotRed' : 'border-transparent'}`}><value.icon size={13} />{value.name}</p>
						</Link>
					))}
				</div >
				<p className='gradient-btn py-2 rounded-md flex justify-center items-center mt-4'><RiLogoutCircleRLine size={16} />&nbsp;Logout</p>
			</ section>
		</>
	)
}

export default ProfileOption;
