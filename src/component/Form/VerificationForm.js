import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyEmailOTP } from '../../store/auth/email-slice';

function VerificationForm({ email }) {
	const dispatch = useDispatch()
	const navigate = useNavigate();
	const [ otp, setOtp ] = useState();
	const [ error, setError ] = useState('');

	const verify = useSelector((state) => state.auth.verify);

	const handleVerification = () => {
		const data = { email: email, otp: otp }
		dispatch(verifyEmailOTP(data)).then((res) => {
			navigate(`/dashboard`);
			console.log(res);
		}).catch((error) => {
			console.log(error);
			setError('OTP is incorrect')
		})
		// 	verify(true);
		// 	setShowModal(false);
	};
	console.log("verify-", verify);

	return (
		<>
			<div id="modal-wrapper" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
				<div className='bg-white rounded-lg custom-shadow2 p-6 max-w-md w-full relative mx-2 '>
					<h2 className="text-xl font-semibold text-primary">Send OTP</h2>
					<p className='text-gray-500 text-sm font-light'>Send on {email}</p>
					<div className="mt-4 text-gray-600">
						<p className='mb-1'>Enter OTP</p>
						<input type="number" value={otp} onChange={(e) => { setOtp(e.target.value); setError('') }} className='input-field' placeholder='enter otp' />
					</div>
					<p className='text-red-500 text-sm'>{error}</p>
					<button
						className="gradient-btn mt-6 px-4 py-2 text-white rounded m-auto"
						onClick={handleVerification}
					>
						Verify Now
					</button>
				</div>
			</div >
		</>
	);
}

export default VerificationForm;
