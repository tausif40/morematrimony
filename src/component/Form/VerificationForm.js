import React, { useState } from 'react';
import Modal from '../Modal/Modal';

function VerificationForm({ verify }) {
	const [ showModal, setShowModal ] = useState(true);

	const handleVerification = () => {
		verify(true);
		setShowModal(false);
	};

	return (
		<>
			<div id="modal-wrapper" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
				<div className='bg-white rounded-lg custom-shadow2 p-6 max-w-md w-full relative mx-2 '>
					<h2 className="text-xl font-semibold text-primary">Verify Enter email</h2>
					<div className="mt-6 text-gray-600">
						<p className='mb-2'>Enter Email</p>
						<input type="email" name="" id="" className='input-field' placeholder='example@gmail.com' />
					</div>
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
