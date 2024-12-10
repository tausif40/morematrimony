import React, { useEffect, useState } from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import './image.css'
import { useSelector } from 'react-redux';


function PhotoGallery() {
	const [ images, setImages ] = useState([])

	const profileImages = useSelector((state) => state.userDetails.profileImages);

	useEffect(() => {
		profileImages?.data?.gallery?.map((image, ind) => {
			setImages((prevImages) => [ ...prevImages, image.image ]);
			console.log(image.image);
		})
	}, [])

	return (
		<div className="container text-textGray border shadow-md rounded-xl">
			<div className="px-2 py-8">
				<Gallery
					options={{
						// bgClick: true,
						// clickToCloseNonZoomable: true,
					}}>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 object-cover">
						{images.map((image, index) => (
							<Item
								key={index}
								original={image}
								thumbnail={image}
								width='1200'
								height='800'
							>
								{({ ref, open }) => (
									<img
										ref={ref}
										onClick={open}
										src={image}
										alt=""
										className="h-80 md:h-72 object-cover cursor-pointer w-full"
									/>
								)}
							</Item>
						))}
					</div>
				</Gallery>
			</div>
		</div>
	);
}

export default PhotoGallery;