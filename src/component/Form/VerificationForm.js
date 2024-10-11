import React, { useState } from 'react';
import Modal from '../Modal/Modal';

function VerificationForm({ verify, onClose }) {
	const [ showModal, setShowModal ] = useState(true);

	const handleVerification = () => {
		verify(true);
		setShowModal(false);
		onClose(); 
	};

	return (
		<>
			<Modal show={showModal} onClose={() => { setShowModal(false); onClose(); }}>
				<h2 className="text-xl font-semibold">Enter Details for Verification</h2>
				<p className="mt-4 text-gray-600">
					Please provide your details for account verification.
				</p>
				<button
					className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
					onClick={handleVerification}
				>
					Verify Now
				</button>
			</Modal>
		</>
	);
}

export default VerificationForm;
