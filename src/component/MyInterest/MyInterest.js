import React, { useState } from 'react';
import apiClient from '../../api/apiClient';

const MyInterest = () => {
	const [ introduction, setIntroduction ] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await apiClient.post('/introduction', { introduction });
			console.log('Form submitted successfully:', response.data);
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="box-shadow bg-white border rounded-md">
			<p className='px-6 py-3 font-medium border-b text-headingGray'>My Interests</p>
			<div className='py-4 px-6 text-sm'>
				<div className='flex flex-col md:flex-row gap-6 md:gap-14 text-text'>
					<p className=''>Introduction</p>
					<textarea
						type="text"
						rows="4"
						value={introduction}
						onChange={(e) => setIntroduction(e.target.value)}
						className="border rounded w-full py-2 px-3 text-gray-700"
						placeholder="Enter your introduction"
					/>
				</div>
				<div className="flex justify-end">
					<button
						type="submit"
						className="gradient-btn mt-4 text-white py-2 px-4 rounded right"
					>
						Submit
					</button>
				</div>
			</div>
		</form>
	);
};

export default MyInterest;
