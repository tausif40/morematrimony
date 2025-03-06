import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import apiClient from '../../lib/apiClient';

const useLogout = () => {
	const navigate = useNavigate();

	const handleLogout = async () => {
		const loadingToast = toast.loading('wait for LogOut...');
		try {
			const refreshToken = Cookies.get('refresh_token');
			const logoutToken = { refreshToken: refreshToken };
			console.log(logoutToken);
			await apiClient.post('/auth/logout', logoutToken).then((response) => {
				console.log(response);
				toast.success('Logged out successfully.', { id: loadingToast });
				ClearAllCookies();
				navigate('/');
			}).catch((error) => {
				console.log(error);
				toast.error('Failed to log out.', { id: loadingToast });
			});
		} catch (error) {
			console.error('Logout error:', error);
			toast.error(
				error.response?.data?.message || error.message || 'An unexpected error occurred.',
				{ id: loadingToast }
			);
		}
	};

	const ClearAllCookies = () => {
		const cookies = Object.keys(Cookies.get());
		cookies.forEach(cookie => {
			Cookies.remove(cookie);
		});
		return null;
	};

	return handleLogout;
};

export default useLogout;