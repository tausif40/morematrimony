import React, { useState } from 'react';

const FilterSection = ({ title, children }) => {
	const [ isOpen, setIsOpen ] = useState(false);

	return (
		<div className=" border rounded-md overflow-hidden">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={`w-full text-left flex justify-between items-center px-4 py-2 text-gray-700 ${isOpen ? 'bg-gray-200 hover:bg-gray-200' : 'hover:bg-gray-100'}`}
			>
				<p className='font-semibold'>{title}</p>
				<span>{isOpen ? '▲' : '▼'}</span>
			</button>
			<div
				className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
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
							<span>18 Yrs - 21 Yrs ✏️</span>
						</div>
						<div className="flex justify-between">
							<span>Height</span>
							<span>4'10" - 5'10" ✏️</span>
						</div>
						<div className="flex justify-between">
							<span>Profile Created By</span>
							<span>Any ✏️</span>
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