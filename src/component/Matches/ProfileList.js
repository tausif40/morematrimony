import React, { useEffect, useState } from 'react';
import { IoIosStarOutline } from "react-icons/io";
import { IoMdStar } from "react-icons/io";
import { Link } from 'react-router-dom';
import '../ViewProfile/viewProfile.css';
import { getMatchProfile } from '../../store/features/matchProfile-slice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('access_token');

const ProfileCard = (userData) => {
	const { fistName, lastName, id, age, height, religion, caste, education, occupation, location, lastSeen, accountCreate, img } = userData;
	const [ isInterestAccept, setIsInterestAccept ] = useState(false);
	const [ shortlist, setShortlist ] = useState(false);
	const [ newUser, setNewUser ] = useState(false);

	const handelShortlist = () => setShortlist((prev) => !prev);
	const handelInterest = () => setIsInterestAccept((prev) => !prev);

	useEffect(() => {
		const accountDate = new Date(accountCreate);
		const currentDate = new Date();
		const timeDifference = currentDate - accountDate;
		const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

		if (daysDifference <= 7) {
			setNewUser(true);
		}
	}, [ accountCreate ]);

	return (
		<div className="border rounded-lg shadow-sm p-3 md:p-4 mb-10 flex flex-col sm:flex-row items-start sm:space-x-6 md:space-x-8 ">
			{/* <div className="box flex-shrink-0 flex items-center justify-center relative w-full sm:w-auto rounded-xl object-cover blur-sm"
				style={{ backgroundImage: `url(${img})`}}>
				<Link to={'/view-profile'}>
					<span className="text-4xl text-gray-400">
						{newUser && <div className="ribbon"><span>New Join</span></div>}
					</span>
					<img src={img} alt="img" className='blur-none	rounded-xl object-contain sm:object-cover w-full h-96 sm:w-64 sm:h-64' />
				</Link>
			</div> */}
			<div className="box flex-shrink-0 flex items-center justify-center relative w-full sm:w-auto rounded-xl overflow-hidden">
				<div className="absolute inset-0 bg-cover"
					style={{ backgroundImage: `url(${img})`, filter: `blur(16px)` }} >
				</div>
				<div className="absolute inset-0  rounded-xl "></div>
				<Link to={'/view-profile'} className="relative z-10">
					<span className="text-4xl text-gray-400">
						{newUser && <div className="ribbon"><span>New Join</span></div>}
					</span>
					<img src={img} alt="img" className="object-contain sm:object-cover w-full h-96 sm:w-64 sm:h-64" />
				</Link>
			</div>



			{/* Profile Details */}
			<div className="h-64 w-full flex flex-col justify-between py-2 ">
				<div>
					<Link to={'/view-profile'}>
						<h3 className="text-xl font-semibold text-black">{fistName} {lastName}</h3>
					</Link>
					<p className="mt-1 text-sm text-gray-500">
						{id.slice(-8).toUpperCase()} | Last seen {lastSeen}
					</p>
					{/* <div className="mt-4 text-sm ms:text-base text-textGray flex flex-wrap">
						{age} yrs • {height} • {religion} - {caste} • {education} • {occupation} • {location}
					</div> */}
					<div className="mt-4 text-sm ms:text-base text-textGray flex flex-wrap">
						{[
							age && `${age} yrs`,
							height && height,
							religion && caste ? `${religion} - ${caste}` : religion || caste,
							education && education,
							occupation && occupation,
							location && location,
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
							<p className={`text-sm flex items-center border gap-2 rounded-full pr-6 pl-4 py-2 cursor-pointer ${shortlist ? 'text-primary border-primary font-semibold' : 'text-text border-text'} transition-all`}
								onClick={handelShortlist}>
								<span className='flex items-center'>
									{shortlist ? <><IoMdStar />&nbsp;<p className=''>Shortlisted</p></> : <><IoIosStarOutline />&nbsp;<p className='border-text'>ShortList</p></>}
								</span>
							</p>
						)}
						<p className={`text-sm flex items-center border gap-2 rounded-full px-4 py-2 cursor-pointer text-white ${isInterestAccept ? 'border-green-500 bg-green-500' : 'border-orange-500 bg-orange-500'} transition-all`}
							onClick={handelInterest}
						>
							<span>{isInterestAccept ? 'Interest Accepted' : 'Send Interest'}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

// Main Component
const ProfileList = () => {
	const dispatch = useDispatch()
	const matchProfile = useSelector((state) => state.matchProfile.matchProfile);

	useEffect(() => {
		dispatch(getMatchProfile());

	}, [ dispatch ])
	console.log(matchProfile);

	const mapProfiles = (profiles) => {
		return profiles.map((profile) => {
			const {
				_id,
				basicInformation,
				physicalAttributes,
				createdAt
			} = profile;

			return {
				fistName: basicInformation?.firstName,
				lastName: basicInformation?.lastName,
				id: _id,
				age: basicInformation?.dateOfBirth
					? Math.floor((new Date() - new Date(basicInformation.dateOfBirth)) / (1000 * 60 * 60 * 24 * 365.25))
					: '',
				height: physicalAttributes?.height
					? `${physicalAttributes.height.feet}' ${physicalAttributes.height.inches || 0}"`
					: '',
				religion: profile.spiritualAndSocialBackground?.religion[ 0 ]?.name,
				caste: profile.spiritualAndSocialBackground?.caste[ 0 ]?.name,
				education: profile.educationalDetails?.highestEducation[ 0 ]?.name,
				occupation: profile.career?.occupation[ 0 ]?.occupationName,
				location: 'Not Specified',
				lastSeen: 'Recently Active',
				accountCreate: createdAt,
				img: profile.profileImage || '',
			};
		});
	};

	const profiles = matchProfile?.user ? mapProfiles(matchProfile.user) : [];

	return (
		<div className="mx-auto md:p-4">
			{profiles.map((profile, index) => (
				<ProfileCard key={index} {...profile} />
			))}
		</div>
	);
};

export default ProfileList;
