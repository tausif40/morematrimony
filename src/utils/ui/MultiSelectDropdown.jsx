import React, { useState, useEffect, useRef } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";

const MultiSelectDropdown = ({ dataList, onSelectionChange, fieldName }) => {
	const [ selectedItems, setSelectedItems ] = useState([]);
	const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);
	const [ searchQuery, setSearchQuery ] = useState("");
	const [ filteredItems, setFilteredItems ] = useState(dataList);
	const dropdownRef = useRef(null);
	const containerRef = useRef(null);
	// Toggle Dropdown
	const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

	// Handle Selection
	const handleSelect = (item) => {
		if (item.id === 1) return;
		const alreadySelected = selectedItems?.some((selected) => selected._id === item._id);
		let updatedSelection;
		if (alreadySelected) {
			updatedSelection = selectedItems?.filter((selected) => selected._id !== item._id);
		} else {
			updatedSelection = [ ...selectedItems, item ];
		}
		setSelectedItems(updatedSelection);

		// Pass only `_id` to the parent component
		onSelectionChange(updatedSelection?.map((selected) => selected._id));
	};

	// Remove Selected Tag
	const handleRemoveTag = (item) => {
		const updatedSelection = selectedItems?.filter((selected) => selected._id !== item._id);
		setSelectedItems(updatedSelection);

		// Pass updated `_id` list to the parent component
		onSelectionChange(updatedSelection?.map((selected) => selected._id));
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
		const filtered = dataList?.filter((item) =>
			item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
		);
		setFilteredItems(filtered);
	}, [ searchQuery, dataList ]);

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollLeft = containerRef.current.scrollWidth;
		}
	}, [ selectedItems ]);

	return (
		<div className="relative w-full " ref={dropdownRef}>
			{/* Selected Tags */}
			<div
				className="flex items-center border border-gray-300 rounded-md px-2 h-[46px] cursor-pointer gap-2 overflow-hidden hover:overflow-x-auto customHorizontalScroll transition duration-0 hover:duration-300"
				onClick={toggleDropdown} ref={containerRef}
			>
				{selectedItems?.map((item) => (
					<div
						key={item._id}
						className="flex items-center bg-gray-100 text-gray-600 rounded px-2 py-1 min-w-max"
					>
						{item.name}
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

					{/* Dropdown Options */}
					<div
						className="max-h-[50vh] overflow-y-auto shadow-xl text-black">
						{filteredItems?.map((item) => (
							<div
								key={item._id}
								onClick={() => handleSelect(item)}
								className={`flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-blue-100 ${item.id === 1 && 'bg-gray-400 hover:bg-gray-400 cursor-default text-white'} ${selectedItems.some((selected) => (selected._id || selected.name) === (item._id || item.name)) ? "bg-blue-50" : ""}`}
							>
								<span>{item.name}</span>
								{selectedItems?.some((selected) => selected._id === item._id) && (
									<span className="text-blue-600">✔</span>
								)}
							</div>
						))}
						{filteredItems === undefined && <p className="px-4 py-2">Wait ...</p>}
						{dataList?.length === 0 && <p className="px-4 py-2">List is Empty</p>}
					</div>
				</div>
			)}
		</div>
	);
};

export default MultiSelectDropdown;
