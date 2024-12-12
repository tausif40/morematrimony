import React, { useState } from 'react';
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { LiaPenSolid } from "react-icons/lia";
import { LuPencilLine } from "react-icons/lu";
import FilterProfileEdit from './FilterProfileEdit';

const FilterSection = ({ title, children }) => {
	const [ isOpen, setIsOpen ] = useState(false);
	const [ editFilterPopup, setEditFilterPopup ] = useState(false);
	const [ filterData, setFilterData ] = useState({});

	const showEditPopup = (children) => {
		// alert('open')
		setIsOpen(true)
		setEditFilterPopup(true);
		setFilterData(children);
	}

	return (
		<>
			{editFilterPopup && <FilterProfileEdit onClose={() => setEditFilterPopup(false)} filterData={filterData} />}
			<div className="border rounded-md overflow-hidden">
				<button
					className={`w-full text-left flex justify-between items-center px-4 py-2 text-gray-700 ${isOpen ? 'bg-gray-200 hover:bg-gray-200' : ''} cursor-auto`}
				>
					<p className='font-semibold cursor-pointer' onClick={() => setIsOpen(!isOpen)}>{title}</p>
					<div className='flex items-center gap-3 z-40'>
						{isOpen && <p className='cursor-pointer p-1 hover:bg-gray-100 rounded-md' onClick={() => showEditPopup(children)}><LuPencilLine size={16} /></p>
						}
						{isOpen
							? <MdKeyboardArrowUp onClick={() => setIsOpen(!isOpen)} className='cursor-pointer ' />
							: <MdKeyboardArrowDown onClick={() => setIsOpen(!isOpen)} className='cursor-pointer ' />}
					</div>
				</button>
				<div
					className={`overflow-hidden duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
				>
					<div className="p-4 bg-white text-sm">
						{children}
					</div> 
				</div>
			</div>
		</>
	);
};

const FilterProfileList = () => {
	return (
		<div className="container p-4 rounded-lg shadow-sm bg-white text-black">
			{/* Header */}
			<div className="text-lg font-semibold mb-4 relative top-0">Filter Profiles</div>

			<div className='space-y-4'>
				{/* Filter Sections */}
				<FilterSection title="Basic Details">
					<div className="space-y-2">
						<div className="flex justify-between">
							<span>Age</span>
							<p className='flex items-center gap-2'>18 Yrs - 21 Yrs </p>
						</div>
						<div className="flex justify-between">
							<span>Height</span>
							<p className='flex items-center gap-2'>4'10" - 5'10" </p>
						</div>
						<div className="flex justify-between">
							<span>Profile Created By</span>
							<p className='flex items-center gap-2'>Any </p>
						</div>
						{/* <button className="text-orange-500 text-sm">View more ▼</button> */}
					</div>
				</FilterSection>

				<FilterSection title="Present Address">
					<p>Present Address filters go here</p>
				</FilterSection>

				<FilterSection title="Residency Information">
					<p>Residency Information go here</p>
				</FilterSection>

				<FilterSection title="Education Details">
					<p>Education Details go here</p>
				</FilterSection>

				<FilterSection title="Career">
					<p>Career filters go here</p>
				</FilterSection>

				<FilterSection title="Physical Attributes">
					<p>Physical Attributes filters go here</p>
				</FilterSection>

				<FilterSection title="Language">
					<p>Language filters go here</p>
				</FilterSection>

				<FilterSection title="Hobbies">
					<p>Hobbies filters go here</p>
				</FilterSection>

				<FilterSection title="Religious Details">
					<p>Religious filters go here</p>
				</FilterSection>

				<FilterSection title="Spiritual Details">
					<p>Spiritual Details go here</p>
				</FilterSection>

				<FilterSection title="Lifestyle">
					<p>Lifestyle filters go here</p>
				</FilterSection>

				<FilterSection title="Family Details">
					<p>Family filters go here</p>
				</FilterSection>

				<FilterSection title="Partner Expectation">
					<p>Partner Expectation go here</p>
				</FilterSection>

			</div>
		</div>
	);
};

export default FilterProfileList;