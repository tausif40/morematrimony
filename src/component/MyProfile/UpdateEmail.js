import React, { useState } from 'react';
import apiClient from '../../api/apiClient';

function UpdateEmail() {
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
		<>
			<form onSubmit={handleSubmit} className="box-shadow bg-white border rounded-md">
				<p className='px-6 py-3 font-medium border-b text-headingGray'>Change your email</p>
				<div className='py-4 px-6 text-sm'>
					<div className='flex flex-col md:flex-row gap-6 md:gap-14 text-text'>
						<p className='min-w-max'>Your Email</p>
						<div className='flex w-full'>
							<input
								type="text"
								value={introduction}
								onChange={(e) => setIntroduction(e.target.value)}
								className="rounded-l-md p-3 block w-full border border-gray-300 outline-none focus:ring-primary focus:border-primary text-sm transition-all"
								placeholder="Enter your introduction"
							/>
							<button className='float-end border rounded-r-md px-6 border-primary hover:bg-primary hover:text-white transition-all'>
								Verify
							</button>
						</div>
					</div>
					<div className="flex justify-end">
						<button
							type="submit"
							className="gradient-btn mt-4 text-white py-2 px-4 rounded"
						>
							Submit
						</button>
					</div>
				</div>
			</form>
		</>
	)
}

export default UpdateEmail