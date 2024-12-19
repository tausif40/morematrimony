import React, { useState, useEffect, useRef } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";

const OccupationSelect = ({ dataList, onSelectionChange, fieldName }) => {
	const [ selectedItems, setSelectedItems ] = useState([]);
	const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);
	const [ searchQuery, setSearchQuery ] = useState("");
	const [ filteredItems, setFilteredItems ] = useState([]);
	const dropdownRef = useRef(null);
	const containerRef = useRef(null);

	const flattenDataList = () => {
		return dataList.flatMap((group) =>
			group.roles.map((role) => ({
				...role,
				occupationName: group.occupationName,
			}))
		);
	};

	const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

	const handleSelect = (item) => {
		const alreadySelected = selectedItems.some((selected) => selected.id === item.id);
		let updatedSelection;
		if (alreadySelected) {
			updatedSelection = selectedItems.filter((selected) => selected.id !== item.id);
		} else {
			updatedSelection = [ ...selectedItems, item ];
		}
		setSelectedItems(updatedSelection);

		// Pass only role names to the parent component
		onSelectionChange(updatedSelection.map((selected) => selected.role));
	};

	// Remove Selected Tag
	const handleRemoveTag = (item) => {
		const updatedSelection = selectedItems.filter((selected) => selected.id !== item.id);
		setSelectedItems(updatedSelection);

		// Pass updated role names list to the parent component
		onSelectionChange(updatedSelection.map((selected) => selected.role));
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// Filter items based on search query
	useEffect(() => {
		const flattenedList = flattenDataList();
		const filtered = flattenedList.filter((item) =>
			item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.occupationName.toLowerCase().includes(searchQuery.toLowerCase())
		);
		setFilteredItems(filtered);
	}, [ searchQuery, dataList ]);

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollLeft = containerRef.current.scrollWidth;
		}
	}, [ selectedItems ]);

	// Group items by occupationName
	const groupByOccupation = (items) => {
		return items.reduce((acc, item) => {
			if (!acc[ item.occupationName ]) {
				acc[ item.occupationName ] = [];
			}
			acc[ item.occupationName ].push(item);
			return acc;
		}, {});
	};

	return (
		<div className="relative w-full" ref={dropdownRef}>
			{/* Selected Tags */}
			<div
				className="flex items-center border border-gray-300 rounded-md px-2 h-[46px] cursor-pointer gap-2 overflow-hidden hover:overflow-x-auto customHorizontalScroll transition duration-0 hover:duration-300"
				onClick={toggleDropdown}
				ref={containerRef}
			>
				{selectedItems.map((item) => (
					<div
						key={item.id}
						className="flex items-center bg-gray-100 text-gray-600 rounded px-2 py-1 min-w-max"
					>
						{item.role}
						<button
							className="ml-1 text-red-500"
							onClick={(e) => {
								e.stopPropagation();
								handleRemoveTag(item);
							}}
						>
							<RxCross1 size={12} />
						</button>
					</div>
				))}
				{selectedItems.length === 0 && <p className="text-[#374151]">{fieldName}</p>}
				<div className="ml-auto py-4 px-1">
					<IoIosArrowDown className="text-gray-700" />
				</div>
			</div>

			{/* Dropdown Options */}
			{isDropdownOpen && (
				<div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg">
					{/* Search Bar */}
					<div className="p-2">
						<input
							type="search"
							placeholder="Search..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full border border-gray-300 focus:border-gold rounded-md px-3 py-2 focus:outline-none"
						/>
					</div>

					{/* Grouped Dropdown Options */}
					<div className="max-h-[50vh] overflow-y-auto shadow-xl text-black">
						{Object.entries(groupByOccupation(filteredItems)).map(([ occupationName, roles ]) => (
							<div key={occupationName} className="mb-2">
								<div className="bg-gray-400 px-4 py-2 text-white">
									{occupationName}
								</div>
								{/* List of Roles */}
								{roles.map((role) => (
									<div
										key={role.id}
										onClick={() => handleSelect(role)}
										className={`flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-blue-100 ${selectedItems.some((selected) => selected.id === role.id) ? "bg-blue-50" : ""
											}`}
									>
										<span>{role.role}</span>
										{selectedItems.some((selected) => selected.id === role.id) && (
											<span className="text-blue-600">✔</span>
										)}
									</div>
								))}
							</div>
						))}
						{filteredItems.length === 0 && <p className="px-4 py-2">No matching roles found</p>}
					</div>
				</div>
			)}
		</div>
	);
};


export default OccupationSelect;
