import React, { useEffect, useState } from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import { useDispatch, useSelector } from 'react-redux';
import { uploadDpImage } from '../../../store/features/images-slice';
import apiClient from '../../../api/apiClient';
import { MdDelete } from "react-icons/md";
import { TbUpload } from "react-icons/tb";

function PhotoGallery() {
	const dispatch = useDispatch();
	const [ images, setImages ] = useState([]);

	const profileImages = useSelector((state) => state.userDetails.profileImages);
	const DpImage = useSelector((state) => state.image.DpImage);

	useEffect(() => {
		profileImages?.data?.gallery?.forEach((value) => {
			setImages((prevImages) => [ ...prevImages, value ]);
		});
	}, []);

	const handelUploadImage = (userId, url) => {
		dispatch(uploadDpImage({ userId, url }));
	};

	const handelDeleteImage = async (userId) => {
		// const response = await apiClient.delete(`/delete/${userId}`);
		// console.log(response);
		alert("currently not working")
	};
	console.log(images?.length);

	return (
		<div className="container text-textGray border shadow-md rounded-xl">
			<div className="px-2 py-8">
				<Gallery>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 object-cover">
						{images.map((data, index) => (
							<div key={index} className="relative">
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
												className="h-80 md:h-80 object-cover w-full"
											/>
										</>
									)}
								</Item>
								<div className="absolute top-2 right-2 flex space-x-4">
									<button
										onClick={() => handelDeleteImage(data.agentId)}
										className="bg-black/60  text-white px-1 py-1 rounded"
									>
										<MdDelete size={22} color='#f2432c' />
									</button>
									<button
										onClick={() => handelUploadImage(data.agentId, data.image)}
										className={`bg-black/60 px-2 py-1 rounded ${DpImage.loading ? 'text-gray-400 cursor-wait' : 'text-white'}`}
										disabled={DpImage.loading}
									>
										<TbUpload size={22} />
									</button>
								</div>
							</div>
						))}
						{images.length === 0 && <img src="./assets/img/noImage.jpg" alt="" />}
					</div>
				</Gallery>
			</div>
		</div>
	);
}

export default PhotoGallery;
