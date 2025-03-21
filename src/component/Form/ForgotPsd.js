import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';
import Modal from '../Modal/Modal';
import { forgotPsd } from '../../store/auth/email-slice';
import { useDispatch } from 'react-redux';

function ForgotPsd({ onClose }) {
	const dispatch = useDispatch();
	const [ showModal, setShowModal ] = useState(true);
	const [ email, setEmail ] = useState('');
	const [ isSubmitted, setIsSubmitted ] = useState(false);
	const [ error, setError ] = useState('');
	const [ isSending, setIsSending ] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!email) {
			setError('Please enter your email address');
			return;
		}

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			setError('Please enter a valid email address');
			return;
		}
		try {
			setIsSending(true);
			dispatch(forgotPsd({ email: email }))
				.then(() => {
					setIsSubmitted(true);
					setIsSending(false);
				}).catch(() => {
					setIsSending(false);
				})
		} catch {
			setIsSending(false);
		}
	};

	return (
		<>
			<Modal show={showModal} onClose={() => { setShowModal(false); onClose(); }}>

				<div className="p-2">
					{!isSubmitted ? (
						<>
							<div className="mb-6">
								<h2 className="text-2xl font-bold text-gray-800 mb-2">Reset your password</h2>
								<p className="text-gray-600 text-sm">
									Enter your email address and we'll send you a link to reset your password.
								</p>
							</div>

							<form onSubmit={handleSubmit} className="space-y-4">
								<div>
									<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
										Email address
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<Mail className="h-5 w-5 text-gray-400" />
										</div>
										<input
											type="text"
											id="email"
											value={email}
											onChange={(e) => { setEmail(e.target.value); setError('') }}
											className={`block w-full pl-10 pr-4 py-2 border ${error ? 'border-red-300' : 'border-gray-300'
												} rounded-lg text-gray-600 outline-none`}
											placeholder="email@example.com"
										/>
									</div>
									{error && (
										<p className="mt-2 text-sm text-red-600">
											{error}
										</p>
									)}
								</div>

								<button
									type="submit"
									className="gradient-btn w-full py-[10px] flex item-center rounded-md"
								>
									{isSending ? <span>Sending link...</span> : <><span>Send reset link</span><ArrowRight className="ml-2" /></>}
								</button>
							</form>
						</>
					) : (
						<div className="text-center py-8">
							<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
								<CheckCircle className="h-6 w-6 text-green-600" />
							</div>
							<h2 className="text-2xl font-semibold text-gray-900 mb-2">Check your email</h2>
							<p className="text-gray-600 mb-6">
								We've sent a password reset link to<br />
								<span className="font-medium">{email}</span>
							</p>
							<button
								// onClick={() => setIsOpen(false)}
								onClick={() => onClose()}
								className="text-sm text-blue-600 hover:text-blue-800 font-medium"
							>
								Close this window
							</button>
						</div>
					)}
				</div>
			</Modal >
		</ >
	);
}

export default ForgotPsd;
