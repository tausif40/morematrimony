import React from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import './image.css'



const images = [
	{ src: 'https://res.cloudinary.com/drfni1iqf/image/upload/v1729594307/Tausif/temp/img2_pop07c.jpg' },
	{ src: 'https://res.cloudinary.com/drfni1iqf/image/upload/v1729594307/Tausif/temp/img3_gl05sz.jpg' },
	{ src: 'https://res.cloudinary.com/drfni1iqf/image/upload/v1729594306/Tausif/temp/img4_qjhdex.jpg' },
	{ src: 'https://res.cloudinary.com/drfni1iqf/image/upload/v1729594306/Tausif/temp/img1_wdcpmj.jpg' },
	{ src: 'https://res.cloudinary.com/drfni1iqf/image/upload/v1717399015/Tausif/temp/img_rjd4en.png' },
];

function PhotoGallery() {
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
								original={image.src}
								thumbnail={image.src}
								width='1200'
								height='800'
							>
								{({ ref, open }) => (
									<img
										ref={ref}
										onClick={open}
										src={image.src}
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