import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { toast } from 'react-hot-toast';
import '../../CSS/shakeText.css'
import { IoCheckmarkDoneOutline } from "react-icons/io5";

const Hobbies = ({ onFormSubmit, data }) => {
	const containerRef = useRef(null);
	const [ isOpen, setIsOpen ] = useState(false);
	const [ selectedHobbies, setSelectedHobbies ] = useState([]);
	const [ error, setError ] = useState('');
	const [ selectError, setSelectError ] = useState(null);
	const [ searchTerm, setSearchTerm ] = useState('');
	const dropdownRef = useRef(null);

	const { bobbie, hobbies, isLoading } = data;

	// console.log("Hobby data", data);
	// console.log("selectedHobbies", selectedHobbies);
	useEffect(() => {
		setSelectedHobbies(bobbie?.hobbiesList || []);
	}, [ bobbie ]);

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollLeft = containerRef.current.scrollWidth;
		}
	}, [ selectedHobbies ]);

	const toggleDropdown = () => setIsOpen(!isOpen);

	const handleSelect = (hobbyName) => {
		setError('')
		setSelectError(null)
		if (selectedHobbies.length >= 5) {
			setSelectError('You can select only five')
			return;
		}
		const hobby = hobbies.hobby.find((h) => h.name === hobbyName);
		if (selectedHobbies.some((h) => h._id === hobby._id)) {
			setSelectedHobbies(selectedHobbies.filter((h) => h._id !== hobby._id));
		} else {
			setSelectedHobbies([ ...selectedHobbies, hobby ]);
		}
	};

	const handleUnselect = (hobbyId, event) => {
		event.stopPropagation();
		setSelectError(null)
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
					{/* {selectedHobbies?.length > 0 && (
						<div className="flex flex-wrap mb-2">
							{selectedHobbies?.map((hobby) => (
								<div key={hobby?._id} className="mr-3 mb-2 flex items-center justify-center bg-gray-200 text-gray-700 pl-3 pr-2 py-1 rounded-full capitalize">
									<span>{hobby?.name}</span>
									<button type="button" className="ml-2 text-white" onClick={() => handleUnselect(hobby?._id)}>
										<RxCross2 size={14} color='red' />
									</button>
								</div>
							))}
						</div>
					)} */}

					<div className="relative w-full" ref={dropdownRef}>
						<div className={`flex items-center justify-between px-2 border rounded-md pr-3 h-[46px] cursor-pointer gap-2 customHorizontalScroll overflow-hidden hover:overflow-x-auto transition duration-0 hover:duration-300 ${isOpen ? 'border-primary' : 'border-gray-300'}`} onClick={toggleDropdown} ref={containerRef}>
							{/* <p>{selectedHobbies?.length > 0 ? 'Select More Hobbies' : 'Select Hobbies'}</p> */}
							{/* Display selected hobbies */}
							{selectedHobbies?.length > 0 ? (
								<div className="flex items-center text-gray-600 rounded py-1 gap-2">
									{selectedHobbies?.map((hobby) => (
										<div key={hobby?._id} className="flex items-center justify-center bg-gray-100 text-gray-600 rounded-full pl-3 pr-2 py-1 capitalize">
											<span className='min-w-max'>{hobby?.name}</span>
											<button type="button" className="ml-2 text-white" onClick={(e) => handleUnselect(hobby?._id, e)}>
												<RxCross2 size={14} color='red' />
											</button>
										</div>
									))}
								</div>
							)
								: <div className='flex items-center justify-between w-full text-gray-600 '>
									<p className='min-w-max'>Select Hobbies</p>
								</div>
							}
							<p><IoIosArrowDown /></p>
						</div>

						{isOpen && (
							<div className="absolute mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
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
									<div className={`${selectError && 'shakeText'}`}>
										<p className='text-red-500 font-light text-sm pt-1'>{selectError || 'select any five'}</p>
									</div>
								</div>

								{/* Render hobbies in the dropdown */}
								<div className="flex flex-wrap gap-3 px-4 pb-4 max-h-72 overflow-y-auto customScroll-bar">
									{filteredHobbies?.map((hobby) => (
										<div
											key={hobby._id}
											className={`cursor-pointer py-2 text-xs text-center px-3 rounded-full ${selectedHobbies?.some((h) => h._id === hobby._id) ? 'bg-gold' : 'bg-gray-200 hover:bg-gray-300'}`}
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

				<div className="col-span-2 flex justify-between items-center mt-4">
					<p className="text-green-500 text-xs font-semibold mt-1">{bobbie !== undefined && <p className='flex items-center gap-1'>Completed <IoCheckmarkDoneOutline size={16} /></p>}</p>
					<button type="submit" className="gradient-btn px-4 py-2 rounded-md text-sm" disabled={isLoading}>
						Update
					</button>
				</div>
			</form>
		</div>
	);
};

export default Hobbies;
