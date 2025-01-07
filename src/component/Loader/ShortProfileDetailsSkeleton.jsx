import React from 'react'

function ShortProfileDetailsSkeleton() {
	return (
		<section className="text-textGray animate-pulse">
			<div className="container border shadow-md rounded-xl">
				{/* Skeleton details section */}
				<div className="flex flex-col sm:flex-row gap-6 md:gap-8 lg:gap-12 w-full pt-2 pb-6 sm:py-6">
					{/* Skeleton Profile Image */}
					<div className="relative">
						<div className="h-96 w-[360px] rounded-lg bg-gray-200"></div>
					</div>

					{/* Skeleton Details */}
					<div className="px-4 md:px-0 flex flex-col justify-between w-full">
						<div className="relative text-black pb-4">
							<div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
							<div className="flex items-center space-x-2 text-sm font-light">
								<div className="h-4 bg-gray-200 rounded w-20"></div>
								<span className="h-4 w-4 bg-gray-200 rounded"></span>
								<div className="h-4 bg-gray-200 rounded w-24"></div>
							</div>
							<div className="flex items-center space-x-4 mt-2">
								<div className="h-6 w-6 bg-gray-200 rounded-full"></div>
								<div className="h-4 bg-gray-200 rounded w-48"></div>
							</div>
							<div className="flex items-center space-x-4 mt-2">
								<div className="h-6 w-6 bg-gray-200 rounded-full"></div>
								<div className="h-4 bg-gray-200 rounded w-56"></div>
							</div>
							<div className="flex items-center space-x-4 mt-2">
								<div className="h-6 w-6 bg-gray-200 rounded-full"></div>
								<div className="h-4 bg-gray-200 rounded w-60"></div>
							</div>
							<div className="flex items-center space-x-4 mt-2">
								<div className="h-6 w-6 bg-gray-200 rounded-full"></div>
								<div className="h-4 bg-gray-200 rounded w-64"></div>
							</div>
							<div className="flex items-center space-x-4 mt-2">
								<div className="h-6 w-6 bg-gray-200 rounded-full"></div>
								<div className="h-4 bg-gray-200 rounded w-72"></div>
							</div>
						</div>

						<div>
							<hr className="border-gray-300" />
							<div className="flex items-center justify-end gap-6 mt-4">
								<div className="h-8 bg-gray-200 rounded-full w-40"></div>
								<div className="h-8 bg-gray-200 rounded-full w-40"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

	)
}

export default ShortProfileDetailsSkeleton