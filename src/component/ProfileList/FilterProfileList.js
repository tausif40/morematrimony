import React, { useState } from 'react';
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { LiaPenSolid } from "react-icons/lia";
import { LuPencilLine } from "react-icons/lu";

const FilterSection = ({ title, children }) => {
	const [ isOpen, setIsOpen ] = useState(false);

	const showEditPopup = () => {
		alert('open')
	}

	return (
		<div className=" border rounded-md overflow-hidden">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={`w-full text-left flex justify-between items-center px-4 py-2 text-gray-700 ${isOpen ? 'bg-gray-200 hover:bg-gray-200' : 'hover:bg-gray-100'}`}
			>
				<p className='font-semibold'>{title}</p>
				<div className='flex items-center gap-3'>
					{isOpen && <p className='cursor-pointer p-1 hover:bg-gray-100 rounded-md' onClick={showEditPopup}><LuPencilLine size={16} /></p>}
					{isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
				</div>
			</button>
			<div
				className={`overflow-hidden duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
					}`}
			>
				<div className="p-4 bg-white text-sm">
					{children}
				</div>
			</div>
		</div>
	);
};

const FilterProfileList = () => {
	return (
		<div className="container p-4 border rounded-lg shadow-sm bg-white text-black">
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

				<FilterSection title="Religious Details">
					<p>Religious filters go here</p>
				</FilterSection>

				<FilterSection title="Professional Details">
					<p>Professional filters go here</p>
				</FilterSection>

				<FilterSection title="Location Details">
					<p>Location filters go here</p>
				</FilterSection>

				<FilterSection title="Lifestyle">
					<p>Lifestyle filters go here</p>
				</FilterSection>

				<FilterSection title="Family Details">
					<p>Family filters go here</p>
				</FilterSection>

				<FilterSection title="Recently active profiles">
					<p>Activity filters go here</p>
				</FilterSection>

				<FilterSection title="Profile Type">
					<p>Profile type filters go here</p>
				</FilterSection>
			</div>
		</div>
	);
};

export default FilterProfileList;