import React, { useState, useMemo, useEffect } from 'react';
import FilterSidebar from './FilterSidebar';
import FilterPopup from './FilterPopup';
import MainContent from './MainContent';
import FilterMenu from './FilterMenu';
import { useDispatch, useSelector } from 'react-redux';
import { maritalStatus, personalInformation, PhysicalAttributesData, familyInformation, career, socialBackground } from '../../utils/data/MyProfileData';
import apiClient from '../../api/apiClient';
import { getMatchProfile, matchProfileFilter } from '../../store/features/matchProfile-slice';

export default function MatchesList() {
	const dispatch = useDispatch()
	const [ activePopup, setActivePopup ] = useState(null);
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ stateList, setStateList ] = useState([]);
	const [ cityList, setCityList ] = useState([]);
	const [ stateLoading, setStateLoading ] = useState(false)
	const [ cityLoading, setCityLoading ] = useState(false)

	const countries = useSelector((state) => state.profileData.countries);
	const education = useSelector((state) => state.profileData.education);
	const occupations = useSelector((state) => state.profileData.occupations);

	// console.log("stateList - ", stateList);
	// console.log("cityList - ", cityList);

	const [ selectedFilters, setSelectedFilters ] = useState({
		onBehalf: [],
		maritalStatus: [],
		basicInformationInChildren: [],
		presentCountry: '',
		presentState: '',
		presentCity: '',
		residencyStatus: [],
		dosh: '',


	});

	// Filter options
	const filterOptions = {
		onBehalf: maritalStatus?.onBehalf,
		maritalStatus: maritalStatus?.status,
		basicInformationInChildren: [ "yes", "no" ],
		residencyStatus: personalInformation?.residencyStatus,
		presentCountry: countries?.data?.country,
		presentState: stateList?.state,
		presentCity: cityList?.city,
		dosh: socialBackground?.doshName,

		// caste: [
		// 	{ _id: '1', name: "Doesn't Matter" },
		// 	{ _id: '2', name: 'Muslim - Ansari' },
		// ],
		// language: [
		// 	{ _id: '1', name: 'Angika' },
		// 	{ _id: '2', name: 'Arunachali' },
		// ],
		// age: [ '18-25', '26-30', '31-35', '36-40', '40+' ],
		// occupation: [ 'IT Professional', 'Doctor', 'Engineer', 'Business', 'Others' ],
	};

	// Display-friendly names for filter categories
	const filterCategoryDisplayNames = {
		onBehalf: 'On Behalf',
		maritalStatus: 'Marital Status',
		basicInformationInChildren: 'Children',
		presentCountry: 'Present Country',
		residencyStatus: 'Residency Status',
		presentState: 'Present State',
		presentCity: 'Present City',
		dosh: 'Dosh Name',
		// education: 'Education Level',
		// occupation: 'Occupation',
		// country: 'Country',
		// caste: 'Caste',
		// language: 'Languages',
		// age: 'Age Range',
	};


	useEffect(() => {
		dispatch(matchProfileFilter(selectedFilters));
		// console.log(selectedFilters);
	}, [ selectedFilters ])


	const fetchState = async (countryId) => {
		setStateLoading(true)
		try {
			const response = await apiClient.get(`/state?countryId=${countryId}`);
			setStateList(response.data)
		} catch (error) {
			console.log(error);
		} finally {
			setStateLoading(false)
		}
	}

	const fetchCity = async (stateId) => {
		setCityLoading(true)
		try {
			const response = await apiClient.get(`/city?stateId=${stateId}`);
			setCityList(response.data)
		} catch (error) {
			console.log(error);
		} finally {
			setCityLoading(false)
		}
	}

	const handleFilterSelect = (category, value) => {
		console.log(category, value);
		if (category == 'presentCountry') { setStateList([]); setCityList([]); fetchState(value) };
		if (category == 'ancestralOrigin') { setCityList([]); fetchCity(value) };

		setSelectedFilters((prev) => {
			if (Array.isArray(prev[ category ])) {
				const newValues = prev[ category ].includes(value)
					? prev[ category ].filter((item) => item !== value)
					: [ ...prev[ category ], value ];
				return { ...prev, [ category ]: newValues };
			} else {
				const newValue = prev[ category ] === value ? '' : value;
				return { ...prev, [ category ]: newValue };
			}
		});
	};

	const removeFilter = (category, value) => {
		setSelectedFilters((prev) => {
			if (Array.isArray(prev[ category ])) {
				return {
					...prev,
					[ category ]: prev[ category ].filter((item) => item !== value),
				};
			} else {
				return { ...prev, [ category ]: '' };
			}
		});
	};

	const clearCategoryFilters = (category) => {
		setSelectedFilters((prev) => ({
			...prev,
			[ category ]: Array.isArray(prev[ category ]) ? [] : '',
		}));
	};

	const clearAllFilters = () => {
		dispatch(getMatchProfile())
		setSelectedFilters({
			onBehalf: [],
			maritalStatus: [],
			basicInformationInChildren: [],
			presentCountry: '',
			ancestralOrigin: '',
			ancestralOriginCity: '',
			residencyStatus: [],
			dosh: '',
		});
	};

	const filteredOptions = useMemo(() => {
		if (!activePopup) return [];
		const options = filterOptions[ activePopup ];
		return options?.filter((option) => {
			const name = option.name || option; // Handle object-based and simple arrays
			return name.toLowerCase().includes(searchTerm.toLowerCase());
		});
	}, [ activePopup, searchTerm ]);

	const getSelectedName = (category, value) => {
		const options = filterOptions[ category ];
		const option = options?.find((opt) => opt._id === value || opt === value);
		return option?.name || option || '';
	};

	const getCategoryDisplayName = (category) => {
		return filterCategoryDisplayNames[ category ] || category;
	};

	return (
		<>
			<FilterMenu />
			<div className="flex pt-4 bg-gray-50">
				<FilterSidebar
					selectedFilters={selectedFilters}
					setActivePopup={setActivePopup}
					clearCategoryFilters={clearCategoryFilters}
					getSelectedName={getSelectedName}
					clearAllFilters={clearAllFilters}
					removeFilter={removeFilter}
					getCategoryDisplayName={getCategoryDisplayName} // Pass down display name function
				/>
				<div className="flex-1 px-10 pb-10 pt-2">
					{/* <h1>Matches List</h1> */}
					{/* <div className="grid gap-4">
						{[ ...Array(15).keys() ].map((i) => (
							<div key={i} className="bg-gray-200 p-4 rounded shadow">
								Profile {i + 1}
							</div>
						))}
					</div> */}
					<MainContent />
				</div>
				{activePopup && (
					<FilterPopup
						activePopup={activePopup}
						filteredOptions={filteredOptions}
						selectedFilters={selectedFilters}
						handleFilterSelect={handleFilterSelect}
						setActivePopup={setActivePopup}
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
						clearCategoryFilters={clearCategoryFilters}
					/>
				)}
			</div>
		</>
	);
}
