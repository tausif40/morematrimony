import React, { useEffect, useState } from 'react';
import { IoIosStarOutline } from "react-icons/io";
import { IoMdStar } from "react-icons/io";
import { Link } from 'react-router-dom';
import '../ViewProfile/viewProfile.css';
import male from '../../img/male.png'
import female from '../../img/female.png'
import { getUserAction, setUserAction } from '../../store/features/userAction-slice';
import { useDispatch, useSelector } from 'react-redux';

const ProfileCard = (userData) => {
	const dispatch = useDispatch()
	// console.log(userData);
	const { fistName, lastName, gender, id, age, height, religion, caste, education, occupation, location, lastSeen, accountCreate, img, status
	} = userData;
	const [ isInterestAccept, setIsInterestAccept ] = useState(false);
	const [ IsSendInterest, setIsSendInterest ] = useState(status.isInterestSent);
	const [ isShortlist, setIsShortlist ] = useState(status.isShortlisted);
	const [ newUser, setNewUser ] = useState(false);

	const handelAction = (actionType) => {
		const action = { targetUserId: id, activityType: actionType }
		actionType == 'send_interest' && setIsSendInterest(true)
		actionType == 'shortlist' && setIsShortlist(true)
		dispatch(setUserAction(action));
	};

	useEffect(() => {
		const accountDate = new Date(accountCreate);
		const currentDate = new Date();
		const timeDifference = currentDate - accountDate;
		const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

		if (daysDifference <= 30) {
			setNewUser(true);
		}
	}, [ accountCreate ]);

	return (
		<div className="rounded-lg hover:shadow-lg shadow p-3 md:p-4 mb-6 flex flex-col sm:flex-row items-start sm:space-x-6 md:space-x-8 bg-white">
			<div className="box flex-shrink-0 flex items-center justify-center relative w-full sm:w-auto rounded-md overflow-hidden">
				<div className="absolute inset-0 bg-cover"
					style={{ backgroundImage: `url(${img})`, filter: `blur(16px)` }} >
				</div>
				<div className="absolute inset-0 rounded-xl"></div>
				<Link to={`/matches/profile-details/${id}`} className="relative z-10">
					<div className='relative z-10'>
						<span className="text-4xl text-gray-400">
							{newUser && <div className="ribbon"><span>New Join</span></div>}
						</span>
						<img src={img == undefined ? gender === 'male' ? male : female : img} alt="img" className="object-contain sm:object-cover w-full h-96 sm:w-64 sm:h-64 mix-blend-multiply contrast-100" />
					</div>
				</Link>
			</div>

			{/* Profile Details */}
			<div className="h-64 w-full flex flex-col justify-between py-2 ">
				<div>
					<Link to={`/matches/profile-details/${id}`}>
						<div>
							<h3 className="text-xl font-semibold text-black pointer">{fistName} {lastName}</h3>
						</div>
					</Link>
					<p className="mt-1 text-sm text-gray-500">
						{id.slice(-8).toUpperCase()} | Last seen {lastSeen}
					</p>
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
						<span>{isInterestAccept ? <p>You have sent an interest to her <span className='text-sm font-light'> - {'06 Nov 24'}</span></p> : 'Interested in her?'}</span>
					</p>
					<div className='flex items-center gap-4 md:gap-6 mt-4'>
						{!isInterestAccept && (
							<p className={`text-sm flex items-center border gap-2 rounded-full pr-6 pl-4 py-2 cursor-pointer ${isShortlist ? 'text-primary border-primary font-semibold' : 'text-text border-text'} shadow transition-all`}
								onClick={() => handelAction('shortlist')}>
								<span className='flex items-center'>
									{isShortlist ? <><IoMdStar />&nbsp;<p className=''>Shortlisted</p></> : <><IoIosStarOutline />&nbsp;<p className='border-text'>ShortList</p></>}
								</span>
							</p>
						)}
						<p className={`text-sm flex items-center border gap-2 rounded-full px-4 py-2 cursor-pointer text-white ${IsSendInterest ? 'border-green-500 bg-green-500' : 'border-orange-500 bg-orange-500'} shadow transition-all`}
							onClick={() => handelAction('send_interest')}
						>
							<span>{IsSendInterest ? 'Interest send' : 'Send Interest'}</span>
						</p>
					</div>
				</div>
			</div >
		</div >
	);
};

export default ProfileCard;