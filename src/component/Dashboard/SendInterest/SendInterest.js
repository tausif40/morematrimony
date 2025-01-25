import React, { useEffect, useMemo, useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { getUserAction } from '../../../store/features/userAction-slice';
import male from '../../../img/male.png';
import female from '../../../img/female.png';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import ActionLoader from '../../Loader/ActionLoader';
import ActionCart from '../../Template/ActionCart';

const SendInterest = () => {
	const dispatch = useDispatch();
	const [ sendInterestList, setSendInterestList ] = useState([]);

	const sendInterest = useSelector((state) => state.userAction.send_interest);
	const isLoading = sendInterest.loading;

	useEffect(() => {
		dispatch(getUserAction("send_interest"));
	}, [ dispatch ]);

	useEffect(() => {
		setSendInterestList(sendInterest?.data?.socialAction);
	}, [ sendInterest ]);

	return (
		<>
			<div className="bg-gradient-to-br from-slate-50 to-red-50 rounded-md overflow-hidden border">
				{/* Header */}
				<header className="text-gray-700 shadow-md">
					<div className="container mx-auto px-4 py-3">
						<div className="flex justify-between items-center">
							<h1 className="text-2xl font-semibold">Send Interest</h1>
							<div className="flex items-center space-x-4">
								<div className="relative">
									<input
										type="text"
										placeholder="Search profiles..."
										className="pl-10 pr-4 py-2 rounded-full bg-black/10 backdrop-blur-sm text-gray-700 placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-black/30 w-96"
									// value={searchQuery}
									// onChange={(e) => setSearchQuery(e.target.value)}
									/>
									<Search className="absolute left-3 top-2.5 h-5 w-5 text-black/70" />
								</div>
							</div>
						</div>
					</div>
				</header>

				{/* Main Content */}
				<ActionCart
					UserData={sendInterestList}
					isLoading={isLoading}
				/>
			</div>
		</>
	);
};

export default SendInterest;
