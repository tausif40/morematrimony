import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ImageUp } from 'lucide-react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';

const Payment = () => {
	const location = useLocation();
	const selectedPlan = location.state;
	const [ uploaded, setUploaded ] = useState(false);

	// useEffect(() => {
	// 	window.scrollTo({
	// 		top: 0,
	// 		left: 0,
	// 		behavior: "instant",
	// 	});
	// }, [ location ]);

	const props = {
		name: 'file',
		action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
		headers: {
			authorization: 'authorization-text',
		},
		onChange(info) {
			if (info.file.status !== 'uploading') {
				console.log(info.file, info.fileList);
			}
			if (info.file.status === 'done') {
				message.success(`${info.file.name} file uploaded successfully`);
			} else if (info.file.status === 'error') {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
	};

	const handlePaymentSuccess = () => {
		setUploaded(true);
		alert("Payment successful! Admin will be notified for approval.");
	};

	return (
		<div className="min-h-screen bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-100 p-4 md:p-8 flex flex-col gap-10 items-center justify-center">
			<div className="text-center max-w-3xl mb-10">
				<h1 className="text-3xl md:text-4xl font-bold md:font-extrabold text-textGray mb-4">Upgrade to Premium</h1>
				<p className="text-md md:text-lg text-gray-700">Get access to exclusive features, content, and priority support with our Premium Membership. Scan the QR code to pay and get started instantly!</p>
			</div>

			<div className="flex flex-col md:flex-row gap-20 w-full max-w-5xl">
				{/* Plan Details */}
				{/* <div className="bg-emerald-50 border border-emerald-200 shadow-md rounded-3xl w-full md:w-1/2">
					<div
						key={selectedPlan._id}
						className={`flex flex-col justify-between relative rounded-3xl overflow-hidden`}
					>

						<div className="absolute top-0 right-0 left-0 text-center py-2 bg-yellow-300 text-yellow-700 font-semibold text-sm flex items-center justify-center gap-1">
							<Star className="w-4 h-4" />
							Your Selected Plan
							<Star className="w-4 h-4" />
						</div>


						<div className="px-6 pt-12">
							<div className={`flex items-center justify-center mb-4`}>
								<img src={selectedPlan.image} alt={selectedPlan.name} className="h-44 w-full object-cover" />
							</div>
							<h3 className={`text-2xl font-bold mb-3 text-center text-emerald-600`}>
								{selectedPlan.name}
							</h3>
							<div className={`w-full h-[1px] mb-4`}></div>

							<div className="mb-6 flex items-center gap-1">
								<span className='text-xl font-semibold text-gray-500'>Price - </span>
								<span className={`text-3xl font-bold text-emerald-600`}>{selectedPlan.price} BD</span>
							</div>

							<div className="space-y-4 mb-8">
								<div className="flex items-center gap-3">
									<div className={`p-1 rounded-full`}>
										<HiOutlineCalendarDateRange className={`w-5 h-5 text-emerald-600`} />
									</div>
									<span className="text-gray-700">Duration {selectedPlan.duration} {selectedPlan.duration === '1' ? 'Month' : 'Months'}</span>
								</div>

								<div className="flex items-center gap-3">
									<div className={`p-1 rounded-full`}>
										<Zap className={`w-5 h-5 text-emerald-600`} />
									</div>
									<span className="text-gray-700">View {selectedPlan.profileLimit} Mobile Number</span>
								</div>
								{selectedPlan?.userDescription.map((value, index) => (
									<div className="flex items-center gap-3">
										<div className={`p-1 rounded-full`}>
											<Check className={`w-5 h-5 text-emerald-600`} />
										</div>
										<span className="text-gray-700">{value}</span>
									</div>
								))}

							</div>
						</div>
					</div>
				</div> */}

				{/* order summery */}
				<div className="w-md mx-auto h-[350px] bg-white rounded-2xl shadow-md py-6 px-8">
					<h2 className="text-xl font-semibold mb-4">Order Summary</h2>
					<hr className="mb-4" />

					<p className="text-sm text-gray-500 font-semibold mb-2">PACKAGE SELECTED</p>

					<div className="flex justify-between mb-1">
						<span className="font-medium">{selectedPlan.name}</span>
						<span className="font-semibold">{selectedPlan.price} BD</span>
					</div>

					<div className="flex justify-between text-gray-700 text-sm font-medium mb-1">
						<span>Duration</span>
						<span>{selectedPlan.duration} {selectedPlan.duration === '1' ? 'Month' : 'Months'}</span>
					</div>
					<div className="flex justify-between text-gray-700 text-sm font-medium mb-4">
						<span>Mobile Number</span>
						<span>{selectedPlan.profileLimit} View</span>
					</div>

					<hr className="mb-4" />

					<div className="flex justify-between font-medium text-base mb-1">
						<span>Total</span>
						<span>{selectedPlan.price} BD</span>
					</div>

					<div className="flex justify-between text-lg font-bold mt-6">
						<span>You have to pay &nbsp;</span>
						<span className="text-emerald-500">{selectedPlan.price} BD</span>
					</div>
				</div>

				{/* Scanner */}
				<div className="bg-white shadow-md rounded-2xl p-3 sm:p-4 md:p-8 pb-10 w-full md:w-1/2">
					<h2 className="text-3xl font-extrabold mb-4 text-indigo-700">📷 Scan to Pay</h2>
					<div className="mt-6 p-4 flex items-center justify-center text-gray-500">
						{/* Replace this with actual QR scanner component */}
						{/* [ QR Scanner Placeholder ] */}

						<img src="https://res.cloudinary.com/drfni1iqf/image/upload/v1744717196/Temp/qr-code_tw6lnk.png" alt="QR Code" className='w-56 rounded-2xl border-2 border-dashed border-gray-400 p-4 bg-gradient-to-br from-gray-100 to-gray-300 ' />
					</div>
					<p className='mt-4 text-center text-xl font-semibold'>You have to pay <span className='text-emerald-500'>{selectedPlan.price} BD</span></p>


					{/* <div className="flex justify-center items-center gap-3 mt-6">
						<label
							htmlFor="upload"
							className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md cursor-pointer transition"
						>
							<ImageUp size={20} />
							<span>Upload Payment Screenshot</span>
						</label>
						<input
							type="file"
							id="upload"
							className="hidden"
							accept="image/*"
						/>
					</div> */}
					<div className='m-auto flex flex-col justify-center items-center gap-2 mt-6 border py-2 w-full sm:w-80 rounded-md bg-blue-100'>
						<p className='min-w-max'>Upload Payment Screenshot</p>
						<Upload {...props} className='py-2 custom-upload flex flex-col justify-center items-center'>
							<Button icon={<UploadOutlined />}>Click to Upload</Button>
						</Upload>
					</div>

					{uploaded && (
						<div className="mt-8 p-4 bg-red-50 text-red-600 rounded-lg text-center">
							Note - Contact our admin directly via call or WhatsApp after payment: +91-98765-43210
						</div>
					)}

				</div>

			</div>

			{/* Extra Content */}
			<div className="my-12 bg-white shadow-md rounded-3xl p-8 max-w-5xl w-full text-center">
				<h3 className="text-2xl font-bold text-indigo-700 mb-2">🔒 Safe & Secure Payments</h3>
				<p className="text-gray-600 mb-4">All transactions are secured with end-to-end encryption. <br /> If you face any issues, our support team is here to help you 24/7.</p>
				<h3 className="text-2xl font-bold text-indigo-700 mb-2">📞 Need Help?</h3>
				<p className="text-gray-600">Contact us directly through call or WhatsApp : <span className="font-semibold text-purple-600">+91-98765-43210</span></p>
			</div>
		</div>
	);
};

export default Payment;
