import React, { useEffect, useState } from 'react';
import '../ViewProfile/viewProfile.css';
import { useDispatch, useSelector } from 'react-redux';
import ProfileListSkeleton from '../Loader/ProfileListSkeleton';
import { getMatchedProfile } from '../../store/features/matchProfile-slice';
import ProfileCard from './ProfileCard';

const MainContent = () => {
	const dispatch = useDispatch()
	const [ loading, setLoading ] = useState(false)
	const matchedProfile = useSelector((state) => state.matchProfile.matchedProfile);

	useEffect(() => {
		dispatch(getMatchedProfile({ isMatchedView: true }));
	}, [ dispatch ])

	useEffect(() => {
		matchedProfile?.data?.user?.profilesWithStatus?.length == undefined ? setLoading(true) : setLoading(false)
		// dispatch(getMatchedProfile({ isMatchedView: true }));
		// console.log("matched loading - ", matchedProfile?.data?.user?.profilesWithStatus?.length);
	}, [ dispatch, matchedProfile ])

	console.log("matched Profile - ", matchedProfile);

	const mapProfiles = (profiles) => {
		return profiles?.map((profile) => {
			const {
				_id,
				basicInformation,
				physicalAttributes,
				createdAt
			} = profile;

			return {
				id: _id,
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
				status: profile.status,
			};
		});
	};

	const profiles = matchedProfile?.data?.user?.profilesWithStatus ? mapProfiles(matchedProfile.data.user?.profilesWithStatus) : [];

	// console.log("match list profiles - ", matchedProfile);
	return (
		<>
			<div className="mx-auto md:px-4">
				<div className="mb-4">
					<input
						type="text"
						placeholder="Search profiles..."
						className="w-full p-3 mb-4 border rounded-md outline-none focus:border-gold"
					/>
				</div>

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
			</div>
		</>
	);
};

export default MainContent;
