import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { toast } from 'react-hot-toast';
import '../../CSS/shakeText.css'

const Language = ({ onFormSubmit, data }) => {
	const containerRef = useRef(null);
	const [ isOpen, setIsOpen ] = useState(false);
	const [ selectedLanguages, setSelectedLanguages ] = useState([]);
	const [ error, setError ] = useState('');
	const [ searchTerm, setSearchTerm ] = useState('');
	const dropdownRef = useRef(null);
	// console.log(data);
	// const { bobbie, hobbies } = data;
	const { languages, languageData, languageLoading, isLoading } = data;
	// hobbies = languages / bobbie = languageData

	const [ formData, setFormData ] = useState({
		motherTongue: '',
	});

	useEffect(() => {
		setFormData({
			motherTongue: languageData?.motherTongue?._id || ''
		});
	}, [ languageData ]);

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollLeft = containerRef.current.scrollWidth;
		}
	}, [ selectedLanguages ]);

	// console.log(selectedLanguages);
	useEffect(() => {
		setSelectedLanguages(languageData?.knownLanguages || []);
	}, [ languageData ]);

	const toggleDropdown = () => setIsOpen(!isOpen);

	const handleSelect = (LangName) => {
		setError('')
		const hobby = languages.language.find((l) => l.name === LangName);
		if (selectedLanguages.some((l) => l._id === hobby._id)) {
			setSelectedLanguages(selectedLanguages.filter((h) => h._id !== hobby._id));
		} else {
			setSelectedLanguages([ ...selectedLanguages, hobby ]);
		}
	};

	const handleUnselect = (hobbyId, event) => {
		event.stopPropagation();
		setSelectedLanguages(selectedLanguages.filter((h) => h._id !== hobbyId));
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
		// if (selectedLanguages.length < 1) {
		// 	toast.error('Minimum 1 hobby is required');
		// 	setError('Minimum 1 hobby is required');
		// 	return;
		// } else if (selectedLanguages.length > 6) {
		// 	setError('Hobbies must contain less than or equal to 5');
		// 	toast.error('Hobbies must contain less than or equal to 5');
		// 	return;
		// }
		setError('')
		const hobbyIds = selectedLanguages.map((h) => h._id);
		// onFormSubmit({ hobbies: { hobbiesList: hobbyIds } });
		const dataToSubmit = {
			motherTongue: formData.motherTongue,
			knownLanguages: hobbyIds,
		};
		console.log("dataToSubmit-", dataToSubmit);
		onFormSubmit({ language: dataToSubmit });
	};

	const filteredHobbies = languages?.language?.filter((language) =>
		language.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setError('')
		setFormData((prevFormData) => ({
			...prevFormData,
			[ name ]: value,
		}));
	};


	return (
		<div className="box-shadow bg-white border rounded-md mx-auto">
			<p className="px-6 py-3 font-medium border-b text-headingGray">Language</p>
			<form className="md:grid grid-cols-2 gap-4 py-4 px-6 text-sm space-y-5 md:space-y-0" onSubmit={handleSubmit}>
				{/* <form className="py-4 px-6 text-sm space-y-5 md:space-y-0" onSubmit={handleSubmit}> */}
				<div>
					<label htmlFor="motherTongue" className="block font-medium my-1 text-headingGray">Mother Tongue<span className="text-red-500"> *</span></label>
					<select
						id="motherTongue"
						className="input-field text-gray-700"
						name="motherTongue"
						value={formData.motherTongue}
						onChange={handleChange}
					>
						<option value="" disabled>Select Mother Tongue</option>
						{languageLoading && !languages.length && <option>Loading languages...</option>}
						{languages?.language?.map((language) => (
							<option key={language._id} value={language._id}>
								{language.name}
							</option>
						))}
					</select>
					<p className="text-red-500 text-xs mt-1	">{error}</p>
				</div>

				<div className="mb-4">
					<label htmlFor="hobbies" className="block font-medium my-1 text-headingGray">
						Known Language<span className="text-red-500"> *</span>
					</label>

					<div className="relative w-full" ref={dropdownRef}>
						<div className={`flex items-center justify-between px-2 border rounded-md pr-3 h-[46px] cursor-pointer gap-2 customHorizontalScroll overflow-hidden hover:overflow-x-auto transition duration-0 hover:duration-300 ${isOpen ? 'border-primary' : 'border-gray-300'}`} onClick={toggleDropdown} ref={containerRef}>
							{/* <p>{selectedLanguages?.length > 0 ? 'Select More Hobbies' : 'Select Hobbies'}</p> */}
							{/* Display selected hobbies */}
							{selectedLanguages?.length > 0 ? (
								<div className="flex items-center text-gray-600 rounded py-1 gap-2">
									{selectedLanguages?.map((hobby) => (
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
							<div className="absolute mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-full z-10">
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
								<div className="flex flex-wrap gap-3 px-4 pb-4 max-h-72 overflow-y-auto customScroll-bar">
									{filteredHobbies?.map((lang) => (
										<div
											key={lang._id}
											className={`cursor-pointer py-2 text-xs text-center px-3 rounded-full ${selectedLanguages?.some((l) => l._id === lang._id) ? 'bg-gold' : 'bg-gray-200 hover:bg-gray-300'}`}
											onClick={() => handleSelect(lang.name)}
										>
											{lang.name}
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>

				{error && <p className="text-red-500">{error}</p>}

				<div className="col-span-2 flex justify-end mt-4">
					<button type="submit" className="gradient-btn px-4 py-2 rounded-md text-sm" disabled={isLoading}>
						Update
					</button>
				</div>
			</form>
		</div>
	);
};

export default Language;
