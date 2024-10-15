import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import axios from 'axios';
import { RxCross2 } from "react-icons/rx";
import { toast } from 'react-hot-toast';


const Hobbies = () => {
	const [ isOpen, setIsOpen ] = useState(false);
	const [ selectedHobbies, setSelectedHobbies ] = useState([]);
	const [ error, setError ] = useState();
	const [ searchTerm, setSearchTerm ] = useState('');
	const dropdownRef = useRef(null);

	const hobbiesList = [
		'Dancing', 'Music', 'Singing', 'Reading', 'Sport',
		'Painting', 'Traveling', 'Cooking', 'Gardening', 'Photography',
		'Writing', 'Drawing', 'Hiking', 'Camping', 'Fishing',
		'Baking', 'Crafting', 'Yoga', 'Meditation', 'Gaming',
		'Knitting', 'Sculpting', 'Woodworking', 'Cycling', 'Running',
		'Playing Instruments', 'Volunteering', 'Birdwatching', 'Horseback Riding', 'Rock Climbing',
		'Surfing', 'Swimming'
	];

	const toggleDropdown = () => setIsOpen(!isOpen);

	const handleSelect = (hobby) => {
		if (selectedHobbies.includes(hobby)) {
			setSelectedHobbies(selectedHobbies.filter((h) => h !== hobby));
		} else {
			setSelectedHobbies([ ...selectedHobbies, hobby ]);
		}
	};

	const handleUnselect = (hobby) => {
		setSelectedHobbies(selectedHobbies.filter((h) => h !== hobby));
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

	const handleSubmit = async (e) => {
		e.preventDefault();

		const dataToSubmit = {
			hobbies: selectedHobbies,
		};

		if (selectedHobbies.length < 5) {
			setError('Minimum 5 hobbies are required');
			toast.error('Please correct all highlighted errors!');
			return;
		}

		console.log('Form submitted:', dataToSubmit);

		try {
			const response = await axios.post('', dataToSubmit);
			console.log('Response:', response.data);
			toast.success('Hobbies update successfully');
		} catch (error) {
			console.error('Error submitting data:', error);
			toast.error('Hobbies updated failed!');
		}
	};

	const filteredHobbies = hobbiesList.filter(hobby =>
		hobby.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="box-shadow bg-white border rounded-md mx-auto">
			<p className="px-6 py-3 font-medium border-b text-headingGray">Hobbies</p>
			<form className="py-4 px-6 text-sm space-y-5 md:space-y-0" onSubmit={handleSubmit}>
				<div className='mb-4'>
					<label htmlFor="hobbies" className="block font-medium mb-1 mt-1 text-headingGray">Hobbies List<span className="text-red-500"> *</span></label>

					{/* Display selected hobbies */}
					{selectedHobbies.length > 0 && (
						<div className="flex flex-wrap mb-2">
							{selectedHobbies.map((hobby, index) => (
								<div key={index} className="mr-3 mb-2 flex items-center justify-center bg-primary text-white pl-3 pr-2 py-1 rounded-full">
									<span>{hobby}</span>
									<button type="button" className="ml-2 text-white" onClick={() => handleUnselect(hobby)}><RxCross2 size={14} /></button>
								</div>
							))}
						</div>
					)}

					<div className="relative inline-block w-full" ref={dropdownRef}>
						<div className="cursor-pointer flex justify-between items-center mt-1 p-3 w-full rounded-md border border-gray-300 shadow-sm outline-none hover:ring-primary hover:border-primary text-sm text-gray-700"
							onClick={toggleDropdown}
						>
							<p>{selectedHobbies.length > 0 ? 'Select More Hobbies' : 'Select Hobbies'}</p>
							<span><IoIosArrowDown /></span>
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
											setSearchTerm(e.target.value)
											setError('')
										}}
										className="w-full border border-gray-300 p-2 rounded-md outline-none focus:border-gold"
									/>
								</div>

								<div className="flex flex-wrap gap-4 p-4 max-h-72 overflow-y-auto customScroll-bar">
									{filteredHobbies.map((hobby, index) => (
										<div
											key={index}
											className={`cursor-pointer p-2 text-center px-4 rounded-full ${selectedHobbies.includes(hobby) ? 'bg-gold' : 'bg-gray-200 hover:bg-gray-300'}`}
											onClick={() => {
												handleSelect(hobby)
												setError('')
											}}
										>
											{hobby}
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>

				{error && <p className="text-red-500">{error}</p>}

				<div className="col-span-2 flex justify-end mt-4">
					<button type="submit" className="gradient-btn px-4 py-2 rounded-md text-sm">Update</button>
				</div>
			</form >
		</div >
	);
};

export default Hobbies;
