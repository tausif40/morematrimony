import React, { useState } from 'react';
import apiClient from '../../api/apiClient';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { uploadProfile } from '../../store/features/profileData-slice';

const IntroductionForm = () => {
	const dispatch = useDispatch();
	const [ introduction, setIntroduction ] = useState('');
	const [ errors, setError ] = useState();
	const { formData, loading, error } = useSelector((state) => state.profileData);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (introduction == '') {
			setError('Introduction is required')
			toast.error('Please correct all highlighted errors!');
			return;
		}
		try {
			dispatch(uploadProfile(introduction));
			// const response = await apiClient.post('/introduction', { introduction });
			// console.log('Form submitted successfully:', response.data);

			toast.success('Introduction update successfully');
		} catch (error) {
			console.error('Error submitting form:', error);
			toast.error('Introduction update failed');
		}
	};


	return (
		<form onSubmit={handleSubmit} className="box-shadow bg-white border rounded-md">
			<p className='px-6 py-3 font-medium border-b text-headingGray'>Introduction</p>
			<div className='py-4 px-6 text-sm'>
				<div className='flex flex-col md:flex-row gap-6 md:gap-14 text-black'>
					<p className='block font-medium mb-1 text-headingGray min-w-max'>Introduction  <span className='text-red-500'>*</span></p>
					<textarea
						type="text"
						rows="4"
						value={introduction}
						onChange={(e) => {
							setIntroduction(e.target.value)
							setError('')
						}}
						className={`border rounded w-full py-2 px-3 text-gray-700`}
						placeholder="Enter your introduction"
					/>
				</div>
				<div className="flex justify-between ">
					<p className="text-red-500 text-xs mt-1 md:pl-40">{errors}</p>
					<button
						type="submit"
						className="gradient-btn mt-4 text-white py-2 px-4 rounded-md right text-sm"
					>
						Submit
					</button>
				</div>

			</div>
		</form>
	);
};

export default IntroductionForm;
