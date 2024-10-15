import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Language = () => {
	const [ isOpen, setIsOpen ] = useState(false);
	const [ selectedLanguages, setSelectedLanguages ] = useState([]);
	const [ error, setError ] = useState()
	const dropdownRef = useRef(null);

	const languages = [ 'Hindi', 'English', 'Urdu', 'Kannada', 'Gujarati', 'Malayalam', 'Tamil' ];

	const toggleDropdown = () => setIsOpen(!isOpen);

	const handleSelect = (language) => {
		if (selectedLanguages.includes(language)) {
			setSelectedLanguages(selectedLanguages.filter((lang) => lang !== language));
		} else {
			setSelectedLanguages([ ...selectedLanguages, language ]);
		}
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

	const [ formData, setFormData ] = useState({
		motherTongue: '',
		knownLanguages: [],
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (formData.motherTongue == '') {
			setError('Mother Tongue is required')
			toast.error('Please correct all highlighted errors!');
			return;
		}

		const dataToSubmit = {
			motherTongue: formData.motherTongue,
			knownLanguages: selectedLanguages,
		};
		console.log('Form submitted:', dataToSubmit);

		try {
			const response = await axios.post('', dataToSubmit);
			console.log('Response:', response.data);
			toast.success('Language update successfully')
		} catch (error) {
			console.error('Error submitting data:', error);
			toast.error('Language update failed!')
		}
	};


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
				<div>
					<label htmlFor="motherTongue" className="block font-medium mb-1 md:mb-2 mt-1 text-headingGray">Mother Tongue<span className="text-red-500"> *</span></label>
					<select
						id="motherTongue"
						className="input-field text-gray-700"
						name="motherTongue"
						value={formData.motherTongue}
						onChange={handleChange}
					>
						<option value="" disabled>Select Drink Preference</option>
						<option value="social">Social</option>
						<option value="regular">Regular</option>
						<option value="never">Never</option>
					</select>
					<p className="text-red-500 text-xs mt-1	">{error}</p>
				</div>

				<div>
					<label htmlFor="knownLanguages" className="block font-medium mb-1 mt-1 text-headingGray">Known Languages</label>
					<div className="relative inline-block w-full" ref={dropdownRef}>
						<div className="cursor-pointer flex justify-between items-center mt-1 p-3 w-full rounded-md border border-gray-300 shadow-sm outline-none hover:ring-primary hover:border-primary text-sm text-black"
							onClick={toggleDropdown}
						>
							<span className='text-gray-700'>{selectedLanguages.length > 0 ? selectedLanguages.join(', ') : 'Select Languages'}</span>
							<span><IoIosArrowDown /></span>
						</div>

						{isOpen && (
							<div className="absolute mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-full">
								<div className="flex flex-wrap gap-4 p-4">
									{languages.map((language, index) => (
										<div
											key={index}
											className={`cursor-pointer p-2 text-center px-4 rounded-full ${selectedLanguages.includes(language) ? 'bg-gold' : 'bg-gray-200 hover:bg-gray-300'}`}
											onClick={() => handleSelect(language)}
										>
											{language}
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Selected Languages Box */}
				{/* <div className="col-span-2 mt-4">
					{selectedLanguages.length > 0 && (
						<div className="p-3 bg-gray-100 border border-gray-300 rounded-md">
							<span className="font-medium">Selected Languages:</span>
							<div className="mt-2 flex flex-wrap gap-2">
								{selectedLanguages.map((language, index) => (
									<div key={index} className="bg-blue-200 px-3 py-1 rounded-full">
										{language}
									</div>
								))}
							</div>
						</div>
					)}
				</div> */}

				<div className="col-span-2 flex justify-end mt-4">
					<button type="submit" className="gradient-btn px-4 py-2 rounded-md text-sm">Update</button>
				</div>
			</form>
		</div>
	);
};

export default Language;
