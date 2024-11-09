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
				<div className="absolute inset-0 bg-cover bg-center"
					style={{ backgroundImage: `url(${img})`, filter: `blur(14px)` }} >
				</div>
				<div className="absolute inset-0 bg-black opacity-30 rounded-xl"></div>
				<Link to={'/view-profile'} className="relative z-10">
					<span className="text-4xl text-gray-400">
						{newUser && <div className="ribbon"><span>New Join</span></div>}
					</span>
					<img src={img} alt="img" className="object-contain sm:object-cover w-full h-96 sm:w-64 sm:h-64" />
				</Link>
			</div>



			{/* Profile Details */}
			<div className="h-64 w-full flex flex-col justify-between py-2 mt-4">
				<div>
					<Link to={'/view-profile'}>
						<h3 className="text-xl font-semibold text-black">{name}</h3>
					</Link>
					<p className="mt-1 text-sm text-gray-500">
						{id} | Last seen {lastSeen}
					</p>
					<p className="mt-4 text-sm ms:text-base text-textGray flex flex-wrap">
						{age} yrs • {height} • {religion} - {caste} • {education} • {occupation} • {location}
					</p>
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
	const profiles = [
		{
			name: 'Priyanka Singh',
			id: 'H13285375',
			age: 19,
			height: "5'4\"",
			religion: 'Hindu',
			caste: 'Brahaman',
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
			lastSeen: '2 days ago',
			accountCreate: '2024-11-03',
			img: './assets/img/profileImages/img3.jpg'
		},
		{
			name: 'Mansi jain',
			id: 'H12904665',
			age: 21,
			height: "5'5\"",
			religion: 'Jain',
			caste: 'axyz',
			education: 'Other Bachelor Degree in Arts / Science / Commerce',
			occupation: 'Teaching / Academician',
			location: 'Madhubani',
			lastSeen: 'yesterday',
			accountCreate: '2024-10-20',
			img: './assets/img/profileImages/img5.jpg'
		},
		{
			name: 'Mansi jain',
			id: 'H12904665',
			age: 21,
			height: "5'5\"",
			religion: 'Jain',
			caste: 'axyz',
			education: 'Other Bachelor Degree in Arts / Science / Commerce',
			occupation: 'Teaching / Academician',
			location: 'Madhubani',
			lastSeen: 'yesterday',
			accountCreate: '2024-10-20',
			img: './assets/img/profileImages/img6.jpg'
		},
	];

	return (
		<div className="mx-auto md:p-4">
			{profiles.map((profile, index) => (
				<ProfileCard key={index} {...profile} />
			))}
		</div>
	);
};

export default ProfileList;
