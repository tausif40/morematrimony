import React from "react";

const UserDetails = () => {
	// Dummy data
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
			fatherOccupation: "Businessman",
			motherOccupation: "Teacher",
			siblings: "2 brothers, 1 sister",
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
		<div className="container p-4">
			<div className=" border p-6 rounded-xl shadow-md">

				{/* Introduction */}
				<div className='w-full'>
					<p className="font-bold text-lg mb-2">Introduction</p>
					<p className="py-2 mb-2">{profileData.introduction}</p>
				</div>

				{/* <div className="mt-4">
					<h2 className="text-xl font-bold mb-4">Profile Verification - 1/5</h2>
					<div className="flex justify-between">
						<div className="flex items-center space-x-4">

						</div>
					</div>
				</div> */}

				<table className="table-auto text-left">
					<tbody>
						{/* Profile Information */}
						<div className='w-full'>
							<p className="font-bold text-lg mt-8 mb-2 ">Profile Information</p>
							<tr><td className="p-2 mt-8 mb-2 w-56">First Name</td><td className="p-2 mt-8 mb-2">{profileData.profileInfo.firstName}</td></tr>
							<tr><td className="p-2 mt-8 mb-2 w-56">Last Name</td><td className="p-2 mt-8 mb-2">{profileData.profileInfo.lastName}</td></tr>
							<tr><td className="p-2 mt-8 mb-2 w-56">Date of Birth</td><td className="p-2 mt-8 mb-2">{profileData.profileInfo.dateOfBirth}</td></tr>
							<tr><td className="p-2 mt-8 mb-2 w-56">Gender</td><td className="p-2 mt-8 mb-2">{profileData.profileInfo.gender}</td></tr>
							<tr><td className="p-2 mt-8 mb-2 w-56">Marital Status</td><td className="p-2 mt-8 mb-2">{profileData.profileInfo.maritalStatus}</td></tr>
							<tr><td className="p-2 mt-8 mb-2 w-56">Profile Created By</td><td className="p-2 mt-8 mb-2">{profileData.profileInfo.profileCreatedBy}</td></tr>
						</div>
						{/* Present Address */}
						<div className=''>
							<p className="font-bold text-lg mt-8 mb-2 ">Present Address</p>
							<tr><td className="p-2 mt-8 mb-2 w-56">Country</td><td className="p-2 mt-8 mb-2">{profileData.presentAddress.country}</td></tr>
							<tr><td className="p-2 mt-8 mb-2 w-56">State</td><td className="p-2 mt-8 mb-2">{profileData.presentAddress.state}</td></tr>
							<tr><td className="p-2 mt-8 mb-2 w-56">City</td><td className="p-2 mt-8 mb-2">{profileData.presentAddress.city}</td></tr>
							<tr><td className="p-2 mt-8 mb-2 w-56">Postal Code</td><td className="p-2 mt-8 mb-2">{profileData.presentAddress.postalCode}</td></tr>
						</div>
						{/* Residency Information */}
						<div className=''>
							<p className="font-bold text-lg mt-8 mb-2 ">Residency Information</p>
							<tr>
								<td className="p-2 mt-8 mb-2 w-56">Birth Country</td><td className="p-2 mt-8 mb-2">{profileData.residencyInformation.birthCountry}</td></tr>
							<tr>
								<td className="p-2 mt-8 mb-2 w-56">Residency Country</td><td className="p-2 mt-8 mb-2">{profileData.residencyInformation.residencyCountry}</td>
							</tr>
							<tr>
								<td className="p-2 mt-8 mb-2 w-56">Immigration Status</td>
								<td className="p-2 mt-8 mb-2">{profileData.residencyInformation.immigrationStatus}</td>
							</tr>
							<tr>
								<td className="p-2 mt-8 mb-2 w-56">Grow Up Country</td>
								<td className="p-2 mt-8 mb-2">{profileData.residencyInformation.immigrationStatus}</td>
							</tr>
							<tr>
								<td className="p-2 mt-8 mb-2 w-56">Citizenship</td>
								<td className="p-2 mt-8 mb-2">{profileData.residencyInformation.immigrationStatus}</td>
							</tr>
						</div>

						{/* Education Details */}
						<div className=''>
							<p className="font-bold text-lg mt-8 mb-2 ">Education Details</p>
							<tr><td className="p-2 mt-8 mb-2 w-56">Highest Education</td><td className="p-2 mt-8 mb-2">{profileData.educationDetails.highestEducation}</td></tr>
							<tr><td className="p-2 mt-8 mb-2 w-56">Education in Detail</td><td className="p-2 mt-8 mb-2">{profileData.educationDetails.educationInDetail}</td></tr>
							<tr><td className="p-2 mt-8 mb-2 w-56">College</td><td className="p-2 mt-8 mb-2">{profileData.educationDetails.college}</td></tr>
						</div>

						{/* Career */}
						<div className=''>
							<p className="font-bold text-lg mt-8 mb-2 ">Career</p>
							<tr><td className="p-2 mt-8 mb-2 w-56">Employed Sector</td><td className="p-2 mt-8 mb-2">{profileData.career.sector}</td></tr>
							<tr><td className="p-2 mt-8 mb-2 w-56">Occupation</td><td className="p-2 mt-8 mb-2">{profileData.career.Occupation}</td></tr>
							<tr><td className="p-2 mt-8 mb-2 w-56">Occupation</td><td className="p-2 mt-8 mb-2">{profileData.career.occupation}</td></tr>
							<tr><td className="p-2 mt-8 mb-2 w-56">Job Location</td><td className="p-2 mt-8 mb-2">{profileData.career.jobLocation}</td></tr>
							<tr><td className="p-2 mt-8 mb-2 w-56">Annual Income</td><td className="p-2 mt-8 mb-2">{profileData.career.annualIncome}</td></tr>
						</div>

						{/* Physical Attributes */}
						<div className=''>
							<p className="font-bold text-lg mt-8 mb-2 ">Physical Attributes</p>

							<tr>
								<td className="p-2 mt-8 mb-2 w-56">Height</td>
								<td className="p-2 mt-8 mb-2">{profileData.physicalAttributes.height}</td>
							</tr>
							<tr>
								<td className="p-2 mt-8 mb-2 w-56">Weight</td>
								<td className="p-2 mt-8 mb-2">{profileData.physicalAttributes.weight}</td>
							</tr>
							<tr>
								<td className="p-2 mt-8 mb-2 w-56">Eye Color</td>
								<td className="p-2 mt-8 mb-2">{profileData.physicalAttributes.eyeColor}</td>
							</tr>
							<tr>
								<td className="p-2 mt-8 mb-2 w-56">Hair Color</td>
								<td className="p-2 mt-8 mb-2">{profileData.physicalAttributes.hairColor}</td>
							</tr>
							<tr>
								<td className="p-2 mt-8 mb-2 w-56">Complexion</td>
								<td className="p-2 mt-8 mb-2">{profileData.physicalAttributes.complexion}</td>
							</tr>
							<tr>
								<td className="p-2 mt-8 mb-2 w-56">Body Type</td>
								<td className="p-2 mt-8 mb-2">{profileData.physicalAttributes.bodyType}</td>
							</tr>
							<tr>
								<td className="p-2 mt-8 mb-2 w-56">Blood Group</td>
								<td className="p-2 mt-8 mb-2">{profileData.physicalAttributes.bloodGroup}</td>
							</tr>
							<tr>
								<td className="p-2 mt-8 mb-2 w-56">Tattoo</td>
								<td className="p-2 mt-8 mb-2">{profileData.physicalAttributes.tattoo}</td>
							</tr>
							<tr>
								<td className="p-2 mt-8 mb-2 w-56">Any Disability</td>
								<td className="p-2 mt-8 mb-2">{profileData.physicalAttributes.disability}</td>
							</tr>
						</div>


						{/* Hobbies */}
						<div className=''>
							<p className="font-bold text-lg mt-8 mb-2 ">Hobbies</p>
							<tr><td className="p-2 mt-8 mb-2 w-56">Hobbies</td><td className="p-2 mt-8 mb-2">{profileData.hobbies}</td></tr>
						</div>

						{/* Spiritual & Social Background */}
						<div className=''>
							<p className="font-bold text-lg mt-8 mb-2 ">Spiritual & Social Background</p>
							<tr><td className="p-2 mt-8 mb-2 w-56">Religion</td><td className="p-2 mt-8 mb-2">{profileData.spiritualSocial.religion}</td></tr>
							<tr><td className="p-2 mt-8 mb-2 w-56">Caste</td><td className="p-2 mt-8 mb-2">{profileData.spiritualSocial.caste}</td></tr>
							<tr><td className="p-2 mt-8 mb-2 w-56">Ethnicity</td><td className="p-2 mt-8 mb-2">{profileData.spiritualSocial.ethnicity}</td></tr>
							<tr><td className="p-2 mt-8 mb-2 w-56">Personal Value</td><td className="p-2 mt-8 mb-2">{profileData.spiritualSocial.personalValue}</td></tr>
							<tr><td className="p-2 mt-8 mb-2 w-56">Family Value</td><td className="p-2 mt-8 mb-2">{profileData.spiritualSocial.familyValue}</td></tr>
						</div>

						{/* Lifestyle */}
						<div className=''>
							<p className="font-bold text-lg mt-8 mb-2 ">Lifestyle</p>
							<tr><td className="p-2 mt-8 mb-2 w-56">Diet</td><td className="p-2 mt-8 mb-2">{profileData.lifestyle.diet}</td></tr>
							<tr><td className="p-2 mt-8 mb-2 w-56">Drink</td><td className="p-2 mt-8 mb-2">{profileData.lifestyle.drink}</td></tr>
							<tr><td className="p-2 mt-8 mb-2 w-56">Smoke</td><td className="p-2 mt-8 mb-2">{profileData.lifestyle.smoke}</td></tr>
						</div>

						{/* Family Details */}
						<div className=''>
							<p className="font-bold text-lg mt-8 mb-2 ">Family Details</p>
							<tr><td className="p-2 mt-8 mb-2 w-56">Family Value</td><td className="p-2 mt-8 mb-2">{profileData.familyDetails.familyValue}</td></tr>
							<tr><td className="p-2 mt-8 mb-2 w-56">Father Occupation</td><td className="p-2 mt-8 mb-2">{profileData.familyDetails.fatherOccupation}</td></tr>
							<tr><td className="p-2 mt-8 mb-2 w-56">Mother Occupation</td><td className="p-2 mt-8 mb-2">{profileData.familyDetails.motherOccupation}</td></tr>
							<tr><td className="p-2 mt-8 mb-2 w-56">Siblings</td><td className="p-2 mt-8 mb-2">{profileData.familyDetails.siblings}</td></tr>
						</div>

						{/* Partner Expectations */}
						<div className=''>
							<p className="font-bold text-lg mt-8 mb-2 ">Partner Expectations</p>
							<tr><td className="p-2 mt-8 mb-2 w-56">Min Age</td><td className="p-2 mt-8 mb-2">{profileData.partnerExpectation.minAge}</td></tr>
							<tr><td className="p-2 mt-8 mb-2 w-56">Max Age</td><td className="p-2 mt-8 mb-2">{profileData.partnerExpectation.maxAge}</td></tr>
							<tr><td className="p-2 mt-8 mb-2 w-56">Height</td><td className="p-2 mt-8 mb-2">{profileData.partnerExpectation.height}</td></tr>
							<tr><td className="p-2 mt-8 mb-2 w-56">Preferred Country</td><td className="p-2 mt-8 mb-2">{profileData.partnerExpectation.preferredCountry}</td></tr>
							<tr><td className="p-2 mt-8 mb-2 w-56">Religion</td><td className="p-2 mt-8 mb-2">{profileData.partnerExpectation.religion}</td></tr>
							<tr><td className="p-2 mt-8 mb-2 w-56">Caste</td><td className="p-2 mt-8 mb-2">{profileData.partnerExpectation.caste}</td></tr>
						</div>
					</tbody>
				</table>
			</div>
		</div >
	);
};

export default UserDetails;

`xx`