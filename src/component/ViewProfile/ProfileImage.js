import { useState } from 'react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './viewProfile.css';

const ProfileImage = () => {
	const [ isPurchased, setIsPurchased ] = useState(true);

	const images = [
		{ img: 'https://res.cloudinary.com/drfni1iqf/image/upload/v1729594307/Tausif/temp/img2_pop07c.jpg' },
		{ img: 'https://res.cloudinary.com/drfni1iqf/image/upload/v1729594306/Tausif/temp/img4_qjhdex.jpg' },
		{ img: 'https://res.cloudinary.com/drfni1iqf/image/upload/v1729594306/Tausif/temp/img1_wdcpmj.jpg' },
		{ img: 'https://res.cloudinary.com/drfni1iqf/image/upload/v1729594307/Tausif/temp/img3_gl05sz.jpg' },
		{ img: 'https://res.cloudinary.com/drfni1iqf/image/upload/v1717399015/Tausif/temp/img_rjd4en.png' },
	];

	const handlePurchase = () => {
		// Implement purchase logic here
		// On successful purchase, set `isPurchased` to true
		setIsPurchased(true);
	};

	return (
		<div className='box before:h-[18rem] sm:before:h-[20rem] md:before:h-[22rem] lg:before:h-96 sm:w-[260px] md:w-[320px] lg:w-[360px] rounded-lg object-cover'>
			<div class="ribbon"><span>New Join</span></div>
			<Swiper
				modules={[ Autoplay, Pagination, Navigation, EffectFade ]}
				spaceBetween={20}
				centeredSlides={false}
				autoplay={{ delay: 5000, disableOnInteraction: false }}
				zoom={true}
				pagination={{ clickable: true }}
				className="mySwiper"
			>
				{images.map((value, index) => (
					<SwiperSlide key={index}>
						<div className="relative w-full sm:w-[260px] md:w-[320px] lg:w-[360px] h-[22rem] sm:h-[20rem] md:h-[22rem] lg:h-96 overflow-hidden">
							{/* <img
								src={value.img}
								className={`slider-img h-full w-full rounded-lg object-cover ${!isPurchased && index > 0 ? 'blur-lg' : ''}`}
								onContextMenu={(e) => e.preventDefault()}
							/> */}

							<img
								src={value.img}
								alt={`Image ${index + 1}`}
								className="object-contain w-full h-full"
							/>

							{/* Left Gradient Overlay */}
							{/* <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-white/70 to-transparent"></div> */}

							{/* Right Gradient Overlay */}
							{/* <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-white/70 to-transparent"></div> */}

							{/* Text Overlay */}
							<div className="absolute top-0 left-10 h-full text-gray-600 text-2xl font-semibold tracking-wide transform -rotate-90">
								<p className="">more matrimony.com</p>
							</div>

							<div className="absolute inset-0 bg-transparent" onContextMenu={(e) => e.preventDefault()}></div>

							{!isPurchased && index > 0 && (
								<div className="absolute inset-0 flex items-center justify-center">
									<button
										onClick={handlePurchase}
										className="bg-blue-500 text-white px-4 py-2 rounded-lg"
									>
										Purchase to View
									</button>
								</div>
							)}
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default ProfileImage;
