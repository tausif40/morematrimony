import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../store/auth/auth-slice';
import toast from 'react-hot-toast';

const ChangePassword = () => {
	const dispatch = useDispatch()
	const [ oldPassword, setOldPassword ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const [ error, setError ] = useState();
	const [ success, setSuccess ] = useState();

	// Submit handler
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setSuccess('');

		// Basic validation
		if (password !== confirmPassword) {
			setError('Passwords does not match!');
			toast('Passwords does not match!', { icon: '⚠️' });
			return;
		}

		try {
			setLoading(true);
			const loadingToast = toast.loading('Updating ...');
			// Example API call using Axios
			dispatch(changePassword({ oldPassword: oldPassword, password: password }))
				.then((res) => {
					console.log(res)
					if (res?.payload?.code === 401) {
						setLoading(false);
						toast.error('Old password is incorrect', { id: loadingToast });
						setError('Old password is incorrect');
						return;
					} else {
						toast.success('Password changed successfully', { id: loadingToast });
						setSuccess('Password changed successfully');
						setLoading(false);
					}
				}).catch((error) => {
					toast.error('Failed to change password.', { id: loadingToast });
					console.log(error)
					setLoading(false);
				})
		} catch (err) {
			console.log(err)
			setError('Failed to change password.');
			setLoading(false);
		}
	};

	return (
		<section className="box-shadow bg-white border rounded-md">
			<p className='px-6 py-3 font-medium border-b text-headingGray'>Change Password</p>
			<div className='py-4 px-6 text-sm'>

				{error && <p className="text-red-500 mb-4">{error}</p>}
				{success && <p className="text-green-500 mb-4">{success}</p>}

				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label htmlFor="oldPassword" className="block text-sm font-medium mb-1">
							Old Password <span className="text-red-500">*</span>
						</label>
						<input
							type="password"
							id="oldPassword"
							className="input-field"
							value={oldPassword}
							onChange={(e) => setOldPassword(e.target.value)}
							required
						/>
					</div>

					<div className="mb-4">
						<label htmlFor="password" className="block text-sm font-medium mb-1">
							Password <span className="text-red-500">*</span>
						</label>
						<input
							type="password"
							id="password"
							className="input-field"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>

					<div className="mb-4">
						<label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
							Confirm password <span className="text-red-500">*</span>
						</label>
						<input
							type="password"
							id="confirmPassword"
							className="input-field"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</div>

					<div className="col-span-2 flex justify-center md:justify-end mt-4">
						<button
							type="submit"
							className="gradient-btn px-4 py-2 rounded-md text-sm"
							disabled={loading}
						>
							{loading ? 'Changing...' : 'Change'}
						</button>
					</div>
				</form>
			</div>
		</section >
	);
};

export default ChangePassword;
