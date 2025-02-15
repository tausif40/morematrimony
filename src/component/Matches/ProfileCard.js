import React, { useEffect, useState } from 'react';
import { IoIosStarOutline } from "react-icons/io";
import { IoMdStar } from "react-icons/io";
import { Link } from 'react-router-dom';
import '../ViewProfile/viewProfile.css';
import male from '../../img/male.png'
import female from '../../img/female.png'
import { acceptSkipInterest, getUserAction, setUserAction } from '../../store/features/userAction-slice';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Modal/Modal';
import '../../CSS/LoaderAnimation.css'

const ProfileCard = (userData) => {
	const dispatch = useDispatch()
	// console.log(userData);
	const { fistName, lastName, gender, targetId, agentId, age, height, religion, caste, education, occupation, location, lastSeen, accountCreate, img, action, targetedAction } = userData;

	const [ interestReceived, setInterestReceived ] = useState(false);
	const [ showModal, setShowModal ] = useState(false);
	const [ IsSendInterest, setIsSendInterest ] = useState(false);
	const [ interestLoad, setInterestLoad ] = useState(false);
	const [ shortlistLoad, setShortlistLoad ] = useState(false);
	const [ isShortlist, setIsShortlist ] = useState(false);
	const [ newUser, setNewUser ] = useState(false);
	const [ confirmSkip, setConfirmSkip ] = useState(false);
	const [ acceptReq, setAcceptReq ] = useState(false);
	const [ loadingSkip, setLoadingSkip ] = useState(false);
	const [ loadingAccept, setLoadingAccept ] = useState(false);

	const userId = useSelector((state) => state.userDetails.userId);

	const handelAction = (actionType) => {
		actionType === 'send_interest' && setInterestLoad(true)
		actionType === 'shortlist' && setShortlistLoad(true)
		const action = { targetUserId: targetId, activityType: actionType }
		dispatch(setUserAction(action))
			.then(() => {
				actionType === 'send_interest' && setIsSendInterest(true); setInterestLoad(false)
				actionType === 'shortlist' && setIsShortlist(true); setShortlistLoad(false)
			})
	};

	useEffect(() => {
		action?.send_interest?.isDone === true ? setIsSendInterest(true) : setIsSendInterest(false)
		action?.shortlist?.isDone === true ? setIsShortlist(true) : setIsShortlist(false)
		targetedAction?.send_interest?.isDone === true ? setInterestReceived(true) : setInterestReceived(false)
		// console.log("action int - ", action?.isInterestSent, '\n IsSendInterest = ', IsSendInterest);
	}, [ userData ])

	useEffect(() => {
		const accountDate = new Date(accountCreate);
		const currentDate = new Date();
		const timeDifference = currentDate - accountDate;
		const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

		if (daysDifference <= 30) {
			setNewUser(true);
		}
	}, [ accountCreate ]);

	const handelAcceptSkip = (activityType) => {
		activityType === 'accept' && setLoadingAccept(true)
		if (activityType === 'skip') { setLoadingSkip(true); setShowModal(false); }
		console.log(activityType);
		const data = {
			userId: userId,
			targetUserId: targetId,
			agentIdOfTargetedUser: agentId,
			activityType: activityType
		}

		dispatch(acceptSkipInterest(data))
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
			<div className="rounded-lg hover:shadow-lg shadow p-3 md:p-4 mb-6 flex flex-col sm:flex-row items-start sm:space-x-6 md:space-x-8 bg-white">
				<div className="box flex-shrink-0 flex items-center justify-center relative w-full sm:w-auto rounded-md overflow-hidden">
					<div className="absolute inset-0 bg-cover"
						style={{ backgroundImage: `url(${img})`, filter: `blur(16px)` }} >
					</div>
					<div className="absolute inset-0 rounded-xl"></div>
					<Link to={`/matches/profile-details/${targetId}/${userId}`} className="relative z-10">
						<div className='relative z-10 border rounded-md overflow-hidden'>
							<span className="text-4xl text-gray-400">
								{newUser && <div className="ribbon"><span>New Join</span></div>}
							</span>
							<img src={img === undefined ? gender === 'male' ? male : female : img} alt="img" className="object-contain sm:object-cover w-full h-96 sm:w-64 sm:h-64 mix-blend-multiply contrast-100" />
						</div>
					</Link>
				</div>

				{/* Profile Details */}
				<div className="h-64 w-full flex flex-col justify-between py-2 ">
					<div>
						<Link to={`/matches/profile-details/${targetId}/${userId}`}>
							<div>
								<h3 className="text-xl font-semibold text-black pointer capitalize">{targetId.slice(-8).toUpperCase()}</h3>
								{/* {fistName} {lastName} */}
							</div>
						</Link>
						{/* <p className="mt-1 text-sm text-gray-500">
							{targetId.slice(-8).toUpperCase()} | Last seen {lastSeen}
						</p> */}
						<div className="mt-4 text-sm ms:text-base text-textGray flex flex-wrap">
							{[
								age && `${age} yrs`,
								height && height,
								religion && religion && caste ? ` - ${caste}` : religion || caste,
								education && education,
								occupation && `${occupation} (${location})`,
								// location && ,
							].filter(Boolean).join(' • ').replace(/\b\w/g, (char) => char.toUpperCase())}
						</div>
					</div>

					{/* Connect Options */}
					<div className="flex flex-col  mt-2 ">
						<p className="text-base mt-2 font-bold text-gray-600">
							<span>{acceptReq ? <p>You have sent an interest to her <span className='text-sm font-light'> - {'06 Nov 24'}</span></p> : 'Interested in her?'}</span>
						</p>
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
										{isShortlist ? <><IoMdStar />&nbsp;<p>Shortlisted</p></> : <><IoIosStarOutline />&nbsp;<p className='border-text'>ShortList</p></>}
									</span>
									{/* {interestLoad && <span className="loader left-2 border-white"></span>} */}
								</p>

								<p className={`text-sm flex items-center border gap-2 rounded-full px-4 py-2 cursor-pointer text-white ${IsSendInterest ? 'border-red-500 bg-red-500' : 'border-orange-500 bg-orange-500'} shadow transition-all`}
									onClick={() => handelAction('send_interest')}
								>
									<span>{IsSendInterest ? 'Pending Interest' : 'Send Interest'}</span>
									{/* {shortlistLoad && <span className="loader left-2 border-white"></span>} */}
								</p>
							</div>
						}
					</div>
				</div >
			</div >
			<Modal show={showModal} onClose={() => { setShowModal(false); }}>
				<p className='text-center text-black text-lg pt-2'>Are Your sure you want to skip this profile?</p>
				<div className='flex justify-center gap-8 mt-6'>
					<button className='cancel-button' onClick={() => setShowModal(false)}>Cancel</button>
					<button className='button' onClick={() => handelAcceptSkip("skip")}>Confirm</button>
				</div>
			</Modal >
		</>
	);
};

export default ProfileCard;