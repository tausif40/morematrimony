import React, { useEffect, useState } from 'react';

// Define breakpoints based on general screen sizes
const SMALL_DEVICE = 640;
const MOBILE_MAX_WIDTH = 767;
const TABLET_MAX_WIDTH = 1024;
const LAPTOP_MAX_WIDTH = 1280;

const DeviceDetector = () => {
	const [ deviceType, setDeviceType ] = useState('');

	const updateDeviceType = () => {
		const width = window.innerWidth;

		// if (width <= SMALL_DEVICE) {
		// 	setDeviceType('SmallDevice');
		// } else
		if (width <= MOBILE_MAX_WIDTH) {
			setDeviceType('Mobile');
		} else if (width <= TABLET_MAX_WIDTH) {
			setDeviceType('Tablet');
		} else if (width <= LAPTOP_MAX_WIDTH) {
			setDeviceType('Laptop');
		} else {
			setDeviceType('Pc/Desktop');
		}
	};

	useEffect(() => {
		updateDeviceType();
		window.addEventListener('resize', updateDeviceType);

		return () => {
			window.removeEventListener('resize', updateDeviceType);
		};
	}, []);

	return deviceType;
};

export default DeviceDetector;
