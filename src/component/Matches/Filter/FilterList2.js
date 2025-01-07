import React, { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp, X } from 'lucide-react'
import { GrRefresh } from "react-icons/gr";

function FilterList() {

	const [ sections, setSections ] = useState(
		[
			{
				id: 'verification',
				title: 'Verification Status',
				type: 'checkbox',
				isExpanded: true,
				options: [
					{ id: 'all-verification', label: 'All' },
					{ id: 'blue-tick', label: 'Blue Tick Profiles', isNew: true }
				]
			},
			{
				id: 'photo',
				title: 'Photo Settings',
				type: 'checkbox',
				isExpanded: true,
				options: [
					{ id: 'all-photos', label: 'All' },
					{ id: 'visible', label: 'Visible to all', count: 27 },
					{ id: 'protected', label: 'Protected Photos', count: 3 }
				]
			},
			{
				id: 'joined',
				title: 'Recently Joined',
				type: 'radio',
				isExpanded: true,
				options: [
					{ id: 'all-joined', label: 'All' },
					{ id: 'day', label: 'Within a day', count: 11 },
					{ id: 'week', label: 'Within a week', count: 32 },
					{ id: 'month', label: 'Within a month', count: 125 }
				]
			},
			{
				id: 'active',
				title: 'Active Members',
				type: 'radio',
				isExpanded: true,
				options: [
					{ id: 'all-active', label: 'All' },
					{ id: 'active-day', label: 'Within a day', count: 22 },
					{ id: 'active-week', label: 'Within a week', count: 55 },
					{ id: 'active-month', label: 'Within a month', count: 125 }
				]
			},
			{
				id: 'community',
				title: 'Community',
				type: 'checkbox',
				isExpanded: true,
				showAll: false,
				options: [
					{ id: 'all-community', label: 'All' },
					{ id: 'thakur', label: 'Thakur', count: 135 },
					{ id: 'kurmi', label: 'Kurmi', count: 123 },
					{ id: 'rajput', label: 'Rajput', count: 101 },
					{ id: 'jatav', label: 'Jatav', count: 85 },
					{ id: 'yadav', label: 'Yadav', count: 83 },
					{ id: 'tili', label: 'Tili', count: 1 },
					{ id: 'kurmi-kshatriya', label: 'Kurmi Kshatriya', count: 1 },
					{ id: 'option1', label: 'Option 1', count: 50 },
					{ id: 'option2', label: 'Option 2', count: 40 },
					{ id: 'option3', label: 'Option 3', count: 30 },
					{ id: 'option4', label: 'Option 4', count: 20 },
					{ id: 'option5', label: 'Option 5', count: 10 }
				]
			},
			{
				id: 'mother-tongue',
				title: 'Mother Tongue',
				type: 'checkbox',
				isExpanded: true,
				showAll: false,
				options: [
					{ id: 'all-language', label: 'All' },
					{ id: 'hindi', label: 'Hindi', count: 125 },
					{ id: 'bhojpuri', label: 'Bhojpuri', count: 2 },
					{ id: 'magahi', label: 'Magahi', count: 1 },
					{ id: 'maithili', label: 'Maithili', count: 1 },
					{ id: 'english', label: 'English', count: 1 },
					{ id: 'tamil', label: 'Tamil', count: 15 },
					{ id: 'telugu', label: 'Telugu', count: 12 },
					{ id: 'kannada', label: 'Kannada', count: 8 },
					{ id: 'malayalam', label: 'Malayalam', count: 5 }
				]
			}
		])

	const [ selectedOptions, setSelectedOptions ] = useState({})
	const [ activePopup, setActivePopup ] = useState(null)
	const [ isAnyFilterActive, setIsAnyFilterActive ] = useState(false)

	useEffect(() => {
		const anyActive = Object.values(selectedOptions).some(
			section => section && section.length > 0
		)
		setIsAnyFilterActive(anyActive)

		// Console log the selected options for each section
		Object.entries(selectedOptions).forEach(([ sectionId, options ]) => {
			if (options && options.length > 0) {
				console.log(`Selected options for ${sectionId}:`, options)
			}
		})
	}, [ selectedOptions ])

	const toggleSection = (sectionId) => {
		setSections(sections.map(section =>
			section.id === sectionId
				? { ...section, isExpanded: !section.isExpanded }
				: section
		))
	}

	const handleOptionChange = (sectionId, optionId, type) => {
		setSelectedOptions(prev => {
			let newOptions
			if (type === 'radio') {
				newOptions = { ...prev, [ sectionId ]: [ optionId ] }
			} else {
				const currentSection = prev[ sectionId ] || []
				const isSelected = currentSection.includes(optionId)

				if (isSelected) {
					newOptions = {
						...prev,
						[ sectionId ]: currentSection.filter(id => id !== optionId)
					}
				} else {
					newOptions = {
						...prev,
						[ sectionId ]: [ ...currentSection, optionId ]
					}
				}
			}

			// Console log the updated options for this section
			console.log(`Updated options for ${sectionId}:`, newOptions[ sectionId ])

			return newOptions
		})
	}

	const getVisibleOptions = (section) => {
		if (section.showAll || activePopup === section.id) {
			return section.options
		}
		return section.options.slice(0, 5)
	}

	const clearAllFilters = () => {
		setSelectedOptions({})
		console.log('All filters cleared')
	}

	const clearSectionFilter = (sectionId) => {
		setSelectedOptions(prev => {
			const newOptions = { ...prev }
			delete newOptions[ sectionId ]
			console.log(`Filters cleared for section: ${sectionId}`)
			return newOptions
		})
	}

	return (
		<div class="w-72 bg-gray-50 rounded-lg shadow p-4">
			<div class="flex justify-between items-center mb-4">
				<h2 class="text-lg font-medium text-gray-700">Refine Search</h2>
				{isAnyFilterActive && (
					<button
						onClick={clearAllFilters}
						class="text-sm text-blue-500 hover:text-blue-700 focus:outline-none focus:underline"
					>
						<GrRefresh />
					</button>
				)}
			</div>

			<div class="space-y-4">
				{sections.map(section => (
					<div key={section.id} class="border-b border-gray-200 pb-4 last:border-b-0">
						<div class="flex justify-between items-center mb-2">
							<button
								onClick={() => toggleSection(section.id)}
								class="flex items-center text-left"
							>
								<span class="text-gray-600 font-medium">{section.title}</span>
								{section.isExpanded ? (
									<ChevronUp class="w-4 h-4 text-gray-400 ml-2" />
								) : (
									<ChevronDown class="w-4 h-4 text-gray-400 ml-2" />
								)}
							</button>
							{selectedOptions[ section.id ]?.length > 0 && (
								<button
									onClick={() => clearSectionFilter(section.id)}
									class="text-xs text-blue-500 hover:text-blue-700 focus:outline-none focus:underline"
								>
									Clear
								</button>
							)}
						</div>

						{section.isExpanded && (
							<div class="space-y-2">
								{getVisibleOptions(section).map(option => (
									<label key={option.id} class="flex items-center space-x-2 cursor-pointer">
										<input
											type={section.type}
											name={section.id}
											checked={selectedOptions[ section.id ]?.includes(option.id) || false}
											onChange={() => handleOptionChange(section.id, option.id, section.type)}
											class={
												section.type === 'checkbox'
													? 'form-checkbox rounded border-gray-300 text-blue-500 focus:ring-blue-500'
													: 'form-radio border-gray-300 text-blue-500 focus:ring-blue-500'
											}
										/>
										<span class="text-gray-600 text-sm">{option.label}</span>
										{option.count !== undefined && (
											<span class="text-gray-400 text-sm">({option.count})</span>
										)}
										{option.isNew && (
											<span class="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">
												NEW
											</span>
										)}
									</label>
								))}
								{section.options.length > 5 && !section.showAll && (
									<button
										onClick={() => setActivePopup(section.id)}
										class="text-blue-500 text-sm hover:text-blue-600 mt-2"
									>
										More ▾
									</button>
								)}
							</div>
						)}
					</div>
				))}
			</div>

			{/* Popup Modal */}
			{activePopup && (
				<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div class="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto relative">
						<button
							onClick={() => setActivePopup(null)}
							class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
						>
							<X class="w-6 h-6" />
						</button>

						<h3 class="text-lg font-medium mb-4">
							{sections.find(s => s.id === activePopup)?.title}
						</h3>

						<div class="space-y-2">
							{sections
								.find(s => s.id === activePopup)
								?.options.map(option => (
									<label key={option.id} class="flex items-center space-x-2 cursor-pointer">
										<input
											type={sections.find(s => s.id === activePopup)?.type}
											name={activePopup}
											checked={selectedOptions[ activePopup ]?.includes(option.id) || false}
											onChange={() =>
												handleOptionChange(
													activePopup,
													option.id,
													sections.find(s => s.id === activePopup)?.type || 'checkbox'
												)
											}
											class={
												sections.find(s => s.id === activePopup)?.type === 'checkbox'
													? 'form-checkbox rounded border-gray-300 text-blue-500 focus:ring-blue-500'
													: 'form-radio border-gray-300 text-blue-500 focus:ring-blue-500'
											}
										/>
										<span class="text-gray-600 text-sm">{option.label}</span>
										{option.count !== undefined && (
											<span class="text-gray-400 text-sm">({option.count})</span>
										)}
									</label>
								))}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default FilterList

