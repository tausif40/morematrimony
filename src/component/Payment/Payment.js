import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ImageUp } from 'lucide-react';
import toast from 'react-hot-toast';
import { MdOutlineContentCopy } from "react-icons/md"
import apiClient from '../../lib/apiClient';

const Payment = () => {
	const location = useLocation();
	const emailRef = useRef(null);
	const ibanRef = useRef(null);
	const selectedPlan = location.state;
	const [ selectedFileName, setSelectedFileName ] = useState(null);
	const [ isUploading, setIsUploading ] = useState(false);
	const [ uploaded, setUploaded ] = useState(false);
	const [ formData, setFormData ] = useState([]);

	const copyText = (ref) => {
		const text = ref.current?.innerText;
		if (text) {
			const range = document.createRange();
			range.selectNode(ref.current);
			const selection = window.getSelection();
			selection.removeAllRanges();
			selection.addRange(range);
			navigator.clipboard.writeText(text);
			toast.success("Copied!");
		}
	};


	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "instant",
		});
	}, [ location ]);


	const handleFileChange = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			setSelectedFileName(e.target.files[ 0 ].name);
			const file = e.target.files[ 0 ];
			const newFormData = new FormData();
			newFormData.append('file', file);
			setFormData(newFormData);
			setUploaded(false);
		}
	};

	const handleUploadClick = async () => {
		if (!formData || !selectedPlan?._id) return;
		formData.append('planId', selectedPlan._id);
		setIsUploading(true);
		try {
			const response = await apiClient.post('/transaction', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			console.log(response);

		} catch (err) {
			console.log(err);
		} finally {
			setIsUploading(false);
			setUploaded(true);
		}
	};

	return (
		<div className="shadow-inner bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-100 p-4 md:p-8 flex flex-col gap-5 items-center justify-center">
			<div className="text-center max-w-3xl">
				<h1 className="text-3xl md:text-4xl font-bold md:font-extrabold text-textGray mb-4">Upgrade to Premium</h1>
				<p className="text-md md:text-lg text-gray-700">Get access to exclusive features, content, and priority support with our Premium Membership. Scan the QR code to pay and get started instantly!</p>
			</div>


			{/* office details*/}
			<div className="mb-2 bg-white shadow-md rounded-3xl p-4 max-w-5xl w-full text-center">
				<h4 className='text-2xl font-bold text-primary mb-2 '>You can reach out on this address</h4>
				<div className='mt-4 flex items-center gap-2 justify-center'>
					<h3 className="text-2xl font-semibold text-gold flex items-center gap-2">
						<img src="/assets/img/address.png" alt="" className='w-5' /> <span>Address : </span>
					</h3>
					<p className="text-gray-600">city, state, country, pin-1234
						{/* <span className="font-semibold text-purple-600">+91-98765-43210</span> */}
					</p>
				</div>
			</div>

			<div className="flex justify-between md:flex-row gap-20 w-full max-w-5xl mt-6">

				{/* order summery */}
				<div className="w-md h-[350px] bg-white rounded-2xl shadow-md py-6 px-8">
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
					<h2 className="text-3xl font-extrabold mb-4 text-indigo-700 flex items-center gap-3">
						<img src="/assets/img/scan.png" alt="" className='w-6' /> <span>Scan to Pay</span>
					</h2>

					<div className="mt-6 p-4 flex items-center justify-center text-gray-500">
						{/* Replace this with actual QR scanner component */}
						{/* [ QR Scanner Placeholder ] */}

						<img src="https://res.cloudinary.com/drfni1iqf/image/upload/v1744717196/Temp/qr-code_tw6lnk.png" alt="QR Code" className='w-56 rounded-2xl border-2 border-dashed border-gray-400 p-4 bg-gradient-to-br from-gray-100 to-gray-300 ' />
					</div>


					<div className='flex justify-center text-gray-700'>
						<p className='flex justify-center items-center mt-2 border border-emerald-500 rounded-md px-4 py-1'><span className='font-semibold'>IBAN :&nbsp;</span>
							<span ref={ibanRef}>JKDKSDKLSLKDSLDLSLDSL</span>
							<button
								onClick={() => copyText(ibanRef)}
								className="inline-flex items-center justify-center rounded-md pl-2 text-gray-500 hover:text-gray-900"
								aria-label="Copy email address"
							>
								<MdOutlineContentCopy />
							</button>
						</p>
					</div>

					<p className='mt-6 text-center text-xl font-semibold'>You have to pay <span className='text-emerald-500'>{selectedPlan.price} BD</span></p>
					<div className="flex flex-col gap-4 mt-6">
						<div className="flex justify-center items-center gap-3">
							<label
								htmlFor="upload"
								className="flex items-center gap-2 bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer transition"
							>
								<ImageUp size={20} />
								<span>Upload Payment Screenshot</span>
							</label>
							<input
								type="file"
								id="upload"
								className="hidden"
								accept="image/*"
								onChange={handleFileChange}
								disabled={isUploading}
							/>
							<button
								onClick={handleUploadClick}
								className={`${uploaded ? 'bg-green-500' : 'bg-primary'}  text-white py-2 px-6 rounded-md transition`} disabled={isUploading}
							>
								{isUploading ? "Uploading..." : uploaded ? "Uploaded" : "Submit"}
							</button>
						</div>
						{selectedFileName && (
							<p className="text-sm text-gray-700"><span className='font-medium'>Selected file: </span><span className='text-primary '>{selectedFileName}</span> </p>
						)}
					</div>

					{uploaded && (
						<div className="mt-8 p-4 bg-red-50 text-gray-600 rounded-lg text-center">
							<span className='text-red-600'>Note - </span> <span className='text-sm'>Contact our admin directly via call or WhatsApp after upload image: +91-98765-43210</span>
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
				<p className="text-gray-600 flex items-center justify-center">send us an email at :&nbsp;
					<span className="font-semibold text-purple-600" ref={emailRef}>contact@bookapp.com</span>
					<button
						onClick={() => copyText(emailRef)}
						className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:text-gray-900"
						aria-label="Copy email address"
					>
						<MdOutlineContentCopy />
					</button>
				</p>
			</div>
		</div>
	);
};

export default Payment;
