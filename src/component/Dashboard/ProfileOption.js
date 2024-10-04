import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlinePhotograph, HiOutlineMail, HiOutlineLockClosed, HiOutlineTrash } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";
import { IoListOutline } from "react-icons/io5";
import { MdOutlineBlock } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { LiaHandshakeSolid } from "react-icons/lia";
import { PiGiftLight } from "react-icons/pi";
import { TbCurrencyDollar } from "react-icons/tb";
import { LuKeyRound } from "react-icons/lu";
import { RiHome4Line } from "react-icons/ri";
import { RiLogoutCircleRLine } from "react-icons/ri";


function ProfileOption() {
	const location = useLocation();
	const currentPath = location.pathname;

	const navOption = [
		{ name: 'Dashboard', path: '/dashboard', icon: RiHome4Line },
		{ name: 'Gallery', path: '/gallery', icon: HiOutlinePhotograph },
		{ name: 'Happy Story', path: '/happy-story', icon: LiaHandshakeSolid },
		{ name: 'Packages', path: '/packages', icon: PiGiftLight },
		{ name: 'My Wallet', path: '/my-wallet', icon: TbCurrencyDollar },
		{ name: 'Message', path: '/message', icon: HiOutlineMail },
		{ name: 'My Interest', path: '/my-interest', icon: IoMdHeartEmpty },
		{ name: 'Shortlist', path: '/shortlist', icon: IoListOutline },
		{ name: 'Ignored User List', path: '/ignored-list', icon: MdOutlineBlock },
		{ name: 'Change Password', path: '/change-password', icon: LuKeyRound },
		{ name: 'Manage Profile', path: '/manage-profile', icon: AiOutlineUser },
		{ name: 'Deactive Account', path: '/deactive-account', icon: HiOutlineLockClosed },
		{ name: 'Delete Account', path: '/delete-account', icon: HiOutlineTrash },
	];


	useEffect(() => {
	})
	return (
		<>
			< section className='bg-white pt-6 min-h-screen '>
				<div className='px-4 flex flex-col items-center gap-4'>
					<img src="/assets/img/img0.png" alt="" className='size-20 rounded-full' />
					<p className='font-bold text-2xl text-headingGray'>Mohd. Tausif</p>
					<Link to='/member-profile'>
						<p className='bg-[#fbcbcfd4] cursor-pointer text-hotRed py-2 px-8 rounded-md w-full flex justify-center border border-[#fbcbcfd4] hover:border-hotRed transition-all'>Public Profile</p>
					</Link>
				</div>

				<div className='flex flex-col text-headingGray text-sm mt-6'>
					{navOption.map((value, index) => (
						<Link to={value.path} >
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
