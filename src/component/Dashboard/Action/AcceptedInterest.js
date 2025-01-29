import React, { useEffect, useMemo, useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { getAccepter, getUserAction } from '../../../store/features/userAction-slice';
import male from '../../../img/male.png';
import female from '../../../img/female.png';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import ActionLoader from '../../Loader/ActionLoader';

const mapAcceptList = (profiles) => {
	return profiles?.map((profile) => {
		const { userDetails } = profile;
		return {
			userId: profile?.targetUserId,
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

const AcceptedInterest = () => {
	const dispatch = useDispatch();
	const [ acceptList, setAcceptList ] = useState([]);
	const [ searchQuery, setSearchQuery ] = useState('');
	const [ activeTab, setActiveTab ] = useState("acceptMe");

	const accept = useSelector((state) => state.userAction.accept);
	const accepter = useSelector((state) => state.userAction.accepter);
	const userId = useSelector((state) => state.userDetails.userId);
	const isLoading = accept.loading || accepter.loading;

	useEffect(() => {
		dispatch(getUserAction("accept"));
		userId && dispatch(getAccepter(userId));
	}, [ dispatch, userId ]);

	const acceptByMe = useMemo(() => mapAcceptList(accept?.data?.socialAction), [ accept?.data?.socialAction ]);
	const acceptOpponent = useMemo(() => mapAcceptList(accepter?.data?.socialAction), [ accepter?.data?.socialAction ]);

	useEffect(() => {
		activeTab == "acceptMe" ? setAcceptList(acceptByMe) : setAcceptList(acceptOpponent);
	}, [ acceptByMe, acceptOpponent, activeTab ]);

	return (
		<>
			<div className="bg-[#f9f9f9] rounded-md overflow-hidden border">
				{/* Header */}
				<header className="text-gray-700 shadow-md">
					<div className="container mx-auto px-4 py-3">
						<div className="flex justify-between items-center">
							<h1 className="text-2xl font-semibold">Accept Interest</h1>
							{/* <div>
								<select name="" id="" className='px-2 py-2 border outline-none rounded-md'
									onChange={(e) => handelAccept(e.target.value)}
								>
									<option value="allData">All data</option>
									<option value="accept">Accept by me</option>
									<option value="accepterProfiles">Accept by opponent</option>
								</select>
							</div> */}
							{/* <div className="flex items-center space-x-4">
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
							</div> */}
							<div className="grid grid-cols-2 p-1 space-x-1 bg-gray-300 rounded-full float-end">
								<button
									className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === "acceptMe" ? "bg-gray-700 text-white" : "text-gray-500"} min-w-max`}
									onClick={() => setActiveTab("acceptMe")}>
									Accept by me
								</button>
								<button
									className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === "acceptOpponent" ? "bg-gray-700 text-white" : "text-gray-500"} min-w-max`}
									onClick={() => setActiveTab("acceptOpponent")}>
									Accept by opponent
								</button>
							</div>

						</div>
					</div>
				</header>


				{/* Main Content */}
				<main className="container mx-auto px-4 py-8">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
						{isLoading ? [ ...Array(6) ].map((_, index) => <ActionLoader key={index} />) :
							acceptList?.map((profile, index) => (
								<div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden transform hover:shadow-lg transition duration-300 border">
									<Link to={`/matches/profile-details/${profile.userId}`} className='relative bg-gray-200 w-full'>
										<img
											src={profile.profileImg == undefined ? profile.gender === 'male' ? male : female : profile.profileImg}
											alt={profile.name}
											className="w-full h-64 object-cover border-b"
										/>
									</Link>
									<div className="px-4 pt-2 pb-4">
										<div className="flex justify-between items-start mb-3">
											<div>
												<Link to={`/matches/profile-details/${profile.userId}`}>
													<h2 className="text-2xl font-semibold text-gray-800 pb-1">
														{profile.firstName != undefined ? `${profile.firstName} ${profile.lastName}` : 'No name'}
													</h2>
												</Link>
												<p className="text-gray-600 text-sm">
													{profile.age != undefined && `${profile.age} years • `}
													{profile.height.feet != undefined && `${profile.height.feet} ' ${profile.height.inch}" • `}
													<span className='capitalize'>
														{profile.country != undefined && `${profile.country}, ${profile.state}`}
													</span>
												</p>
											</div>
										</div>
										<div className="space-y-2">
											<p className="text-gray-700 truncate">
												<span className="font-semibold text-sm">Religion:</span> <span className='font-light capitalize'>
													{profile.religion != undefined && `${profile.religion} (${profile.caste})`}</span>
											</p>
											<p className="text-gray-700 truncate">
												<span className="font-semibold text-sm">Occupation:</span> <span className='font-light capitalize'>{profile.occupation}</span>
											</p>
											<p className="text-gray-700 truncate">
												<span className="font-semibold text-sm">Education:</span> <span className='font-light capitalize'>{profile.education}</span>
											</p>
										</div>
									</div>

									<div className="py-3 flex justify-center items-center border-t text-sm gap-3">
										<p className={`flex items-center space-x-2 px-4 py-[6px] border-2 text-white rounded-full transition ${activeTab == 'acceptMe' ? 'border-emerald-500 bg-emerald-500' : 'border-teal-500 bg-teal-500'}`}>
											<span>{activeTab == 'acceptMe' ? 'Accept by me' : 'Accept by opponent'}</span>
										</p>
										<Link to={`/matches/profile-details/${profile.userId}`}>
											<button className="flex items-center space-x-2 px-4 py-[6px] bg-white text-gray-600 border-2 hover:bg-gray-100 border-gray-500 rounded-full transition">
												<span>View Profile</span>
											</button>
										</Link>
									</div>
								</div>
							))}
					</div>
					{!isLoading && acceptList?.length === 0 && <div className='flex justify-center'><img src="/assets/img/resultNotFound.png" alt="" className='w-1/2' /></div>}
				</main>
			</div>
		</>
	);
};

export default AcceptedInterest