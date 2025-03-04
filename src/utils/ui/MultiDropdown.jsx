import React, { useState, useEffect, useRef } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";

const MultiDropdown = ({ dataList, savedItems = [], onSelectionChange, fieldName }) => {
	const [ selectedItems, setSelectedItems ] = useState([]);
	const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);
	const [ searchQuery, setSearchQuery ] = useState("");
	const [ filteredItems, setFilteredItems ] = useState(dataList);
	const dropdownRef = useRef(null);
	const containerRef = useRef(null);

	useEffect(() => {
		// console.log("savedItems=\n", fieldName, "-", savedItems);

		if (savedItems?.length > 0) {
			setSelectedItems([ ...savedItems ]);
		}
	}, [ savedItems ]);


	// Toggle Dropdown
	const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

	const handleSelect = (item) => {
		// console.log("Selected item:", item);

		setSelectedItems((prevSelected) => {
			const alreadySelected = prevSelected.includes(item);
			let updatedSelection;

			if (alreadySelected) {
				updatedSelection = prevSelected.filter((selected) => selected !== item);
			} else {
				updatedSelection = [ ...prevSelected, item ];
			}

			onSelectionChange(updatedSelection.map((selected) => selected));

			return updatedSelection;
		});
	};

	// Remove Selected Tag
	const handleRemoveTag = (item) => {
		const updatedSelection = selectedItems.filter((selected) => selected !== item);
		setSelectedItems(updatedSelection);

		onSelectionChange(updatedSelection);
	};

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


	useEffect(() => {
		const filtered = dataList?.filter((item) =>
			item.toLowerCase().includes(searchQuery.toLowerCase())
		);
		setFilteredItems(filtered);
	}, [ searchQuery, dataList ]);

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollLeft = containerRef.current.scrollWidth;
		}
	}, [ selectedItems ]);

	return (
		<div className="relative w-full" ref={dropdownRef}>
			{/* Selected Tags */}
			<div
				className="flex items-center border border-gray-300 rounded-md px-2 h-[46px] cursor-pointer gap-2 overflow-hidden hover:overflow-x-auto customHorizontalScroll transition duration-0 hover:duration-300"
				onClick={toggleDropdown}
				ref={containerRef}
			>
				{selectedItems?.map((item) => (
					<div
						key={item}
						className="flex items-center bg-gray-100 text-gray-600 rounded px-2 py-1 min-w-max capitalize"
					>
						{item}
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
				<div className="ml-auto py-4 px-2">
					<IoIosArrowDown className="text-gray-700" />
				</div>
			</div>

			{/* Dropdown Options */}
			{isDropdownOpen && (
				<div className="absolute z-50 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg">
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
					<div className="max-h-[50vh] overflow-y-auto shadow-xl text-black">
						{filteredItems?.map((item) => (
							<div
								key={item}
								onClick={() => handleSelect(item)}
								className={`flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-blue-100 ${selectedItems.includes(item) ? "bg-blue-50" : ""
									}`}
							>
								<span className="capitalize">{item}</span>
								{selectedItems.includes(item) && (
									<span className="capitalize text-blue-600">✔</span>
								)}
							</div>
						))}
						{filteredItems?.length === 0 && (
							<p className="px-4 py-2">No matches found</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default MultiDropdown;
