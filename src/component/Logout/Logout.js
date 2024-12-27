import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { logOut } from '../../store/auth/auth-slice';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import apiClient from '../../api/apiClient';
import { useEffect } from 'react';


const useLogout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// setIsOpen(false)
	const refreshToken = Cookies.get('refresh_token');

	function ClearAllCookies() {
		const cookies = Object.keys(Cookies.get());
		cookies.forEach(cookie => {
			Cookies.remove(cookie);
		});
		return null;
	}
	const handleLogout = async () => {
		const loadingToast = toast.loading('wait for LogOut...');
		try {
			// dispatch(logOut());
			// const resultAction = dispatch(logOut());
			// console.log(resultAction);
			const logoutToken = { refreshToken: refreshToken }
			console.log(logoutToken);
			const response = await apiClient.post('/auth/logout', logoutToken).then(() => {
				console.log(response);
				toast.success('Logged out successfully.', { id: loadingToast });
				ClearAllCookies();
				navigate('/')
			}).catch((error) => {
				console.log(error);
				toast.error('Failed to log out.', { id: loadingToast });
			});

			// if (logOut.fulfilled.match(resultAction)) {
			// 	toast.success('Logged out successfully.', { id: loadingToast });
			// 	ClearAllCookies();
			// 	// window.location.reload(false);
			// 	navigate('/')
			// } else {
			// 	toast.error('Failed to log out.', { id: loadingToast });
			// }
		} catch (error) {
			console.error('Logout error:', error);
			toast.error(
				error.response?.data?.message || error.message || 'An unexpected error occurred.',
				{ id: loadingToast }
			);
		}
	};
	return handleLogout;

};

export default useLogout;
