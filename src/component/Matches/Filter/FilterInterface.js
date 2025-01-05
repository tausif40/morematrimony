import React, { useState, useEffect } from 'react';
import { GrRefresh } from "react-icons/gr";
import FilterSection from './FilterSection';
import FilterPopup from './FilterPopup';
import { useDispatch, useSelector } from 'react-redux';
import { matchProfileFilter } from '../../../store/features/matchProfile-slice';
import { maritalStatus, personalInformation, PhysicalAttributesData, familyInformation, career, socialBackground } from '../../../utils/data/MyProfileData';
import { CiFilter } from "react-icons/ci";


function FilterInterface() {
	const dispatch = useDispatch()
	const countries = useSelector((state) => state.profileData.countries);
	const indiaStates = useSelector((state) => state.profileData.indiaStates);
	const education = useSelector((state) => state.profileData.education);
	const occupations = useSelector((state) => state.profileData.occupations);


	const [ sections, setSections ] = useState([
		{
			id: 'onBehalf',
			title: 'On Behalf',
			type: 'checkbox',
			isExpanded: false,
			options: maritalStatus?.onBehalf?.map((item) => ({
				id: item,
				label: item ? item.charAt(0).toUpperCase() + item.slice(1) : '',
			})),
		},
		{
			id: 'maritalStatus',
			title: 'Marital Status',
			type: 'checkbox',
			isExpanded: false,
			options: maritalStatus?.status?.map((status) => ({
				id: status,
				label: status ? status.charAt(0).toUpperCase() + status.slice(1) : '',
			})),
		},
		{
			id: 'basicInformationInChildren',
			title: 'Children',
			type: 'radio',
			isExpanded: false,
			options: [
				{ id: 'yes', label: 'Yes' },
				{ id: 'no', label: 'No' },
			],
		},
		{
			id: 'presentCountry',
			title: 'Present Country',
			type: 'checkbox',
			isExpanded: false,
			options: [],
		},
		{
			id: 'residencyStatus',
			title: 'Residency Status',
			type: 'checkbox',
			isExpanded: false,
			options: personalInformation?.residencyStatus?.map((item) => ({
				id: item,
				label: item ? item.charAt(0).toUpperCase() + item.slice(1) : '',
			})),
		},
		{
			id: 'ancestralOrigin',
			title: 'Ancestral Origin',
			type: 'checkbox',
			isExpanded: false,
			options: indiaStates?.data?.state?.map((item) => ({
				id: item._id,
				label: item?.name ? item?.name.charAt(0).toUpperCase() + item.name.slice(1) : '',
			})),
		},
		{
			id: 'education',
			title: 'education',
			type: 'checkbox',
			isExpanded: false,
			options: education?.data?.education?.map((item) => ({
				id: item._id,
				label: item?.name ? item?.name.charAt(0).toUpperCase() + item.name.slice(1) : '',
			})),
		},
		{
			id: 'occupation',
			title: 'Occupation',
			type: 'checkbox',
			isExpanded: false,
			options: occupations?.data?.occupations?.map((item) => ({
				id: item._id,
				label: item?.name ? item?.name.charAt(0).toUpperCase() + item.name.slice(1) : '',
			})),
		},
		{
			id: 'bodyType',
			title: 'Body Type',
			type: 'checkbox',
			isExpanded: false,
			options: PhysicalAttributesData?.bodyType?.map((item) => ({
				id: item,
				label: item ? item?.charAt(0).toUpperCase() + item.slice(1) : '',
			})),
		},
		{
			id: 'complexion',
			title: 'Complexion',
			type: 'checkbox',
			isExpanded: false,
			options: PhysicalAttributesData?.complexion?.map((item) => ({
				id: item,
				label: item ? item?.charAt(0).toUpperCase() + item.slice(1) : '',
			})),
		},
		{
			id: 'disability',
			title: 'Disability',
			type: 'radio',
			isExpanded: false,
			options: [
				{ id: 'yes', label: 'Yes' },
				{ id: 'no', label: 'No' },
			],
		},
		{
			id: 'dosh',
			title: 'Dosh',
			type: 'checkbox',
			isExpanded: false,
			options: socialBackground?.doshName?.map((item) => ({
				id: item,
				label: item ? item?.charAt(0).toUpperCase() + item.slice(1) : '',
			})),
		},
		{
			id: 'familyStatus',
			title: 'Family Status',
			type: 'checkbox',
			isExpanded: false,
			options: familyInformation?.familyStatus?.map((item) => ({
				id: item,
				label: item ? item?.charAt(0).toUpperCase() + item.slice(1) : '',
			})),
		},
		{
			id: 'employedIn',
			title: 'employed In',
			type: 'checkbox',
			isExpanded: false,
			options: career?.employedIn?.map((item) => ({
				id: item,
				label: item ? item?.charAt(0).toUpperCase() + item.slice(1) : '',
			})),
		},
	]);

	// console.log(education);
	// console.log(occupations);

	const [ selectedOptions, setSelectedOptions ] = useState({});
	const [ activePopupId, setActivePopupId ] = useState(null);
	const [ isAnyFilterActive, setIsAnyFilterActive ] = useState(false);

	useEffect(() => {
		if (countries?.data?.country) {
			setSections((prevSections) =>
				prevSections.map((section) =>
					section.id === 'presentCountry'
						? {
							...section,
							options: countries.data.country.map((country) => ({
								id: country._id,
								label: country.name,
							})),
						}
						: section
				)
			);
		}
	}, [ countries ]);

	// useEffect(() => {
	// 	const anyActive = Object.values(selectedOptions).some(
	// 		(section) => section && section.length > 0
	// 	);
	// 	setIsAnyFilterActive(anyActive);

	// 	sections.forEach((section) => {
	// 		const selectedItems = selectedOptions[ section.id ] || [];
	// 		// console.log(`"${section.id}":`, selectedItems);
	// 		dispatch(matchProfileFilter(selectedItems))
	// 	});
	// }, [ selectedOptions, sections ]);

	useEffect(() => {
		const anyActive = Object.values(selectedOptions).some(
			(section) => section && section.length > 0
		);
		setIsAnyFilterActive(anyActive);

		const filterData = sections.reduce((acc, section) => {
			const selectedItems = selectedOptions[ section.id ] || [];
			if (selectedItems.length > 0) {
				acc[ section.id ] = selectedItems;
			}
			return acc;
		}, {});

		dispatch(matchProfileFilter(filterData));
	}, [ selectedOptions, sections ]);

	const toggleSection = (sectionId) => {
		setSections((sections) =>
			sections.map((section) =>
				section.id === sectionId ? { ...section, isExpanded: !section.isExpanded } : section
			)
		);
	};

	const handleOptionChange = (sectionId, optionId, type) => {
		setSelectedOptions((prev) => {
			const currentSection = prev[ sectionId ] || [];
			const isSelected = currentSection.includes(optionId);

			return type === 'radio'
				? { ...prev, [ sectionId ]: [ optionId ] }
				: {
					...prev,
					[ sectionId ]: isSelected
						? currentSection.filter((id) => id !== optionId)
						: [ ...currentSection, optionId ],
				};
		});
	};

	const getVisibleOptions = (section) => {
		if (!section || !Array.isArray(section.options)) {
			return [];
		}
		if (section.showAll || activePopupId === section.id) {
			return section.options;
		}
		return section.options.slice(0, 5);
	};

	const clearAllFilters = () => setSelectedOptions({});

	const clearSectionFilter = (sectionId) => {
		setSelectedOptions((prev) => {
			const newOptions = { ...prev };
			delete newOptions[ sectionId ];
			return newOptions;
		});
	};

	const activePopupSection = sections.find((s) => s.id === activePopupId);

	return (
		<div className="w-72 rounded-lg">
			<div className="flex justify-between items-center border-b p-3 bg-orange-50">
				<div className=''>
					<h2 className="text-lg font-medium text-gray-700 flex items-center gap-2"> <CiFilter /> <p>Filter</p></h2>
				</div>
				{isAnyFilterActive && (
					<button
						onClick={clearAllFilters}
						className="text-sm text-blue-500 hover:text-blue-700 focus:outline-none focus:underline"
					>
						Clear all
					</button>
				)}
			</div>

			<div className="">
				{sections.map((section) => (
					<FilterSection
						key={section.id}
						section={section}
						selectedOptions={selectedOptions}
						toggleSection={toggleSection}
						handleOptionChange={handleOptionChange}
						clearSectionFilter={clearSectionFilter}
						getVisibleOptions={getVisibleOptions}
						setActivePopup={setActivePopupId}
					/>
				))}
			</div>

			<FilterPopup
				section={activePopupSection}
				selectedOptions={selectedOptions[ activePopupSection?.id ]}
				handleOptionChange={handleOptionChange}
				onClose={() => setActivePopupId(null)}
			/>
		</div>
	);
}

export default FilterInterface;