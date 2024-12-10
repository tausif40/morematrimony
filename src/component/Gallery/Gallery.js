import React, { useEffect, useState } from 'react';
import apiClient from '../../api/apiClient';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const Gallery = () => {
	const [ uploadProgress, setUploadProgress ] = useState(0);
	const [ isUploading, setIsUploading ] = useState(false);
	const [ uploadedImages, setUploadedImages ] = useState([]);
	const [ hasUpdated, setHasUpdated ] = useState(false);

	const profileImages = useSelector((state) => state.userDetails.profileImages);



	useEffect(() => {
		if (!hasUpdated && profileImages?.data?.gallery?.length > 0) {
			const newImages = profileImages.data.gallery.map((image) => image.image);
			setUploadedImages((prevImages) => [ ...prevImages, ...newImages ]);
			setHasUpdated(true);
		}
	}, [ profileImages, hasUpdated ]);

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
		formData.append('file', file);

		// Debugging FormData
		// console.log('FormData Entries:');
		// for (const [ key, value ] of formData.entries()) {
		// 	console.log(`${key}:`, value);
		// }

		try {
			const response = await apiClient.post('/gallery', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				onUploadProgress: (progressEvent) => {
					const percentage = Math.round(
						(progressEvent.loaded * 100) / progressEvent.total
					);
					setUploadProgress(percentage);
				},
			});
			console.log(response);
			toast.success('Image uploaded successfully');
			const imageUrl = URL.createObjectURL(file);
			setUploadedImages((prevImages) => [ ...prevImages, imageUrl ]);
		} catch (error) {
			console.error('Error uploading image:', error);
			toast.error(error?.response?.data?.message || 'Failed to upload image');
		}

		setIsUploading(false);
	};

	return (
		<>
			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-center border w-full p-4 rounded-md shadow-sm min-h-80'>
				<div className=" flex flex-col items-center justify-center p-4 shadow-md bg-gray-100 rounded-sm min-h-72">
					<label className="flex flex-col items-center justify-center w-20 h-20 bg-hotRed text-white rounded-full cursor-pointer text-center shadow-md overflow-hidden">
						<input type="file" accept="image/*" className="hidden" onChange={handleImageChange} disabled={isUploading} />

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
					<p className="text-sm mt-3 h-5">{isUploading ? 'Uploading....' : 'Add New Image'}</p>
					{/* Upload Progress Bar */}
					{isUploading && (
						<>
							<div className="w-full bg-hotRed rounded-full mt-8">
								<div
									className="h-1 bg-hotRed rounded-full"
									style={{ width: `${uploadProgress}%` }}
								>
								</div>
							</div>
							<p className="mt-1 text-hotRed">{uploadProgress}%</p>
						</>
					)}
				</div>

				{/* Show Uploaded Images */}
				{/* <div className="flex flex-wrap justify-center mt-4 space-x-4"> */}
				{uploadedImages?.map((image, index) => (
					<img
						key={index}
						src={image}
						alt={`Uploaded ${index + 1}`}
						className=" rounded-md shadow-md h-80 md:h-72 object-cover cursor-pointer w-full"
					/>
				))}
				{/* </div> */}
			</div>
		</>
	);
};

export default Gallery;
