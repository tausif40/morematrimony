import React, { useEffect, useState } from 'react';

export default function FilterPopup({
	activePopup,
	filteredOptions,
	selectedFilters,
	handleFilterSelect,
	setActivePopup,
	searchTerm,
	setSearchTerm,
	getCategoryDisplayName,
	clearCategoryFilters,
}) {
	// console.log(activePopup, "-", filteredOptions);

	const [ search, setSearch ] = useState(false)

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (event.target.id === "modal-wrapper") {
				setSearchTerm('')
				setActivePopup(null);
			}
		};
		window.addEventListener("click", handleOutsideClick);

		return () => {
			window.removeEventListener("click", handleOutsideClick);
		};
	}, []);

	useEffect(() => {
		filteredOptions?.length > 6 ? setSearch(true) : setSearch(false)
	}, [])

	return (
		<div id="modal-wrapper" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-md overflow-hidden shadow-lg w-full max-w-md relative">
				<div className={`sticky top-0 bg-slate-200 px-6 shadow ${search && 'pt-4'}`}>
					<div className={`flex justify-between items-center mb-2 ${!search && 'py-4'}`}>
						<p className='text-gray-700 text-lg font-medium'>{getCategoryDisplayName(activePopup)} List</p>
						<button onClick={() => { setSearchTerm(''); setActivePopup(null); }} className='absolute text-2xl text-gray-500 hover:text-red-500 top-1 right-3'>×</button>
					</div>
					{search && <input
						type="search"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder="Search..."
						className="w-full mb-4 p-2 border rounded outline-none focus:border-hotRed"
					/>}
				</div>
				<div className={`px-6 py-2 min-h-[30vh] max-h-[50vh] overflow-y-auto`}>
					{filteredOptions?.map((option) => (
						<>
							{typeof selectedFilters[ activePopup ] === 'object' ?
								<>
									<label key={option._id || option} className={`flex items-center px-4 py-2 rounded ${(activePopup !== 'occupation' && activePopup !== 'education') && 'hover:bg-slate-100'}`}>
										{(activePopup !== 'occupation' && activePopup !== 'education') &&
											<input type="checkbox"
												checked={selectedFilters[ activePopup ].includes(option._id || option)}
												onChange={() => handleFilterSelect(activePopup, option._id || option)}
											/>}
										<span className={`ml-2 tracking-wide text-gray-700 capitalize ${activePopup === 'occupation' && 'font-semibold text-gray-900'} ${activePopup === 'education' && 'font-semibold text-gray-900'}`}>
											{option?.name || option}</span>
									</label>

									{option.roles && option.roles.map((role) => (
										<label key={role.id} className="flex items-center hover:bg-slate-100 px-4 py-2 rounded">
											<input
												type="checkbox"
												checked={selectedFilters[ activePopup ]?.includes(role.id)}
												onChange={() => handleFilterSelect(activePopup, role.id)}
											/>
											<span className="ml-2 tracking-wide text-gray-700 capitalize">{role.role}</span>
										</label>
									))}
								</>
								:
								typeof selectedFilters[ activePopup ] === 'string' &&
								<label key={option._id || option} htmlFor={option._id} className="flex items-center hover:bg-slate-100 px-4 py-2 rounded">
									<input id={option._id} type="radio"
										checked={selectedFilters[ activePopup ].includes(option._id || option)}
										onChange={() => handleFilterSelect(activePopup, option._id || option)}
									/>
									<span className="ml-2 tracking-wide text-gray-700 capitalize">{option?.name || option}</span>
								</label>
							}
						</>
					))}
				</div>

				<div className="flex justify-end gap-4 p-4 bg-gray-100 text-sm font-light">
					<button
						onClick={() => clearCategoryFilters(activePopup)}
						className="px-4 py-1 bg-gray-400 text-white rounded hover:bg-slate-400 transition-all"
					>
						Clear all
					</button>
					<button
						onClick={() => { setSearchTerm(''); setActivePopup(null) }}
						className="px-4 py-1 gradient-btn text-white rounded"
					>
						Submit
					</button>
				</div>
			</div>
		</div >
	);
}
