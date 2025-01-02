import React from 'react'

function ProfileListSkeleton() {
	return (
		<div className="border rounded-lg shadow-sm p-3 md:p-4 mb-10 flex flex-col sm:flex-row items-start sm:space-x-6 md:space-x-8 animate-pulse">
			{/* Image Skeleton */}
			<div className="box flex-shrink-0 flex items-center justify-center relative w-full sm:w-auto rounded-xl overflow-hidden bg-gray-300">
				<div className="absolute inset-0 bg-gray-300"></div>
				<div className="absolute inset-0 rounded-xl"></div>
				<div className="relative z-10 w-full h-96 sm:w-64 sm:h-64 bg-gray-400"></div>
			</div>

			{/* Profile Details Skeleton */}
			<div className="h-64 w-full flex flex-col justify-between py-2">
				<div>
					{/* Name Placeholder */}
					<div className="h-6 w-2/3 bg-gray-300 rounded-md mb-2"></div>
					{/* ID and Last Seen Placeholder */}
					<div className="h-4 w-1/2 bg-gray-300 rounded-md mb-4"></div>
					{/* Details Placeholder */}
					<div className="h-4 w-full bg-gray-300 rounded-md mb-2"></div>
					<div className="h-4 w-3/4 bg-gray-300 rounded-md mb-2"></div>
				</div>

				{/* Connect Options Skeleton */}
				<div className="flex flex-col mt-2">
					<div className="h-4 w-2/3 bg-gray-300 rounded-md mb-4"></div>
					<div className="flex items-center gap-4 md:gap-6 mt-4">
						{/* Button 1 Placeholder */}
						<div className="h-10 w-32 bg-gray-300 rounded-full"></div>
						{/* Button 2 Placeholder */}
						<div className="h-10 w-40 bg-gray-300 rounded-full"></div>
					</div>
				</div>
			</div>
		</div>

	)
}

export default ProfileListSkeleton;