import React, { useState } from 'react';
import Modal from '../Modal/Modal';

function ContactDetails({ onClose }) {
	const [ showModal, setShowModal ] = useState(true);

	const handleRequest = () => {
		// setShowModal(false);
		// onClose();
	};

	return (
		<>
			<Modal show={showModal} onClose={() => { setShowModal(false); onClose(); }}>
				<p className="text-xl font-medium text-primary flex justify-center">Contact Details</p>
				<div className="mt-6 text-gray-600 pb-8">
					<div className='flex'>
						<p className='w-28 font-medium'>Mobile No : </p>
						<p className='flex items-center'>
							<p>+91 986 </p><p className='pt-1'>*******</p>
						</p>
					</div>
					<div className='flex'>
						<p className='w-28 font-medium'>Email : </p>
						<span>example@gmail.com</span>
					</div>
				</div>
				{/* <button
					className="gradient-btn mt-6 px-4 py-2 text-white rounded-md m-auto"
					onClick={handleRequest}
				>
					Request for number
				</button> */}
			</Modal >
		</>
	);
}

export default ContactDetails