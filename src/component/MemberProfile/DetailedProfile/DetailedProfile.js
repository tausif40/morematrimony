import React, { useState } from 'react';
import { AiFillInfoCircle, AiFillHome, AiFillPhone, AiFillBook, AiFillIdcard, AiFillMessage } from 'react-icons/ai';
import { FaCommentDots } from "react-icons/fa6";
import { FaHouseUser } from "react-icons/fa";
import { GiFrozenBody } from "react-icons/gi";
import { IoLanguageSharp } from "react-icons/io5";
import { TiPointOfInterest } from "react-icons/ti";
import { SiStylelint } from "react-icons/si";
import { MdFamilyRestroom } from "react-icons/md";

import { FaBriefcase } from 'react-icons/fa';
import Introduction from './Introduction';
import BasicInformation from './BasicInformation';
import PresentAddress from './PresentAddress';
import Education from './Education';
import Career from './Career';
import PhysicalAttributes from './PhysicalAttributes';
import Language from './Language';
import HobbiesInterest from './HobbiesInterest';
import ResidencyInformation from './ResidencyInformation';
import SpiritualSocialBackground from './SpiritualSocialBackground';
import LifeStyle from './LifeStyle';
import FamilyInformation from './FamilyInformation';

function DetailedProfile() {
	const [ openSection, setOpenSection ] = useState(null);

	const sections = [
		{ name: 'Introduction', component: Introduction, icon: <FaCommentDots /> },
		{ name: 'Basic Information', component: BasicInformation, icon: <AiFillInfoCircle /> },
		{ name: 'Present Address', component: PresentAddress, icon: <AiFillHome /> },
		{ name: 'Residency Information', component: ResidencyInformation, icon: <FaHouseUser /> },
		{ name: 'Education', component: Education, icon: <AiFillBook /> },
		{ name: 'Career', component: Career, icon: <FaBriefcase /> },
		{ name: 'Physical Attributes', component: PhysicalAttributes, icon: <AiFillIdcard /> },
		{ name: 'Language', component: Language, icon: <IoLanguageSharp /> },
		{ name: 'Hobbies & Interest', component: HobbiesInterest, icon: <TiPointOfInterest /> },
		{ name: 'Spiritual & Social Background', component: SpiritualSocialBackground, icon: <AiFillMessage /> },
		{ name: 'Life Style', component: LifeStyle, icon: <SiStylelint /> },
		{ name: 'Family Information', component: FamilyInformation, icon: <MdFamilyRestroom /> },
	];

	const toggleSection = (section) => {
		setOpenSection(openSection === section ? null : section);
	};
	console.log(sections.length);

	const renderSection = (section, Component, Icon, index) => {
		const isOpen = openSection === section;
		return (
			<div className="" key={section}>
				<div
					className={`cursor-pointer font-bold text-lg tracking-wide text-headingGray min-w-max transition-all ${isOpen && 'text-primary'}`}
					onClick={() => toggleSection(section)}
				>
					<div className="flex items-center gap-6">
						<p className='text-xl md:text-3xl border rounded-full p-2 bg-white'>{Icon}</p>
						<span className="ml-2">{section}</span>
					</div>
				</div>
				<div className={`${sections.length == index + 1 ? 'border-l-0' : 'border-l'} ml-[18px] md:ml-6 overflow-hidden transition-all duration-1000 ease-in-out`}>
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
		<div className='mb-16'>
			{sections.map(({ name, component, icon, index }) => renderSection(name, component, icon, index))}
		</div>
	);
}

export default DetailedProfile;
