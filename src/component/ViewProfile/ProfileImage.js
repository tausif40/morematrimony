import { useEffect, useState } from 'react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './viewProfile.css';
import { useDispatch, useSelector } from 'react-redux';
import { getMatchedProfileGallery } from '../../store/features/matchProfile-slice';

const ProfileImage = (agentId) => {
	const dispatch = useDispatch();
	const [ isPurchased, setIsPurchased ] = useState(true);
	const [ images, setImages ] = useState([])

	const getGallery = useSelector((state) => state.matchProfile.matchedProfileGallery);
	// console.log(getGallery);

	useEffect(() => {
		agentId && dispatch(getMatchedProfileGallery(agentId?.agentId))
	}, [ agentId, dispatch ])

	useEffect(() => {
		setImages(getGallery?.data?.gallery)
	}, [ getGallery ])

	const handlePurchase = () => {
		setIsPurchased(true);
	};

	return (
		<div className='box before:h-[18rem] sm:before:h-[20rem] md:before:h-[22rem] lg:before:h-96 sm:w-[260px] md:w-[320px] lg:w-[360px] rounded-lg object-cover'>
			{/* <div class="ribbon"><span>New Join</span></div> */}
			<Swiper
				modules={[ Autoplay, Pagination, Navigation, EffectFade ]}
				spaceBetween={20}
				centeredSlides={false}
				autoplay={{ delay: 5000, disableOnInteraction: false }}
				zoom={true}
				pagination={{ clickable: true }}
				className="mySwiper"
			>
				{images?.map((value, index) => (
					<SwiperSlide key={index}>

						<div className="relative w-full sm:w-[260px] md:w-[320px] lg:w-[360px] h-[22rem] sm:h-[20rem] md:h-[22rem] lg:h-96 overflow-hidden">

							{/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
							<img src={value.image} alt={`Image ${index + 1}`} className="object-cover rounded-lg w-full h-full" />

							<div className="absolute top-0 left-8 h-full text-gray-600 text-3xl font-semibold tracking-wide transform -rotate-90">
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
