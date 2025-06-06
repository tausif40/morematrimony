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
import { PiClockUser } from "react-icons/pi";
import '../../CSS/dashboard.css'
import useLogout from '../Logout/Logout';
import { PiUserCheckLight } from "react-icons/pi";
import { PiSkipForwardBold } from "react-icons/pi";
import { FaUserCheck } from "react-icons/fa6";
import { BsSend } from "react-icons/bs";
import { MdOutlineWorkspacePremium } from "react-icons/md";

function ProfileOption() {
	const location = useLocation();
	const handleLogout = useLogout();

	const currentPath = location.pathname;
	const [ profileCompletion, setProfileCompletion ] = useState()
	const [ color, setColor ] = useState('ten')
	const [ isLoading, setIsLoading ] = useState(false)

	const userDetails = useSelector((state) => state.userDetails.userDetails);
	const percent = userDetails?.data?.user?.profileCompletion;
	const fistName = userDetails?.data?.user?.basicInformation?.firstName || 'Your';
	const lastName = userDetails?.data?.user?.basicInformation?.lastName || 'Name';
	const dpImage = userDetails?.data?.user?.profileImage;

	// console.log(userDetails);
	useEffect(() => {
		setProfileCompletion(percent)
		setIsLoading(userDetails?.loading)
		percent && setColor(percentColor(percent))
	}, [ userDetails, percent ])

	const handelLogOut = () => {
		const res = handleLogout();
		console.log(res);
	}

	const percentColor = (presence) => {
		const colors = [ 'ten', 'twenty', 'forty', 'sixty', 'eighty', 'hundred' ];
		const index = Math.min(Math.floor(presence / 20));
		return colors[ index ];
	};
	// console.log(percent);

	const navOption = [
		{ name: 'Dashboard', path: '/dashboard', icon: RiHome4Line },
		{ name: 'Gallery', path: '/dashboard/gallery', icon: HiOutlinePhotograph },
		// { name: 'Packages', path: '/packages', icon: PiGiftLight },
		// { name: 'Message', path: '/message', icon: HiOutlineMail },
		{ name: 'Manage Profile', path: '/dashboard/profile-setting', icon: AiOutlineUser },
		{ name: 'Accepted', path: '/dashboard/accept-interest', icon: FaUserCheck },
		{ name: 'Sent', path: '/dashboard/send-interest', icon: BsSend },
		{ name: 'Received', path: '/dashboard/received-interest', icon: PiClockUser },
		{ name: 'Shortlist', path: '/dashboard/shortlist', icon: IoListOutline },
		{ name: 'Viewed', path: '/dashboard/viewed', icon: LuView },
		{ name: 'Viewed You', path: '/dashboard/viewed-you', icon: FaUsersViewfinder },
		{ name: 'Skip', path: '/dashboard/skip', icon: PiSkipForwardBold },
		{ name: 'Change Password', path: '/dashboard/change-password', icon: LuKeyRound },
		{ name: 'Plan History', path: '/dashboard/plan-history', icon: MdOutlineWorkspacePremium },
		// { name: 'Delete Account', path: '/dashboard/delete-account', icon: HiOutlineTrash },
	];

	// console.log("pre - ", userDetails?.data?.user?.profileCompletion);
	// console.log("color - ", color);

	return (
		<>
			< section className='bg-white pt-6 min-h-screen'>
				<div className='px-4 flex flex-col items-center'>
					<img src={dpImage || `/assets/img/avatar-place.png`} alt="" className='w-28 h-28 mb-4 ring-2 ring-offset-2 ring-gray-400 object-cover rounded-full bg-gray-200 border-gray-500' style={{ objectPosition: 'center 10%' }} />
					<p className='font-semibold text-2xl text-headingGray capitalize'>{fistName + " " + lastName}</p>

					{/* <div className={`${isLoading ? 'loading' : color} flex items-center text-xs my-1 border px-2 rounded-full`} >
						<p className='text-[12px]'>Profile completion: </p>
						{isLoading ? <><p>&nbsp;&nbsp;</p><span class="loader"></span>&nbsp;&nbsp;</>
							: <p>&nbsp;{profileCompletion}&nbsp;<span className='text-[10px]'>%</span></p>}
					</div> */}
					<div className={`${color} flex items-center text-xs my-1 border px-2 rounded-full`} >
						<p className='text-[12px]'>Profile completion: </p>
						<p>&nbsp;{profileCompletion || '_'}&nbsp;<span className='text-[10px]'>%</span></p>
					</div>
					<Link to='/member-profile'>
						<p className='bg-[#fbcbcfd4] cursor-pointer text-hotRed py-2 px-8 rounded-md w-full flex justify-center border border-[#fbcbcfd4] hover:border-hotRed transition-all mt-5'>Public Profile</p>
					</Link>
				</div>

				<div className='flex flex-col text-headingGray text-sm mt-6'>
					{navOption.map((value, index) => (
						<Link to={value.path} key={index}>
							<p className={`cursor-pointer px-8 py-[10px] flex items-center gap-2 border-l-[3px] hover:border-l-[3px] ${value.path === currentPath ? 'bg-[#fbcbcfd4] border-hotRed hover:border-hotRed' : 'border-transparent hover:bg-[#f0efefd4] hover:border-gray-400'}`}><value.icon size={13} />{value.name}</p>
						</Link>
					))}
				</div >
				<p className='gradient-btn py-2 rounded-md flex justify-center items-center mt-4' onClick={handelLogOut}><RiLogoutCircleRLine size={16} />&nbsp;Logout</p>
			</ section>
		</>
	)
}

export default ProfileOption;
