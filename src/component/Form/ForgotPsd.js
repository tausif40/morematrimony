import React, { useState } from 'react';
import Modal from '../Modal/Modal';

function ForgotPsd({ verify, onClose }) {
	const [ showModal, setShowModal ] = useState(true);

	const handleVerification = () => {
		verify(true);
		setShowModal(false);
		onClose();
	};

	return (
		<>
			<Modal show={showModal} onClose={() => { setShowModal(false); onClose(); }}>
				<h2 className="text-xl font-semibold text-primary">Enter Your email</h2>
				<div className="mt-6 text-gray-600">
					{/* <p className='mb-2'>Enter You Email </p> */}
					<input type="email" name="" id="" className='input-field' placeholder='enter email' />
				</div>
				<button
					className="gradient-btn mt-6 px-4 py-2 text-white rounded m-auto"
					onClick={handleVerification}
				>
					Send
				</button>
			</Modal >
		</>
	);
}

export default ForgotPsd;
