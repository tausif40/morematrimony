import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { IoCheckmarkDoneOutline } from "react-icons/io5";

const IntroductionForm = ({ data, onFormSubmit }) => {
	const dispatch = useDispatch();
	const [ introduction, setIntroduction ] = useState('');
	const [ errors, setError ] = useState();

	const { introductionData, isLoading } = data

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("introduction- ", introduction);
		// if (introduction === undefined) return;
		if (introduction === undefined || introduction?.trim() === '') {
			setError('Introduction is required')
			toast.error('Introduction is required');
			return;
		}
		onFormSubmit({ introduction });
	};
	useEffect(() => {
		setIntroduction(introductionData)
		// console.log(introductionData);
	}, [ introductionData ])

	return (
		<form onSubmit={handleSubmit} className="box-shadow bg-white border rounded-md">
			<p className='px-6 py-3 font-medium border-b text-headingGray'>Introduction</p>
			<div className='py-4 px-6 text-sm'>
				<div className='flex flex-col md:flex-row gap-6 md:gap-14 text-black'>
					<p className='block font-medium mb-1 text-headingGray min-w-max'>Introduction  <span className='text-red-500'>*</span></p>
					<div className='w-full'>
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
						<p className="text-red-500 text-xs mt-1">{errors}</p>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<p className="text-green-500 text-xs font-semibold mt-1">{introductionData !== undefined && <p className='flex items-center gap-1'>Completed <IoCheckmarkDoneOutline size={16} /></p>}</p>
					<button
						disabled={isLoading}
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
