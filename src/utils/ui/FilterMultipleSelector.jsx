import React, { useState } from 'react';

const FilterMultipleSelector = ({ data, onClose }) => {
	const [ searchQuery, setSearchQuery ] = useState('');
	const [ selectedItems, setSelectedItems ] = useState([]);

	console.log("filter data -", data);
	const handleSearch = (e) => {
		setSearchQuery(e.target.value);
	};

	const filteredData = data?.filter((item) =>
		item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const handleCheckboxChange = (id) => {
		setSelectedItems((prev) =>
			prev.includes(id)
				? prev.filter((item) => item !== id)
				: [ ...prev, id ]
		);
	};

	const handleReset = () => {
		setSelectedItems([]);
		setSearchQuery('');
	};

	const handleApply = () => {
		console.log('Selected Items:', selectedItems);
		onClose();
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] flex flex-col gap-4">
				<div className="flex justify-between items-center">
					<h2 className="text-lg font-semibold">Select profile created by</h2>
					<button onClick={onClose} className="text-xl p-2 focus:outline-none">✕</button>
				</div>

				<div className="relative">
					<input
						type="text"
						placeholder="Search Profile created by"
						value={searchQuery}
						onChange={handleSearch}
						className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
					/>
				</div>

				<div className="flex flex-col gap-2 max-h-72 overflow-y-auto">
					{filteredData.map((item) => (
						<label
							key={item._id}
							className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
						>
							<input
								type="checkbox"
								checked={selectedItems.includes(item._id)}
								onChange={() => handleCheckboxChange(item._id)}
								className="w-4 h-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
							/>
							<span className="text-sm">{item.name}</span>
						</label>
					))}
				</div>

				<div className="flex justify-end gap-2 mt-auto">
					<button
						onClick={handleReset}
						className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 text-sm"
					>
						Reset
					</button>
					<button
						onClick={handleApply}
						className="px-4 py-2 border border-transparent rounded-md bg-orange-500 text-white hover:bg-orange-600 text-sm"
					>
						Apply
					</button>
				</div>
			</div>
		</div>
	);
};

export default FilterMultipleSelector;

