import React from 'react'

function ActionLoader() {
	return (
		<div className="bg-white rounded-lg shadow-sm overflow-hidden transform hover:shadow-xl transition duration-300">
			<div className="relative bg-gray-200 w-full">
				<div className="w-full h-64 bg-gray-300 animate-pulse"></div>
			</div>
			<div className="px-4 pt-2 pb-4">
				<div className="mb-6 mt-4">
					<div className=''>
						<div className="h-8 bg-gray-300 w-3/5 rounded-md mb-2 animate-pulse"></div>
						<div className="h-4 bg-gray-300 w-3/4 rounded-md animate-pulse"></div>
					</div>
				</div>
				<div className="space-y-2 ">
					<div className="h-4 bg-gray-300 w-5/6 rounded-md animate-pulse"></div>
					<div className="h-4 bg-gray-300 w-4/5 rounded-md animate-pulse"></div>
					<div className="h-4 bg-gray-300 w-3/4 rounded-md animate-pulse"></div>
				</div>
			</div>
			<div className="py-3 flex justify-center items-center border-t">
				<div className="h-10 bg-gray-300 w-1/2 rounded-full animate-pulse"></div>
			</div>
		</div>
	)
}

export default ActionLoader