import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlanHistory } from "../../store/features/plan-slice";

// const planHistoryData = [
// 	{
// 		_id: "67dbac6de87ddc8e5ec3434c",
// 		name: "Silver",
// 		price: 30,
// 		userDescription: [ "Plan" ],
// 		adminDescription: "For admin use only",
// 		profileLimit: 59,
// 		startDate: "2025-03-20T05:49:33.768Z",
// 		expiryDate: "2025-04-20T05:49:33.768Z",
// 		status: "active",
// 	},
// 	// Add more items here if needed
// ];

const formatDate = (dateStr) =>
	new Date(dateStr).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});

const PlanHistory = () => {
	const dispatch = useDispatch()
	const [ planHistoryData, setPlanHistoryData ] = useState([])

	const planHistory = useSelector((state) => state.planSlice.planHistory);

	useEffect(() => {
		dispatch(getPlanHistory());
	}, [ dispatch ]);

	useEffect(() => {
		setPlanHistoryData(planHistory?.data?.data);
	}, [ planHistory ]);

	return (
		<section className="box-shadow bg-white border rounded-md">
			<div className="min-h-screen bg-gray-50 p-6">
				<div className="max-w-5xl mx-auto">
					<h1 className="text-3xl font-bold mb-8 text-gray-800">📜 Plan History</h1>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						{planHistoryData.map((plan) => (
							<div
								key={plan._id}
								className="bg-white shadow-md rounded-2xl p-6 transition-transform hover:scale-[1.02] hover:shadow-lg border border-gray-200"
							>
								<div className="flex justify-between items-center mb-4">
									<h2 className="text-xl font-semibold text-gray-700">
										{plan.name}
									</h2>
									{/* <span
										className={`px-3 py-1 text-sm font-medium rounded-full ${plan.status === "active"
											? "bg-green-100 text-green-700"
											: "bg-red-100 text-red-600"
											}`}
									>
										{plan.status}
									</span> */}
								</div>

								<div className="space-y-2 text-sm text-gray-600">
									<p>
										💰 <span className="font-medium">Price:</span> ${plan.price}
									</p>
									<p>
										👤 <span className="font-medium">Profile Limit:</span> {plan.profileLimit}
									</p>
									<p>
										📅 <span className="font-medium">Start Date:</span> {formatDate(plan.startDate)}
									</p>
									<p>
										⏳ <span className="font-medium">Expiry Date:</span> {formatDate(plan.expiryDate)}
									</p>
									{/* <p>
										📝 <span className="font-medium">User Description:</span>{" "}
										{plan.userDescription.join(", ")}
									</p> */}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default PlanHistory;
