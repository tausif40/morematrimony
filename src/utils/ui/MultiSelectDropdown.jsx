import React, { useState, useEffect } from "react";

const MultiSelectDropdown = ({ countryList }) => {
	const [ selectedCountries, setSelectedCountries ] = useState([]);
	const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);

	const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

	const handleSelect = (country) => {
		if (selectedCountries.some((item) => item._id === country._id)) {
			setSelectedCountries(
				selectedCountries.filter((item) => item._id !== country._id)
			);
		} else {
			setSelectedCountries([ ...selectedCountries, country ]);
		}
	};

	const handleRemoveTag = (country) => {
		setSelectedCountries(
			selectedCountries.filter((item) => item._id !== country._id)
		);
	};

	return (
		<div className="relative w-72">
			{/* Selected Tags */}
			<div
				className="flex flex-wrap items-center border border-gray-300 rounded-md p-2 cursor-pointer"
				onClick={toggleDropdown}
			>
				{selectedCountries.map((country) => (
					<div
						key={country._id}
						className="flex items-center bg-blue-100 text-blue-600 rounded px-2 py-1 mr-2 mb-1"
					>
						{country.name}
						<button
							className="ml-1 text-red-500"
							onClick={(e) => {
								e.stopPropagation();
								handleRemoveTag(country);
							}}
						>
							✕
						</button>
					</div>
				))}
				<div className="ml-auto">
					<span className="text-gray-400">▼</span>
				</div>
			</div>

			{/* Dropdown Options */}
			{isDropdownOpen && (
				<div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-56 overflow-y-auto shadow-lg">
					{countryList.map((country) => (
						<div
							key={country._id}
							onClick={() => handleSelect(country)}
							className={`flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-blue-100 ${selectedCountries.some((item) => item._id === country._id)
								? "bg-blue-50"
								: ""
								}`}
						>
							<span>{country.name}</span>
							{selectedCountries.some((item) => item._id === country._id) && (
								<span className="text-blue-600">✔</span>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default MultiSelectDropdown;