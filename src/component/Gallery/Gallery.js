import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadDpImage } from '../../store/features/images-slice';
import { MdDelete } from "react-icons/md";
import ImageUploader from '../../utils/ui/ImageUploader';
import { deleteImage } from '../../store/features/images-slice';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Tooltip } from 'antd';

function PhotoGallery() {
	const dispatch = useDispatch();
	const [ images, setImages ] = useState([]);
	const [ conformation, setConformation ] = useState(false);

	const profileImages = useSelector((state) => state.userDetails.profileImages);
	const DpImage = useSelector((state) => state.image.DpImage);

	useEffect(() => {
		setImages(profileImages?.data?.gallery)
		// console.log(profileImages?.data?.gallery);
	}, [ profileImages ]);

	const handelUploadImage = (userId, url) => {
		dispatch(uploadDpImage({ userId, url }));
	};

	const handelDeleteImage = async (userId) => {
		dispatch(deleteImage(userId));
	};

	return (
		<div className="container text-textGray border shadow-md rounded-xl">
			<div className="px-2 py-8">
				<PhotoProvider maskOpacity={0.8}>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 object-cover">
						<ImageUploader />
						{images?.map((image, index) => (
							<div key={index} className="relative m-auto flex justify-center w-full">
								<PhotoView key={image._id} src={image.image}>
									<img
										src={image.image}
										alt={image.filename}
										className="h-80 md:h-80 object-cover w-full bg-slate-100 rounded"
									/>
								</PhotoView>
								<div className="absolute top-1 right-1 flex flex-col space-y-3">
									<Tooltip placement="right" title="Set as profile" color="blue">
										<button
											onClick={() => handelUploadImage(image.agentId, image.image)}
											className={`bg-black/40 hover:bg-black/70 px-1 py-1 rounded transition-all ${DpImage.loading ? 'text-gray-400 cursor-wait' : 'text-white'}`}
											disabled={DpImage.loading}
										>
											<img src="/assets/img/setProfile.png" alt="" className='w-6' />
										</button>
									</Tooltip>
									<Tooltip placement="right" title="Delete" color="red">
										<button
											onClick={() => handelDeleteImage(image._id)}
											className="bg-black/40 hover:bg-black/70 text-white px-1 py-1 rounded transition-all"
										>
											<MdDelete size={22} color="#f2432c" />
										</button>
									</Tooltip>
								</div>
							</div>
						))}
						{!profileImages?.loading && images?.length === 0 && <img src="/assets/img/noImage.jpg" alt="" className='h-full' />}
					</div>
				</PhotoProvider>
			</div>
		</div>
	);
}

export default PhotoGallery;
