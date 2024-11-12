import React, { useState, useEffect } from 'react';

function ImagePopup({ images, currentIndex, onClose, onNext, onPrev }) {
	const [ zoomLevel, setZoomLevel ] = useState(1);
	const [ position, setPosition ] = useState({ x: 0, y: 0 });
	const [ touchStart, setTouchStart ] = useState({ x: 0, y: 0 });
	const [ isDragging, setIsDragging ] = useState(false);
	const [ lastTap, setLastTap ] = useState(0);
	const [ initialPinchDistance, setInitialPinchDistance ] = useState(0);
	const [ isPinching, setIsPinching ] = useState(false);

	if (currentIndex === null) return null;

	// Handle double-tap to toggle zoom level
	const handleTap = () => {
		const currentTime = new Date().getTime();
		if (currentTime - lastTap < 300) {
			setZoomLevel(prevZoom => (prevZoom === 1 ? 3 : 1));
			setPosition({ x: 0, y: 0 });
			setLastTap(0); // Reset last tap to avoid accidental double taps
		} else {
			setLastTap(currentTime);
		}
	};

	// Handle mouse and touch start
	const handleStart = (e) => {
		if (e.touches?.length === 2) {
			setIsPinching(true);
			const pinchDistance = Math.hypot(
				e.touches[ 0 ].clientX - e.touches[ 1 ].clientX,
				e.touches[ 0 ].clientY - e.touches[ 1 ].clientY
			);
			setInitialPinchDistance(pinchDistance);
		} else {
			setIsDragging(true);
			const x = e.clientX || e.touches[ 0 ].clientX;
			const y = e.clientY || e.touches[ 0 ].clientY;
			setTouchStart({ x, y });
		}
	};

	// Handle mouse and touch move
	const handleMove = (e) => {
		if (isPinching && e.touches?.length === 2) {
			const pinchDistance = Math.hypot(
				e.touches[ 0 ].clientX - e.touches[ 1 ].clientX,
				e.touches[ 0 ].clientY - e.touches[ 1 ].clientY
			);
			const zoomChange = pinchDistance / initialPinchDistance;
			setZoomLevel((prev) => Math.min(Math.max(prev * zoomChange, 1), 3));
			setInitialPinchDistance(pinchDistance);
		} else if (isDragging && zoomLevel > 1) {
			const x = e.clientX || e.touches[ 0 ].clientX;
			const y = e.clientY || e.touches[ 0 ].clientY;
			const deltaX = x - touchStart.x;
			const deltaY = y - touchStart.y;
			setPosition((prev) => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
			setTouchStart({ x, y });
		}
	};

	// Handle end of mouse/touch events
	const handleEnd = () => {
		setIsDragging(false);
		setIsPinching(false);
	};

	// Close popup if clicking outside the image
	const handleBackgroundClick = (event) => {
		if (event.target.classList.contains('popup-background')) {
			onClose();
		}
	};

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 popup-background"
			onClick={handleBackgroundClick}
		>
			<button className="absolute top-4 right-4 text-white text-3xl" onClick={onClose}>
				&times;
			</button>
			<button className="absolute left-4 text-white text-2xl" onClick={onPrev}>
				&#10094;
			</button>

			<div
				className="relative"
				onMouseDown={handleStart}
				onMouseMove={isDragging ? handleMove : null}
				onMouseUp={handleEnd}
				onTouchStart={handleStart}
				onTouchMove={handleMove}
				onTouchEnd={handleEnd}
				onDoubleClick={handleTap} // Double click for desktop
				onClick={handleTap} // Single tap for mobile
			>
				<img
					src={images[ currentIndex ].img}
					alt={`popup-img-${currentIndex}`}
					className="transition-transform"
					style={{
						transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
						maxHeight: '90vh',
						maxWidth: '90vw',
					}}
				/>
			</div>

			<button className="absolute right-4 text-white text-2xl" onClick={onNext}>
				&#10095;
			</button>

			{/* Reset Zoom Button */}
			<div className="absolute bottom-4 text-white">
				<button className="bg-gray-700 px-4 py-2 rounded" onClick={() => setZoomLevel(1)}>
					Reset
				</button>
			</div>
		</div>
	);
}

export default ImagePopup;
