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
	const [ presentCityList, setPresentCityList ] = useState([]);
	const [ ancestralOriginCity, setAncestralOriginCity ] = useState([]);
	const [ CasteList, setCasteList ] = useState([]);
	const [ stateLoading, setStateLoading ] = useState(false)
	const [ cityLoading, setCityLoading ] = useState(false)
	const [ clearFilter, setClearFilter ] = useState(false)

	const countries = useSelector((state) => state.profileData.countries);
	const IndianState = useSelector((state) => state.profileData.indiaStates);
	const education = useSelector((state) => state.profileData.education);
	const occupations = useSelector((state) => state.profileData.occupations);
	const religions = useSelector((state) => state.profileData.religions);

	// console.log("IndianState - ", IndianState?.data?.state);
	// console.log("religions - ", religions);

	const [ selectedFilters, setSelectedFilters ] = useState({
		onBehalf: [],
		maritalStatus: [],
		basicInformationInChildren: '',
		ancestralOrigin: '',
		ancestralOriginCity: '',
		presentCountry: '',
		presentState: '',
		presentCity: '',
		residencyStatus: [],
		education: [],
		// occupation: [],
		bodyType: [],
		religion: '',
		caste: [],
		dosh: '',
	});

	// Filter options
	const filterOptions = {
		onBehalf: maritalStatus?.onBehalf,
		maritalStatus: maritalStatus?.status,
		basicInformationInChildren: [ "yes", "no" ],
		ancestralOrigin: IndianState?.data?.state,
		ancestralOriginCity: ancestralOriginCity,
		presentCountry: countries?.data?.country,
		presentState: stateList?.state,
		presentCity: presentCityList,
		residencyStatus: personalInformation?.residencyStatus,
		education: education?.data?.education,
		// occupation: occupations?.data?.occupation,
		bodyType: PhysicalAttributesData?.bodyType,
		religion: religions?.data?.religion,
		caste: CasteList,
		dosh: socialBackground?.doshName,
	};

	// Display-friendly names for filter categories
	const filterCategoryDisplayNames = {
		onBehalf: 'On Behalf',
		maritalStatus: 'Marital Status',
		basicInformationInChildren: 'Children',
		ancestralOrigin: 'Ancestral Origin',
		ancestralOriginCity: 'Ancestral Origin City',
		presentCountry: 'Present Country',
		residencyStatus: 'Residency Status',
		presentState: 'Present State',
		presentCity: 'Present City',
		education: 'Education',
		occupation: 'Occupation',
		bodyType: 'Body Type',
		religion: 'Religion',
		caste: 'Caste',
		dosh: 'Dosh Name',
	};

	useEffect(() => {

		if (!clearFilter) dispatch(matchProfileFilter(selectedFilters));
		console.log("clearFilter - ", clearFilter);
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
	const fetchCast = async (religionId) => {
		setStateLoading(true)
		try {
			const response = await apiClient.get(`/caste?religionId=${religionId}`);
			// console.log(response?.data);
			setCasteList(response?.data?.caste)
		} catch (error) {
			console.log(error);
		} finally {
			setStateLoading(false)
		}
	}

	const fetchCity = async (stateId, category) => {
		setCityLoading(true)
		try {
			const response = await apiClient.get(`/city?stateId=${stateId}`);
			if (category == 'presentState') setPresentCityList(response?.data?.city)
			if (category == 'ancestralOrigin') setAncestralOriginCity(response?.data?.city)
		} catch (error) {
			console.log(error);
		} finally {
			setCityLoading(false)
		}
	}

	const handleFilterSelect = (category, value) => {
		setClearFilter(false)
		if (category == 'presentCountry') { setStateList([]); setPresentCityList([]); fetchState(value) };
		if (category == 'presentState') { setPresentCityList([]); fetchCity(value, category) };
		if (category == 'ancestralOrigin') { setAncestralOriginCity([]); fetchCity(value, category) };
		if (category == 'religion') { setCasteList([]); fetchCast(value) };

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
		setClearFilter(true)
		dispatch(getMatchProfile())
		setSelectedFilters({
			onBehalf: [],
			maritalStatus: [],
			basicInformationInChildren: '',
			ancestralOrigin: '',
			ancestralOriginCity: '',
			presentCountry: '',
			presentState: '',
			presentCity: '',
			residencyStatus: [],
			education: [],
			// occupation: [],
			bodyType: [],
			religion: '',
			caste: [],
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
			<div className="flex bg-gray-50">
				<FilterSidebar
					selectedFilters={selectedFilters}
					setActivePopup={setActivePopup}
					clearCategoryFilters={clearCategoryFilters}
					getSelectedName={getSelectedName}
					clearAllFilters={clearAllFilters}
					removeFilter={removeFilter}
					getCategoryDisplayName={getCategoryDisplayName} // Pass down display name function
				/>
				<div className="flex-1 mt-6 px-10 pb-10 pt-2">
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
