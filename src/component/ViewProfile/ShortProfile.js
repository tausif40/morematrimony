import React, { useState, useEffect, useRef } from 'react'
import 'swiper/css';
import ProfileImage from './ProfileImage';
import { HiOutlineUserCircle } from "react-icons/hi";
import { RiStackshareLine } from "react-icons/ri";
import { IoIosStarOutline } from "react-icons/io";
import { IoMdStar } from "react-icons/io";
import { MdOutlineWorkOutline } from "react-icons/md";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import ContactDetails from './ContactDetails';
import { acceptSkipInterest, setUserAction } from '../../store/features/userAction-slice';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Modal/Modal';
import '../../CSS/LoaderAnimation.css'

function ShortProfile({ data }) {
	const hideSideMenu = useRef(null);
	const dispatch = useDispatch();


	const [ interestReceived, setInterestReceived ] = useState(false);
	const [ showModal, setShowModal ] = useState(false);
	const [ IsSendInterest, setIsSendInterest ] = useState(false);
	const [ isShortlist, setIsShortlist ] = useState(false);

	const [ showMenu, setShowMenu ] = useState(false)
	const [ contactPopup, setContactPopup ] = useState(false)
	const [ newUser, setNewUser ] = useState(false);
	const [ confirmSkip, setConfirmSkip ] = useState(false);
	const [ acceptReq, setAcceptReq ] = useState(false);
	const [ loadingSkip, setLoadingSkip ] = useState(false);
	const [ loadingAccept, setLoadingAccept ] = useState(false);

	const userId = useSelector((state) => state.userDetails.userId);

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

	const handelAction = (actionType) => {
		const action = { targetUserId: data?.targetId, activityType: actionType }
		actionType === 'send_interest' && setIsSendInterest(true)
		actionType === 'shortlist' && setIsShortlist(true)
		dispatch(setUserAction(action));
	};

	useEffect(() => {
		data?.SocialAction?.send_interest?.isDone === true ? setIsSendInterest(true) : setIsSendInterest(false)
		data?.SocialAction?.shortlist?.isDone === true ? setIsShortlist(true) : setIsShortlist(false)
		data?.targetedSocialAction?.send_interest?.isDone === true ? setInterestReceived(true) : setInterestReceived(false)
		// console.log("action int - ", action?.isInterestSent, '\n IsSendInterest = ', IsSendInterest);
	}, [ data ])

	// useEffect(() => {
	// 	const accountDate = new Date(accountCreate);
	// 	const currentDate = new Date();
	// 	const timeDifference = currentDate - accountDate;
	// 	const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

	// 	if (daysDifference <= 30) {
	// 		setNewUser(true);
	// 	}
	// }, [ accountCreate ]);

	const handelAcceptSkip = (activityType) => {
		activityType === 'accept' && setLoadingAccept(true)
		if (activityType === 'skip') { setLoadingSkip(true); setShowModal(false); }
		console.log(activityType);
		const passData = {
			userId: userId,
			targetUserId: data?.targetId,
			agentIdOfTargetedUser: data?.agentId,
			activityType: activityType
		}

		dispatch(acceptSkipInterest(passData))
			.then(response => {
				console.log("Response:", response);
				activityType === 'accept' && setAcceptReq(true); setLoadingAccept(false)
				activityType === 'skip' && setConfirmSkip(true); setLoadingSkip(false)
			})
			.catch(error => {
				console.error("Error:", error);
				activityType === 'accept' && setLoadingAccept(false)
				activityType === 'skip' && setLoadingSkip(false)
			});
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
								<ProfileImage agentId={data?.agentId} />
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
								<div className='absolute top-0 right-1 cursor-pointer z-10 flex flex-row-reverse'>
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
								<p className='font-medium text-xl md:text-2xl'>{data?.firstName} {data?.lastName}</p>
								<div className='flex items-center text-sm font-light text-headingGray py-2 tracking-wide'>
									<p className=''>{data?.id?.slice(-8).toUpperCase()} </p>
									<span className='text-text'>&nbsp;|&nbsp;</span>
									<p>Last seen {data?.lastSeen}</p>
								</div>
								<div className='flex items-start md:items-center mt-2 text-sm md:text-base'>
									<p className='p-[1px] bg-text rounded-md text-white mr-2 md:mr-4'><HiOutlineUserCircle /></p>
									<p className=' tracking-wider'>{data?.age} Yrs, {data?.height}</p>
								</div>
								<div className='flex items-start md:items-center mt-2 text-sm md:text-base'>
									<p className='p-[1px] bg-text rounded-md text-white mr-2 md:mr-4'><RiStackshareLine /></p>
									<p className=''>{data?.religion && `${data?.religion}`} {data?.cast == "" ? '' : ` - ${data?.cast}`} {data?.subCaste !== "" && ` - ${data?.subCaste}`}</p>
								</div>
								<div className='flex items-start md:items-center mt-2 text-sm md:text-base'>
									<p className='p-[1px] bg-text rounded-md text-white mr-2 md:mr-4'><HiOutlineUserCircle /></p>
									<p className=''>{data?.highestEducation}, {data?.occupation}</p>
								</div>
								<div className='flex items-start md:items-center mt-2 text-sm md:text-base'>
									<p className='p-[1px] bg-text rounded-md text-white mr-2 md:mr-4'><HiOutlineUserCircle /></p>
									<p className=''>{data.city}, {data.state}, {data.country}</p>
								</div>
								<div className='flex items-start md:items-center mt-2 text-sm md:text-base'>
									<p className='p-[1px] bg-text rounded-md text-white mr-2 md:mr-4'><MdOutlineWorkOutline /></p>
									<p className=''>{data.occupation} ({data.jobLocation}), {data.annualIncome}</p>
								</div>
							</div>

							<div>
								<hr />
								<div className='flex items-center justify-end gap-4 md:gap-6 mt-4'>
									{interestReceived ?
										<div className='flex items-center gap-4 md:gap-6 mt-4'>
											{!acceptReq && <button className={`text-sm flex items-center border-2 border-gray-400 rounded-full px-6 py-2 cursor-pointer ${loadingSkip ? 'bg-gray-200 text-gray-500' : 'text-gray-600'}`} disabled={loadingSkip || confirmSkip}
												onClick={() => setShowModal(true)}>
												<span>{confirmSkip ? 'Skipped' : <p>{loadingSkip ? 'Skipping' : 'Skip'}</p>}</span>
												{loadingSkip && <span className="loader left-2 border-gray-600"></span>}
											</button>}
											{!confirmSkip && <button className={`text-sm flex items-center border gap-2 rounded-full px-6 py-2 cursor-pointer text-white ${acceptReq ? 'bg-green-500 border-green-500' : 'bg-sky-500 border-sky-500'} shadow transition-all`}
												onClick={() => handelAcceptSkip("accept")} disabled={loadingAccept || acceptReq}>
												<span>{acceptReq ? 'Accepted' : <p>{loadingAccept ? 'Accepting' : 'Accept'}</p>}</span>
												{loadingAccept && <span className="loader left-2 border-white"></span>}
											</button>}
										</div>
										: <div className='flex items-center gap-4 md:gap-6 mt-4'>
											<p className={`text-sm flex items-center border gap-2 rounded-full pr-6 pl-4 py-2 cursor-pointer ${isShortlist ? 'text-primary border-primary font-semibold' : 'text-text border-text'} shadow transition-all`}
												onClick={() => handelAction('shortlist')}>
												<span className='flex items-center'>
													{isShortlist ? <><IoMdStar />&nbsp;<p className=''>Shortlisted</p></> : <><IoIosStarOutline />&nbsp;<p className='border-text'>ShortList</p></>}
												</span>
											</p>

											<p className={`text-sm flex items-center border gap-2 rounded-full px-4 py-2 cursor-pointer text-white ${IsSendInterest ? 'border-red-500 bg-red-500' : 'border-orange-500 bg-orange-500'} shadow transition-all`}
												onClick={() => handelAction('send_interest')}
											>
												<span>{IsSendInterest ? 'Pending Interest' : 'Send Interest'}</span>
											</p>
										</div>
									}
								</div>
							</div>
						</div>
					</div>

				</div>
			</section >
			<Modal show={showModal} onClose={() => { setShowModal(false); }}>
				<p className='text-center text-black text-lg pt-2'>Are Your sure you want to skip this profile?</p>
				<div className='flex justify-center gap-8 mt-6'>
					<button className='cancel-button' onClick={() => setShowModal(false)}>Cancel</button>
					<button className='button' onClick={() => handelAcceptSkip("skip")}>Confirm</button>
				</div>
			</Modal >
		</>
	)
}

export default ShortProfile