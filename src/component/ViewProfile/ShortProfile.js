import React, { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ProfileImage from './ProfileImage';
import { HiOutlineUserCircle } from "react-icons/hi";
import { RiStackshareLine } from "react-icons/ri";
import { IoIosStarOutline } from "react-icons/io";
import { IoMdStar } from "react-icons/io";
import { MdOutlineWorkOutline } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

function ShortProfile() {
	const hideSideMenu = useRef(null);
	const [ isShortList, setIsShortList ] = useState(false)
	const [ showMenu, setShowMenu ] = useState(false)

	const handelShortlist = () => setIsShortList((prev) => !prev);
	const showSideMenu = () => setShowMenu((prev) => !prev);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (hideSideMenu.current && !hideSideMenu.current.contains(event.target)) {
				setShowMenu(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handelSideMenu = (value) => {
		console.log(value);
		setShowMenu(false)
	}

	return (
		<>
			<section className='text-textGray'>
				<div className='container '>
					{/* details section */}
					<div className='flex gap-12 w-full p-6 border rounded-xl shadow-md'>
						<div className='relative'>
							<div>
								<ProfileImage />
							</div>
							{/* <img src="https://res.cloudinary.com/drfni1iqf/image/upload/v1717399015/Tausif/temp/img_rjd4en.png" alt="" className='h-96 w-[360px] rounded-lg object-cover' /> */}
							<div className='absolute top-2 right-3 cursor-pointer z-50'
								onClick={handelShortlist}>
								<p className={`flex items-center ${isShortList ? 'text-green-600' : 'text-black'} bg-white text-black px-2 rounded-md`}>
									<span>{isShortList ? <IoMdStar /> : <IoIosStarOutline />}</span>
									<span className='text-sm font-light ml-1 pt-[2px]'>{isShortList ? 'Shortlisted' : 'ShortList'}</span></p>
							</div>
						</div>

						<div className='flex flex-col justify-between'>
							<div className='relative'>
								<div className='absolute top-0 right-1 cursor-pointer z-50 flex flex-row-reverse'>
									<div onClick={showSideMenu}>
										<PiDotsThreeOutlineVerticalFill size={20} />
									</div>
									{showMenu &&
										<div className='bg-white rounded-lg shadow-md py-2 border' ref={hideSideMenu}>
											<p className='hover:bg-slate-100 py-[6px] pl-4 pr-12 text-sm' onClick={() => handelSideMenu('message')}>Message</p>
											<p className='hover:bg-slate-100 py-[6px] pl-4 pr-12 text-sm' onClick={() => handelSideMenu('call')}>Call</p>
											<p className='hover:bg-slate-100 py-[6px] pl-4 pr-12 text-sm' onClick={() => handelSideMenu('block')}>Block</p>
											<p className='hover:bg-slate-100 py-[6px] pl-4 pr-12 text-sm' onClick={() => handelSideMenu('report')}>Report</p>
										</div>
									}

								</div>
								<p className='font-medium text-xl'>Name surname</p>
								<div className='flex items-center text-sm font-light text-headingGray py-2 tracking-wide'>
									<p className=''>H32YD1R454F</p>
									<span className='text-text'>&nbsp;|&nbsp;</span>
									<p> Last seen </p>
								</div>
								<div className='flex items-center mt-1'>
									<p className='p-[1px] bg-text rounded-md text-white mr-4'><HiOutlineUserCircle /></p>
									<p className=' tracking-wider'>20 Yrs, </p>&nbsp;<p className='tracking-widest'> 4'11"</p>
								</div>
								<div className='flex items-center mt-1'>
									<p className='p-[1px] bg-text rounded-md text-white mr-4'><RiStackshareLine /></p>
									<p className=''>Hindu</p>&nbsp;-&nbsp;<p className='tracking-wide'>Brahman (Caste _)</p>
								</div>
								<div className='flex items-center mt-1'>
									<p className='p-[1px] bg-text rounded-md text-white mr-4'><HiOutlineUserCircle /></p>
									<p className=''>BCA</p>,&nbsp;<p className='tracking-wide'>Human Resources Professional</p>
								</div>
								<div className='flex items-center mt-1'>
									<p className='p-[1px] bg-text rounded-md text-white mr-4'><HiOutlineUserCircle /></p>
									<p className=''>Pratapgarh City</p>,&nbsp;<p className=''>Uttar Pradesh</p>
								</div>
								<div className='flex items-center mt-1 '>
									<p className='p-[1px] bg-text rounded-md text-white mr-4'><MdOutlineWorkOutline /></p>
									<p className=''>Employed in (Job Location), Annual Income</p>,&nbsp;<p className='tracking-wide'></p>
								</div>
								<div className='flex mt-4	 mb-3'>
									<p className=''><p className='text-sm min-w-max bg-gray-200 rounded-md px-2 h-auto'>Looking for - </p></p>&nbsp;
									<p className='text-sm max-w-2xl font-light'>
										In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.</p>
								</div>
							</div>

							<div>
								<hr />
								<div className='flex items-center justify-end gap-6 mt-4'>
									<p className='text-sm flex items-center border gap-2 rounded-full pr-6 pl-4 py-2 text-text cursor-pointer'>𐄂<span>Don't Show</span></p>
									<p className='text-sm flex items-center border gap-2 rounded-full pr-6 pl-4 py-2 bg-gold text-white cursor-pointer'><p className=''>🗸</p> <span>Send Interest</span></p>
								</div>
							</div>
						</div>
					</div>

				</div>
			</section >
		</>
	)
}

export default ShortProfile