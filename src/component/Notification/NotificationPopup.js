import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import male from '../../img/male.png'
import female from '../../img/male.png'

const NotificationPopup = ({ isOpen, onClose }) => {

	const getNotification = useSelector((state) => state.notification.notification);
	const userId = useSelector((state) => state.userDetails.userId);
	const [ premium, setPremium ] = useState(true);
	const notifications = getNotification?.data;
	const getActivityMessage = (type, name) => {
		switch (type) {
			case 'accept':
				return `${name} accepted your interest`;
			case 'send_interest':
				return `${name} sent you an interest`;
			default:
				return `${name} interacted with your profile`;
		}
	};

	if (!isOpen) return null;

	return (
		<div className='shadow-lg border absolute right-[9%] top-12 w-96 p-2 rounded-lg py-1 z-20 max-h-[400px] overflow-y-auto custom-scrollbar bg-[#fbf8f6]' >
			<div className="px-2 pt-2 pb-3 space-y-1 sm:px-2">
				<div className="space-y-4 ">
					{notifications?.socialAction?.map((notification) => (
						<Link to={`/matches/profile-details/${notification?.userId}/${userId}`} className="relative z-10 w-full" key={notification._id}>
							<div className="flex items-start space-x-4 p-4 bg-white hover:bg-slate-50 rounded-lg transition border border-gray-100" onClick={onClose}	>
								<div className="flex-shrink-0">
									<img
										src={notification?.userDetails?.profileImage ? notification?.userDetails?.profileImage : notification?.userDetails?.basicInformation?.gender === 'male' ? male : female}
										alt={`${notification.userDetails.basicInformation.firstName}'s profile`}
										className="w-12 h-12 rounded-full object-cover border-2 border-indigo-100"
									/>
								</div>
								<div className="flex-1 min-w-0">
									<div className="flex justify-between items-start">
										<p className="text-sm font-medium text-gray-900 truncate capitalize">
											{notification.userDetails.basicInformation.firstName}{' '}
											{!premium ? notification.userDetails.basicInformation.lastName : <span className="blur-sm select-none">Xxxxxxxxx</span>}
										</p>
										<span className="text-xs text-gray-500">
											{formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
										</span>
									</div>
									<p className="text-sm text-gray-600 mt-1">
										{getActivityMessage(notification.activityType, notification.userDetails.basicInformation.firstName)}
									</p>
									<div className="mt-1 flex items-center space-x-2 text-xs text-gray-500">
										<span>{notification.userDetails.basicInformation.maritalStatus}</span>
										<span>•</span>
										<span>
											{notification.userDetails.presentAddress.city[ 0 ]?.name},{' '}
											{notification.userDetails.presentAddress.state[ 0 ]?.name}
										</span>
									</div>
								</div>
							</div>
						</Link >
					))}
					{notifications?.socialAction?.length === 0 && <div>No any notification</div>}
				</div>
			</div>
		</div>
	);
};

export default NotificationPopup;