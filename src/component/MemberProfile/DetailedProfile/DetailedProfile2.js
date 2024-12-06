import React from "react";

const DetailedProfile = ({ userDetails }) => {

	// console.log(userDetails?.data?.user);

	const data = userDetails?.data?.user

	const profileData = {
		introduction: data?.introduction || "",
		profileInfo: {
			firstName: data?.basicInformation?.firstName || "",
			lastName: data?.basicInformation?.lastName || "",
			dateOfBirth: data?.basicInformation?.dateOfBirth || "",
			gender: data?.basicInformation?.gender || "",
			maritalStatus: data?.agentId?.onBehalf || "",
			profileCreatedBy: data?.agentId?.onBehalf || "",
		},
		presentAddress: {
			country: data?.presentAddress?.country?.name || "",
			state: data?.presentAddress?.state?.name || "",
			city: data?.presentAddress?.city?.name || "",
			postalCode: data?.presentAddress?.postalCode || "",
		},
		residencyInformation: {
			birthCountry: data?.residencyInformation?.birthCountry?.name || "",
			growUpCountry: data?.residencyInformation?.growUpCountry?.name || "",
			residencyCountry: data?.residencyInformation?.residencyCountry?.name || "",
			residencyStatus: data?.residencyInformation?.residencyStatus || "",
			citizenship: data?.residencyInformation?.citizenship?.name || "",
		},
		educationalDetails: {
			highestEducation: data?.educationalDetails?.highestEducation?._id || "",
			educationDetail: data?.educationalDetails?.educationDetail || "",
			institution: data?.educationalDetails?.institution || "",
		},
		career: {
			employedIn: data?.career?.employedIn || "",
			occupation: data?.career?.occupation?._id || "",
			occupationDetails: data?.career?.occupationDetails || "",
			organizationName: data?.career?.organizationName || "",
			jobLocation: data?.career?.jobLocation || "",
			annualIncome: data?.career?.annualIncome || "",
		},

		physicalAttributes: {
			height: `${data?.physicalAttributes?.height?.feet || 0} feet ${data?.physicalAttributes?.height?.inches || 0} inches`,
			weight: data?.physicalAttributes?.weight || "",
			eyeColor: data?.physicalAttributes?.eyeColor || "",
			hairColor: data?.physicalAttributes?.hairColor || "",
			bodyType: data?.physicalAttributes?.bodyType || "",
			complexion: data?.physicalAttributes?.complexion || "",
			bloodGroup: data?.physicalAttributes?.bloodGroup || "",
			tattoo: data?.physicalAttributes?.tattoo ? "Yes" : "No",
			disability: data?.physicalAttributes?.disability?.disability || "",
		},

		language: {
			motherTongue: data?.language?.motherTongue?.name || "",
			knownLanguages: data?.language?.knownLanguages?.map((lang) => lang.name).join(", ") || "",
		},

		hobbies: {
			hobbiesList: data?.hobbies?.hobbiesList?.map((hobby) => hobby.name).join(", ") || "",
		},

		spiritualAndSocialBackground: {
			birthPlace: {
				country: data?.spiritualAndSocialBackground?.birthPlace?.country?.name || "",
				state: data?.spiritualAndSocialBackground?.birthPlace?.state?.name || "",
				city: data?.spiritualAndSocialBackground?.birthPlace?.city?.name || "",
			},
			religion: data?.spiritualAndSocialBackground?.religion?.name || "",
			caste: data?.spiritualAndSocialBackground?.caste?.name || "",
			subCaste: data?.spiritualAndSocialBackground?.subCaste || "",
			ethnicity: data?.spiritualAndSocialBackground?.ethnicity?.name || "",
			star: data?.spiritualAndSocialBackground?.star?.name || "",
			rashi: data?.spiritualAndSocialBackground?.rashi?.name || "",
			zodiac: data?.spiritualAndSocialBackground?.zodiac?.name || "",
			timeOfBirth: data?.spiritualAndSocialBackground?.timeOfBirth || "",
		},

		lifestyle: {
			diet: data?.lifestyle?.diet || "",
			drink: data?.lifestyle?.drink || "",
			smoke: data?.lifestyle?.smoke || "",
		},
		familyDetails: {
			familyValue: data?.familyDetails?.familyValue || "",
			familyType: data?.familyDetails?.familyType || "",
			familyStatus: data?.familyDetails?.familyStatus || "",
			fatherOccupation: data?.familyDetails?.fatherOccupation || "",
			motherOccupation: data?.familyDetails?.motherOccupation || "",
			brothers: data?.familyDetails?.brothers || "",
			brothersMarried: data?.familyDetails?.brothersMarried || "",
			sisters: data?.familyDetails?.sisters || "",
		},

		partnerExpectation: {
			age: {
				min: data?.partnerExpectation?.age?.min || "",
				max: data?.partnerExpectation?.age?.max || "",
			},
			height: `${data?.partnerExpectation?.height?.feet || 0} feet ${data?.partnerExpectation?.height?.inches || 0} inches`,

			maritalStatus: data?.partnerExpectation?.maritalStatus || "",
			residencyCountry: data?.partnerExpectation?.residencyCountry?.name || "",
			religion: data?.partnerExpectation?.religion?.name || "",
			caste: data?.partnerExpectation?.caste?.name || "",
			occupation: data?.partnerExpectation?.occupation?.map((occ) => `${occ.occupationName} (${occ.role})`).join(", ") || "",
			motherTongue: data?.partnerExpectation?.motherTongue?.name || "",
			highestEducation: data?.partnerExpectation?.highestEducation?.name || "",
			employedIn: data?.partnerExpectation?.employedIn || "",
			annualIncome: data?.partnerExpectation?.annualIncome || "",
			smokingAcceptable: data?.partnerExpectation?.smokingAcceptable || "",
			drinkingAcceptable: data?.partnerExpectation?.drinkingAcceptable || "",
			dietingAcceptable: data?.partnerExpectation?.dietingAcceptable || "",
			bodyType: data?.partnerExpectation?.bodyType || "",
			preferredCountry: data?.partnerExpectation?.preferredCountry?.name || "",
			preferredState: data?.partnerExpectation?.preferredState?.name || "",
			complexion: data?.partnerExpectation?.complexion || "",
			generalRequirement: "Looking for a well-educated and family-oriented partner. Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.Lorem ipsum may be used as a placeholder before the final copy is available."
		}

	};

	return (
		<div className="container text-textGray border shadow-md rounded-xl ">
			<div className="space-y-6 md:space-y-8 pt-2 md:pt-4 pb-12 lg:px-6">
				{/* Introduction */}
				<div className="p-4">
					<p className="text-gradient text-xl font-medium mb-2">About Me</p>
					<p className="flex gap-2 font-light">{profileData?.introduction}</p>
				</div>

				<div className="px-1 sm:px-4 md:px-0 grid grid-cols-1 md:grid-cols-2">
					<div className="md:border-r">
						{/* Profile Information */}
						<div className="md:border-b pb-6 md:pr-6">
							<dt className="bg-white text-primary w-48 flex justify-center text-xl font-medium relative -bottom-[14px] left-5">
								Profile Information
							</dt>
							<div className="gradientBorder pb-4 px-6 pt-8 w-full rounded-xl">
								{Object.entries(profileData?.profileInfo).map(([ key, value ]) => (
									<div className="grid grid-cols-2" key={key}>
										<dt className="text-md font-medium mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</dt>
										<dd>{value}</dd>
									</div>
								))}
							</div>
						</div>

						{/* Present Address */}
						<div className="md:border-b pb-6 md:pr-6">
							<p className="w-44 bg-white text-primary flex justify-center text-xl font-medium relative -bottom-[14px] left-5">
								Present Address
							</p>
							<div className="gradientBorder pb-4 px-6 pt-8 w-full rounded-xl">
								<dl className="grid grid-cols-2 gap-y-4 mt-6">
									{Object.entries(profileData?.presentAddress).map(([ key, value ]) => (
										<React.Fragment key={key}>
											<dt className="text-md font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</dt>
											<dd>{value}</dd>
										</React.Fragment>
									))}
								</dl>
							</div>
						</div>

						{/* Residency Information */}
						<div className="md:border-b pb-6 md:pr-6">
							<p className="w-60 bg-white text-primary flex justify-center text-xl font-medium relative -bottom-[14px] left-5">
								Residency Information
							</p>
							<div className="gradientBorder pb-4 px-6 pt-8 w-full rounded-xl">
								<dl className="grid grid-cols-2 gap-y-4 mt-6">
									{Object.entries(profileData?.residencyInformation).map(([ key, value ]) => (
										<React.Fragment key={key}>
											<dt className="text-md font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</dt>
											<dd>{value}</dd>
										</React.Fragment>
									))}
								</dl>
							</div>
						</div>

						{/* Education Details */}
						<div className="md:border-b pb-6 md:pr-6">
							<p className="bg-white text-primary w-48 flex justify-center text-xl font-medium relative -bottom-[14px] left-5">
								Education Details
							</p>
							<div className="gradientBorder pb-4 px-6 pt-8 w-full rounded-xl">
								{Object.entries(profileData?.educationalDetails).map(([ key, value ]) => (
									<div className="grid grid-cols-2" key={key}>
										<dt className="text-md font-medium mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</dt>
										<dd>{value}</dd>
									</div>
								))}
							</div>
						</div>


						{/* Career */}
						<div className="md:border-b pb-6 md:pr-6">
							<p className="w-20 bg-white text-primary flex justify-center text-xl font-medium relative -bottom-[14px] left-5">
								Career
							</p>
							<div className="gradientBorder pb-4 px-6 pt-8 w-full rounded-xl">
								{Object.entries(profileData?.career).map(([ key, value ]) => (
									<div className="grid grid-cols-2" key={key}>
										<dt className="text-md font-medium mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</dt>
										<dd>{value}</dd>
									</div>
								))}
							</div>
						</div>

						{/* Physical Attributes */}
						<div className="md:border-b pb-6 md:pr-6">
							<p className="bg-white text-primary w-48 flex justify-center text-xl font-medium relative -bottom-[14px] left-5">
								Physical Attributes
							</p>
							<div className="gradientBorder pb-4 px-6 pt-8 w-full rounded-xl">
								{Object.entries(profileData?.physicalAttributes).map(([ key, value ]) => (
									<p className="flex gap-2" key={key}>
										<p className="text-md font-medium w-56 mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</p>
										{value}
									</p>
								))}
							</div>
						</div>

						{/* Hobbies */}
						<div className="pb-6 md:pr-6">
							<p className="w-24 bg-white text-primary flex justify-center text-xl font-medium relative -bottom-[14px] left-5">
								Hobbies
							</p>
							<div className="gradientBorder pb-4 px-6 pt-8 w-full rounded-xl">
								<p className="flex gap-2 flex-wrap">
									{/* {profileData?.hobbies.map((res, ind) => ( */}
									<p className="bg-gray-200 rounded-full px-3 py-1 text-headingGray">
										{/* {res} */}
										{profileData?.hobbies?.hobbiesList}
									</p>
									{/* ))} */}
								</p>
							</div>
						</div>
					</div>
					{/* end */}

					<div className="md:border-l">
						{/* language */}
						<div className="md:border-b pb-6 md:pl-6">
							<p className="w-28 bg-white text-primary flex justify-center text-xl font-medium relative -bottom-[14px] left-5">
								Language
							</p>
							<div className="gradientBorder pb-4 px-6 pt-8 w-full rounded-xl">
								{Object.entries(profileData?.language).map(([ key, value ]) => (
									<div className="grid grid-cols-2" key={key}>
										<dt className="text-md font-medium mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</dt>
										<dd>{value}</dd>
									</div>
								))}
							</div>
						</div>


						{/* Spiritual and Social Background */}
						<div className="md:border-b pb-6 md:pl-6">
							<p className="w-24 bg-white text-primary flex justify-center text-xl font-medium relative -bottom-[14px] left-5">
								Spiritual & Social Background
							</p>
							{/* <div className="gradientBorder pb-4 px-6 pt-8 w-full rounded-xl">
								{Object.entries(profileData?.spiritualAndSocialBackground).map(([ key, value ]) => (
									<p className="flex gap-2" key={key}>
										<p className="text-md font-medium w-56 mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</p>
										{value}
									</p>
								))}
							</div> */}
						</div>

						{/* Lifestyle */}
						<div className="md:border-b pb-6 md:pl-6">
							<p className="w-24 bg-white text-primary flex justify-center text-xl font-medium relative -bottom-[14px] left-5">Lifestyle</p>
							<div className="gradientBorder pb-4 px-6 pt-8 w-full rounded-xl">
								<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Diet:</p> {profileData?.lifestyle.diet}</p>
								<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Drink:</p> {profileData?.lifestyle.drink}</p>
								<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Smoke:</p> {profileData?.lifestyle.smoke}</p>
							</div>
						</div>


						{/* Family Details */}
						<div className="mt-6 pb-6 md:pl-6">
							<p className="w-28 bg-white text-primary flex justify-center text-xl font-medium relative -bottom-[14px] left-5">
								Family Details
							</p>
							<div className="gradientBorder pb-4 px-6 pt-8 w-full rounded-xl">
								{Object.entries(profileData.familyDetails).map(([ key, value ]) => (
									<div className="grid grid-cols-2" key={key}>
										<dt className="text-md font-medium mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</dt>
										<dd>{value}</dd>
									</div>
								))}
							</div>
						</div>

						{/* Partner Expectation */}
						{/* <div className="pb-6 md:pl-6">
							<p className="bg-white text-primary w-52 flex justify-center text-xl font-medium relative -bottom-[14px] left-5">
								Partner Expectation
							</p>
							<div className="gradientBorder pb-4 px-6 pt-8 w-full rounded-xl">
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Bride's Age:</span>
									{profiledata?.partnerExpectation.bridesAge.min} - {profiledata?.partnerExpectation.bridesAge.max}
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Height:</span>
									{profiledata?.partnerExpectation.height.feet} feet {profiledata?.partnerExpectation.height.inches} inches
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Marital Status:</span>
									{profiledata?.partnerExpectation.maritalStatus}
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Residency Country:</span>
									{profiledata?.partnerExpectation.residencyCountry}
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Religion:</span>
									{profiledata?.partnerExpectation.religion}
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Caste:</span>
									{profiledata?.partnerExpectation.caste}
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Sub Caste:</span>
									{profiledata?.partnerExpectation.subCaste}
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Mother Tongue:</span>
									{profiledata?.partnerExpectation.motherTongue}
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Highest Education:</span>
									{profiledata?.partnerExpectation.highestEducation}
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Employed In:</span>
									{profiledata?.partnerExpectation.employedIn}
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Occupation:</span>
									{profiledata?.partnerExpectation.occupation}
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Annual Income:</span>
									{profiledata?.partnerExpectation.annualIncome}
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Smoking Acceptable:</span>
									{profiledata?.partnerExpectation.smokingAcceptable}
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Drinking Acceptable:</span>
									{profiledata?.partnerExpectation.drinkingAcceptable}
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Dieting Acceptable:</span>
									{profiledata?.partnerExpectation.dietingAcceptable}
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Body Type:</span>
									{profiledata?.partnerExpectation.bodyType}
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Preferred Country:</span>
									{profiledata?.partnerExpectation.preferredCountry}
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Preferred State:</span>
									{profiledata?.partnerExpectation.preferredState}
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Complexion:</span>
									{profiledata?.partnerExpectation.complexion}
								</p>
								<p className=''>
									<span className='text-md font-medium w-52 mb-2'>General Requirement:</span>
									<p className="text-sm font-light">{profiledata?.partnerExpectation.generalRequirement}</p>
								</p>
							</div>
						</div> */}
						<div className="mt-6 pb-6 md:pl-6">
							<p className="w-48 bg-white text-primary flex justify-center text-xl font-medium relative -bottom-[14px] left-5">
								Partner Expectation
							</p>
							{/* <div className="gradientBorder pb-4 px-6 pt-8 w-full rounded-xl">
								{Object.entries(profileData.partnerExpectation).map(([ key, value ]) => (
									<div className="grid grid-cols-2" key={key}>
										<dt className="text-md font-medium mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</dt>
										<dd>{value}</dd>
									</div>
								))}
							</div> */}
						</div>

					</div>
				</div>

			</div>
		</div >
	);
};

export default DetailedProfile;
