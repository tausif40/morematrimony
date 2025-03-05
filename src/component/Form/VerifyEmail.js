import React, { useState, useRef, useEffect } from 'react';
import { Mail } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resendEmailOTP, verifyEmailOTP } from '../../store/auth/email-slice';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

function VerifyEmail() {
	const dispatch = useDispatch()
	const navigate = useNavigate();
	const location = useLocation();
	const inputRefs = useRef([]);
	const [ otp, setOtp ] = useState(Array(6).fill(''));
	const [ timer, setTimer ] = useState(60);
	const [ isResendDisabled, setIsResendDisabled ] = useState(true);
	const [ resending, setResending ] = useState(false);
	const [ verifying, setVerifying ] = useState(false);
	const [ error, setError ] = useState('');
	const [ email, setEmail ] = useState('');


	// const verifyEmail = useSelector((state) => state.emailAuth.verifyEmail);
	// const resendEmail = useSelector((state) => state.emailAuth.resendEmail);

	// useEffect(() => {
	// 	console.log("verifyEmail-", verifyEmail);
	// 	console.log("resendEmail-", resendEmail);
	// }, [ dispatch, verifyEmail, resendEmail ])
	useEffect(() => {
		location?.state === null ? navigate('/') : setEmail(location?.state?.email)
	}, [ email, navigate, location ])

	useEffect(() => {
		let interval;
		if (isResendDisabled) {
			interval = setInterval(() => {
				setTimer((prev) => {
					if (prev === 1) {
						clearInterval(interval);
						setIsResendDisabled(false);
						return 60;
					}
					return prev - 1;
				});
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [ isResendDisabled ]);

	const handleChange = (index, value) => {
		if (isNaN(Number(value))) return;
		setError("")
		const newOtp = [ ...otp ];
		newOtp[ index ] = value;
		setOtp(newOtp);

		if (value !== '' && index < 5) {
			inputRefs.current[ index + 1 ]?.focus();
		}
	};

	const handleKeyDown = (index, e) => {
		if (e.key === 'Backspace' && !otp[ index ] && index > 0) {
			inputRefs.current[ index - 1 ]?.focus();
		}
	};

	const handlePaste = (e) => {
		e.preventDefault();
		const pastedData = e.clipboardData.getData('text').slice(0, 6);
		const digits = pastedData.split('').filter(char => !isNaN(Number(char)));

		const newOtp = [ ...otp ];
		digits.forEach((digit, index) => {
			if (index < 6) newOtp[ index ] = digit;
		});
		setOtp(newOtp);

		const nextEmptyIndex = newOtp.findIndex(val => val === '');
		if (nextEmptyIndex !== -1) {
			inputRefs.current[ nextEmptyIndex ]?.focus();
		} else {
			inputRefs.current[ 5 ]?.focus();
		}
	};

	const handleVerify = () => {
		const otpString = otp.join('');
		if (otpString.length === 6) {
			setVerifying(true);
			console.log('Verifying OTP:', otpString);
			const data = { email: email, otp: otpString }
			dispatch(verifyEmailOTP(data))
				.then((response) => {
					console.log(response);
					const tokens = response?.payload?.tokens;
					console.log(tokens);
					Cookies.set('access_token', tokens.access.token);
					Cookies.set('refresh_token', tokens.refresh.token);
					toast.success('Login successful!');

					navigate(`/dashboard`);
					setVerifying(false)
				}).catch((error) => {
					console.log(error);
					setError('OTP is incorrect')
					setVerifying(false)
				})
		}
	};
	const handleResend = () => {
		setResending(true);
		const loadingToast = toast.loading('Sending.....');
		dispatch(resendEmailOTP({ email: email }))
			.then((res) => {
				toast.success(("Send otp"), { id: loadingToast })
				setResending(false);
				setIsResendDisabled(true);
				setTimer(60);
				console.log(res);
			}).catch((error) => {
				console.log(error);
				setIsResendDisabled(false);
				setResending(false);
				toast.error(("Send failed!"), { id: loadingToast })
			})
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-100 flex items-center justify-center p-4">
			<div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
				<div className="flex items-center justify-center mb-6">
					<div className="bg-red-100 p-3 rounded-full">
						<Mail className="w-6 h-6 text-primary" />
					</div>
				</div>

				<h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Verify Your Email</h2>
				<p className="text-center text-gray-600 mb-8">
					We've sent a verification code to<br />
					<span className="font-medium text-gray-800">{email}</span>
				</p>

				<div className="flex justify-center gap-2 mb-2">
					{otp.map((digit, index) => (
						<input
							key={index}
							ref={(el) => (inputRefs.current[ index ] = el)}
							type="text"
							maxLength={1}
							value={digit}
							onChange={(e) => handleChange(index, e.target.value)}
							onKeyDown={(e) => handleKeyDown(index, e)}
							onPaste={handlePaste}
							className="w-12 h-12 text-center text-xl font-semibold border-2 rounded-lg focus:border-gold focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-200"
						/>
					))}
				</div>
				<p className='text-red-500 text-sm text-center'>{error}</p>
				<button
					onClick={handleVerify}
					className="w-full py-3 px-4 mt-6 gradient-btn rounded-md"
				>
					{verifying ? 'Verifying...' : 'Verify Now'}
				</button>

				<p className="text-center mt-6 text-gray-600">
					Didn't receive the code?{' '}
					<button
						onClick={handleResend}
						disabled={isResendDisabled || resending}
						className={`text-blue-600 font-medium ${isResendDisabled || resending ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-700'}`}
					>
						{resending ? `Sending otp...` : isResendDisabled ? <p className='flex'>Resend in <p className='w-10'>{timer}s</p></p> : 'Resend'}
					</button>
				</p>
			</div>
		</div>
	);
}

export default VerifyEmail;
