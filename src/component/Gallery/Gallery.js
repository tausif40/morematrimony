import React, { useState } from 'react';
import axios from 'axios';

const Gallery = () => {
	const [ uploadProgress, setUploadProgress ] = useState(0);
	const [ isUploading, setIsUploading ] = useState(false);
	const [ uploadedImages, setUploadedImages ] = useState([]);

	const handleImageChange = (e) => {
		const file = e.target.files[ 0 ];
		if (file) {
			setIsUploading(true);
			setUploadProgress(0);
			uploadImage(file);
		}
	};

	const uploadImage = async (file) => {
		const formData = new FormData();
		formData.append('image', file);

		try {
			const response = await axios.post('YOUR_API_ENDPOINT', formData, {
				onUploadProgress: (progressEvent) => {
					const percentage = Math.round(
						(progressEvent.loaded * 100) / progressEvent.total
					);
					setUploadProgress(percentage);
				}
			});

			const imageUrl = URL.createObjectURL(file); // Replace this with `response.data.imageUrl` when working with a real API

			setUploadedImages((prevImages) => [ ...prevImages, imageUrl ]);
		} catch (error) {
			console.error('Error uploading image:', error);
		}

		setIsUploading(false);
	};

	return (
		<>
			<div className='grid grid-cols-4 justify-center border w-full p-4 rounded-md shadow-sm h-80'>
				<div className=" flex flex-col items-center justify-center p-4 shadow-sm bg-gray-100 rounded-sm">
					<label className="flex flex-col items-center justify-center w-20 h-20 bg-hotRed text-white rounded-full cursor-pointer text-center">
						<input type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} />

						{isUploading ? (
							<div className="flex flex-col items-center">
								<svg
									className="animate-spin h-5 w-5 text-white"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.137.84 4.085 2.209 5.535l1.791-1.244z"
									></path>
								</svg>
							</div>
						) : (
							<>
								<span className="text-4xl">+</span>
							</>
						)}
					</label>
					<p className="text-sm mt-1">Add New Image</p>
					{/* Upload Progress Bar */}
					{isUploading && (
						<>
							<div className="px-8 w-full bg-hotRed rounded-full mt-8">
								<div
									className="h-1 bg-pink-500 rounded-full"
									style={{ width: `${uploadProgress}%` }}
								></div>
							</div>
							<p className="mt-1 text-hotRed">{uploadProgress}%</p>
						</>
					)}
				</div>

				{/* Show Uploaded Images */}
				{/* <div className="flex flex-wrap justify-center mt-4 space-x-4"> */}
				{uploadedImages.map((image, index) => (
					<img
						key={index}
						src={image}
						alt={`Uploaded ${index + 1}`}
						className="w-32 h-32 object-cover rounded-md shadow-md"
					/>
				))}
				{/* </div> */}
			</div>
		</>
	);
};

export default Gallery;
