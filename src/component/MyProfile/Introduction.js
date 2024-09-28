import React, { useState } from 'react';
import apiClient from '../../api/apiClient';

const IntroductionForm = () => {
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
		<form onSubmit={handleSubmit} className="p-4 bg-white shadow-sm border rounded-md">
			<label className="block text-gray-700 text-sm font-bold mb-2">
				Introduction
			</label>
			<input
				type="text"
				value={introduction}
				onChange={(e) => setIntroduction(e.target.value)}
				className="border rounded w-full py-2 px-3 text-gray-700"
				placeholder="Enter your introduction"
			/>
			<button
				type="submit"
				className="mt-4 bg-purple-500 text-white py-2 px-4 rounded"
			>
				Submit
			</button>
		</form>
	);
};

export default IntroductionForm;
