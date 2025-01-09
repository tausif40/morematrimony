import React, { useEffect } from 'react';


export default function FilterPopup({
	activePopup,
	filteredOptions,
	selectedFilters,
	handleFilterSelect,
	setActivePopup,
	searchTerm,
	setSearchTerm,
	clearCategoryFilters,
}) {

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (event.target.id === "modal-wrapper") {
				setActivePopup(null);
			}
		};
		window.addEventListener("click", handleOutsideClick);

		return () => {
			window.removeEventListener("click", handleOutsideClick);
		};
	}, []);

	// useEffect(() => {
	// 	if (typeof selectedFilters[ activePopup ] === 'object') {
	// 		console.log("this is checkbox");
	// 	}
	// }, [ selectedFilters[ activePopup ] ])
	// console.log(typeof selectedFilters[ activePopup ]);

	return (
		<div id="modal-wrapper" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-md overflow-hidden shadow-lg w-full max-w-md relative">
				<div className='sticky top-0 bg-slate-200 px-6 pt-4 shadow'>
					<div className="flex justify-between items-center mb-2 ">
						<p className='text-gray-600 text-lg'>{activePopup}</p>
						<button onClick={() => setActivePopup(null)} className='absolute text-2xl text-gray-400 hover:text-red-500 top-1 right-3'>×</button>
					</div>
					<input
						type="search"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder="Search..."
						className="w-full mb-4 p-2 border rounded outline-none focus:border-hotRed"
					/>
				</div>
				<div className="px-6 py-2 min-h-[30vh] max-h-[50vh] overflow-y-auto">
					{filteredOptions?.map((option) => (
						<>
							{
								typeof selectedFilters[ activePopup ] === 'object' ?
									<label
										key={option._id || option}
										className="flex items-center hover:bg-slate-100 px-4 py-2 rounded"
									>
										<input
											type="checkbox"
											checked={selectedFilters[ activePopup ].includes(option._id || option)}
											onChange={() => handleFilterSelect(activePopup, option._id || option)}
										/>
										<span className="ml-2 tracking-wide text-gray-700">{option?.name || option}</span>
									</label>
									:
									typeof selectedFilters[ activePopup ] === 'string' &&
									<label
										key={option._id || option}
										for={option._id}
										className="flex items-center hover:bg-slate-100 px-4 py-2 rounded"
									>
										<input
											id={option._id}
											type="radio"
											checked={selectedFilters[ activePopup ].includes(option._id || option)}
											onChange={() => handleFilterSelect(activePopup, option._id || option)}
										/>
										<span className="ml-2 tracking-wide text-gray-700">{option?.name || option}</span>
									</label>
							}
						</>
					))}
				</div>
				<div className="flex justify-end gap-4 p-4 bg-gray-100 text-sm">
					<button
						onClick={() => clearCategoryFilters(activePopup)}
						className="px-4 py-1 bg-gray-400 text-white rounded"
					>
						Clear
					</button>
					<button
						onClick={() => setActivePopup(null)}
						className="px-4 py-1 gradient-btn text-white rounded"
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
}
