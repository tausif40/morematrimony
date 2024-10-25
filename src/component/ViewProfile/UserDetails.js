import React from "react";

const UserDetails = () => {

	const profileData = {
		introduction: "I am a software engineer with a passion for coding.",
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

		hobbies: "Reading, Hiking",

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
			minAge: "25",
			maxAge: "30",
			height: "5'5\"",
			preferredCountry: "USA",
			religion: "Christian",
			caste: "N/A",
		},
	};

	return (
		<div className="container text-textGray">
			<div className=" rounded-xl space-y-8 p-6 border shadow-md">
				{/* Introduction */}
				<div className="p-4">
					<p className="text-xl font-medium mb-4 underline">Introduction</p>
					<p className='flex gap-2'>{profileData.introduction}</p>
				</div>

				{/* Profile Information */}
				<div>
					<p className="text-xl font-medium mb-1 underline pl-4">Profile Information</p>
					<div className="py-4 px-6 w-1/2 bg-gray-100 rounded-xl">
						<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>First Name:</p> {profileData.profileInfo.firstName}</p>
						<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Last Name:</p> {profileData.profileInfo.lastName}</p>
						<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Date of Birth:</p> {profileData.profileInfo.dateOfBirth}</p>
						<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Gender:</p> {profileData.profileInfo.gender}</p>
						<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Marital Status:</p> {profileData.profileInfo.maritalStatus}</p>
						<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Profile Created By:</p> {profileData.profileInfo.profileCreatedBy}</p>
					</div>
				</div>

				{/* Present Address */}
				<div>
					<p className="text-xl font-medium mb-1 underline pl-4">Present Address</p>
					<div className="py-4 px-6 w-1/2 bg-gray-100 rounded-xl">
						<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Country:</p> {profileData.presentAddress.country}</p>
						<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>State:</p> {profileData.presentAddress.state}</p>
						<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>City:</p> {profileData.presentAddress.city}</p>
						<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Postal Code:</p> {profileData.presentAddress.postalCode}</p>
					</div>
				</div>

				{/* Residency Information */}
				<div>
					<p className="text-xl font-medium mb-1 underline pl-4">Residency Information</p>
					<div className="py-4 px-6 w-1/2 bg-gray-100 rounded-xl">
						<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Birth Country:</p> {profileData.residencyInformation.birthCountry}</p>
						<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Residency Country:</p> {profileData.residencyInformation.residencyCountry}</p>
						<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Immigration Status:</p> {profileData.residencyInformation.immigrationStatus}</p>
						<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Immigration Status:</p> {profileData.residencyInformation.immigrationStatus}</p>
						<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Grow Up Country:</p> {profileData.residencyInformation.immigrationStatus}</p>
						<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Citizenship:</p> {profileData.residencyInformation.immigrationStatus}</p>
					</div>
				</div>

				{/* Education Details */}
				<div>
					<p className="text-xl font-medium mb-1 underline pl-4">Education Details</p>
					<div className="py-4 px-6 w-1/2 bg-gray-100 rounded-xl">
						<p className='flex gap-2'><p className='text-md font-medium w-52 mb-2'>Highest Education:</p> {profileData.educationDetails.highestEducation}</p>
						<p className='flex gap-2'><p className='text-md font-medium w-52 mb-2'>Education in Detail:</p> {profileData.educationDetails.educationInDetail}</p>
						<p className='flex gap-2'><p className='text-md font-medium w-52 mb-2'>College:</p> {profileData.educationDetails.college}</p>
					</div>
				</div>


				{/* Career */}
				<div>
					<p className="text-xl font-medium mb-1 underline pl-4">Career</p>
					<div className="py-4 px-6 w-1/2 bg-gray-100 rounded-xl">
						<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Employment Sector:</p> {profileData.career.sector}</p>
						<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Occupation:</p> {profileData.career.occupation}</p>
						<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Job Location:</p> {profileData.career.jobLocation}</p>
						<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Annual Income:</p> {profileData.career.annualIncome}</p>
					</div>
				</div>

				{/* Physical Attributes */}
				<div>
					<p className="text-xl font-medium mb-1 underline pl-4">Physical Attributes</p>
					<div className="py-4 px-6 w-1/2 bg-gray-100 rounded-xl">
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

				{/* language */}
				<div>
					<p className="text-xl font-medium mb-1 underline pl-4">Language: </p>
					<div className="py-4 px-6 w-1/2 bg-gray-100 rounded-xl">
						<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Mother Tongue:</p> {profileData.language.MotherTongue}</p>
						<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Known Languages:</p> {profileData.language.KnownLanguages}</p>
					</div>
				</div>

				{/* Hobbies */}
				<div>
					<p className="text-xl font-medium mb-1 underline pl-4">Hobbies</p>
					<div className="py-4 px-6 w-1/2 bg-gray-100 rounded-xl">
						<p className='flex gap-2'>{profileData.hobbies}</p>
					</div>
				</div>

				{/* Spiritual and Social Background */}
				<div>
					<p className="text-xl font-medium mb-1 underline pl-4">Spiritual and Social Background</p>
					<div className="py-4 px-6 w-1/2 bg-gray-100 rounded-xl">
						<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Religion:</p> {profileData.spiritualSocial.religion}</p>
						<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Caste:</p> {profileData.spiritualSocial.caste}</p>
						<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Ethnicity:</p> {profileData.spiritualSocial.ethnicity}</p>
						<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Personal Value:</p> {profileData.spiritualSocial.personalValue}</p>
						<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Family Value:</p> {profileData.spiritualSocial.familyValue}</p>
					</div>
				</div>

				{/* Lifestyle */}
				<div>
					<p className="text-xl font-medium mb-1 underline pl-4">Lifestyle</p>
					<div className="py-4 px-6 w-1/2 bg-gray-100 rounded-xl">
						<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Diet:</p> {profileData.lifestyle.diet}</p>
						<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Drink:</p> {profileData.lifestyle.drink}</p>
						<p className='flex gap-2'><p className='text-md font-medium w-56 mb-2'>Smoke:</p> {profileData.lifestyle.smoke}</p>
					</div>
				</div>

				{/* Family Details */}
				<div>
					<p className="text-xl font-medium mb-1 underline pl-4">Family Details</p>
					<div className="py-4 px-6 w-1/2 bg-gray-100 rounded-xl">

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
				{/* <div className="py-4 px-6 w-1/2 bg-gray-100 rounded-xl">
						<p className="text-xl font-medium mb-1 underline pl-4">Partner Expectation</p>
					<p className='flex gap-2'><p className='text-md font-medium'>Min Age:</p> {profileData.partnerExpectation.minAge}</p>
					<p className='flex gap-2'><p className='text-md font-medium'>Max Age:</p> {profileData.partnerExpectation.maxAge}</p>
					<p className='flex gap-2'><p className='text-md font-medium'>Height:</p> {profileData.partnerExpectation.height}</p>
					<p className='flex gap-2'><p className='text-md font-medium'>Preferred Country:</p> {profileData.partnerExpectation.preferredCountry}</p>
					<p className='flex gap-2'><p className='text-md font-medium'>Religion:</p> {profileData.partnerExpectation.religion}</p>
					<p className='flex gap-2'><p className='text-md font-medium'>Caste:</p> {profileData.partnerExpectation.caste}</p>
				</div> */}
			</div>
		</div>
	);
};

export default UserDetails