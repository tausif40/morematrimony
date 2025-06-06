import React, { useEffect, useMemo, useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { acceptSkipInterest, getReceivedInterest, getUserAction } from '../../../store/features/userAction-slice';
import male from '../../../img/male.png'
import female from '../../../img/female.png'
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import ActionLoader from '../../Loader/ActionLoader';
import Modal from '../../Modal/Modal'
import '../../../CSS/LoaderAnimation.css'
import toast from 'react-hot-toast';

const mapReceivedInterest = (profiles) => {
	return profiles?.map((profile) => {
		console.log("profile in recived ", profile);
		const { userDetails } = profile;
		return {
			agentId: profile?.agentId,
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

const ReceivedInterest = () => {
	const dispatch = useDispatch()
	const [ myInterestList, setMyInterestList ] = useState([])
	const [ searchQuery, setSearchQuery ] = useState('');
	const [ pendingAction, setPendingAction ] = useState(null);
	const [ showModal, setShowModal ] = useState(false);
	const [ profileStatus, setProfileStatus ] = useState({});
	// const [ confirmSkip, setConfirmSkip ] = useState(false);
	// const [ acceptReq, setAcceptReq ] = useState(false);
	// const [ loadingSkip, setLoadingSkip ] = useState(false);
	// const [ loadingAccept, setLoadingAccept ] = useState(false);

	const receivedInterest = useSelector((state) => state.userAction.receivedInterest);
	const userId = useSelector((state) => state.userDetails.userId);
	const isLoading = receivedInterest.loading
	console.log(receivedInterest);
	console.log(userId);

	useEffect(() => {
		dispatch(getReceivedInterest(userId));
	}, [ dispatch, userId ])

	const profiles = useMemo(() => mapReceivedInterest(receivedInterest?.data?.socialAction?.socialAction),
		[ receivedInterest?.data?.socialAction?.socialAction ]);

	useEffect(() => {
		setMyInterestList(profiles)
	}, [ profiles ])


	const filteredProfiles = useMemo(() => {
		if (!searchQuery.trim()) return myInterestList;
		return myInterestList.filter(profile =>
			`${profile.firstName} ${profile.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
			profile.religion?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			profile.occupation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			profile.education?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			profile.country?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			profile.state?.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}, [ myInterestList, searchQuery ]);

	const handelAction = (activityType, agentId, targetUserId) => {
		if (activityType === 'skip') {
			setShowModal(true);
			setPendingAction({ activityType, agentId, targetUserId });
			return;
		}
		executeAction(activityType, agentId, targetUserId);
	};

	const confirmAndSkip = () => {
		if (pendingAction) {
			executeAction(pendingAction.activityType, pendingAction.agentId, pendingAction.targetUserId);
			setPendingAction(null);
		}
		setShowModal(false);
	};

	// const executeAction = (activityType, agentId, targetUserId) => {
	// 	activityType === 'accept' && setLoadingAccept(true)
	// 	activityType === 'skip' && setLoadingSkip(true)
	// 	const data = {
	// 		userId: userId,
	// 		targetUserId: targetUserId,
	// 		agentIdOfTargetedUser: agentId,
	// 		activityType: activityType
	// 	}

	// 	dispatch(acceptSkipInterest(data))
	// 		.then(response => {
	// 			console.log("Response:", response);
	// 			activityType === 'accept' && setAcceptReq(true); setLoadingAccept(false)
	// 			activityType === 'skip' && setConfirmSkip(true); setLoadingSkip(false)
	// 		})
	// 		.catch(error => {
	// 			console.error("Error:", error);
	// 			activityType === 'accept' && setLoadingAccept(false)
	// 			activityType === 'skip' && setLoadingSkip(false)
	// 		});
	// }

	const executeAction = async (activityType, agentId, targetUserId) => {
		setProfileStatus(prev => ({
			...prev,
			[ targetUserId ]: {
				loadingAccept: activityType === 'accept',
				loadingSkip: activityType === 'skip',
				completed: false,
				action: activityType
			}
		}));

		const data = {
			userId: userId,
			targetUserId: targetUserId,
			agentIdOfTargetedUser: agentId,
			activityType: activityType
		};

		try {

			const res = await dispatch(acceptSkipInterest(data)).unwrap();
			console.log(res);
			setProfileStatus(prev => ({
				...prev,
				[ targetUserId ]: {
					loadingAccept: false,
					loadingSkip: false,
					completed: true,
					action: activityType
				}
			}));
		} catch (error) {
			console.log(error);
			toast.error(error?.response?.data?.message || 'Failed!');
			// setProfileStatus(prev => ({
			// 	...prev,
			// 	[ targetUserId ]: {
			// 		loadingAccept: false,
			// 		loadingSkip: false,
			// 		completed: false,
			// 		action: activityType
			// 	}
			// }));
		};
	}


	return (
		<>
			<Modal show={showModal} onClose={() => { setShowModal(false); }}>
				<p className='text-center text-black text-lg pt-2'>Are Your sure you want to skip this profile?</p>
				<div className='flex justify-center gap-8 mt-6'>
					<button className='cancel-button' onClick={() => setShowModal(false)}>Cancel</button>
					<button className='button' onClick={confirmAndSkip}>Confirm</button>
				</div>
			</Modal >
			<div className="bg-[#f9f9f9] rounded-md overflow-hidden border">
				{/* Header */}
				<header className="text-gray-700 shadow-md">
					<div className="container mx-auto px-4 py-3">
						<div className="flex justify-between items-center">
							<h1 className="text-2xl font-semibold">Received Interest</h1>
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
							filteredProfiles?.map((profile, index) => (
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
										{profileStatus[ profile.targetUserId ]?.action !== 'accept' &&
											<button className={`flex items-center px-6 py-[6px] border-2 border-gray-400 rounded-full transition 
												${profileStatus[ profile.targetUserId ]?.loadingSkip ? 'bg-gray-200 text-gray-500' : 'text-gray-600'}`}
												onClick={() => handelAction("skip", profile?.agentId, profile.targetUserId)}
												disabled={profileStatus[ profile.targetUserId ]?.loadingSkip || profileStatus[ profile.targetUserId ]?.completed}
											>
												{profileStatus[ profile.targetUserId ]?.completed && profileStatus[ profile.targetUserId ]?.action === 'skip' ? 'Skipped' : 'Skip'}
												{profileStatus[ profile.targetUserId ]?.loadingSkip && <span className="loader left-2 border-white"></span>}
											</button>}
										{profileStatus[ profile.targetUserId ]?.action !== 'skip' &&
											<button className={`flex items-center px-6 py-[6px] border-2 rounded-full transition text-white
												${profileStatus[ profile.targetUserId ]?.loadingAccept ? 'bg-sky-300 border-sky-300 text-gray-200' :
													profileStatus[ profile.targetUserId ]?.completed && profileStatus[ profile.targetUserId ]?.action === 'accept' ? 'bg-green-500 border-green-500' : 'bg-sky-500 border-sky-500'}`}
												disabled={profileStatus[ profile.targetUserId ]?.loadingAccept || profileStatus[ profile.targetUserId ]?.completed}
												onClick={() => handelAction("accept", profile?.agentId, profile.targetUserId)}
											>
												{profileStatus[ profile.targetUserId ]?.completed && profileStatus[ profile.targetUserId ]?.action === 'accept' ? 'Accepted' : 'Accept'}
												{profileStatus[ profile.targetUserId ]?.loadingAccept && <span className="loader left-2 border-white"></span>}
											</button>}
									</div>

								</div>
							))}
					</div>
					{!isLoading && filteredProfiles?.length === 0 && <div className='flex justify-center'><img src="/assets/img/resultNotFound.png" alt="" className='w-1/2' /></div>}
				</main >
			</div >
		</>
	);
};

export default ReceivedInterest;
