import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { toast } from 'react-hot-toast';

const Language = ({ onFormSubmit, data }) => {
	const dropdownRef = useRef(null);

	const [ isOpen, setIsOpen ] = useState(false);
	const [ selectedLanguages, setSelectedLanguages ] = useState([]);
	const [ selectedLangId, setSelectedLangId ] = useState([]);
	const [ knownLanguagesError, setKnownLanguagesError ] = useState()
	const [ error, setError ] = useState()

	const { languages, languageLoading, languageData, isLoading } = data;



	const [ formData, setFormData ] = useState({
		motherTongue: '',
	});

	useEffect(() => {
		if (languageData?.knownLanguages) {
			const availableLanguages = languageData.knownLanguages.filter(lang => lang.name);
			const availableLangIds = languageData.knownLanguages.filter(lang => lang._id);

			setSelectedLanguages(availableLanguages.map(lang => lang.name));
			setSelectedLangId(availableLangIds.map(lang => lang._id));
		}

		setFormData({
			motherTongue: languageData?.motherTongue?._id || ''
		});

	}, [ languageData ]);


	// useEffect(() => {
	// 	console.log(data);
	// 	console.log("selectedLanguages - ", selectedLanguages);
	// 	console.log("selectedLangId - ", selectedLangId);

	// }, [ selectedLanguages, selectedLangId ])


	const toggleDropdown = () => setIsOpen(!isOpen);

	const handleSelect = (language, langId) => {
		setKnownLanguagesError('');

		setSelectedLanguages((prevSelected) => {
			if (prevSelected.includes(language)) {
				return prevSelected.filter((lang) => lang !== language);
			} else {
				return [ ...prevSelected, language ];
			}
		});

		setSelectedLangId((prevSelectedIds) => {
			if (prevSelectedIds.includes(langId)) {
				return prevSelectedIds.filter((id) => id !== langId);
			} else {
				return [ ...prevSelectedIds, langId ];
			}
		});
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
		if (!formData.motherTongue) {
			setError('Mother Tongue is required')
			return;
		} else if (!selectedLangId.length) {
			setKnownLanguagesError('Minimum 1 known language required')
			return;
		}
		const dataToSubmit = {
			motherTongue: formData.motherTongue,
			knownLanguages: selectedLangId,
		};
		onFormSubmit({ language: dataToSubmit });
	}


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

				<div>
					<label htmlFor="knownLanguages" className="block font-medium mb-1 mt-1 text-headingGray">Known Languages</label>
					<div className="relative inline-block w-full" ref={dropdownRef}>
						<div className="cursor-pointer flex justify-between items-center mt-1 p-3 w-full rounded-md border border-gray-300 shadow-sm outline-none hover:ring-primary hover:border-primary text-sm text-black capitalize"
							onClick={toggleDropdown}
						>
							{/* <span className='text-gray-700'>{selectedLanguages?.length > 0 ? selectedLanguages?.join(' , ') : 'Select Languages'}</span> */}
							<span className='text-gray-700'>
								{selectedLanguages.length > 0 ? selectedLanguages.join(', ') : 'Select Languages'}
								{/* <span><IoIosArrowDown /></span> */}
							</span>

						</div>

						{isOpen && (
							<div className="absolute mt-2 bg-white z-40 border border-gray-300 rounded-md shadow-lg w-full max-h-96 overflow-y-auto customScroll-bar">
								<div className="flex flex-wrap gap-2 mb-1 p-4">
									{languages?.language?.map((language) => {
										// Ensure proper selection check
										const isSelected = selectedLangId.includes(language._id);

										return (
											<div
												key={language._id}
												className={`cursor-pointer py-1 text-center px-3 rounded-full text-sm font-light transition ${isSelected ? 'bg-gold text-white' : 'bg-gray-200 hover:bg-gray-300'
													}`}
												onClick={() => handleSelect(language.name, language._id)}
											>
												{language.name}
											</div>
										);
									})}
								</div>
							</div>
						)}




					</div>
					{<p className="text-red-500 text-xs mt-1	">{knownLanguagesError}</p>}
				</div>
				<div className="col-span-2 flex justify-end mt-4">
					<button type="submit" className="gradient-btn px-4 py-2 rounded-md text-sm" disabled={isLoading}>Update</button>
				</div>
			</form>
		</div>
	);
};

export default Language;
