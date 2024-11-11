import React from "react";

const DetailedProfile = () => {

	const profileData = {
		introduction: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.",
		profileInfo: {
			firstName: "John",
			lastName: "Doe",
			dateOfBirth: "1990-01-01",
			gender: "Male",
			maritalStatus: "Single",
			profileCreatedBy: "Self",
		},
		presentAddress: {
			country: "USA",
			state: "California",
			city: "Los Angeles",
			postalCode: "90001",
		},
		residencyInformation: {
			birthCountry: "USA",
			residencyCountry: "USA",
			immigrationStatus: "Citizen",
		},
		educationDetails: {
			highestEducation: "Masters in Computer Science",
			educationInDetail: "Specialized in AI",
			college: "MIT",
		},
		career: {
			sector: "Government",
			Occupation: "Doctor",
			occupation: "Software Engineer",
			organizationName: "xyz organization",
			jobLocation: "San Francisco",
			annualIncome: "$120,000",
		},
		language: {

		},
		physicalAttributes: {
			height: "6 feet",
			weight: "75 kg",
			eyeColor: "Brown",
			hairColor: "Black",
			bodyType: "Athletic",
			complexion: "Fair",
			bloodGroup: "O+",
			tattoo: "None",
			disability: "No",
		},
		language: {
			MotherTongue: "Hindi",
			KnownLanguages: "Urdu, English, Sanskrit",
		},

		hobbies: [ 'Reading', 'Hiking' ],

		spiritualSocial: {
			religion: "Christian",
			caste: "N/A",
			ethnicity: "Caucasian",
			personalValue: "Moderate",
			familyValue: "Liberal",
		},
		lifestyle: {
			diet: "Vegetarian",
			drink: "No",
			smoke: "No",
		},
		familyDetails: {
			familyValue: "Liberal",
			familyType: "Nuclear",
			familyStatus: "Middle Class",
			fatherOccupation: "Businessman",
			motherOccupation: "Teacher",
			noOfBrothers: 2,
			brothersMarried: 1,
			noOfSisters: 1,
			sistersMarried: 1,
		},

		partnerExpectation: {
			bridesAge: {
				min: "25",
				max: "30"
			},
			height: {
				feet: "5",
				inches: "7"
			},
			maritalStatus: "Single",
			residencyCountry: "USA",
			religion: "Christian",
			caste: "N/A",
			subCaste: "N/A",
			motherTongue: "English",
			highestEducation: "Bachelor's",
			employedIn: "Private Sector",
			occupation: "Engineer",
			annualIncome: "50,000 USD",
			smokingAcceptable: "No",
			drinkingAcceptable: "Occasionally",
			dietingAcceptable: "Vegetarian",
			bodyType: "Athletic",
			preferredCountry: "USA",
			preferredState: "California",
			complexion: "Fair",
			generalRequirement: "Looking for a well-educated and family-oriented partner. Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.Lorem ipsum may be used as a placeholder before the final copy is available."
		}

	};

	return (
		<div className="container text-textGray border shadow-md rounded-xl ">
			<div className="space-y-6 md:space-y-8 pt-2 md:pt-4 pb-12 lg:px-6">
				{/* Introduction */}
				<div className="p-4">
					<p className="text-gradient text-xl font-medium mb-2">About Me</p>
					<p className='flex gap-2 font-light'>{profileData.introduction}</p>
				</div>

				<div className="px-1 sm:px-4 md:px-0 grid grid-cols-1 md:grid-cols-2">
					{/* Profile Information */}
					<div className="md:border-r">
						<div className="md:border-b pb-6 md:pr-6">
							<dt className="bg-white text-primary w-48 flex justify-center text-xl font-medium relative -bottom-[14px] left-5">
								Profile Information
							</dt>
							<div className="gradientBorder pb-4 px-6 pt-8 w-full rounded-xl">
								<div className="grid grid-cols-2">
									<dt className="text-md font-medium mb-2">First Name:</dt>
									<dd>{profileData.profileInfo.firstName}</dd>
								</div>
								<div className="grid grid-cols-2">
									<dt className="text-md font-medium mb-2">Last Name:</dt>
									<dd>{profileData.profileInfo.lastName}</dd>
								</div>
								<div className="grid grid-cols-2">
									<dt className="text-md font-medium mb-2">Date of Birth:</dt>
									<dd>{profileData.profileInfo.dateOfBirth}</dd>
								</div>
								<div className="grid grid-cols-2">
									<dt className="text-md font-medium mb-2">Gender:</dt>
									<dd>{profileData.profileInfo.gender}</dd>
								</div>
								<div className="grid grid-cols-2">
									<dt className="text-md font-medium mb-2">Marital Status:</dt>
									<dd>{profileData.profileInfo.maritalStatus}</dd>
								</div>
								<div className="grid grid-cols-2">
									<dt className="text-md font-medium mb-2">Profile Created By:</dt>
									<dd>{profileData.profileInfo.profileCreatedBy}</dd>
								</div>
							</div>
						</div>

						{/* Present Address */}
						<div className="md:border-b pb-6 md:pr-6">
							<p className="w-44 bg-white text-primary flex justify-center text-xl font-medium relative -bottom-[14px] left-5">Present Address</p>
							<div className="gradientBorder pb-4 px-6 pt-8 w-full rounded-xl">
								<dl className="grid grid-cols-2 gap-y-4 mt-6">
									<dt className="text-md font-medium">Country:</dt>
									<dd>{profileData.presentAddress.country}</dd>

									<dt className="text-md font-medium">State:</dt>
									<dd>{profileData.presentAddress.state}</dd>

									<dt className="text-md font-medium">City:</dt>
									<dd>{profileData.presentAddress.city}</dd>

									<dt className="text-md font-medium">Postal Code:</dt>
									<dd>{profileData.presentAddress.postalCode}</dd>
								</dl>
							</div>
						</div>

						{/* Residency Information */}
						<div className="md:border-b pb-6 md:pr-6">
							<p className="w-60 bg-white text-primary flex justify-center text-xl font-medium relative -bottom-[14px] left-5">Residency Information</p>
							<div className="gradientBorder pb-4 px-6 pt-8 w-full rounded-xl">
								<dl className="grid grid-cols-2 gap-y-4 mt-6">
									<dt className="text-md font-medium">Birth Country:</dt>
									<dd>{profileData.residencyInformation.birthCountry}</dd>

									<dt className="text-md font-medium">Residency Country:</dt>
									<dd>{profileData.residencyInformation.residencyCountry}</dd>

									<dt className="text-md font-medium">Immigration Status:</dt>
									<dd>{profileData.residencyInformation.immigrationStatus}</dd>

									<dt className="text-md font-medium">Grow Up Country:</dt>
									<dd>{profileData.residencyInformation.immigrationStatus}</dd>

									<dt className="text-md font-medium">Citizenship:</dt>
									<dd>{profileData.residencyInformation.immigrationStatus}</dd>
								</dl>
							</div>
						</div>

						{/* Education Details */}
						<div className="md:border-b pb-6 md:pr-6">
							<p className="bg-white text-primary w-48 flex justify-center text-xl font-medium relative -bottom-[14px] left-5">Education Details</p>
							<div className="gradientBorder pb-4 px-6 pt-8 w-full rounded-xl">
								<div className="grid grid-cols-2">
									<dt className="text-md font-medium mb-2">Highest Education:</dt>
									<dd>{profileData.educationDetails.highestEducation}</dd>
								</div>
								<div className="grid grid-cols-2">
									<dt className="text-md font-medium mb-2">Education in Detail:</dt>
									<dd>{profileData.educationDetails.educationInDetail}</dd>
								</div>
								<div className="grid grid-cols-2">
									<dt className="text-md font-medium mb-2">College:</dt>
									<dd>{profileData.educationDetails.college}</dd>
								</div>
							</div>
						</div>


						{/* Career */}
						<div className="md:border-b pb-6 md:pr-6">
							<p className="w-20 bg-white text-primary flex justify-center text-xl font-medium relative -bottom-[14px] left-5">Career</p>
							<div className="gradientBorder pb-4 px-6 pt-8 w-full rounded-xl">
								<div className="grid grid-cols-2">
									<dt className="text-md font-medium mb-2">Employment Sector:</dt>
									<dd>{profileData.career.sector}</dd>
								</div>
								<div className="grid grid-cols-2">
									<dt className="text-md font-medium mb-2">Occupation:</dt>
									<dd>{profileData.career.occupation}</dd>
								</div>
								<div className="grid grid-cols-2">
									<dt className="text-md font-medium mb-2">Organization Name:</dt>
									<dd>{profileData.career.organizationName}</dd>
								</div>
								<div className="grid grid-cols-2">
									<dt className="text-md font-medium mb-2">Job Location:</dt>
									<dd>{profileData.career.jobLocation}</dd>
								</div>
								<div className="grid grid-cols-2">
									<dt className="text-md font-medium mb-2">Annual Income:</dt>
									<dd>{profileData.career.annualIncome}</dd>
								</div>
							</div>
						</div>

						{/* Physical Attributes */}
						<div className="md:border-b pb-6 md:pr-6">
							<p className="bg-white text-primary w-48 flex justify-center text-xl font-medium relative -bottom-[14px] left-5">Physical Attributes</p>
							<div className="gradientBorder pb-4 px-6 pt-8 w-full rounded-xl">
								<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Height:</p> {profileData.physicalAttributes.height}</p>
								<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Weight:</p> {profileData.physicalAttributes.weight}</p>
								<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Eye Color:</p> {profileData.physicalAttributes.eyeColor}</p>
								<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Hair Color:</p> {profileData.physicalAttributes.hairColor}</p>
								<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Complexion:</p> {profileData.physicalAttributes.complexion}</p>
								<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Blood Group:</p> {profileData.physicalAttributes.bloodGroup}</p>
								<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Body Type:</p> {profileData.physicalAttributes.bodyType}</p>
								<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Tattoo:</p> {profileData.physicalAttributes.tattoo}</p>
								<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Disability:</p> {profileData.physicalAttributes.disability}</p>
							</div>
						</div>

						{/* Hobbies */}
						<div className="pb-6 md:pr-6">
							<p className="w-24 bg-white text-primary flex justify-center text-xl font-medium relative -bottom-[14px] left-5">Hobbies</p>
							<div className="gradientBorder pb-4 px-6 pt-8 w-full rounded-xl">
								<p className='flex gap-2 flex-wrap'>
									{profileData.hobbies.map((res) => (<p className="bg-gray-200 rounded-full px-3 py-1 text-headingGray">{res}</p>))}
								</p>
							</div>
						</div>
					</div>
					{/* end */}

					{/* language */}
					<div className="md:border-l">
						<div className="md:border-b pb-6 md:pl-6">
							<p className="w-28 bg-white text-primary flex justify-center text-xl font-medium relative -bottom-[14px] left-5">Language</p>
							<div className="gradientBorder pb-4 px-6 pt-8 w-full rounded-xl">
								<div className="grid grid-cols-2">
									<dt className="text-md font-medium mb-2">Mother Tongue:</dt>
									<dd>{profileData.language.MotherTongue}</dd>
								</div>
								<div className="grid grid-cols-2">
									<dt className="text-md font-medium mb-2">Known Languages:</dt>
									<dd>{profileData.language.KnownLanguages}</dd>
								</div>
							</div>
						</div>


						{/* Spiritual and Social Background */}
						<div className="md:border-b pb-6 md:pl-6">
							<p className="w-24 bg-white text-primary  flex justify-center text-xl font-medium relative -bottom-[14px] left-5">Spiritual</p>
							<div className="gradientBorder pb-4 px-6 pt-8 w-full rounded-xl">
								<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Religion:</p> {profileData.spiritualSocial.religion}</p>
								<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Caste:</p> {profileData.spiritualSocial.caste}</p>
								<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Ethnicity:</p> {profileData.spiritualSocial.ethnicity}</p>
								<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Personal Value:</p> {profileData.spiritualSocial.personalValue}</p>
								<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Family Value:</p> {profileData.spiritualSocial.familyValue}</p>
							</div>
						</div>

						{/* Lifestyle */}
						<div className="md:border-b pb-6 md:pl-6">
							<p className="w-24 bg-white text-primary flex justify-center text-xl font-medium relative -bottom-[14px] left-5">Lifestyle</p>
							<div className="gradientBorder pb-4 px-6 pt-8 w-full rounded-xl">
								<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Diet:</p> {profileData.lifestyle.diet}</p>
								<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Drink:</p> {profileData.lifestyle.drink}</p>
								<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Smoke:</p> {profileData.lifestyle.smoke}</p>
							</div>
						</div>

						{/* Family Details */}
						<div className="md:border-b pb-6 md:pl-6">
							<p className="w-36 bg-white text-primary flex justify-center text-xl font-medium relative -bottom-[14px] left-5">Family Details</p>
							<div className="gradientBorder pb-4 px-6 pt-8 w-full rounded-xl">

								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Family Value:</span> {profileData.familyDetails.familyValue}
								</p>

								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Family Type:</span> {profileData.familyDetails.familyType}
								</p>

								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Family Status:</span> {profileData.familyDetails.familyStatus}
								</p>

								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Father's Occupation:</span> {profileData.familyDetails.fatherOccupation}
								</p>

								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Mother's Occupation:</span> {profileData.familyDetails.motherOccupation}
								</p>

								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>No. of Brothers:</span> {profileData.familyDetails.noOfBrothers}
								</p>

								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>No. of Sisters:</span> {profileData.familyDetails.noOfSisters}
								</p>

								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Brothers Married:</span> {profileData.familyDetails.brothersMarried}
								</p>

								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Sisters Married:</span> {profileData.familyDetails.sistersMarried}
								</p>
							</div>
						</div>

						{/* Partner Expectation */}
						<div className="pb-6 md:pl-6">
							<p className="bg-white text-primary w-52 flex justify-center text-xl font-medium relative -bottom-[14px] left-5">
								Partner Expectation
							</p>
							<div className="gradientBorder pb-4 px-6 pt-8 w-full rounded-xl">
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Bride's Age:</span>
									{profileData.partnerExpectation.bridesAge.min} - {profileData.partnerExpectation.bridesAge.max}
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Height:</span>
									{profileData.partnerExpectation.height.feet} feet {profileData.partnerExpectation.height.inches} inches
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Marital Status:</span>
									{profileData.partnerExpectation.maritalStatus}
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Residency Country:</span>
									{profileData.partnerExpectation.residencyCountry}
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Religion:</span>
									{profileData.partnerExpectation.religion}
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Caste:</span>
									{profileData.partnerExpectation.caste}
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Sub Caste:</span>
									{profileData.partnerExpectation.subCaste}
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Mother Tongue:</span>
									{profileData.partnerExpectation.motherTongue}
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Highest Education:</span>
									{profileData.partnerExpectation.highestEducation}
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Employed In:</span>
									{profileData.partnerExpectation.employedIn}
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Occupation:</span>
									{profileData.partnerExpectation.occupation}
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Annual Income:</span>
									{profileData.partnerExpectation.annualIncome}
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Smoking Acceptable:</span>
									{profileData.partnerExpectation.smokingAcceptable}
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Drinking Acceptable:</span>
									{profileData.partnerExpectation.drinkingAcceptable}
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Dieting Acceptable:</span>
									{profileData.partnerExpectation.dietingAcceptable}
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Body Type:</span>
									{profileData.partnerExpectation.bodyType}
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Preferred Country:</span>
									{profileData.partnerExpectation.preferredCountry}
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Preferred State:</span>
									{profileData.partnerExpectation.preferredState}
								</p>
								<p className='flex gap-2'>
									<span className='text-md font-medium w-56 mb-2'>Complexion:</span>
									{profileData.partnerExpectation.complexion}
								</p>
								<p className=''>
									<span className='text-md font-medium w-52 mb-2'>General Requirement:</span>
									<p className="text-sm font-light">{profileData.partnerExpectation.generalRequirement}</p>
								</p>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
	);
};

export default DetailedProfile;
