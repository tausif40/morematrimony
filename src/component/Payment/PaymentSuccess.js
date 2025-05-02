import React, { useState } from 'react'
import Modal from '../Modal/Modal';
import { CheckCircle } from 'lucide-react';

function PaymentSuccess({ onClose }) {
	const [ showModal, setShowModal ] = useState(true);

	return (
		<>
			<Modal show={showModal} onClose={() => { setShowModal(false); onClose(); }}>

				<div className="p-2">

					<div className="text-center">
						<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
							<CheckCircle className="h-6 w-6 text-green-600" />
						</div>
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">Payment Successful</h2>
						<p className="text-gray-600 mb-6">
							Your payment details is submitted,<br /> admin will take action within few hours.<br />
							Email at : <a href="mailto:more@morematrimony.com" className='text-primary font-medium'>more@morematrimony.com</a><br />
							Reach out at <a href="tel:+973 3452 7615" className='text-primary font-medium'>+973 3452 7615</a><br />
						</p>
						<button
							onClick={() => onClose()}
							className="text-sm text-blue-600 hover:text-blue-800 font-medium"
						>
							Close this window
						</button>
					</div>
				</div>
			</Modal >
		</>
	)
}

export default PaymentSuccess