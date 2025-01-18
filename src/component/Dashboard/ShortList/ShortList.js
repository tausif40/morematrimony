import React, { useEffect, useMemo, useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { getUserAction } from '../../../store/features/userAction-slice';
import male from '../../../img/male.png'
import female from '../../../img/female.png'
import { Link } from 'react-router-dom';

const mapShortlist = (profiles) => {
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
			religion: targetUserId?.spiritualAndSocialBackground?.religion[ 0 ]?.name,
			location: targetUserId?.profile?.career?.jobLocation,
			motherTongue: targetUserId?.basicInformation?.language?.motherTongue,
		};
	});
};

const ShortList = () => {
	const dispatch = useDispatch()
	const [ shortlistData, setShortListData ] = useState([])

	const shortlist = useSelector((state) => state.userAction.shortlist);

	useEffect(() => {
		dispatch(getUserAction("shortlist"));
	}, [ dispatch ])

	const profiles = useMemo(() => mapShortlist(shortlist?.data?.socialAction), [ shortlist?.data?.socialAction ]);

	useEffect(() => {
		setShortListData(profiles)
	}, [ profiles ])

	console.log("shortlist Data - ",shortlistData);

	const [ updatedData, setUpdatedData ] = useState({});

	const getUpdatedValue = (id, field) => {
		return updatedData[ id ] ? updatedData[ id ][ field ] : shortlistData.find(item => item.id === id)[ field ];
	};

	const deleteItem = (id) => {
		const updatedData = shortlistData.filter(item => item.id !== id);
		setShortListData(updatedData);
	};

	return (
		<section className="box-shadow bg-white border rounded-md">
			<p className='px-6 py-3 font-medium border-b text-headingGray'>Shortlists</p>
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
								<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Mother Tongue</th>
								<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
								<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
							</tr>
						</thead>
						<tbody>
							{shortlistData?.map((value, index) => (
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
									<td className="px-6 py-4 whitespace-nowrap text-center">{getUpdatedValue(value.id, 'religion')}</td>
									<td className="px-6 py-4 whitespace-nowrap text-center">{getUpdatedValue(value.id, 'location')}</td>
									<td className="px-6 py-4 whitespace-nowrap text-center">{getUpdatedValue(value.id, 'motherTongue')}</td>
									<td className="px-6 py-4 whitespace-nowrap text-center">
										<span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${value.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-500'}`}>
											{value.status}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap flex justify-center"><p><MdDeleteOutline size={24} onClick={() => deleteItem(value.id)} /></p></td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
};

export default ShortList;