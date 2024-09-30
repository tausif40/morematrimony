import React, { useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";


const MyInterest = () => {

	const data = [
		{ id: 1, image: 'https://via.placeholder.com/50', name: 'John Doe', age: 25, status: 'Active' },
		{ id: 2, image: 'https://via.placeholder.com/50', name: 'Jane Smith', age: 30, status: 'Inactive' },
		{ id: 3, image: 'https://via.placeholder.com/50', name: 'Sam Johnson', age: 22, status: 'Active' },
	];

	return (
		<section className="box-shadow bg-white border rounded-md">
			<p className='px-6 py-3 font-medium border-b text-headingGray'>My Interests</p>
			<div className='py-4 px-6 text-sm'>
				<div className="overflow-x-auto">
					<table className="min-w-full bg-white border border-gray-200">
						<thead>
							<tr className="bg-gray-100">
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
								<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
								<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
								<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
							</tr>
						</thead>
						<tbody>
							{data.map((item, index) => (
								<tr key={item.id} className="border-b border-gray-200">
									<td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<img src={item.image} alt={item.name} className="h-10 w-10 rounded-full" />
									</td>
									<td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
									<td className="px-6 py-4 whitespace-nowrap text-center">{item.age}</td>
									<td className="px-6 py-4 whitespace-nowrap text-center">
										<span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-500'}`}>
											{item.status}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap flex justify-center"><p><MdDeleteOutline size={24} /></p></td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
};

export default MyInterest;
