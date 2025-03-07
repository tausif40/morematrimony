import React, { useEffect, useState } from 'react';
import '../ViewProfile/viewProfile.css';
import { useDispatch, useSelector } from 'react-redux';
import ProfileListSkeleton from '../Loader/ProfileListSkeleton';
import { getMatchedProfile, setFilter } from '../../store/features/matchProfile-slice';
import ProfileCard from './ProfileCard';
import { Pagination } from 'antd';
import '../../CSS/antPagination.css'

const MainContent = () => {
	const dispatch = useDispatch();
	const [ loading, setLoading ] = useState(false);
	const matchedProfile = useSelector((state) => state.matchProfile.matchedProfile);
	const filterData = useSelector((state) => state.matchProfile.filter);

	const [ filterList, setFilterList ] = useState({
		page: '',
		limit: '',
		totalUsers: '',
	});

	useEffect(() => {
		dispatch(getMatchedProfile(filterList));
	}, [ filterList, dispatch ]);

	useEffect(() => {
		const user = matchedProfile?.data?.user;

		if (user) {
			setFilterList((prevFilter) => {
				// Avoid updating state if values are unchanged
				if (
					prevFilter.limit === (filterData?.limit || user.limit) &&
					prevFilter.page === (filterData?.page || user.page) &&
					prevFilter.totalUsers === (filterData?.totalUsers || user.totalCount)
				) {
					return prevFilter; // No change, prevent re-render
				}

				return {
					...prevFilter,
					limit: filterData?.limit || user.limit,
					page: filterData?.page || user.page,
					totalUsers: filterData?.totalUsers || user.totalCount,
				};
			});
		}
	}, [ matchedProfile, filterData ]);



	useEffect(() => {
		dispatch(setFilter(filterList));
	}, [ filterList, dispatch ]);

	const mapProfiles = (profiles) => {
		return profiles?.map((profile) => {
			const {
				_id,
				basicInformation,
				physicalAttributes,
				createdAt
			} = profile;

			return {
				targetId: _id,
				agentId: profile?.agentId,
				fistName: basicInformation?.firstName,
				lastName: basicInformation?.lastName,
				gender: basicInformation?.gender,
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
				location: profile?.career?.jobLocation[ 0 ]?.name,
				lastSeen: 'Recently Active',
				accountCreate: createdAt,
				img: profile.profileImage,
				action: profile.action,
				targetedAction: profile.targetedAction
			};
		});
	};

	const profiles = matchedProfile?.data?.user?.profilesWithStatus ? mapProfiles(matchedProfile.data.user?.profilesWithStatus) : [];

	return (
		<>
			<div className="mx-auto md:px-4">
				{loading && (
					<>
						{[ ...Array(5) ].map((_, index) => (
							<ProfileListSkeleton key={index} />
						))}
					</>
				)}

				{profiles.map((profile, index) => (
					<ProfileCard key={index} {...profile} />
				))}
				{!loading && profiles.length === 0 && <div className='flex justify-center'><img src="/assets/img/resultNotFound.png" alt="" className='w-1/2' /></div>}
				<div className='flex justify-center pt-6 mb-4'>
					<Pagination align="center" defaultCurrent={filterData?.page} total={filterList?.totalUsers} pageSize={filterList?.limit || 10}
						onChange={(page) => {
							setFilterList((prev) => ({ ...prev, page: page }));
						}}
					/>
				</div>
			</div>
		</>
	);
};

export default MainContent;