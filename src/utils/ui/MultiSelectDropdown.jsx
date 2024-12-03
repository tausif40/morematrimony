import React, { useState, useRef, useEffect } from 'react';
// import { ChevronDown, ChevronUp, Search } from 'lucide-react';

export default function MultiSelectDropdown({
	options,
	selectedValues,
	onChange,
	placeholder = 'Select Options',
}) {
	const [ isOpen, setIsOpen ] = useState(false);
	const [ searchTerm, setSearchTerm ] = useState('');
	const dropdownRef = useRef(null);
	const searchInputRef = useRef(null);

	useEffect(() => {
		function handleClickOutside(event) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	useEffect(() => {
		if (isOpen && searchInputRef.current) {
			searchInputRef.current.focus();
		}
	}, [ isOpen ]);

	const handleCheckboxChange = (id) => {
		const updatedSelectedValues = selectedValues.includes(id)
			? selectedValues.filter((v) => v !== id)
			: [ ...selectedValues, id ];
		onChange(updatedSelectedValues);
	};

	const filteredOptions = options.filter((option) =>
		option.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const buttonText =
		selectedValues.length > 0
			? options
				.filter((option) => selectedValues.includes(option._id))
				.map((option) => option.name)
				.join(', ')
			: placeholder;

	return (
		<div className="relative w-64" ref={dropdownRef}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
			>
				<div className="flex items-center justify-between">
					<div className="overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2 max-w-[calc(100%-1.5rem)]">
						<span className="inline-block">{buttonText}</span>
					</div>
					{/* {isOpen ? (
						<ChevronUp className="w-4 h-4 ml-2 flex-shrink-0" />
					) : (
						<ChevronDown className="w-4 h-4 ml-2 flex-shrink-0" />
					)} */}
				</div>
			</button>

			{isOpen && (
				<div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
					<div className="p-2 border-b border-gray-300">
						<div className="relative">
							<input
								ref={searchInputRef}
								type="text"
								placeholder="Search..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full px-3 py-2 pl-8 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
							/>
							{/* <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" /> */}
						</div>
					</div>
					<div className="max-h-60 overflow-auto">
						{filteredOptions.map((option) => (
							<label
								key={option._id}
								className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
							>
								<input
									type="checkbox"
									checked={selectedValues.includes(option._id)}
									onChange={() => handleCheckboxChange(option._id)}
									className="w-4 h-4 mr-2 border-gray-300 rounded focus:ring-blue-500"
								/>
								<span>{option.name}</span>
							</label>
						))}
						{filteredOptions.length === 0 && (
							<div className="px-4 py-2 text-gray-500">No results found</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
