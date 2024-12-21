import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { toast } from 'react-hot-toast';

const Hobbies = ({ onFormSubmit, data }) => {
	const [ isOpen, setIsOpen ] = useState(false);
	const [ selectedHobbies, setSelectedHobbies ] = useState([]);
	const [ error, setError ] = useState('');
	const [ searchTerm, setSearchTerm ] = useState('');
	const dropdownRef = useRef(null);

	const { hobbies } = data;

	const toggleDropdown = () => setIsOpen(!isOpen);

	const handleSelect = (hobbyName) => {
		setError('')
		const hobby = hobbies.hobby.find((h) => h.name === hobbyName);
		if (selectedHobbies.some((h) => h._id === hobby._id)) {
			setSelectedHobbies(selectedHobbies.filter((h) => h._id !== hobby._id));
		} else {
			setSelectedHobbies([ ...selectedHobbies, hobby ]);
		}
	};

	const handleUnselect = (hobbyId) => {
		setSelectedHobbies(selectedHobbies.filter((h) => h._id !== hobbyId));
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (selectedHobbies.length < 1) {
			toast.error('Minimum 1 hobby is required');
			setError('Minimum 1 hobby is required');
			return;
		} else if (selectedHobbies.length > 6) {
			setError('Hobbies must contain less than or equal to 5');
			toast.error('Hobbies must contain less than or equal to 5');
			return;
		}
		setError('')
		const hobbyIds = selectedHobbies.map((h) => h._id);
		onFormSubmit({ hobbies: { hobbiesList: hobbyIds } });
	};

	const filteredHobbies = hobbies?.hobby?.filter((hobby) =>
		hobby.name.toLowerCase().includes(searchTerm.toLowerCase())
	);
	return (
		<div className="box-shadow bg-white border rounded-md mx-auto">
			<p className="px-6 py-3 font-medium border-b text-headingGray">Hobbies</p>
			<form className="py-4 px-6 text-sm space-y-5 md:space-y-0" onSubmit={handleSubmit}>
				<div className="mb-4">
					<label htmlFor="hobbies" className="block font-medium mb-1 mt-1 text-headingGray">
						Hobbies List<span className="text-red-500"> *</span>
					</label>

					{/* Display selected hobbies */}
					{selectedHobbies.length > 0 && (
						<div className="flex flex-wrap mb-2">
							{selectedHobbies.map((hobby) => (
								<div key={hobby._id} className="mr-3 mb-2 flex items-center justify-center bg-primary text-white pl-3 pr-2 py-1 rounded-full">
									<span>{hobby.name}</span>
									<button type="button" className="ml-2 text-white" onClick={() => handleUnselect(hobby._id)}>
										<RxCross2 size={14} />
									</button>
								</div>
							))}
						</div>
					)}

					<div className="relative inline-block w-full" ref={dropdownRef}>
						<div
							className="cursor-pointer flex justify-between items-center mt-1 p-3 w-full rounded-md border border-gray-300 shadow-sm outline-none hover:ring-primary hover:border-primary text-sm text-gray-700"
							onClick={toggleDropdown}
						>
							<p>{selectedHobbies.length > 0 ? 'Select More Hobbies' : 'Select Hobbies'}</p>
							<span>
								<IoIosArrowDown />
							</span>
						</div>

						{isOpen && (
							<div className="absolute mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-full">
								{/* Search input */}
								<div className="p-4">
									<input
										type="search"
										placeholder="Search hobbies..."
										value={searchTerm}
										onChange={(e) => {
											setSearchTerm(e.target.value);
											setError('');
										}}
										className="w-full border border-gray-300 p-2 rounded-md outline-none focus:border-gold"
									/>
								</div>

								{/* Render hobbies in the dropdown */}
								<div className="flex flex-wrap gap-3 justify-between p-4 max-h-72 overflow-y-auto customScroll-bar">
									{filteredHobbies?.map((hobby) => (
										<div
											key={hobby._id}
											className={`cursor-pointer py-2 text-xs text-center px-3 rounded-full ${selectedHobbies.some((h) => h._id === hobby._id) ? 'bg-gold' : 'bg-gray-200 hover:bg-gray-300'}`}
											onClick={() => handleSelect(hobby.name)}
										>
											{hobby.name}
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>

				{error && <p className="text-red-500">{error}</p>}

				<div className="col-span-2 flex justify-end mt-4">
					<button type="submit" className="gradient-btn px-4 py-2 rounded-md text-sm">
						Update
					</button>
				</div>
			</form>
		</div>
	);
};

export default Hobbies;
