import React from 'react'
import Modal from '../Modal/Modal'
import { FaUserLock } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

function AccessRestricted({ onClose }) {
	const navigate = useNavigate();

	const handleLoginPage = () => {
		navigate('/')
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "instant",
		});
		onClose();
	}

	return (
		<>
			<Modal show={true} onClose={() => onClose()}>
				<div className="flex flex-col items-center text-center">
					<FaUserLock className="text-primary text-4xl mb-4" />
					<h2 className="text-3xl font-bold text-gray-800 mb-2">Access Restricted</h2>
					<p className="text-gray-500 mb-6">
						To continue, please log into your account. Unlock all features and enjoy a seamless experience.
					</p>

					<button
						onClick={handleLoginPage}
						className="w-full gradient-btn font-semibold py-2 px-4 rounded shadow-md transition duration-300"
					>
						Login Now
					</button>

					<button
						onClick={() => onClose()}
						className="mt-4 text-sm text-gray-400 hover:text-gray-600 transition"
					>
						I’ll do it later
					</button>
				</div>
			</Modal >
		</>
	)
}

export default AccessRestricted