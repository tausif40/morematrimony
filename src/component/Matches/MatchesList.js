import React, { useState, useMemo, useEffect } from 'react';
import FilterSidebar from './FilterSidebar';
import FilterPopup from './FilterPopup';
import MainContent from './MainContent';
import FilterMenu from './FilterMenu';
import { useDispatch, useSelector } from 'react-redux';
import { maritalStatus, personalInformation, PhysicalAttributesData, socialBackground } from '../../data/MyProfileData';
import apiClient from '../../api/apiClient';
import { setPage, setFilterApplied, matchProfileFilter, getMatchedProfile } from '../../store/features/matchProfile-slice';

export default function MatchesList() {
	const dispatch = useDispatch()
	const [ activePopup, setActivePopup ] = useState(null);
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ stateList, setStateList ] = useState([]);
	const [ presentCityList, setPresentCityList ] = useState([]);
	const [ ancestralOriginCity, setAncestralOriginCity ] = useState([]);
	const [ casteList, setCasteList ] = useState([]);
	const [ stateLoading, setStateLoading ] = useState(false)
	const [ cityLoading, setCityLoading ] = useState(false)
	const [ clearFilter, setClearFilter ] = useState(false)
	// const [ selectedFilters, setSelectedFilters ] = useState(filters || {});
	const [ filterCount, setFilterCount ] = useState(0);

	const countries = useSelector((state) => state.profileData.countries);
	const indianState = useSelector((state) => state.profileData.indiaStates);
	const education = useSelector((state) => state.profileData.education);
	const occupations = useSelector((state) => state.profileData.occupations);
	const religions = useSelector((state) => state.profileData.religions);

	// const { filters, page, noOfFilter } = useSelector((state) => state.matchedProfile);
	// console.log(occupations);
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
		occupation: [],
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
		ancestralOrigin: indianState?.data?.state,
		ancestralOriginCity: ancestralOriginCity,
		presentCountry: countries?.data?.country,
		presentState: stateList?.state,
		presentCity: presentCityList,
		residencyStatus: personalInformation?.residencyStatus,
		education: education?.data?.education,
		occupation: occupations?.data?.occupation,
		bodyType: PhysicalAttributesData?.bodyType,
		religion: religions?.data?.religion,
		caste: casteList,
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
		dispatch(setFilterApplied(selectedFilters));
		if (!clearFilter) dispatch(getMatchedProfile(selectedFilters));
		// console.log("clearFilter - ", clearFilter);
	}, [ dispatch, selectedFilters ])

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
			if (category === 'presentState') setPresentCityList(response?.data?.city)
			if (category === 'ancestralOrigin') setAncestralOriginCity(response?.data?.city)
		} catch (error) {
			console.log(error);
		} finally {
			setCityLoading(false)
		}
	}

	const handleFilterSelect = (category, value) => {
		setClearFilter(false)
		// setFilterCount((pre) => pre + 1)
		if (category === 'presentCountry') { setStateList([]); setPresentCityList([]); fetchState(value) };
		if (category === 'presentState') { setPresentCityList([]); fetchCity(value, category) };
		if (category === 'ancestralOrigin') { setAncestralOriginCity([]); fetchCity(value, category) };
		if (category === 'religion') { setCasteList([]); fetchCast(value) };

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
		// setFilterCount((pre) => pre - 1)
		setSelectedFilters((prev) => ({
			...prev,
			[ category ]: Array.isArray(prev[ category ]) ? [] : '',
		}));
	};

	const clearAllFilters = () => {
		setClearFilter(true)
		// setFilterCount(0)
		dispatch(getMatchedProfile())
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
			occupation: [],
			bodyType: [],
			religion: '',
			caste: [],
			dosh: '',
		});
	};

	const filteredOptions = useMemo(() => {
		if (!activePopup) return [];
		const options = filterOptions[ activePopup ];
		if (activePopup === 'occupation' || activePopup === 'education') {
			return options?.map((option) => ({
				...option, roles: option.roles.filter((role) =>
					role.role.toLowerCase().includes(searchTerm.toLowerCase())),
			})).filter((option) =>
				option.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				option.roles.length > 0
			);
		}

		return options?.filter((option) => {
			const name = option.name || option;
			return name.toLowerCase().includes(searchTerm.toLowerCase());
		});
	}, [ activePopup, searchTerm ]);

	const getSelectedName = (category, value) => {
		if (category === 'occupation' || category === 'education') {
			const options = filterOptions[ category ];
			const option = options?.flatMap((category) => category.roles)?.find((opt) => opt.id === value);
			return option?.role || '';
		}

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
			<div className="flex bg-gray-100">
				<FilterSidebar
					selectedFilters={selectedFilters}
					setActivePopup={setActivePopup}
					clearCategoryFilters={clearCategoryFilters}
					getSelectedName={getSelectedName}
					clearAllFilters={clearAllFilters}
					removeFilter={removeFilter}
					getCategoryDisplayName={getCategoryDisplayName}
				/>
				<div className="flex-1 mt-6 px-10 pb-10 pt-2">
					<MainContent />
				</div>
				{activePopup && (
					<FilterPopup
						activePopup={activePopup}
						getCategoryDisplayName={getCategoryDisplayName}
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
