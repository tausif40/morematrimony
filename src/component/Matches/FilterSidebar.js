import { MdOutlineRefresh } from "react-icons/md";
import { LuFilter } from "react-icons/lu";
import { hinduId } from "../../data/config";

export default function FilterSidebar({
	selectedFilters,
	setActivePopup,
	clearCategoryFilters,
	getSelectedName,
	clearAllFilters,
	removeFilter,
	getCategoryDisplayName,
}) {
	// console.log("selectedFilters-", selectedFilters);
	return (
		<div className="w-72 bg-white shadow-lg sticky top-0 h-screen overflow-y-auto">
			<div className="px-6 py-3 flex justify-between items-center mb-4 bg-gray-200">
				<h4 className="text-black flex items-center gap-2"><LuFilter /> <p>Filters</p></h4>
				<button onClick={clearAllFilters} className="	text-gray-500">
					<MdOutlineRefresh size={24} className="font-extralight" />
				</button>
			</div>
			<div className="pl-8 pr-4">
				{Object.entries(selectedFilters).filter(([ category ]) => {
					// Logic to hide filters option
					if (category === "basicInformationInChildren" && !selectedFilters.maritalStatus.includes("divorced", "widowed", "widower")) return false;
					if (category === "ancestralOriginCity" && !selectedFilters.ancestralOrigin) return false;
					if (category === "presentState" && !selectedFilters.presentCountry) return false;
					if (category === "presentCity" && !selectedFilters.presentState) return false;
					if (category === "caste" && !selectedFilters.religion) return false;
					if (category === "dosh" && selectedFilters.religion !== hinduId) return false;
					if (category === "isMatchedView") return false;
					return true;
				}).map(([ category, selected ]) => (
					<div key={category} className="mb-4">
						<div className="flex justify-between items-center">
							<button
								className="text-gray-700 capitalize"
								onClick={() => setActivePopup(category)}
							>
								{getCategoryDisplayName(category)}
							</button>
							{Array.isArray(selected) && selected.length > 0 && (
								<button
									className="text-xs text-red-500"
									onClick={() => clearCategoryFilters(category)}
								>
									Clear
								</button>
							)}
						</div>
						<div className="flex flex-wrap gap-2">
							{Array.isArray(selected) ? (
								selected.map((value) => (
									<span
										key={value}
										className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs flex items-center space-x-1"
									>
										{console.log('array - ', getSelectedName(category, value))}
										<span>{getSelectedName(category, value)}</span>
										<button
											onClick={() => removeFilter(category, value)}
											className="text-xs text-red-500 hover:text-red-700"
										>
											×
										</button>
									</span>
								))
							) : selected ? (
								<span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs flex items-center space-x-1">
									<span>{getSelectedName(category, selected)}</span>
										{console.log('not array - ', getSelectedName(category, selected))}
									<button
										onClick={() => removeFilter(category, selected)}
										className="text-xs text-red-500 hover:text-red-700"
									>
										×
									</button>
								</span>
							) : null}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
