import React, { useEffect, useState } from 'react';
import { IoIosStarOutline } from "react-icons/io";
import { IoMdStar } from "react-icons/io";
import { Link } from 'react-router-dom';
import '../ViewProfile/viewProfile.css';

const ProfileCard = ({ name, id, age, height, religion, caste, education, occupation, location, lastSeen, accountCreate, img }) => {

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
		<div className="border rounded-lg shadow-sm p-4 mb-4 flex items-start space-x-8 ">
			{/* Profile Image */}
			<div className="box flex-shrink-0 bg-gray-200 flex items-center  rounded-xl  justify-center relative">
				<Link to={'/view-profile'}>
					<span className="text-4xl text-gray-400">
						{newUser && <div className="ribbon"><span>New Join</span></div>}
						<img src={img} alt="img" className='w-64 h-64 rounded-xl object-cover' />
					</span>
				</Link>
			</div>

			{/* Profile Details */}
			<div className="h-64 w-full flex flex-col justify-between py-2">
				<div>
					<Link to={'/view-profile'}>
						<h3 className="text-2xl font-semibold text-black">{name}</h3>
					</Link>
					<p className="mt-1 text-base text-gray-500">
						{id} | Last seen {lastSeen}
					</p>
					<p className="mt-4 text-base text-textGray">
						{age} yrs • {height} • {religion} - {caste} • {education} • {occupation} • {location}
					</p>
				</div>

				{/* Connect Options */}
				<div className="flex flex-col  mt-2 ">
					<p className="text-base mt-2 font-bold text-gray-600">
						<span>{isInterestAccept ? <p>You have sent an interest to her <span className='text-sm font-light'> - {'06 Nov 24'}</span></p> : 'Interested in her?'}</span>
					</p>
					<div className='flex items-center gap-6 mt-4'>
						{!isInterestAccept && (
							<p className={`text-sm flex items-center border gap-2 rounded-full pr-6 pl-4 py-2 cursor-pointer ${shortlist ? 'text-primary border-primary font-semibold' : 'text-text border-text'} transition-all`}
								onClick={handelShortlist}>
								<span className='text-sm font-light flex items-center'>
									{shortlist ? <><IoMdStar />&nbsp;<p className=''>Shortlisted</p></> : <><IoIosStarOutline />&nbsp;<p className='border-text'>ShortList</p></>}
								</span>
							</p>
						)}
						<p className={`text-sm flex items-center border gap-2 rounded-full px-4 py-2 cursor-pointer text-white ${isInterestAccept ? 'border-green-500 bg-green-500' : 'border-orange-500 bg-orange-500'} transition-all`}
							onClick={handelInterest}
						><span>{isInterestAccept ? 'Interest Accepted' : 'Send Interest'}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

// Main Component
const ProfileList = () => {
	const profiles = [
		{
			name: 'Roshni Khanam',
			id: 'H13285375',
			age: 19,
			height: "5'4\"",
			religion: 'Muslim',
			caste: 'Pathan',
			education: 'B.Com.',
			occupation: 'Not Working',
			location: 'Bettiah',
			lastSeen: 'few hour ago',
			accountCreate: '2024-10-25',
			img: './assets/img/profileImages/img1.jpg'
		},
		{
			name: 'Saafiya Firoz Shaikh',
			id: 'H13711773',
			age: 20,
			height: "5'3\"",
			religion: 'Muslim',
			caste: 'Sheikh',
			education: 'B.Sc.',
			occupation: 'Not Working',
			location: 'Ahmadnagar',
			lastSeen: 'few hour ago',
			accountCreate: '2024-11-03',
			img: './assets/img/profileImages/img2.jpg'
		},
		{
			name: 'Shakina Khatoon',
			id: 'H12904665',
			age: 21,
			height: "5'5\"",
			religion: 'Muslim',
			caste: 'Arain',
			education: 'Other Bachelor Degree in Arts / Science / Commerce',
			occupation: 'Teaching / Academician',
			location: 'Madhubani',
			lastSeen: 'yesterday',
			accountCreate: '2024-10-20',
			img: './assets/img/profileImages/img3.jpg'
		},
	];

	return (
		<div className="mx-auto p-4">
			{profiles.map((profile, index) => (
				<ProfileCard key={index} {...profile} />
			))}
		</div>
	);
};

export default ProfileList;
