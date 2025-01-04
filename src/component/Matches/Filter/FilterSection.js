import React from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

function FilterSection({
	section,
	selectedOptions,
	toggleSection,
	handleOptionChange,
	clearSectionFilter,
	getVisibleOptions,
	setActivePopup,
}) {
	return (
		<div className="border-gray-200 last:border-b-0 ">
			<div className="flex justify-between items-center mb-[2px] bg-gray-100 py-2 px-6">
				<button
					onClick={() => toggleSection(section?.id)}
					className="flex items-center text-left"
				>
					<span className="text-gray-600 font-medium">{section?.title}</span>
					{section?.isExpanded ? (
						<ChevronUp className="w-4 h-4 text-gray-400 ml-2" />
					) : (
						<ChevronDown className="w-4 h-4 text-gray-400 ml-2" />
					)}
				</button>
				{selectedOptions[ section?.id ]?.length > 0 && (
					<button
						onClick={() => clearSectionFilter(section?.id)}
						className="text-xs text-blue-500 hover:text-blue-700 focus:outline-none focus:underline"
					>
						Clear
					</button>
				)}
			</div>

			{section?.isExpanded && (
				<div className="space-y-2 px-6 pb-6 pt-2">
					{getVisibleOptions(section)?.map((option) => (
						<label key={option?.id} className="flex items-center space-x-2 cursor-pointer">
							<input
								type={section?.type}
								name={section?.id}
								checked={selectedOptions[ section?.id ]?.includes(option?.id) || false}
								onChange={() => handleOptionChange(section?.id, option?.id, section?.type)}
								className={
									section?.type === 'checkbox'
										? 'form-checkbox rounded border-gray-300 text-blue-500 focus:ring-blue-500'
										: 'form-radio border-gray-300 text-blue-500 focus:ring-blue-500'
								}
							/>
							<span className="text-gray-600 text-sm">{option?.label}</span>
							{option?.count !== undefined && (
								<span className="text-gray-400 text-sm">({option?.count})</span>
							)}
							{option?.isNew && (
								<span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">NEW</span>
							)}
						</label>
					))}
					{section?.options?.length > 5 && !section?.showAll && (
						<button
							onClick={() => setActivePopup(section?.id)}
							className="text-blue-500 text-sm hover:text-blue-600 mt-2"
						>
							More ▾
						</button>
					)}
				</div>
			)}
		</div>
	);
}

export default FilterSection;
