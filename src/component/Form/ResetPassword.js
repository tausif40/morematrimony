import { useEffect, useState } from "react";
import axios from "axios";
import { resetPsd } from "../../store/auth/email-slice";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

const ResetPassword = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [ password, setPassword ] = useState("");
	const [ confirmPassword, setConfirmPassword ] = useState("");
	const [ psdError, setPsdError ] = useState("");
	const [ psdCofError, setConfPsdError ] = useState("");
	const [ token, setToken ] = useState("");
	const [ isLoading, setIsLoading ] = useState(false);
	const [ resetSuccess, setResetSuccess ] = useState(false);

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const tokenFromUrl = params.get("token");
		if (tokenFromUrl) {
			setToken(tokenFromUrl);
		}
	}, [ location ]);

	const handleResetPassword = async (e) => {
		e.preventDefault();

		if (!password) {
			setPsdError("Please enter Password")
			return;
		} else if (password.length < 8) {
			setPsdError("Password at least 8 character!")
			toast.error("Password min 8 character!")
			return;
		} else if (password !== confirmPassword) {
			setConfPsdError("Passwords does not match!");
			toast.error('Passwords does not match!')
			return;
		}

		try {
			setIsLoading(true)
			const data = { token: token, password: password }
			dispatch(resetPsd(data))
				.then((response) => {
					console.log(response);
					if (response?.payload?.code === 401) {
						setIsLoading(false)
						setConfPsdError('This URL is expire! Forgot password again');
						toast('This URL is expire', { icon: '⚠️' });
						return;
					}
					setResetSuccess(true)
					setIsLoading(false)
					setConfPsdError(response?.payload?.msg || "Password reset successful!");
				}).catch((error) => {
					setIsLoading(false)
					console.log(error);
				})

		} catch (error) {
			setIsLoading(false)
			setConfPsdError(error?.response?.data?.message || "An error occurred");
		}
	};

	const handleNavigate = () => {
		navigate("/", { replace: true });
	};

	return (
		<>
			<section className="min-h-screen bg-gray-100">
				<div className="flex justify-center pt-14 mx-1">
					<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
						<h2 className="text-2xl font-semibold mb-4 text-center text-black">Reset Your Password</h2>

						<form onSubmit={handleResetPassword} className="">
							{/* <label htmlFor="" className="text-sm text-black">Enter new password</label> */}
							<input
								type="password"
								placeholder="New password"
								value={password}
								onChange={(e) => { setPassword(e.target.value); setPsdError('') }}
								className="input-field"
							/>
							{psdError && <p className="text-red-500 text-xs mt-1">{psdError}</p>}
							<div className="mt-4">
								{/* <label htmlFor="" className="text-sm text-black">Confirm new password</label> */}
								<input
									type="password"
									placeholder="Confirm new password"
									value={confirmPassword}
									onChange={(e) => { setConfirmPassword(e.target.value); setConfPsdError('') }}
									className="input-field mt-4"
								/>
							</div>
							{/* {message && <p className="text-red-500 text-xs mt-1">{message}</p>} */}
							{psdCofError && <p className="text-red-500 text-xs mt-1">{psdCofError}</p>}
							<button
								type="submit"
								className={`w-full mt-6 text-white py-2 rounded-md ${resetSuccess ? 'bg-green-500' : 'gradient-btn'}`}
								disabled={isLoading || resetSuccess}
							>
								{isLoading ? 'Saving...' : <span> {resetSuccess ? 'Saved Success' : 'Save Password'}</span>}
							</button>
						</form>
					</div>
				</div>
			</section >
			{resetSuccess &&
				<div id="modal-wrapper" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
					<div className='bg-white rounded-lg custom-shadow2 p-6 max-w-md w-full relative mx-2 '>
						<div className="text-center py-8">
							<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
								<CheckCircle className="h-6 w-6 text-green-600" />
							</div>
							<h2 className="text-2xl font-semibold text-gray-900 mb-2">Password Updated</h2>
							<p className="text-gray-600 mb-6">
								{/* Your Password reset Successfully<br /> */}
								<span className="font-medium">You can Login with new Password</span>
							</p>
							<button className="text-sm text-blue-600 hover:text-blue-800 font-medium" onClick={handleNavigate}>
								Login Profile
							</button>
						</div >
					</div >
				</div >
			}
		</>
	);
};

export default ResetPassword;
