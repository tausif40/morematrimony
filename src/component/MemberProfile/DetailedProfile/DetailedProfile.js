import React, { useState } from 'react';
import BasicInformation from './BasicInformation';
// Import other components similarly

function DetailedProfile() {
	const [ openSection, setOpenSection ] = useState(null);

	const toggleSection = (section) => {
		setOpenSection(openSection === section ? null : section);
	};

	const renderSection = (section, Component) => (
		<div className="mb-4">
			<div
				className="flex justify-between p-4 bg-gray-200 rounded-lg cursor-pointer"
				onClick={() => toggleSection(section)}
			>
				<span>{section}</span>
				<span>{openSection === section ? '-' : '+'}</span>
			</div>
			<div className={`transition-all duration-300 overflow-hidden ${openSection === section ? 'max-h-screen' : 'max-h-0'}`}>
				{openSection === section && <Component />}
			</div>
		</div>
	);

	return (
		<div>
			{renderSection('Basic Information', BasicInformation)}
			{/* {renderSection('Present Address', PresentAddress)}
			{renderSection('Contact Details', ContactDetails)}
			{renderSection('Education', Education)}
			{renderSection('Career', Career)}
			{renderSection('Physical Attributes', PhysicalAttributes)}
			{renderSection('Language', Language)}
			{renderSection('Hobbies & Interest', HobbiesInterest)}
			{renderSection('Personal Attitude & Behavior', PersonalAttitudeBehavior)}
			{renderSection('Residency Information', ResidencyInformation)}
			{renderSection('Spiritual & Social Background', SpiritualSocialBackground)}
			{renderSection('Life Style', LifeStyle)}
			{renderSection('Astronomic Information', AstronomicInformation)}
			{renderSection('Permanent Address', PermanentAddress)}
			{renderSection('Family Information', FamilyInformation)} */}
		</div>
	);
}

export default DetailedProfile;
