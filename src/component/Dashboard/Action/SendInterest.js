import React, { useEffect, useMemo, useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { getUserAction } from '../../../store/features/userAction-slice';
import male from '../../../img/male.png';
import female from '../../../img/female.png';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import ActionLoader from '../../Loader/ActionLoader';

const mapSendInterest = (profiles) => {
	return profiles?.map((profile) => {
		const { userDetails } = profile;
		console.log(profile)
		return {
			targetUserId: userDetails?._id,
			profileImg: userDetails?.profileImage,
			firstName: userDetails?.basicInformation?.firstName,
			lastName: userDetails?.basicInformation?.lastName,
			gender: userDetails?.basicInformation?.gender,
			height: { feet: userDetails?.physicalAttributes?.height?.feet, inch: userDetails?.physicalAttributes?.height?.inches },
			age: userDetails?.basicInformation?.dateOfBirth
				&& Math.floor((new Date() - new Date(userDetails?.basicInformation.dateOfBirth)) / (1000 * 60 * 60 * 24 * 365.25)),
			religion: userDetails?.spiritualAndSocialBackground?.religion[ 0 ]?.name,
			caste: userDetails?.spiritualAndSocialBackground?.caste[ 0 ]?.name,
			country: userDetails?.presentAddress?.country[ 0 ]?.name,
			state: userDetails?.presentAddress?.state[ 0 ]?.name,
			education: userDetails?.educationalDetails?.highestEducation[ 0 ]?.name,
			occupation: userDetails?.career?.occupation[ 0 ]?.occupationName,
		};
	});
};

const SendInterest = () => {
	const dispatch = useDispatch();
	const [ myInterestList, setMyInterestList ] = useState([]);
	const [ searchQuery, setSearchQuery ] = useState('');

	const userId = useSelector((state) => state.userDetails.userId);
	const sendInterest = useSelector((state) => state.userAction.send_interest);

	const isLoading = sendInterest.loading;
	console.log("sendInterest- ", sendInterest);
	useEffect(() => {
		dispatch(getUserAction("send_interest"));
	}, [ dispatch ]);

	const profiles = useMemo(() => mapSendInterest(sendInterest?.data?.socialAction?.socialAction),
		[ sendInterest?.data?.socialAction?.socialAction ]);

	useEffect(() => {
		setMyInterestList(profiles);
	}, [ profiles ]);

	return (
		<>
			<div className="bg-[#f9f9f9] rounded-md overflow-hidden border">
				{/* Header */}
				<header className="text-gray-700 shadow-md">
					<div className="container mx-auto px-4 py-3">
						<div className="flex justify-between items-center">
							<h1 className="text-2xl font-semibold">Send Interest</h1>
							<div className="flex items-center space-x-4">
								<div className="relative">
									<input
										type="text"
										placeholder="Search profiles..."
										className="pl-10 pr-4 py-2 rounded-full bg-black/10 backdrop-blur-sm text-gray-700 placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-black/30 w-96"
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
									/>
									<Search className="absolute left-3 top-2.5 h-5 w-5 text-black/70" />
								</div>
							</div>
						</div>
					</div>
				</header>

				{/* Main Content */}
				<main className="container mx-auto px-4 py-8">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
						{isLoading ? [ ...Array(6) ].map((_, index) => <ActionLoader key={index} />) :
							myInterestList?.map((profile, index) => (
								<div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden transform hover:shadow-lg transition duration-300 border">
									<Link to={`/matches/profile-details/${profile?.targetUserId}/${userId}`} className='relative bg-gray-200 w-full'>
										<img
											src={profile.profileImg === undefined ? profile.gender === 'male' ? male : female : profile.profileImg}
											alt={profile.name}
											className="w-full h-64 object-cover border-b"
										/>
									</Link>
									<div className="px-4 pt-2 pb-4">
										<div className="flex justify-between items-start mb-3">
											<div>
												<Link to={`/matches/profile-details/${profile?.targetUserId}/${userId}`}>
													<h2 className="text-2xl font-semibold text-gray-800 pb-1 capitalize">
														{profile.firstName !== undefined ? `${profile.firstName} ${profile.lastName}` : 'No name'}
													</h2>
												</Link>
												<p className="text-gray-600 text-sm h-4 truncate">
													{profile.age !== undefined && `${profile.age} years • `}
													{profile.height.feet !== undefined && `${profile.height.feet} ' ${profile.height.inch}" • `}
													<span className='capitalize'>
														{profile.country !== undefined && `${profile.country}, ${profile.state}`}
													</span>
												</p>
											</div>
										</div>
										<div className="space-y-2">
											<p className="text-gray-700 truncate">
												<span className="font-semibold text-sm">Religion:</span> <span className='font-light capitalize'>
													{profile.religion !== undefined && `${profile.religion} (${profile.caste})`}</span>
											</p>
											<p className="text-gray-700 truncate">
												<span className="font-semibold text-sm">Occupation:</span> <span className='font-light capitalize'>{profile.occupation}</span>
											</p>
											<p className="text-gray-700 truncate">
												<span className="font-semibold text-sm">Education:</span> <span className='font-light capitalize'>{profile.education}</span>
											</p>
										</div>
									</div>

									<div className="py-3 flex justify-center items-center border-t text-sm gap-6">
										<Link to={`/matches/profile-details/${profile?.targetUserId}/${userId}`}>
											<button className="flex items-center space-x-2 px-4 py-[6px] bg-white text-gray-600 border-2 hover:bg-gray-100 border-gray-500 rounded-full transition">
												<span>View Profile</span>
											</button>
										</Link>
										<button className="flex items-center space-x-2 px-4 py-[6px] border-2 border-primary bg-primary text-white rounded-full transition">
											<span>Interest Pending</span>
										</button>
									</div>
								</div>
							))}
					</div>
					{!isLoading && myInterestList?.length === 0 && <div className='flex justify-center'><img src="/assets/img/resultNotFound.png" alt="" className='w-1/2' /></div>}
				</main>
			</div>
		</>
	);
};

export default SendInterest;
