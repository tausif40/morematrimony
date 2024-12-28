import React, { useEffect, useState } from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import { useDispatch, useSelector } from 'react-redux';
import { uploadDpImage } from '../../store/features/images-slice';
import { MdDelete } from "react-icons/md";
import { TbUpload } from "react-icons/tb";
import './gallery.css';
import ImageUploader from '../../utils/ui/ImageUploader';
import apiClient from '../../api/apiClient';
import { deleteImage } from '../../store/features/images-slice';

function PhotoGallery() {
	const dispatch = useDispatch();
	const [ images, setImages ] = useState([]);

	const profileImages = useSelector((state) => state.userDetails.profileImages);
	const DpImage = useSelector((state) => state.image.DpImage);

	useEffect(() => {
		// profileImages?.data?.gallery?.forEach((value) => {
		// 	setImages((prevImages) => [ ...prevImages, value ]);
		// });
		setImages(profileImages?.data?.gallery)
	}, [ profileImages ]);
	// console.log(profileImages?.data?.gallery);

	const handelUploadImage = (userId, url) => {
		dispatch(uploadDpImage({ userId, url }));
	};

	const handelDeleteImage = async (userId) => {
		// const response = await apiClient.delete(`/gallery/${userId}`);
		// dispatch(deleteImage(userId));
		alert('Delete not working Image');
	};

	return (
		<div className="container text-textGray border shadow-md rounded-xl">
			<div className="px-2 py-8">
				<Gallery>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 object-cover">
						<ImageUploader />
						{images?.map((data, index) => (
							<div key={index} className="relative m-auto flex justify-center w-full">
								<Item
									original={data.image}
									thumbnail={data.image}
									width="1200"
									height="800"
									className="bg-gray-400"
								>
									{({ ref, open }) => (
										<>
											<img
												ref={ref}
												onClick={open}
												src={data.image}
												alt=""
												className="h-80 md:h-80 object-cover w-full bg-slate-100 rounded"
											/>
										</>
									)}
								</Item>
								<div className="absolute top-1 right-1 flex flex-col space-y-3">
									<button
										onClick={() => handelUploadImage(data.agentId, data.image)}
										className={`bg-black/40 hover:bg-black/70 px-1 py-1 rounded transition-all ${DpImage.loading ? 'text-gray-400 cursor-wait' : 'text-white'}`}
										disabled={DpImage.loading}
									>
										{/* <TbUpload size={22} /> */}
										<img src="./assets/img/setProfile.png" alt="" className='w-6' />
									</button>
									<button
										onClick={() => handelDeleteImage(data.agentId)}
										className="bg-black/40 hover:bg-black/70 text-white px-1 py-1 rounded transition-all"
									>
										<MdDelete size={22} color="#f2432c" />
									</button>
								</div>
							</div>
						))}
						{!profileImages?.loading && images?.length === 0 && <img src="./assets/img/noImage.jpg" alt="" className='h-full' />}
					</div>
				</Gallery>
			</div>
		</div>
	);
}

export default PhotoGallery;
