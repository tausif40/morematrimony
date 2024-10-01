import React, { useState } from 'react';
import { AiFillInfoCircle, AiFillHome, AiFillPhone, AiFillBook, AiFillIdcard, AiFillMessage } from 'react-icons/ai';
import { FaBriefcase } from 'react-icons/fa';
import BasicInformation from './BasicInformation';
import PresentAddress from './PresentAddress';
import ContactDetails from './ContactDetails';
import Education from './Education';
import Career from './Career';
import PhysicalAttributes from './PhysicalAttributes';
import Language from './Language';
import HobbiesInterest from './HobbiesInterest';
import PersonalAttitudeBehavior from './PersonalAttitudeBehavior';
import ResidencyInformation from './ResidencyInformation';
import SpiritualSocialBackground from './SpiritualSocialBackground';
import LifeStyle from './LifeStyle';
import AstronomicInformation from './AstronomicInformation';
import PermanentAddress from './PermanentAddress';
import FamilyInformation from './FamilyInformation';

function DetailedProfile() {
	const [ openSection, setOpenSection ] = useState(null);

	const sections = [
		{ name: 'Basic Information', component: BasicInformation, icon: <AiFillInfoCircle /> },
		{ name: 'Present Address', component: PresentAddress, icon: <AiFillHome /> },
		{ name: 'Contact Details', component: ContactDetails, icon: <AiFillPhone /> },
		{ name: 'Education', component: Education, icon: <AiFillBook /> },
		{ name: 'Career', component: Career, icon: <FaBriefcase /> },
		{ name: 'Physical Attributes', component: PhysicalAttributes, icon: <AiFillIdcard /> },
		{ name: 'Language', component: Language, icon: <AiFillMessage /> },
		{ name: 'Hobbies & Interest', component: HobbiesInterest, icon: <AiFillMessage /> },
		{ name: 'Personal Attitude & Behavior', component: PersonalAttitudeBehavior, icon: <AiFillMessage /> },
		{ name: 'Residency Information', component: ResidencyInformation, icon: <AiFillMessage /> },
		{ name: 'Spiritual & Social Background', component: SpiritualSocialBackground, icon: <AiFillMessage /> },
		{ name: 'Life Style', component: LifeStyle, icon: <AiFillMessage /> },
		{ name: 'Astronomic Information', component: AstronomicInformation, icon: <AiFillMessage /> },
		{ name: 'Permanent Address', component: PermanentAddress, icon: <AiFillMessage /> },
		{ name: 'Family Information', component: FamilyInformation, icon: <AiFillMessage /> },
	];

	const toggleSection = (section) => {
		setOpenSection(openSection === section ? null : section);
	};

	const renderSection = (section, Component, Icon) => {
		const isOpen = openSection === section;
		return (
			<div className="" key={section}>
				<div
					className={`cursor-pointer font-bold text-lg tracking-wide text-headingGray min-w-max transition-all ${isOpen && 'text-primary'}`}
					onClick={() => toggleSection(section)}
				>
					<div className="flex items-center gap-6">
						<p className='text-3xl border rounded-full p-2 bg-white'>{Icon}</p>
						<span className="ml-2">{section}</span>
					</div>
				</div>
				<div className={`border-l ml-6 overflow-hidden transition-all duration-1000 ease-in-out`}>
					<div
						className={` pt-4 pb-10 max-h-0 transition-all duration-1000 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
							}`}
					// style={{ maxHeight: isOpen ? '1000px' : '0' }}
					>
						{isOpen && (
							<div className={`transition-opacity duration-500 ml-16 p-4 border ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
								<Component />
							</div>
						)}
					</div>
				</div>
			</div>
		);
	};



	return (
		<div>
			{sections.map(({ name, component, icon }) => renderSection(name, component, icon))}
		</div>
	);
}

export default DetailedProfile;
