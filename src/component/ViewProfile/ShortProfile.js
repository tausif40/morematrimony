import React, { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ProfileImage from './ProfileImage';
import { HiOutlineUserCircle } from "react-icons/hi";
import { RiStackshareLine } from "react-icons/ri";
import { IoIosStarOutline } from "react-icons/io";
import { IoMdStar } from "react-icons/io";
import { MdOutlineWorkOutline } from "react-icons/md";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import ContactDetails from './ContactDetails';
import { MdKeyboardBackspace } from "react-icons/md";

function ShortProfile() {
	const hideSideMenu = useRef(null);
	const [ isInterestAccept, setIsInterestAccept ] = useState(false)
	const [ shortlist, setShortlist ] = useState(false)
	const [ showMenu, setShowMenu ] = useState(false)
	const [ contactPopup, setContactPopup ] = useState(false)

	// useEffect(() => {
	// 	window.scrollTo({
	// 		top: 0,
	// 		left: 0,	
	// 		behavior: 'instant'
	// 	});
	// }, []);

	const handelShortlist = () => setShortlist((prev) => !prev);
	const handelInterest = () => setIsInterestAccept((prev) => !prev);
	const showSideMenu = () => setShowMenu((prev) => !prev);
	const showContactDetails = () => setContactPopup((prev) => !prev);

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
			{contactPopup && <ContactDetails showDetails={setContactPopup} onClose={() => setContactPopup(false)} />}
			<section className='text-textGray'>
				{/* <div className='px-4 text-xl font-semibold text-gray-600 mb-3 flex items-center'><MdKeyboardBackspace size={20} />&nbsp; Back</div> */}
				<div className='container border shadow-md rounded-xl '>
					{/* details section */}
					<div className='flex flex-col sm:flex-row gap-6 md:gap-8 lg:gap-12 w-full pt-2 pb-6 sm:py-6 '>
						<div className='relative'>
							<div>
								<ProfileImage />
							</div>
							{/* <img src="https://res.cloudinary.com/drfni1iqf/image/upload/v1717399015/Tausif/temp/img_rjd4en.png" alt="" className='h-96 w-[360px] rounded-lg object-cover' /> */}
							{/* <div className='absolute top-2 right-0 cursor-pointer z-50'
								onClick={handelInterest}>
								<p className={`flex items-center ${interest ? 'text-primary ' : 'text-white'} border-3 border-white px-2 rounded-md`}>
									<span>{interest ? <GoHeartFill size={24} /> : <GoHeart size={24} />}</span>
								</p>
							</div> */}
						</div>

						<div className='px-4 md:px-0 flex flex-col justify-between w-full'>
							<div className='relative text-black pb-4'>
								<div className='absolute top-0 right-1 cursor-pointer z-50 flex flex-row-reverse'>
									<div onClick={showSideMenu}>
										<PiDotsThreeOutlineVerticalFill size={20} />
									</div>
									{showMenu &&
										<div className='bg-white rounded-lg shadow-md py-2 border' ref={hideSideMenu}>
											{/* <p className='hover:bg-slate-100 py-[6px] pl-4 pr-12 text-sm' onClick={() => handelSideMenu('message')}>Message</p>
											<p className='hover:bg-slate-100 py-[6px] pl-4 pr-12 text-sm' onClick={() => handelSideMenu('call')}>Call</p> */}
											<p className='hover:bg-slate-100 py-[6px] pl-4 pr-12 text-sm' onClick={() => handelSideMenu('block')}>Block</p>
											<p className='hover:bg-slate-100 py-[6px] pl-4 pr-12 text-sm' onClick={() => handelSideMenu('report')}>Report</p>
										</div>
									}

								</div>
								<p className='font-medium text-xl md:text-2xl'>Name surname</p>
								<div className='flex items-center text-sm font-light text-headingGray py-2 tracking-wide'>
									<p className=''>H32YD1R454F</p>
									<span className='text-text'>&nbsp;|&nbsp;</span>
									<p> Last seen </p>
								</div>
								<div className='flex items-start md:items-center mt-2 text-sm md:text-base'>
									<p className='p-[1px] bg-text rounded-md text-white mr-2 md:mr-4'><HiOutlineUserCircle /></p>
									<p className=' tracking-wider'>20 Yrs, 4'11"</p>
								</div>
								<div className='flex items-start md:items-center mt-2 text-sm md:text-base'>
									<p className='p-[1px] bg-text rounded-md text-white mr-2 md:mr-4'><RiStackshareLine /></p>
									<p className=''>Hindu - Brahman (Caste _)</p>
								</div>
								<div className='flex items-start md:items-center mt-2 text-sm md:text-base'>
									<p className='p-[1px] bg-text rounded-md text-white mr-2 md:mr-4'><HiOutlineUserCircle /></p>
									<p className=''>BCA, Human Resources Professional</p>
								</div>
								<div className='flex items-start md:items-center mt-2 text-sm md:text-base'>
									<p className='p-[1px] bg-text rounded-md text-white mr-2 md:mr-4'><HiOutlineUserCircle /></p>
									<p className=''>Pratapgarh City, Uttar Pradesh</p>
								</div>
								<div className='flex items-start md:items-center mt-2 text-sm md:text-base'>
									<p className='p-[1px] bg-text rounded-md text-white mr-2 md:mr-4'><MdOutlineWorkOutline /></p>
									<p className=''>Employed in (Job Location), Annual Income</p>
								</div>
								{/* <div className='flex mt-4	 mb-3'>
									<p className=''><p className='text-sm min-w-max bg-gray-200 rounded-md px-2 h-auto'>Looking for - </p></p>&nbsp;
									<p className='text-sm max-w-2xl font-light'>
										In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.</p>
								</div> */}
							</div>

							<div>
								<hr />
								<div className='flex items-center justify-end gap-6 mt-4'>
									{isInterestAccept
										? <p className={`text-sm flex items-center border gap-2 rounded-full px-4 py-2 cursor-pointer bg-gray-200 text-textGray border-text transition-all`}
											onClick={showContactDetails}>
											<span>Contact Details</span>
										</p>
										: <p className={`text-sm flex items-center border gap-2 rounded-full pr-6 pl-4 py-2 cursor-pointer ${shortlist ? 'text-primary border-primary font-semibold' : 'text-text border-text'} transition-all`}
											onClick={handelShortlist}>
											<span className='text-sm font-light flex items-center'>
												{shortlist ? <><IoMdStar />&nbsp;<p className=''>Shortlisted</p></> : <><IoIosStarOutline />&nbsp;<p className='border-text'>ShortList</p></>}
											</span>
										</p>

									}
									<p className={`text-sm flex items-center border gap-2 rounded-full px-4 py-2 cursor-pointer text-white ${isInterestAccept ? 'border-green-500 bg-green-500' : 'border-gold bg-gold'} transition-all`}
										onClick={handelInterest}
									><span>{isInterestAccept ? 'Interest Accepted' : 'Send Interest'}</span>
									</p>
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