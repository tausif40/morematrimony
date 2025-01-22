import React, { useEffect, useMemo, useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { getUserAction } from '../../../store/features/userAction-slice';
import male from '../../../img/male.png'
import female from '../../../img/female.png'
import { Link } from 'react-router-dom';
import { Heart, Star, MessageCircle, Share2, Filter, Search } from 'lucide-react';

const mapSendInterest = (profiles) => {
	return profiles?.map((profile) => {
		const { targetUserId } = profile;

		return {
			id: targetUserId?._id,
			profileImg: targetUserId?.profileImage,
			fistName: targetUserId?.basicInformation?.firstName,
			lastName: targetUserId?.basicInformation?.lastName,
			gender: targetUserId?.basicInformation?.gender,
			age: targetUserId?.basicInformation?.dateOfBirth
				? Math.floor((new Date() - new Date(targetUserId?.basicInformation.dateOfBirth)) / (1000 * 60 * 60 * 24 * 365.25)) : '',
			religion: targetUserId?.spiritualAndSocialBackground?.religion?.name,
			location: targetUserId?.presentAddress?.country?.name,
			occupation: targetUserId?.career?.occupation?.occupationName,
		};
	});
};

const MyInterest = () => {
	const dispatch = useDispatch()
	const [ myInterestList, setMyInterestList ] = useState([])

	const sendInterest = useSelector((state) => state.userAction.send_interest);

	useEffect(() => {
		dispatch(getUserAction("send_interest"));
	}, [ dispatch ])

	const profiles = useMemo(() => mapSendInterest(sendInterest?.data?.socialAction), [ sendInterest?.data?.socialAction ]);

	useEffect(() => {
		setMyInterestList(profiles)
	}, [ profiles ])

	useEffect(() => {
		// setMyInterestList(profiles)
		console.log("send Interest - ", sendInterest);
	}, [ sendInterest ])


	const [ updatedData, setUpdatedData ] = useState({});

	const getUpdatedValue = (id, field) => {
		return updatedData[ id ] ? updatedData[ id ][ field ] : myInterestList.find(item => item.id === id)[ field ];
	};

	const deleteItem = (id) => {
		const updatedData = myInterestList.filter(item => item.id !== id);
		setMyInterestList(updatedData);
	};



	const profile = [
		{
			name: "Priya Sharma",
			age: 27,
			height: "6' 10",
			location: "Mumbai, India",
			occupation: "Software Engineer",
			image: "https://images.unsplash.com/photo-1621784563330-caee0b138a00?w=400&h=500&fit=crop",
			education: "M.Tech in Computer Science",
			interests: [ "Reading", "Classical Dance", "Traveling" ]
		},
		{
			name: "Anita Patel",
			age: 25,
			height: "6' 10",
			location: "Delhi, India",
			occupation: "Doctor",
			image: "https://images.unsplash.com/photo-1592124549776-a7f0cc973b24?w=400&h=500&fit=crop",
			education: "MBBS, MD",
			interests: [ "Cooking", "Photography", "Yoga" ]
		},
		{
			name: "Meera Reddy",
			age: 26,
			height: "6' 10",
			location: "Bangalore, India",
			occupation: "Financial Analyst",
			image: "https://images.unsplash.com/photo-1621012430307-b4774b78d3cb?w=400&h=500&fit=crop",
			education: "MBA in Finance",
			interests: [ "Music", "Painting", "Fitness" ]
		}
	];

	return (
		<>

			<div className="min-h-screen bg-gradient-to-br from-yellow-50 to-red-50 rounded-md overflow-hidden border">
				{/* Header */}
				<header className=" text-gray-700 shadow-md">
					<div className="container mx-auto px-4 py-3">
						<div className="flex justify-between items-center">
							<h1 className="text-2xl font-semibold">My Interest</h1>
							<div className="flex items-center space-x-4">
								<div className="relative">
									<input
										type="text"
										placeholder="Search profiles..."
										className="pl-10 pr-4 py-2 rounded-full bg-black/20 backdrop-blur-sm text-black placeholder-black/70 focus:outline-none focus:ring-2 focus:ring-black/50 w-96"
									/>
									<Search className="absolute left-3 top-2.5 h-5 w-5 text-black/70" />
								</div>
								{/* <button className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-black/30 transition">
									<Filter className="h-5 w-5" />
									<span>Filters</span>
								</button> */}
							</div>
						</div>
					</div>
				</header>

				{/* Main Content */}
				<main className="container mx-auto px-4 py-8">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{profile.map((profile, index) => (
							<div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden transform hover:shadow-xl transition duration-300">
								<div className="relative">
									<img
										src={profile.image}
										alt={profile.name}
										className="w-full h-64 object-cover"
									/>
								</div>

								<div className="p-4">
									<div className="flex justify-between items-start mb-3">
										<div>
											<h2 className="text-xl font-semibold text-gray-800 pb-1">{profile.name}</h2>
											<p className="text-gray-600 text-sm">{profile.age} years • {profile.height} • {profile.location}</p>
										</div>
									</div>

									<div className="space-y-2">
										<p className="text-gray-700">
											<span className="font-semibold text-sm">Occupation:</span> <span className='font-light'>{profile.occupation}</span>
										</p>
										<p className="text-gray-700 truncate">
											<span className="font-semibold text-sm">Education:</span> <span className='font-light'>{profile.education}</span>
										</p>
										<div className="customHorizontalScroll h-12 flex items-center gap-2 py-2 overflow-x-auto ">
											{profile.interests.map((interest, i) => (
												<p
													key={i}
													className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm min-w-max"
												>
													{interest}
												</p>
											))}
										</div>
									</div>

									<div className="mt-6 flex justify-center items-center gap-6">
										{/* <p className='text-xl'>Status - </p> */}
										<button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-full transition">
											<MessageCircle className="h-5 w-5" />
											<span>Pending</span>
										</button>
										{/* <button className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition">
											<Share2 className="h-5 w-5" />
											<span>Share</span>
										</button> */}
									</div>
								</div>
							</div>
						))}
					</div>
				</main>
			</div>
			<br />
			<br />
			<br />
			<section className="box-shadow bg-white border rounded-md">
				<p className='px-6 py-3 font-medium border-b text-headingGray'>My Interest List</p>
				<div className='py-4 px-6 text-sm'>
					<div className="overflow-x-auto">
						<table className="min-w-full bg-white border border-gray-200">
							<thead>
								<tr className="bg-gray-100">
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
									<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
									<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Religion</th>
									<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
									<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Occupation</th>
									<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
									<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
								</tr>
							</thead>
							<tbody>
								{myInterestList?.map((value, index) => (
									<tr key={value.id} className="border-b border-gray-200">
										<td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<Link to={`/matches/profile-details/${value?.id}`}>
												<img src={value?.profileImg == undefined ? value?.gender === 'male' ? male : female : value?.profileImg} alt='img' className="h-10 w-10 rounded-full object-cover bg-gray-200" />
											</Link>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<Link to={`/matches/profile-details/${value?.id}`}>
												<p>{value.fistName} {value.lastName}</p>
											</Link>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-center">{getUpdatedValue(value.id, 'age')}</td>
										<td className="px-6 py-4 whitespace-nowrap text-start">{getUpdatedValue(value.id, 'religion')}</td>
										<td className="px-6 py-4 whitespace-nowrap text-start">{getUpdatedValue(value.id, 'location')}</td>
										<td className="px-6 py-4 whitespace-nowrap text-start">{getUpdatedValue(value.id, 'occupation')}</td>
										<td className="px-6 py-4 whitespace-nowrap text-center">
											<span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${value.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-500'}`}>
												{value.status}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap flex justify-center text-red-500"><p><MdDeleteOutline size={24} onClick={() => deleteItem(value.id)} /></p></td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</section>

		</>
	);
};

export default MyInterest;
