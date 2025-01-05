import React from "react";
import moment from 'moment';

const DetailedProfile = ({ userDetails }) => {

	const data = userDetails?.data?.user;

	const profileData = {
		introduction: data?.introduction || "_",
		profileInfo: {
			firstName: data?.basicInformation?.firstName || "_",
			lastName: data?.basicInformation?.lastName || "_",
			dateOfBirth: data?.basicInformation?.dateOfBirth || "_",
			gender: data?.basicInformation?.gender || "_",
			maritalStatus: data?.basicInformation?.maritalStatus || "_",
			numberOfChildren: data?.basicInformation?.numberOfChildren || "_",
			profileCreatedBy: data?.basicInformation?.onBehalf || "_",
		},
		presentAddress: {
			country: data?.presentAddress?.country?.name || "_",
			state: data?.presentAddress?.state?.name || "_",
			city: data?.presentAddress?.city?.name || "_",
			postalCode: data?.presentAddress?.postalCode || "_",
		},
		residencyInformation: {
			birthCountry: data?.residencyInformation?.birthCountry?.name || "_",
			growUpCountry: data?.residencyInformation?.growUpCountry?.name || "_",
			residencyCountry: data?.residencyInformation?.residencyCountry?.name || "_",
			residencyStatus: data?.residencyInformation?.residencyStatus || "_",
			citizenship: data?.residencyInformation?.citizenship?.name || "_",
		},
		educationalDetails: {
			highestEducation: data?.educationalDetails?.highestEducation?.name || "_",
			educationDetail: data?.educationalDetails?.educationDetail || "_",
			institution: data?.educationalDetails?.institution || "_",
		},
		career: {
			employedIn: data?.career?.employedIn || "_",
			occupation: data?.career?.occupation?.occupationName || "_",
			occupationDetails: data?.career?.occupationDetails || "_",
			organizationName: data?.career?.organizationName || "_",
			jobLocation: data?.career?.jobLocation?.name || "_",
			annualIncome: data?.career?.annualIncome || "_",
		},
		physicalAttributes: {
			height: `${data?.physicalAttributes?.height?.feet || 0} feet ${data?.physicalAttributes?.height?.inches || 0} inches`,
			weight: data?.physicalAttributes?.weight || "_",
			eyeColor: data?.physicalAttributes?.eyeColor || "_",
			hairColor: data?.physicalAttributes?.hairColor || "_",
			bodyType: data?.physicalAttributes?.bodyType || "_",
			complexion: data?.physicalAttributes?.complexion || "_",
			bloodGroup: data?.physicalAttributes?.bloodGroup || "_",
			tattoo: data?.physicalAttributes?.tattoo ? "Yes" : "No",
			disability: data?.physicalAttributes?.disability?.disability || "_",
		},
		language: {
			motherTongue: data?.language?.motherTongue?.name || "_",
			knownLanguages: data?.language?.knownLanguages?.map((lang) => lang.name).join(", ") || "_",
		},
		hobbies: {
			hobbiesList: data?.hobbies?.hobbiesList
		},
		spiritualSocial: {
			birthPlace: {
				country: data?.spiritualAndSocialBackground?.birthPlace?.country?.name || "_",
				state: data?.spiritualAndSocialBackground?.birthPlace?.state?.name || "_",
				city: data?.spiritualAndSocialBackground?.birthPlace?.city?.name || "_",
			},
			religion: data?.spiritualAndSocialBackground?.religion?.name || "_",
			caste: data?.spiritualAndSocialBackground?.caste?.name || "_",
			subCaste: data?.spiritualAndSocialBackground?.subCaste || "_",
			ethnicity: data?.spiritualAndSocialBackground?.ethnicity?.name || "_",
			star: data?.spiritualAndSocialBackground?.star?.name || "_",
			rashi: data?.spiritualAndSocialBackground?.rashi?.name || "_",
			zodiac: data?.spiritualAndSocialBackground?.zodiac?.name || "_",
			timeOfBirth: data?.spiritualAndSocialBackground?.timeOfBirth || "_",
			kundli: data?.spiritualAndSocialBackground?.kundli || "_",
			gothra: data?.spiritualAndSocialBackground?.gothra || "_",
			dosh: data?.spiritualAndSocialBackground?.dosh || "_",
			doshName: data?.spiritualAndSocialBackground?.doshName || "_",
		},
		lifestyle: {
			diet: data?.lifestyle?.diet || "_",
			drink: data?.lifestyle?.drink || "_",
			smoke: data?.lifestyle?.smoke || "_",
		},
		familyDetails: {
			familyValue: data?.familyDetails?.familyValue || "_",
			familyType: data?.familyDetails?.familyType || "_",
			familyStatus: data?.familyDetails?.familyStatus || "_",
			fatherOccupation: data?.familyDetails?.fatherOccupation || "_",
			motherOccupation: data?.familyDetails?.motherOccupation || "_",
			brothers: data?.familyDetails?.brothers || "_",
			sisters: data?.familyDetails?.sisters || "_",
			brothersMarried: data?.familyDetails?.brothersMarried || "_",
			sistersMarried: data?.familyDetails?.brothersMarried || "_",
		},
		partnerExpectation: {
			age: `${data?.partnerExpectation?.age?.min || "_"} to ${data?.partnerExpectation?.age?.max || "_"}`,
			height: `${data?.partnerExpectation?.height?.feet || 0} feet ${data?.partnerExpectation?.height?.inches || 0} inches`,
			maritalStatus: data?.partnerExpectation?.maritalStatus || "_",
			religion: data?.partnerExpectation?.religion?.name || "_",
			caste: data?.partnerExpectation?.caste?.map((caste) => `${caste.name}`).join(", ") || "_",
			occupation: data?.partnerExpectation?.occupation?.map((occ) => `${occ.occupationName} (${occ.role})`).join(", ") || "_",
			motherTongue: data?.partnerExpectation?.motherTongue?.map((caste) => `${caste.name}`).join(", ") || "_",
			highestEducation: data?.partnerExpectation?.highestEducation?.map((caste) => `${caste.name}`).join(", ") || "_",
			employedIn: data?.partnerExpectation?.employedIn || "_",
			annualIncome: data?.partnerExpectation?.annualIncome || "_",
			smokingAcceptable: data?.partnerExpectation?.smokingAcceptable || "_",
			drinkingAcceptable: data?.partnerExpectation?.drinkingAcceptable || "_",
			dietingAcceptable: data?.partnerExpectation?.dietingAcceptable || "_",
			bodyType: data?.partnerExpectation?.bodyType || "_",
			preferredCountry: data?.partnerExpectation?.preferredCountry?.map((caste) => `${caste.name}`).join(", ") || "_",
			preferredState: data?.partnerExpectation?.preferState?.map((caste) => `${caste.name}`).join(", ") || "_",
			complexion: data?.partnerExpectation?.complexion || "_",
			generalRequirement: data?.partnerExpectation?.lookingFor || "_"
		}
	};
	// console.log("sister -", data?.familyDetails?.sisters);
	console.log("data -", data);

	return (
		<div className="container text-textGray border shadow-md rounded-xl ">
			<div className="space-y-6 md:space-y-8 pt-2 md:pt-4 pb-12 lg:px-6">
				{/* Introduction */}
				<div className="p-4">
					<p className="text-gradient text-xl font-medium mb-2">About Me</p>
					<p className='flex gap-2 font-light'>{profileData?.introduction}</p>
				</div>

				<div className="px-1 sm:px-4 md:px-0 grid grid-cols-1 md:grid-cols-2">
					<div className="md:border-r">
						{/* Profile Information */}
						<div className="md:border-b pb-6 md:pr-6">
							<dt className="bg-white text-primary w-48 flex justify-center text-xl font-medium relative -bottom-[14px] left-5">
								Profile Information
							</dt>
							<div className="gradientBorder pb-4 px-6 pt-8 w-full rounded-xl">
								{Object.entries(profileData?.profileInfo || {}).map(([ key, value ]) => (
									<div className="grid grid-cols-2" key={key}>
										<dt className="text-md font-medium mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</dt>
										<dd>{key === 'dateOfBirth' ? moment(value).isValid() ? moment(value).format('DD-MM-YYYY') : '_' : value}</dd>
									</div>
								))}
							</div>
						</div>

						{/* Present Address */}
						<div className="md:border-b pb-6 md:pr-6">
							<p className="w-44 bg-white text-primary flex justify-center text-xl font-medium relative -bottom-[14px] left-5">Present Address</p>
							<div className="gradientBorder pb-4 px-6 pt-8 w-full rounded-xl">
								<dl className="grid grid-cols-2 gap-y-2">
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
							<p className="w-60 bg-white text-primary flex justify-center text-xl font-medium relative -bottom-[14px] left-5">Residency Information</p>
							<div className="gradientBorder pb-4 px-6 pt-8 w-full rounded-xl">
								<dl className="grid grid-cols-2 gap-y-2 mt-6">
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
							<p className="bg-white text-primary w-48 flex justify-center text-xl font-medium relative -bottom-[14px] left-5">Education Details</p>
							<div className="gradientBorder pb-4 px-6 pt-8 w-full rounded-xl">
								{Object.entries(profileData?.educationalDetails).map(([ key, value ]) => (
									<div className="grid grid-cols-2 gap-1" key={key}>
										<dt className="text-md font-medium mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</dt>
										<dd>{value}</dd>
									</div>
								))}
							</div>
						</div>

						{/* Career */}
						<div className="md:border-b pb-6 md:pr-6">
							<p className="w-20 bg-white text-primary flex justify-center text-xl font-medium relative -bottom-[14px] left-5">Career</p>
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
							<p className="bg-white text-primary w-48 flex justify-center text-xl font-medium relative -bottom-[14px] left-5">Physical Attributes</p>
							<div className="gradientBorder pb-4 px-6 pt-8 w-full rounded-xl">
								{Object.entries(profileData?.physicalAttributes).map(([ key, value ]) => (
									<p className="grid grid-cols-2" key={key}>
										<p className="text-md font-medium mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</p>
										{value}
									</p>
								))}
							</div>
						</div>

						{/* language */}
						<div className="md:border-b pb-6 md:pr-6">
							<p className="w-28 bg-white text-primary flex justify-center text-xl font-medium relative -bottom-[14px] left-5">Language</p>
							<div className="gradientBorder pb-4 px-6 pt-8 w-full rounded-xl">
								<div className="grid grid-cols-2">
									<dt className="text-md font-medium mb-2">Mother Tongue:</dt>
									<dd>{profileData?.language.motherTongue}</dd>
								</div>
								<div className="grid grid-cols-2">
									<dt className="text-md font-medium mb-2">Known Languages:</dt>
									<dd>{profileData?.language.knownLanguages}</dd>
								</div>
							</div>
						</div>

						{/* Hobbies */}
						<div className="pb-6 md:pr-6">
							<p className="w-24 bg-white text-primary flex justify-center text-xl font-medium relative -bottom-[14px] left-5">Hobbies</p>
							<div className="gradientBorder pb-4 px-6 pt-8 w-full rounded-xl">
								<p className='flex gap-2 flex-wrap'>
									{profileData?.hobbies?.hobbiesList?.map((res, ind) => (
										<p key={ind} className="bg-gray-200 rounded-full px-3 py-1 text-headingGray">
											{res.name || "_"}
										</p>
									))}
								</p>
							</div>
						</div>
					</div>
					{/* end */}

					<div className="md:border-l">

						{/* Spiritual and Social Background */}
						<div className="md:border-b pb-6 md:pl-6">
							<p className="w-24 bg-white text-primary flex justify-center text-xl font-medium relative -bottom-[14px] left-5">Spiritual</p>
							<div className="gradientBorder pb-4 px-6 pt-8 w-full rounded-xl">
								{Object.entries(profileData?.spiritualSocial || {}).map(([ key, value ]) => {
									if (typeof value === 'object' && !Array.isArray(value)) {
										// If the value is an object, render its key-value pairs
										return (
											<div className="flex flex-col gap-2 mb-3" key={key}>
												<p className="text-md font-medium capitalize">
													{key.replace(/([A-Z])/g, ' $1')}:
												</p>
												<div className="pl-6">
													{Object.entries(value).map(([ subKey, subValue ]) => (
														<p className="grid grid-cols-2" key={subKey}>
															<p className="text-sm font-medium capitalize w-48">{subKey}:</p>
															<span>{subValue}</span>
														</p>
													))}
												</div>
											</div>
										);
									}
									return (
										<div className="grid grid-cols-2" key={key}>
											<dt className="text-md font-medium mb-2 capitalize">
												{key.replace(/([A-Z])/g, ' $1')}:
											</dt>
											<dd>{value}</dd>
										</div>
									);
								})}
							</div>
						</div>

						{/* Lifestyle */}
						<div className="md:border-b pb-6 md:pl-6">
							<p className="w-24 bg-white text-primary flex justify-center text-xl font-medium relative -bottom-[14px] left-5">Lifestyle</p>
							<div className="gradientBorder pb-4 px-6 pt-8 w-full rounded-xl">
								<p className='grid grid-cols-2'><p className='text-md font-medium w-56 mb-2'>Diet:</p> {profileData?.lifestyle.diet}</p>
								<p className='grid grid-cols-2'><p className='text-md font-medium w-56 mb-2'>Drink:</p> {profileData?.lifestyle.drink}</p>
								<p className='grid grid-cols-2'><p className='text-md font-medium w-56 mb-2'>Smoke:</p> {profileData?.lifestyle.smoke}</p>
							</div>
						</div>

						{/* Family Details */}
						<div className="md:border-b pb-6 md:pl-6">
							<p className="w-36 bg-white text-primary flex justify-center text-xl font-medium relative -bottom-[14px] left-5">Family Details</p>
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
						<div className="pb-6 md:pl-6">
							<p className="bg-white text-primary w-52 flex justify-center text-xl font-medium relative -bottom-[14px] left-5">
								Partner Expectation
							</p>
							<div className="gradientBorder pb-4 px-6 pt-8 w-full rounded-xl">
								{Object.entries(profileData?.partnerExpectation).map(([ key, value ]) => (
									<div className={`grid gap-2 mb-2 ${key == 'generalRequirement' ? 'grid-cols-1' : 'grid-cols-2'}`} key={key}>
										<dt className={`text-md font-medium capitalize`}>{key.replace(/([A-Z])/g, ' $1')}:</dt>
										{key == 'generalRequirement' ? <p className="text-sm font-light">{value}</p> : <dd>{value}</dd>}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

			</div>
		</div >
	);
};

export default DetailedProfile;